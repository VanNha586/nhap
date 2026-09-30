#!/usr/bin/env node
'use strict';

// Static-only unpacking and analysis: never require/eval/vm/run the input script.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const inputPath = path.resolve(process.argv[2] || 'libbot.js.so');
const outDir = path.resolve(process.argv[3] || 'analysis/libbot');
const input = fs.readFileSync(inputPath);
const marker = Buffer.from('✄\n');
const headerEnd = input.indexOf(marker);
if (headerEnd < 0 || !input.subarray(0, 5).equals(Buffer.from('📦\n'))) {
  throw new Error('Not the expected UTF-8 Frida JavaScript bundle');
}
const entries = input.subarray(5, headerEnd).toString('utf8').trim().split('\n').map(line => {
  const match = /^(\d+) (\/[^\r\n]+)$/.exec(line);
  if (!match) throw new Error('Unsupported bundle entry: ' + line);
  return { size: Number(match[1]), name: match[2] };
});
let cursor = headerEnd + marker.length;
const files = new Map();
for (let i = 0; i < entries.length; i++) {
  const entry = entries[i];
  if (cursor + entry.size > input.length) throw new Error('Truncated bundle');
  files.set(entry.name, input.subarray(cursor, cursor + entry.size));
  cursor += entry.size;
  if (i < entries.length - 1) {
    const boundary = Buffer.from('\n✄\n');
    if (!input.subarray(cursor, cursor + boundary.length).equals(boundary)) {
      throw new Error('Invalid bundle separator');
    }
    cursor += boundary.length;
  }
}
if (cursor !== input.length) throw new Error('Unexpected trailing bundle data');
const sourceBytes = files.get('/avatar.js');
const mapBytes = files.get('/avatar.js.map');
if (!sourceBytes || !mapBytes) throw new Error('Missing avatar entries');
const source = sourceBytes.toString('utf8');
const sourcemap = JSON.parse(mapBytes.toString('utf8'));
const ast = parser.parse(source, { sourceType: 'module' });
const sourceLineOffset = input.subarray(0, headerEnd + marker.length).toString('utf8').split('\n').length - 1;
let modulePath, decoderPath, tableFunctionPath, rotationPath, arrayPath;
traverse(ast, {
  ObjectMethod(p) {
    if (t.isStringLiteral(p.node.key, { value: 'avatar.js' })) modulePath = p;
  },
  FunctionDeclaration(p) {
    if (p.node.id?.name === '_0x4b48') decoderPath = p;
    if (p.node.id?.name === '_0x2c4e') tableFunctionPath = p;
  }
});
if (!modulePath || !decoderPath || !tableFunctionPath) throw new Error('Expected obfuscation structure not found');
modulePath.traverse({
  ExpressionStatement(p) {
    const n = p.node.expression;
    if (t.isCallExpression(n) && t.isFunctionExpression(n.callee) &&
        t.isIdentifier(n.arguments[0], { name: '_0x2c4e' })) rotationPath = p;
  }
});
tableFunctionPath.traverse({
  ArrayExpression(p) {
    if (p.node.elements.every(e => t.isStringLiteral(e))) arrayPath = p;
  }
});
if (!rotationPath || !arrayPath) throw new Error('Table/rotation missing');
const obfuscationRoots = [decoderPath.node, tableFunctionPath.node, rotationPath.node];
function insideObfuscation(p) {
  return obfuscationRoots.includes(p.node) || Boolean(p.findParent(q => obfuscationRoots.includes(q.node)));
}
function belongsToBot(p) {
  return p.node === modulePath.node || Boolean(p.findParent(q => q.node === modulePath.node));
}
function isDecoderReference(p, visited = new Set()) {
  if (!p?.isIdentifier()) return false;
  const binding = p.scope.getBinding(p.node.name);
  if (!binding || visited.has(binding)) return false;
  visited.add(binding);
  if (binding.path.node === decoderPath.node) return true;
  return binding.path.isVariableDeclarator() &&
    binding.path.get('init').isIdentifier() &&
    isDecoderReference(binding.path.get('init'), visited);
}
const aliases = [];
modulePath.traverse({
  VariableDeclarator(p) {
    if (p.get('id').isIdentifier() && isDecoderReference(p.get('init'))) aliases.push(p);
  }
});
const originalCounts = { bundle: 0, botIncludingWrapperAndObfuscation: 0, bridgeAndBundler: 0, obfuscation: 0 };
traverse(ast, { Function(p) {
  originalCounts.bundle++;
  if (belongsToBot(p)) originalCounts.botIncludingWrapperAndObfuscation++;
  else originalCounts.bridgeAndBundler++;
  if (insideObfuscation(p)) originalCounts.obfuscation++;
} });
let subtraction;
decoderPath.traverse({
  AssignmentExpression(p) {
    if (t.isBinaryExpression(p.node.right, { operator: '-' }) && t.isNumericLiteral(p.node.right.right)) {
      subtraction = p.node.right.right.value;
    }
  }
});
if (!Number.isInteger(subtraction)) throw new Error('Expected numeric decoder offset');
const originalTable = arrayPath.node.elements.map(e => e.value);
const table = [...originalTable];
const target = rotationPath.node.expression.arguments[1];
if (!t.isNumericLiteral(target)) throw new Error('Unsupported checksum target');
let checksumPath;
rotationPath.traverse({
  VariableDeclarator(p) {
    if (p.node.id.name === '_0x2fb114') checksumPath = p.get('init');
  }
});
if (!checksumPath) throw new Error('Checksum expression missing');
// Small AST interpreter with an explicit allowlist. No input code is executed.
function evaluate(p) {
  const n = p.node;
  if (t.isNumericLiteral(n) || t.isStringLiteral(n)) return n.value;
  if (t.isUnaryExpression(n)) {
    const v = evaluate(p.get('argument'));
    if (n.operator === '-') return -v;
    if (n.operator === '+') return +v;
  }
  if (t.isBinaryExpression(n)) {
    const a = evaluate(p.get('left')), b = evaluate(p.get('right'));
    switch (n.operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
    }
  }
  if (t.isCallExpression(n) && n.arguments.length === 1) {
    if (t.isIdentifier(n.callee, { name: 'parseInt' })) {
      return Number.parseInt(evaluate(p.get('arguments.0')));
    }
    if (isDecoderReference(p.get('callee'))) {
      const index = evaluate(p.get('arguments.0')) - subtraction;
      if (!Number.isInteger(index) || index < 0 || index >= table.length) throw new Error('Table index out of range');
      return table[index];
    }
  }
  throw new Error('Disallowed checksum AST node: ' + n.type);
}
let rotations = 0;
while (rotations < table.length && evaluate(checksumPath) !== target.value) {
  table.push(table.shift());
  rotations++;
}
if (rotations >= table.length || evaluate(checksumPath) !== target.value) throw new Error('Checksum did not converge');
const replacedCalls = [];
modulePath.traverse({
  CallExpression(p) {
    if (insideObfuscation(p) || !isDecoderReference(p.get('callee'))) return;
    if (p.node.arguments.length < 1 || !t.isNumericLiteral(p.node.arguments[0])) {
      throw new Error('Nonconstant decoder call cannot be statically resolved');
    }
    const argument = p.node.arguments[0].value;
    const value = table[argument - subtraction];
    if (value === undefined) throw new Error('Decoder call outside table');
    replacedCalls.push({ argument, value, sourceLine: p.node.loc.start.line + sourceLineOffset });
    const replacement = t.stringLiteral(value);
    replacement.loc = p.node.loc;
    p.replaceWith(replacement);
  }
});
// Verify that the aliases are used only for replaced calls, other aliases, or the removed rotation.
const aliasNodes = new Set(aliases.map(p => p.node));
modulePath.scope.crawl();
for (const alias of aliases) {
  const binding = alias.scope.getBinding(alias.node.id.name);
  for (const ref of binding?.referencePaths || []) {
    if (insideObfuscation(ref)) continue;
    if (ref.parentPath.isVariableDeclarator() && aliasNodes.has(ref.parentPath.node)) continue;
    throw new Error('Unresolved decoder alias use: ' + alias.node.id.name);
  }
}
for (const alias of aliases) alias.remove();
rotationPath.remove();
decoderPath.remove();
tableFunctionPath.remove();
modulePath.scope.crawl();
const genOpts = { comments: true, compact: false, jsescOption: { minimal: true } };
function compactCode(n) { return generate(n, { comments: false, compact: true }).code; }
function expressionLabel(n) {
  const value = compactCode(n);
  return value.length <= 200 ? value : value.slice(0, 197) + '...';
}
function propertyName(n) {
  return t.isIdentifier(n) ? n.name : t.isStringLiteral(n) ? n.value : compactCode(n);
}
function inferredFunctionName(p) {
  const n = p.node;
  if (n.id?.name) return n.id.name;
  if (p.parentPath.isVariableDeclarator()) return compactCode(p.parentPath.node.id);
  if (p.parentPath.isAssignmentExpression()) return compactCode(p.parentPath.node.left);
  if (p.isObjectMethod() || p.isClassMethod() || p.isClassPrivateMethod()) return propertyName(n.key);
  if (p.parentPath.isObjectProperty()) return propertyName(p.parentPath.node.key);
  const call = p.parentPath;
  if (call.isCallExpression() || call.isNewExpression()) {
    if (call.node.callee === n) return 'IIFE(' + n.params.map(expressionLabel).join(', ') + ')';
    return expressionLabel(call.node.callee) + ' callback';
  }
  return '(anonymous)';
}
const classBindings = new Map();
modulePath.traverse({
  VariableDeclarator(p) {
    const n = p.node;
    if (!t.isIdentifier(n.id) || !t.isCallExpression(n.init) || !t.isMemberExpression(n.init.callee)) return;
    const prop = propertyName(n.init.callee.property);
    if (prop === 'class' && t.isStringLiteral(n.init.arguments[0])) classBindings.set(n.id.name, n.init.arguments[0].value);
  }
});
const methodBindings = new Map();
modulePath.traverse({
  VariableDeclarator(p) {
    const n = p.node;
    if (t.isIdentifier(n.id) && t.isCallExpression(n.init) && t.isMemberExpression(n.init.callee) &&
        ['method', 'overload'].includes(propertyName(n.init.callee.property))) {
      methodBindings.set(n.id.name, n.init);
    }
  }
});
function methodTarget(node, visited = new Set()) {
  if (!node) return '';
  if (t.isIdentifier(node)) {
    if (methodBindings.has(node.name) && !visited.has(node.name)) {
      visited.add(node.name);
      return methodTarget(methodBindings.get(node.name), visited);
    }
    return classBindings.get(node.name) || node.name;
  }
  if (t.isMemberExpression(node) && propertyName(node.property) === 'virtualAddress') {
    return methodTarget(node.object, visited);
  }
  if (t.isCallExpression(node) && t.isMemberExpression(node.callee)) {
    const prop = propertyName(node.callee.property);
    if (prop === 'method' && t.isStringLiteral(node.arguments[0])) {
      return methodTarget(node.callee.object, visited) + '.' + node.arguments[0].value;
    }
    if (prop === 'overload') return methodTarget(node.callee.object, visited);
  }
  return expressionLabel(node);
}
function functionContext(p) {
  const call = p.findParent(q => q.isCallExpression() &&
    t.isMemberExpression(q.node.callee) &&
    t.isIdentifier(q.node.callee.object, { name: 'Interceptor' }));
  if (call) return methodTarget(call.node.arguments[0]);
  const parentFn = p.findParent(q => q.isFunction() && q.node !== modulePath.node);
  return parentFn ? inferredFunctionName(parentFn) : '';
}
const functionRecords = [];
const functionByNode = new Map();
traverse(ast, { Function(p) {
  const record = {
    id: 'F' + String(functionRecords.length + 1).padStart(3, '0'),
    group: belongsToBot(p) ? (p.node === modulePath.node ? 'bot-wrapper' : 'bot') : 'bridge/bundler',
    name: inferredFunctionName(p),
    kind: p.node.type + ((p.node.kind && p.node.kind !== 'method') ? ':' + p.node.kind : ''),
    context: functionContext(p),
    inputLineStart: p.node.loc.start.line + sourceLineOffset,
    inputLineEnd: p.node.loc.end.line + sourceLineOffset,
    strings: [], regexes: []
  };
  functionRecords.push(record);
  functionByNode.set(p.node, record);
} });
const stringRecords = new Map();
const regexRecords = [];
function enclosingFunction(p) {
  const fn = p.findParent(q => q.isFunction());
  return fn ? functionByNode.get(fn.node) : null;
}
function recordString(p, value, kind = 'literal') {
  const fn = enclosingFunction(p);
  const group = belongsToBot(p) ? 'bot' : 'bridge/bundler';
  const inputLine = p.node.loc ? p.node.loc.start.line + sourceLineOffset : null;
  if (!stringRecords.has(value)) stringRecords.set(value, { value, kinds: new Set(), groups: new Set(), occurrences: 0, groupOccurrences: {}, locations: new Set(), functions: new Set() });
  const rec = stringRecords.get(value);
  rec.kinds.add(kind); rec.groups.add(group); rec.occurrences++;
  rec.groupOccurrences[group] = (rec.groupOccurrences[group] || 0) + 1;
  if (inputLine != null) rec.locations.add(inputLine);
  if (fn) {
    rec.functions.add(fn.id + ':' + fn.name);
    if (!fn.strings.includes(value)) fn.strings.push(value);
  }
}
// Collect before converting bracket-properties to dot syntax, so decoded strings are not lost.
traverse(ast, {
  StringLiteral(p) { recordString(p, p.node.value); },
  TemplateLiteral(p) {
    const value = p.node.quasis.map((q, i) => (q.value.cooked ?? q.value.raw) +
      (i < p.node.expressions.length ? '${' + compactCode(p.node.expressions[i]) + '}' : '')).join('');
    recordString(p, value, 'template');
  },
  RegExpLiteral(p) {
    const value = '/' + p.node.pattern + '/' + p.node.flags;
    const fn = enclosingFunction(p);
    if (fn && !fn.regexes.includes(value)) fn.regexes.push(value);
    regexRecords.push({ value, group: belongsToBot(p) ? 'bot' : 'bridge/bundler', inputLine: p.node.loc.start.line + sourceLineOffset, function: fn?.id || '' });
  }
});
const hooks = [];
modulePath.traverse({
  CallExpression(p) {
    const n = p.node;
    if (t.isMemberExpression(n.callee) && t.isIdentifier(n.callee.object, { name: 'Interceptor' })) {
      hooks.push({ type: propertyName(n.callee.property), target: methodTarget(n.arguments[0]), inputLine: n.loc.start.line + sourceLineOffset });
    }
  }
});
const gameMethodCalls = [];
modulePath.traverse({
  CallExpression(p) {
    const n = p.node;
    if (t.isMemberExpression(n.callee) && propertyName(n.callee.property) === 'method' && t.isStringLiteral(n.arguments[0])) {
      gameMethodCalls.push({ name: n.arguments[0].value, target: methodTarget(n), inputLine: n.loc.start.line + sourceLineOffset });
    }
  }
});
const gameMethodNames = [...new Set(gameMethodCalls.map(r => r.name))];
const prefKeys = new Set();
modulePath.traverse({
  CallExpression(p) {
    if ((t.isIdentifier(p.node.callee, { name: '_0x74df60' }) || t.isIdentifier(p.node.callee, { name: '_0x38515e' })) &&
        t.isStringLiteral(p.node.arguments[0])) prefKeys.add(p.node.arguments[0].value);
  }
});
// Remove only cosmetic obfuscation idioms. Do not rename unknown variables or change behavior.
traverse(ast, {
  StringLiteral(p) { delete p.node.extra; },
  MemberExpression(p) {
    if (p.node.computed && t.isStringLiteral(p.node.property) && t.isValidIdentifier(p.node.property.value, false)) {
      const replacement = t.identifier(p.node.property.value); replacement.loc = p.node.property.loc;
      p.node.property = replacement; p.node.computed = false;
    }
  },
  'ObjectProperty|ObjectMethod'(p) {
    if (!p.node.computed && t.isStringLiteral(p.node.key) && t.isValidIdentifier(p.node.key.value, false)) {
      const replacement = t.identifier(p.node.key.value); replacement.loc = p.node.key.loc;
      p.node.key = replacement;
    }
  },
  UnaryExpression: { exit(p) {
    if (p.node.operator !== '!') return;
    const a = p.node.argument;
    let value;
    if (t.isArrayExpression(a) && a.elements.length === 0) value = false;
    else if (t.isBooleanLiteral(a)) value = !a.value;
    else return;
    const replacement = t.booleanLiteral(value); replacement.loc = p.node.loc;
    p.replaceWith(replacement);
  } }
});
const decodedBundle = generate(ast, genOpts).code + '\n';
// A reading copy of just the bot. Bridge initialization remains in the full bundle.
const botStatements = modulePath.node.body.body.filter(n => !(t.isExpressionStatement(n) &&
  t.isCallExpression(n.expression) && t.isIdentifier(n.expression.callee) &&
  ['init_dist', 'init_node_globals'].includes(n.expression.callee.name)));
