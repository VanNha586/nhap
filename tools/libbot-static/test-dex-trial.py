#!/usr/bin/env python3
"""Static verification; Androguard disassembles instructions, never runs them."""
import hashlib
import importlib.util
from pathlib import Path
import struct
import zlib
from loguru import logger
logger.disable("androguard")
from androguard.core.dex import DEX

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "analysis/libbot/unrestricted"
original = (ROOT / "classes3.dex").read_bytes()
patched = (OUT / "classes3.dex").read_bytes()
spec = importlib.util.spec_from_file_location("patch_dex_trial", Path(__file__).with_name("patch-dex-trial.py"))
patcher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(patcher)
tests = 0


def passed(label):
    global tests
    tests += 1
    print("PASS", label)


assert hashlib.sha256(original).hexdigest() == patcher.EXPECTED
assert patched == patcher.build(original)
changed = {i for i, (a, b) in enumerate(zip(original, patched)) if a != b}
assert changed <= set(range(8, 32)) | {0x29E10F}
assert 0x29E10F in changed and len(patched) == len(original) == 4486288
passed("exact instruction change plus integrity header; original hash and file length")
assert patched[0x29E10E:0x29E110] == bytes.fromhex("12 04")
assert hashlib.sha1(patched[32:]).digest() == patched[12:32]
assert zlib.adler32(patched[12:]) & 0xFFFFFFFF == struct.unpack_from("<I", patched, 8)[0]
passed("patched DEX SHA-1 signature and Adler-32 checksum valid")
# The uploaded original has stale integrity values: repair only this in-memory audit copy.
audit = bytearray(original)
audit[12:32] = hashlib.sha1(audit[32:]).digest()
struct.pack_into("<I", audit, 8, zlib.adler32(audit[12:]) & 0xFFFFFFFF)
before, after = DEX(bytes(audit)), DEX(patched)
assert len(before.get_classes()) == len(after.get_classes()) == 2864
assert before.get_strings() == after.get_strings()


def methods(dex):
    return {(m.get_class_name(), m.get_name(), m.get_descriptor()): m for c in dex.get_classes() for m in c.get_methods()}


old_methods, new_methods = methods(before), methods(after)
assert old_methods.keys() == new_methods.keys()
target = ("Lcom/TeaM/Avatar/MainActivity;", "launchUnityGame", "(Z)V")
for key, method in old_methods.items():
    old_code, new_code = method.get_code(), new_methods[key].get_code()
    assert bool(old_code) == bool(new_code)
    if old_code:
        assert old_code.get_off() == new_code.get_off()
        assert old_code.get_registers_size() == new_code.get_registers_size()
        if key != target:
            assert old_code.get_bc().get_raw() == new_code.get_bc().get_raw(), key
passed("class/string/method structure and all other method bytecode preserved")
a = list(old_methods[target].get_instructions_idx())
b = list(new_methods[target].get_instructions_idx())
assert len(a) == len(b) == 25
for (off1, ins1), (off2, ins2) in zip(a, b):
    assert off1 == off2 and ins1.get_name() == ins2.get_name()
    if off1 == 0x1E:
        assert ins1.get_output() == "v4, 1" and ins2.get_output() == "v4, 0"
    else:
        assert bytes(ins1.get_raw()) == bytes(ins2.get_raw())
assert any(off == 0x1A and i.get_name() == "if-eqz" for off, i in b)
assert any(off == 0x2E and "startUnityActivity" in i.get_output() for off, i in b)
assert any(off == 0x62 and "checkLicenseApi" in i.get_output() for off, i in b)
free_listener = ("Lcom/TeaM/Avatar/MainActivity$$ExternalSyntheticLambda9;", "onClick", "(Landroid/view/View;)V")
assert any("lambda$setupListeners$2" in i.get_output() for i in new_methods[free_listener].get_instructions())
free_callback = ("Lcom/TeaM/Avatar/MainActivity;", "lambda$setupListeners$2$com-TeaM-Avatar-MainActivity", "(Landroid/view/View;)V")
callback = list(new_methods[free_callback].get_instructions_idx())
assert callback[0][1].get_name() == "const/4" and callback[0][1].get_output() == "v1, 1"
assert "launchUnityGame" in callback[1][1].get_output()
passed("free-button callback and branch selection unchanged; IS_TRIAL write false; licensed API path unchanged")
try:
    patcher.build(original[:-1])
except ValueError:
    pass
else:
    raise AssertionError("Unknown source accepted")
assert (ROOT / "classes3.dex").read_bytes() == original
passed("unknown input rejected and original file unchanged")
for suffix, instructions in [("before", a), ("after", b)]:
    text = "Lcom/TeaM/Avatar/MainActivity;->launchUnityGame(Z)V\n"
    text += "\n".join(f"{off:04x} {i.get_name():24} {i.get_output()}".rstrip() for off, i in instructions) + "\n"
    (OUT / f"launchUnityGame.{suffix}.txt").write_text(text)
print(f"\n{tests}/{tests} static DEX tests passed. No Dalvik/app code was executed.")
