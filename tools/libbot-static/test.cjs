#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const root = path.resolve(__dirname, '../..');
const analyzer = path.join(__dirname, 'analyze.cjs');
const inputPath = path.join(root, 'libbot.js.so');
const original = fs.readFileSync(inputPath);
const digest = b => crypto.createHash('sha256').update(b).digest('hex');
const beforeHash = digest(original);
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'libbot-static-test-'));
function run(input, output) {
  return spawnSync(process.execPath, [analyzer, input, output], { encoding: 'utf8', timeout: 15000, maxBuffer: 1024 * 1024 });
}
function countFunctions(code, sourceType) {
  const ast = parser.parse(code, { sourceType });
  let count = 0;
  traverse(ast, { Function() { count++; } });
  return count;
}
function makeBundle(source, map) {
  const src = Buffer.from(source);
  return Buffer.concat([
    Buffer.from(`📦\n${src.length} /avatar.js\n${map.length} /avatar.js.map\n✄\n`),
    src, Buffer.from('\n✄\n'), map
  ]);
}
let tests = 0;
function pass(label) { tests++; console.log('PASS ' + label); }
try {
  const out = path.join(temp, 'baseline');
  const result = run(inputPath, out);
  assert.equal(result.status, 0, result.stderr);
  const facts = JSON.parse(fs.readFileSync(path.join(out, 'facts.json'), 'utf8'));
  const source = fs.readFileSync(path.join(out, 'avatar.bundle.original.js'), 'utf8');
  const map = fs.readFileSync(path.join(out, 'avatar.js.map'));
  assert.equal(beforeHash, '117bc87d9d7a92fcb4ce45f969fd14933defea0120fe28f172598896c848b064');
  assert.equal(facts.sha256, beforeHash);
  assert.equal(Buffer.byteLength(source), 225474);
  assert.equal(map.length, 131221);
  assert.deepEqual(makeBundle(source, map), original);
  assert.equal(facts.sourceMap.hasSourcesContent, false);
  pass('byte-exact unpacking and SHA-256');

  assert.equal(facts.decoder.offset, 374);
  assert.equal(facts.decoder.rotations, 122);
  assert.equal(facts.decoder.tableSize, 269);
  assert.equal(facts.decoder.replacedCalls, 959);
  assert.equal(facts.decoder.usedTableEntries, 250);
  assert.equal(facts.decoder.unusedTableEntries, 19);
  assert.equal(facts.strings.uniqueBot, 320);
  assert.equal(facts.strings.uniqueBundle, 763);
  const full = fs.readFileSync(path.join(out, 'avatar.decoded.js'), 'utf8');
  const bot = fs.readFileSync(path.join(out, 'avatar.bot.decoded.js'), 'utf8');
  assert.ok(bot.includes('"/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml"'));
  assert.ok(bot.includes('"1 hộp bánh"'));
  assert.ok(bot.includes('"zoneon"'));
  assert.ok(bot.includes('.method("onCaCanCau")'));
  assert.ok(!full.includes('_0x4b48('));
  assert.ok(!full.includes('_0x2c4e('));
  assert.ok(!bot.includes('!![]'));
  pass('all constant string lookups and readable Unicode');

  assert.equal(countFunctions(source, 'module'), 717);
  assert.equal(countFunctions(full, 'module'), 713);
  assert.equal(countFunctions(bot, 'script'), 144);
  assert.equal(facts.transformedCounts.botNamedHelpers, 31);
  assert.equal(facts.transformedCounts.bridgeAndBundler, 568);
  assert.equal(facts.hooks.length, 18);
  assert.equal(facts.hooks[0].target, 'TField.setText');
  assert.equal(facts.hooks[1].target, 'Canvas.addFlyText');
  assert.equal(facts.referencedGameMethods.uniqueNames, 46);
  pass('independent AST counts and hook target resolution');

  const secondOut = path.join(temp, 'repeat');
  const repeated = run(inputPath, secondOut);
  assert.equal(repeated.status, 0, repeated.stderr);
  for (const name of fs.readdirSync(out)) {
    assert.deepEqual(fs.readFileSync(path.join(out, name)), fs.readFileSync(path.join(secondOut, name)), name);
  }
  pass('deterministic generated artifacts');

  const injectionPoint = '    init_dist();\n    function _0x4b48';
  assert.ok(source.includes(injectionPoint));
  const sentinel = source.replace(injectionPoint, '    init_dist();\n    throw new Error("PAYLOAD_EXECUTION_SENTINEL");\n    function _0x4b48');
  const sentinelPath = path.join(temp, 'sentinel.bundle');
  fs.writeFileSync(sentinelPath, makeBundle(sentinel, map));
  const sentinelRun = run(sentinelPath, path.join(temp, 'sentinel-output'));
  assert.equal(sentinelRun.status, 0, sentinelRun.stderr);
  assert.ok(fs.readFileSync(path.join(temp, 'sentinel-output', 'avatar.bot.decoded.js'), 'utf8').includes('PAYLOAD_EXECUTION_SENTINEL'));
  pass('payload throw is preserved as text, never executed');

  const checksumTarget = '})(_0x2c4e, 985857);';
  assert.ok(source.includes(checksumTarget));
  const badChecksum = path.join(temp, 'bad-checksum.bundle');
  fs.writeFileSync(badChecksum, makeBundle(source.replace(checksumTarget, '})(_0x2c4e, 985858);'), map));
  const badRun = run(badChecksum, path.join(temp, 'bad-checksum-output'));
  assert.notEqual(badRun.status, 0);
  assert.match(badRun.stderr, /Checksum did not converge/);
  pass('bad checksum terminates after at most one table cycle');

  const forbiddenPath = path.join(temp, 'forbidden.bundle');
  const checksumCall = 'parseInt(_0xf58273(435))';
  assert.ok(source.includes(checksumCall));
  fs.writeFileSync(forbiddenPath, makeBundle(source.replace(checksumCall, 'forbidden(_0xf58273(435))'), map));
  const forbiddenRun = run(forbiddenPath, path.join(temp, 'forbidden-output'));
  assert.notEqual(forbiddenRun.status, 0);
  assert.match(forbiddenRun.stderr, /Disallowed checksum AST node/);
  pass('checksum interpreter rejects arbitrary calls');

  const truncatedPath = path.join(temp, 'truncated.bundle');
  fs.writeFileSync(truncatedPath, original.subarray(0, original.length - 10));
  const truncatedRun = run(truncatedPath, path.join(temp, 'truncated-output'));
  assert.notEqual(truncatedRun.status, 0);
  assert.match(truncatedRun.stderr, /Truncated bundle/);
  assert.equal(digest(fs.readFileSync(inputPath)), beforeHash);
  pass('truncated input rejected; original input unchanged');

  console.log(`\n${tests}/${tests} static tests passed. No Frida script or game code was run.`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