const botAst = t.file(t.program(botStatements));
const decodedBot = '// Ban phan tich tinh: phan bot avatar.js; phu thuoc Frida + Il2Cpp.\n' +
  '// Ten _0x... duoc giu nguyen; day khong phai ten ham goc da khoi phuc.\n' +
  '// Khoi tao frida-il2cpp-bridge nam trong avatar.decoded.js.\n\n' + generate(botAst, genOpts).code + '\n';
parser.parse(decodedBundle, { sourceType: 'module' });
parser.parse(decodedBot, { sourceType: 'script' });
const transformedCounts = {
  bundle: functionRecords.length,
  botIncludingWrapper: functionRecords.filter(r => r.group.startsWith('bot')).length,
  botExcludingWrapper: functionRecords.filter(r => r.group === 'bot').length,
  botNamedHelpers: functionRecords.filter(r => r.group === 'bot' && /^_0x[\da-f]+$/.test(r.name)).length,
  bridgeAndBundler: functionRecords.filter(r => r.group === 'bridge/bundler').length
};
const allStrings = [...stringRecords.values()];
const botStrings = allStrings.filter(r => r.groups.has('bot'));
function csv(rows) {
  return rows.map(row => row.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')).join('\n') + '\n';
}
function jsonValue(v) { return JSON.stringify(v); }
function md(v) { return String(v).replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>'); }
function write(name, content) { fs.writeFileSync(path.join(outDir, name), content); }
fs.mkdirSync(outDir, { recursive: true });
write('avatar.bundle.original.js', sourceBytes);
write('avatar.js.map', mapBytes);
write('avatar.decoded.js', decodedBundle);
write('avatar.bot.decoded.js', decodedBot);
write('string-table.csv', csv([
  ['decoder_argument', 'rotated_index', 'original_index', 'value', 'lookup_calls_in_bot'],
  ...table.map((value, i) => [i + subtraction, i, (i + rotations) % table.length, value, replacedCalls.filter(r => r.argument === i + subtraction).length])
]));
write('strings.csv', csv([
  ['value', 'kind', 'group', 'occurrences', 'libbot_input_lines', 'functions'],
  ...allStrings.map(r => [r.value, [...r.kinds].join(';'), [...r.groups].join(';'), r.occurrences, [...r.locations].join(';'), [...r.functions].join(';')])
]));
write('strings.bot.txt', botStrings.map(r => jsonValue(r.value)).join('\n') + '\n');
write('functions.csv', csv([
  ['id', 'group', 'name', 'kind', 'context', 'libbot_line_start', 'libbot_line_end', 'direct_strings_json', 'direct_regexes_json'],
  ...functionRecords.map(r => [r.id, r.group, r.name, r.kind, r.context, r.inputLineStart, r.inputLineEnd, JSON.stringify(r.strings), JSON.stringify(r.regexes)])
]));
write('game-methods.csv', csv([
  ['method_name', 'static_lookup_count', 'targets_as_written_or_resolved', 'libbot_input_lines'],
  ...gameMethodNames.map(name => {
    const refs = gameMethodCalls.filter(r => r.name === name);
    return [name, refs.length, [...new Set(refs.map(r => r.target))].join(';'), [...new Set(refs.map(r => r.inputLine))].join(';')];
  })
]));
write('functions.bot.md', '# Danh sách đầy đủ hàm/callback của phần bot\n\n' +
  '**' + transformedCounts.botExcludingWrapper + ' hàm/callback**, không tính wrapper `avatar.js`, thư viện bridge và 4 hàm phục vụ làm rối.\n\n' +
  'Dòng chỉ vị trí trong `libbot.js.so` gốc. Chuỗi chỉ tính trực tiếp trong mỗi hàm, không cộng chuỗi của hàm con. Tên `_0x...` là tên hiện có; nhãn callback/context là nhãn phân tích, không phải tên gốc.\n\n' +
  functionRecords.filter(r => r.group === 'bot').map((r, i) => {
    return '## ' + (i + 1) + '. ' + md(r.name) + ' — ' + r.id + '\n\n' +
      '- Loại: `' + r.kind + '`; dòng gốc: **' + r.inputLineStart + '–' + r.inputLineEnd + '**.\n' +
      (r.context ? '- Ngữ cảnh: `' + md(r.context) + '`.\n' : '') +
      '- Strings trực tiếp: ' + (r.strings.length ? r.strings.map(s => '`' + md(jsonValue(s)).replace(/`/g, '\\`') + '`').join(', ') : 'Không có string literal trực tiếp.') + '\n' +
      (r.regexes.length ? '- Regex trực tiếp: ' + r.regexes.map(s => '`' + md(s) + '`').join(', ') + '\n' : '');
  }).join('\n'));
const facts = {
  input: path.basename(inputPath), sha256: crypto.createHash('sha256').update(input).digest('hex'), bytes: input.length,
  entries, sourceMap: { version: sourcemap.version, sources: sourcemap.sources, hasSourcesContent: Array.isArray(sourcemap.sourcesContent) },
  decoder: { offset: subtraction, target: target.value, rotations, tableSize: table.length, aliases: aliases.length, replacedCalls: replacedCalls.length, usedTableEntries: new Set(replacedCalls.map(r => r.argument)).size, unusedTableEntries: table.length - new Set(replacedCalls.map(r => r.argument)).size },
  originalCounts, transformedCounts,
  strings: { uniqueBundle: allStrings.length, uniqueBot: botStrings.length, occurrencesBundle: allStrings.reduce((a, r) => a + r.occurrences, 0), occurrencesBot: botStrings.reduce((a, r) => a + (r.groupOccurrences.bot || 0), 0), note: 'Unique decoded literal/template values, including bracket-property keys before dot formatting. Source-map metadata and removed obfuscation table excluded.' },
  classes: Object.fromEntries(classBindings), hooks, prefKeys: [...prefKeys],
  referencedGameMethods: { uniqueNames: gameMethodNames.length, staticCalls: gameMethodCalls.length, names: gameMethodNames },
  botRegexes: regexRecords.filter(r => r.group === 'bot'),
  namedHelpers: functionRecords.filter(r => r.group === 'bot' && /^_0x[\da-f]+$/.test(r.name))
};
write('facts.json', JSON.stringify(facts, null, 2) + '\n');
console.log(JSON.stringify({ bytes: facts.bytes, decoder: facts.decoder, originalCounts, transformedCounts, strings: facts.strings, hooks }, null, 2));
