#!/usr/bin/env node
'use strict';
// Static AST transformation only. Never import/eval/run the input bundle.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const root = path.resolve(__dirname, '../..');
const sourcePath = path.join(root, 'libbot.js.so');
const outputDir = path.join(root, 'analysis/libbot/unrestricted');
const input = fs.readFileSync(sourcePath);
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
if (hash(input) !== '117bc87d9d7a92fcb4ce45f969fd14933defea0120fe28f172598896c848b064') throw new Error('Unknown source hash');
const marker = Buffer.from('✄\n');
const sourceStart = input.indexOf(marker) + marker.length;
const sourceLength = 225474;
const originalSource = input.subarray(sourceStart, sourceStart + sourceLength).toString('utf8');
const ast = parser.parse(originalSource, { sourceType: 'module' });
let avatarPath, declarationPath;
traverse(ast, {
  ObjectMethod(p) { if (t.isStringLiteral(p.node.key, { value: 'avatar.js' })) avatarPath = p; },
  VariableDeclarator(p) { if (t.isIdentifier(p.node.id, { name: 'require_avatar' })) declarationPath = p.parentPath; }
});
if (!avatarPath || !declarationPath) throw new Error('Missing avatar module');
const removals = [];
const removePaths = new Set();
// Remove the local LICENSE_KEY/STATUS age scan while retaining Unity background setup.
avatarPath.traverse({ VariableDeclarator(p) {
  const name = p.node.id.name;
  if (name === '_0x2998fa') removePaths.add(p.findParent(q => q.isIfStatement()));
  if (['_0x2ca76a', '_0x2e424f'].includes(name)) removePaths.add(p.parentPath);
  if (name === '_0x3cfd91') removePaths.add(p.findParent(q => q.isTryStatement()));
}, ExpressionStatement(p) {
  if (t.isLogicalExpression(p.node.expression) && t.isIdentifier(p.node.expression.left, { name: '_0x2e424f' })) removePaths.add(p);
} });
if (removePaths.size !== 5 || [...removePaths].some(p => !p)) throw new Error('Unexpected scan/blacklist structure');
for (const p of removePaths) {
  removals.push({ type: p.node.type, original_bundle_line: p.node.loc.start.line + 4 });
  p.remove();
}
avatarPath.scope.crawl();
const flags = new Map();
avatarPath.traverse({ VariableDeclarator(p) {
  const name = p.node.id.name;
  if (['_0x29a5e9', '_0x2f6780'].includes(name)) {
    flags.set(name, p.scope.getBinding(name));
    p.get('init').replaceWith(t.booleanLiteral(false));
  }
  if (['_0x335d3b', '_0x535564', '_0x1d127d'].includes(name)) p.get('init').replaceWith(t.booleanLiteral(true));
} });
if (flags.size !== 2) throw new Error('Missing flag bindings');
let readsRemoved = 0;
avatarPath.traverse({ ReferencedIdentifier(p) {
  if (flags.has(p.node.name) && p.scope.getBinding(p.node.name) === flags.get(p.node.name)) {
    p.replaceWith(t.booleanLiteral(false)); readsRemoved++;
  }
} });
function truth(p) {
  if (p.isBooleanLiteral()) return p.node.value;
  if (p.isArrayExpression() && p.node.elements.length === 0) return true;
  if (p.isUnaryExpression({ operator: '!' })) {
    const value = truth(p.get('argument')); return value === undefined ? undefined : !value;
  }
  if (p.isLogicalExpression()) {
    const a = truth(p.get('left')), b = truth(p.get('right'));
    if (p.node.operator === '&&') {
      if (a === false) return false;
      if (a === true) return b;
      if (b === false && p.get('left').isPure()) return false;
    }
    if (p.node.operator === '||') {
      if (a === true) return true;
      if (a === false) return b;
      if (b === true && p.get('left').isPure()) return true;
    }
  }
}
let branchesSimplified = 0;
function booleanContext(p) {
  const parent = p.parentPath;
  if (parent.isIfStatement() || parent.isConditionalExpression()) return parent.get('test') === p || parent.node.test === p.node;
  if (parent.isUnaryExpression({ operator: '!' })) return true;
  if (parent.isLogicalExpression()) return booleanContext(parent);
  return false;
}
avatarPath.traverse({
  LogicalExpression: { exit(p) {
    const a = truth(p.get('left')), b = truth(p.get('right'));
    if (a !== undefined) {
      const keepRight = p.node.operator === '&&' ? a : !a;
      p.replaceWith(keepRight ? t.cloneNode(p.node.right, true) : t.cloneNode(p.node.left, true));
      branchesSimplified++; return;
    }
    if (booleanContext(p) && ((p.node.operator === '&&' && b === true) || (p.node.operator === '||' && b === false))) {
      p.replaceWith(t.cloneNode(p.node.left, true)); branchesSimplified++;
    }
  } },
  IfStatement: { exit(p) {
    const result = truth(p.get('test'));
    if (result === undefined) return;
    const chosen = result ? p.node.consequent : p.node.alternate;
    p.replaceWith(chosen ? t.cloneNode(chosen, true) : t.emptyStatement()); branchesSimplified++;
  } },
  ConditionalExpression: { exit(p) {
    const result = truth(p.get('test'));
    if (result === undefined) return;
    p.replaceWith(t.cloneNode(result ? p.node.consequent : p.node.alternate, true)); branchesSimplified++;
  } }
});
avatarPath.scope.crawl();
avatarPath.traverse({ ReferencedIdentifier(p) {
  if (flags.has(p.node.name)) throw new Error('Gate references remain: ' + p.node.name);
} });
const exportNode = ast.program.body.find(n => t.isExportDefaultDeclaration(n));
const moduleText = generate(t.file(t.program([declarationPath.node, exportNode])), { comments: false, compact: true }).code;
const prefix = Buffer.from(originalSource.slice(0, declarationPath.node.start), 'utf8');
const moduleBytes = Buffer.from(moduleText + '\n', 'utf8');
const padding = sourceLength - prefix.length - moduleBytes.length - 1;
if (padding < 0) throw new Error('Transformed module exceeds fixed entry size');
const payload = Buffer.concat([prefix, moduleBytes, Buffer.alloc(padding, 32), Buffer.from('\n')]);
parser.parse(payload.toString('utf8'), { sourceType: 'module' });
const output = Buffer.concat([input.subarray(0, sourceStart), payload, input.subarray(sourceStart + sourceLength)]);
if (input.length !== output.length) throw new Error('Bundle size changed');
if (!input.subarray(sourceStart + sourceLength).equals(output.subarray(sourceStart + sourceLength))) throw new Error('Map changed');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'libbot.js.so'), output);
const manifest = {
  source_sha256: hash(input), output_sha256: hash(output), bytes: output.length,
  original_js_bytes: sourceLength, rewritten_js_bytes: payload.length,
  preserved_bridge_prefix_bytes: prefix.length,
  removed_scan_statements: removals, gate_reads_removed: readsRemoved,
  branches_simplified: branchesSimplified, changed_bytes: [...output].filter((v, i) => v !== input[i]).length,
  default_flags: { _0x29a5e9: false, _0x2f6780: false, _0x335d3b: true, _0x535564: true, _0x1d127d: true },
  vip_conditions_removed_locally: true, normal_bait_ticket_purchases_preserved: true,
  source_map_note: 'Original map bytes retained; mappings for the regenerated bot module are not accurate. Bridge prefix is unchanged.',
  runtime_tested: false
};
fs.writeFileSync(path.join(outputDir, 'libbot-patch.json'), JSON.stringify(manifest, null, 2) + '\n');
if (!fs.readFileSync(sourcePath).equals(input)) throw new Error('Original input changed');
console.log(JSON.stringify(manifest, null, 2));
