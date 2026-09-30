#!/usr/bin/env python3
"""Patch only the free-path IS_TRIAL write; never execute Dalvik code."""
import hashlib
import json
from pathlib import Path
import struct
import zlib

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "classes3.dex"
DEST = ROOT / "analysis/libbot/unrestricted/classes3.dex"
EXPECTED = "94ac3746980ad99aeb70c4d3be26c4c42538a230fab369ec07daa77a0926a2d7"
CODE_OFFSET = 0x29E0E0
INSTRUCTION_OFFSET = CODE_OFFSET + 16 + 0x1E


def digest(data):
    return hashlib.sha256(data).hexdigest()


def build(original):
    if digest(original) != EXPECTED:
        raise ValueError("Unknown input hash: refusing to guess DEX offsets")
    if original[:8] != b"dex\n035\x00" or struct.unpack_from("<I", original, 32)[0] != len(original):
        raise ValueError("Invalid DEX magic or declared file size")
    if original[INSTRUCTION_OFFSET:INSTRUCTION_OFFSET + 2] != bytes.fromhex("12 14"):
        raise ValueError("Expected const/4 v4, 1 instruction not found")
    patched = bytearray(original)
    # 11n encoding: 0x12 is const/4; high nibble is literal, low nibble register.
    patched[INSTRUCTION_OFFSET + 1] = 0x04  # const/4 v4, 0
    patched[12:32] = hashlib.sha1(patched[32:]).digest()
    struct.pack_into("<I", patched, 8, zlib.adler32(patched[12:]) & 0xFFFFFFFF)
    patched = bytes(patched)
    assert len(patched) == len(original)
    assert original[32:INSTRUCTION_OFFSET + 1] == patched[32:INSTRUCTION_OFFSET + 1]
    assert original[INSTRUCTION_OFFSET + 2:] == patched[INSTRUCTION_OFFSET + 2:]
    assert hashlib.sha1(patched[32:]).digest() == patched[12:32]
    assert zlib.adler32(patched[12:]) & 0xFFFFFFFF == struct.unpack_from("<I", patched, 8)[0]
    return patched


def main():
    original = SOURCE.read_bytes()
    patched = build(original)
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_bytes(patched)
    manifest = {
        "source_sha256": digest(original), "output_sha256": digest(patched),
        "bytes": len(patched),
        "method": "Lcom/TeaM/Avatar/MainActivity;->launchUnityGame(Z)V",
        "code_item_offset_hex": hex(CODE_OFFSET),
        "instruction_offset_hex": hex(INSTRUCTION_OFFSET),
        "changed_instruction_byte_offset_hex": hex(INSTRUCTION_OFFSET + 1),
        "old_instruction_hex": "12 14", "new_instruction_hex": "12 04",
        "before": "const/4 v4, 1", "after": "const/4 v4, 0",
        "effect": "Free path writes IS_TRIAL=false; its branch selection and startUnityActivity call are unchanged.",
        "source_sha1_valid": hashlib.sha1(original[32:]).digest() == original[12:32],
        "source_adler32_valid": zlib.adler32(original[12:]) & 0xFFFFFFFF == struct.unpack_from("<I", original, 8)[0],
        "output_sha1_valid": True, "output_adler32_valid": True,
        "changed_bytes": sum(a != b for a, b in zip(original, patched)),
        "allowed_change_regions": ["0x8..0x1f: DEX integrity header", hex(INSTRUCTION_OFFSET + 1)],
        "licensed_path_api_unchanged": True, "runtime_tested": False,
    }
    (DEST.parent / "dex-patch.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    assert SOURCE.read_bytes() == original
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
