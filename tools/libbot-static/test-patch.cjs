#!/usr/bin/env node
'use strict';

// These tests parse the bundle; they never run the extracted JavaScript.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const root = path.resolve(__dirname, '../..');
const sourcePath = path.join(root, 'libbot.js.so');
const outputPath = path.join(root, 'analysis/libbot/patched/libbot.js.so');
const patcher = path.join(__dirname, 'patch-flags.py');
const source = fs.readFileSync(sourcePath);
const output = fs.readFileSync(outputPath);
const digest = b => crypto.createHash('sha256').update(b).digest('hex');
const originalHash = '117bc87d9d7a92fcb4ce45f969fd14933defea0120fe28f172598896c848b064';
const edits = [
  { name: '_0x29a5e9', offset: 0x24EE2, old: '![]  ', next: 'false', value: false },
  { name: '_0x335d3b', offset: 0x24F3E, old: '!![]', next: 'true', value: true },
  { name: '_0x535564', offset: 0x24F6C, old: '!![]', next: 'true', value: true },
  { name: '_0x1d127d', offset: 0x24F9A, old: '![] ', next: 'true', value: true }
];
function unpack(b) {
  assert.ok(b.subarray(0, 5).equals(Buffer.from('📦\n')));
  const marker = Buffer.from('✄\n');
  const end = b.indexOf(marker);
  const entries = b.subarray(5, end).toString('utf8').trim().split('\n').map(line => {
    const match = /^(\d+) (\/[^\r\n]+)$/.exec(line);
    assert.ok(match);
    return { size: Number(match[1]), name: match[2] };
  });
  let cursor = end + marker.length;
  const files = new Map();
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    files.set(entry.name, b.subarray(cursor, cursor + entry.size));
    cursor += entry.size;
    if (i < entries.length - 1) {
      const boundary = Buffer.from('\n✄\n');
      assert.deepEqual(b.subarray(cursor, cursor + boundary.length), boundary);
      cursor += boundary.length;
    }
  }
  assert.equal(cursor, b.length);
  return { entries, files };
}
function boolValue(node) {
  if (node.type === 'BooleanLiteral') return node.value;
  if (node.type === 'UnaryExpression' && node.operator === '!') {
    if (node.argument.type === 'ArrayExpression' && node.argument.elements.length === 0) return false;
    return !boolValue(node.argument);
  }
  throw new Error('Unsupported initializer AST: ' + node.type);
}
function run(input, out) {
  return spawnSync('python3', [patcher, input, out], { encoding: 'utf8', timeout: 10000 });
}
let tests = 0;
function pass(label) { tests++; console.log('PASS ' + label); }
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'libbot-flag-patch-test-'));
try {
  assert.equal(digest(source), originalHash);
  const expected = Buffer.from(source);
  for (const edit of edits) {
    assert.equal(source.subarray(edit.offset, edit.offset + edit.old.length).toString('ascii'), edit.old);
    assert.equal(edit.old.length, edit.next.length);
    Buffer.from(edit.next).copy(expected, edit.offset);
  }
  assert.deepEqual(output, expected);
  assert.equal(output.length, 356749);
  assert.equal([...output].filter((value, i) => value !== source[i]).length, 17);
  const manifest = JSON.parse(fs.readFileSync(path.join(path.dirname(outputPath), 'patch.json'), 'utf8'));
  assert.equal(manifest.output_sha256, digest(output));
  assert.equal(manifest.source_sha256, originalHash);
  pass('only 17 documented bytes changed; copy has the recorded hash');

  const before = unpack(source), after = unpack(output);
  assert.deepEqual(before.entries, after.entries);
  assert.equal(after.files.get('/avatar.js').length, 225474);
  assert.equal(after.files.get('/avatar.js.map').length, 131221);
  assert.deepEqual(before.files.get('/avatar.js.map'), after.files.get('/avatar.js.map'));
  JSON.parse(after.files.get('/avatar.js.map').toString('utf8'));
  const ast = parser.parse(after.files.get('/avatar.js').toString('utf8'), { sourceType: 'module' });
  let functions = 0;
  traverse(ast, { Function() { functions++; } });
  assert.equal(functions, 717);
  pass('bundle lengths/source map preserved; patched JavaScript parses');

  const desired = new Map(edits.map(e => [e.name, e.value]));
  desired.set('_0x2f6780', false);
  const seen = new Map();
  const offCommands = new Set();
  traverse(ast, {
    VariableDeclarator(p) {
      const name = p.node.id.name;
      if (!desired.has(name)) return;
      assert.equal(boolValue(p.node.init), desired.get(name), name);
      seen.set(name, (seen.get(name) || 0) + 1);
    },
    AssignmentExpression(p) {
      const name = p.node.left.name;
      if (['_0x335d3b', '_0x535564', '_0x1d127d'].includes(name) && !boolValue(p.node.right)) offCommands.add(name);
    }
  });
  assert.equal(seen.size, 5);
  for (const count of seen.values()) assert.equal(count, 1);
  assert.equal(offCommands.size, 3);
  pass('desired initial flags verified; purchase flag false and off assignments preserved');

  const tempOutput = path.join(temp, 'copy.so');
  const first = run(sourcePath, tempOutput);
  assert.equal(first.status, 0, first.stderr);
  assert.deepEqual(fs.readFileSync(tempOutput), output);
  const firstManifest = fs.readFileSync(path.join(temp, 'patch.json'));
  const second = run(sourcePath, tempOutput);
  assert.equal(second.status, 0, second.stderr);
  assert.deepEqual(fs.readFileSync(tempOutput), output);
  assert.deepEqual(fs.readFileSync(path.join(temp, 'patch.json')), firstManifest);
  pass('patcher reproduces the delivered copy and is idempotent');

  const wrong = Buffer.from(source);
  wrong[100] ^= 1;
  const wrongPath = path.join(temp, 'wrong-input.so');
  fs.writeFileSync(wrongPath, wrong);
  const wrongRun = run(wrongPath, path.join(temp, 'bad-output.so'));
  assert.notEqual(wrongRun.status, 0);
  assert.match(wrongRun.stderr, /does not match the analyzed file/);
  const overwrite = run(sourcePath, sourcePath);
  assert.notEqual(overwrite.status, 0);
  assert.match(overwrite.stderr, /Refusing to overwrite the original input/);
  pass('unknown input and source-overwrite requests are rejected');

  const protectedPath = path.join(temp, 'protected.so');
  fs.writeFileSync(protectedPath, 'DO_NOT_OVERWRITE');
  const protectedRun = run(sourcePath, protectedPath);
  assert.notEqual(protectedRun.status, 0);
  assert.match(protectedRun.stderr, /Output already exists with different contents/);
  assert.equal(fs.readFileSync(protectedPath, 'utf8'), 'DO_NOT_OVERWRITE');
  assert.equal(digest(fs.readFileSync(sourcePath)), originalHash);
  pass('unrelated output and original input remain unchanged');

  console.log(`\n${tests}/${tests} patch tests passed. No game/Frida code was executed.`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
