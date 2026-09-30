#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const root = path.resolve(__dirname, '../..');
const dir = path.join(root, 'analysis/libbot/unrestricted');
const original = fs.readFileSync(path.join(root, 'libbot.js.so'));
const output = fs.readFileSync(path.join(dir, 'libbot.js.so'));
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'libbot-patch.json')));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const start = original.indexOf(Buffer.from('✄\n')) + Buffer.byteLength('✄\n');
const source = b => b.subarray(start, start + 225474).toString('utf8');
let tests = 0;
const pass = label => { tests++; console.log('PASS ' + label); };
assert.equal(hash(original), manifest.source_sha256);
assert.equal(hash(output), manifest.output_sha256);
assert.equal(output.length, 356749);
assert.deepEqual(output.subarray(0, start), original.subarray(0, start));
assert.deepEqual(output.subarray(start + 225474), original.subarray(start + 225474));
assert.deepEqual(output.subarray(start, start + manifest.preserved_bridge_prefix_bytes), original.subarray(start, start + manifest.preserved_bridge_prefix_bytes));
pass('hashes, bundle headers, bridge prefix and source-map bytes preserved');
const before = parser.parse(source(original), { sourceType: 'module' });
const after = parser.parse(source(output), { sourceType: 'module' });
const desired = { _0x29a5e9: false, _0x2f6780: false, _0x335d3b: true, _0x535564: true, _0x1d127d: true };
const seen = new Set();
traverse(after, {
  VariableDeclarator(p) {
    if (Object.hasOwn(desired, p.node.id.name)) {
      assert.equal(p.node.init.type, 'BooleanLiteral');
      assert.equal(p.node.init.value, desired[p.node.id.name]); seen.add(p.node.id.name);
    }
  },
  ReferencedIdentifier(p) { assert.ok(!['_0x29a5e9', '_0x2f6780'].includes(p.node.name), 'VIP read still exists'); }
});
assert.equal(seen.size, 5);
pass('defaults verified and all trial/invalid-license flag reads removed');
const code = generate(after, { compact: true, comments: false }).code;
for (const id of ['_0x2998fa', '_0x1ba351', '_0x2ca76a', '_0x3cfd91', '_0x2e424f']) assert.ok(!code.includes(id));
assert.ok(!code.includes('BLACKLISTED_USERNAMES'));
pass('license age scan and blacklist logic removed');
function hooks(ast) {
  const result = [];
  traverse(ast, { CallExpression(p) {
    const c = p.node.callee;
    if (c.type === 'MemberExpression' && c.object.name === 'Interceptor' && p.findParent(q => q.isObjectMethod() && q.node.key.value === 'avatar.js')) result.push(generate(p.node.arguments[0], { compact: true }).code);
  } });
  return result;
}
assert.deepEqual(hooks(before), hooks(after));
assert.equal(hooks(after).length, 18);
function functions(ast) {
  const result = new Map();
  traverse(ast, { Function(p) {
    const name = p.node.id?.name || (p.parentPath.isVariableDeclarator() ? p.parentPath.node.id.name : null);
    if (name) result.set(name, generate(p.node, { compact: true, comments: false }).code);
  } });
  return result;
}
const oldFns = functions(before), newFns = functions(after);
for (const name of ['_0x74df60','_0x38515e','_0x385fac','_0x4314e6','_0x2bf4ba','_0x17ca5e','_0x449de4','_0x3c4d04','_0x55bf4a','_0x2e1e09','_0x19bea8','_0x35fda9','_0x476835','_0x5bb368','_0x5834a4','_0x21db8b','_0x108c70','_0x1df3df','_0x28d3f9','_0x500834','_0xec5551','_0x403d54','_0x18ddcd','_0x32ccbf','_0xfcca0f']) {
  assert.equal(newFns.get(name), oldFns.get(name), 'Unrelated helper changed: ' + name);
}
pass('all 18 hooks and 25 unrelated helpers, including event and game-state logic, preserved');
const purchase = newFns.get('_0x2763b5');
assert.ok(!purchase.includes('<100'));
assert.ok(purchase.includes('_0x566dc8(606),3'));
assert.ok(purchase.includes('_0x519b9a,_0x5f2641,_0x55a468'));
const off = new Set();
traverse(after, { AssignmentExpression(p) {
  const n = p.node;
  if (['_0x335d3b','_0x535564','_0x1d127d'].includes(n.left.name) && n.right.type === 'UnaryExpression' && n.right.operator === '!' && n.right.argument.type === 'ArrayExpression') off.add(n.left.name);
} });
assert.equal(off.size, 3);
pass('normal purchasing and off commands kept; repeated-purchase trap removed');
assert.equal(newFns.get('_0x2c4e'), oldFns.get('_0x2c4e'));
assert.equal(newFns.get('_0x4b48'), oldFns.get('_0x4b48'));
assert.deepEqual(fs.readFileSync(path.join(root, 'libbot.js.so')), original);
pass('obfuscation table/decoder and original input unchanged');
console.log(`\n${tests}/${tests} local-gate tests passed. Input JavaScript was not executed.`);
