#!/usr/bin/env python3
"""Make a byte-preserving copy with only the four documented initializers changed.

The input is a JavaScript Frida bundle, not an ELF. No input code is executed.
Only the already analyzed SHA-256 is accepted; never overwrite the source.
"""

import argparse
import hashlib
import json
from pathlib import Path
import re

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE_SHA256 = "117bc87d9d7a92fcb4ce45f969fd14933defea0120fe28f172598896c848b064"
DEFAULT_SOURCE = REPO_ROOT / "libbot.js.so"
DEFAULT_OUTPUT = REPO_ROOT / "analysis/libbot/patched/libbot.js.so"
PATCHES = (
    {
        "variable": "_0x29a5e9",
        "role_vi": "Cờ có hành vi kiểu trial (vai trò suy luận từ mã)",
        "offset": 0x24EE2,
        "old": b"![]  ",
        "new": b"false",
        "boolean_before": False,
        "boolean_after": False,
    },
    {
        "variable": "_0x335d3b",
        "role_vi": "Tự chuyển khu",
        "offset": 0x24F3E,
        "old": b"!![]",
        "new": b"true",
        "boolean_before": True,
        "boolean_after": True,
    },
    {
        "variable": "_0x535564",
        "role_vi": "Câu nhanh",
        "offset": 0x24F6C,
        "old": b"!![]",
        "new": b"true",
        "boolean_before": True,
        "boolean_after": True,
    },
    {
        "variable": "_0x1d127d",
        "role_vi": "Xử lý nhiệm vụ thợ câu",
        "offset": 0x24F9A,
        "old": b"![] ",
        "new": b"true",
        "boolean_before": False,
        "boolean_after": True,
    },
)


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def unpack_bundle(data):
    marker = "✄\n".encode()
    if not data.startswith("📦\n".encode()):
        raise ValueError("Not the expected Frida JavaScript bundle")
    end = data.find(marker)
    if end < 0:
        raise ValueError("Bundle header is missing")
    cursor = end + len(marker)
    lines = data[len("📦\n".encode()):end].decode("utf-8").strip().splitlines()
    files = {}
    sizes = {}
    for i, line in enumerate(lines):
        match = re.fullmatch(r"(\d+) (/[^\r\n]+)", line)
        if not match:
            raise ValueError("Invalid bundle entry")
        size, name = int(match[1]), match[2]
        if cursor + size > len(data) or name in files:
            raise ValueError("Truncated or duplicated bundle entry")
        files[name] = data[cursor:cursor + size]
        sizes[name] = size
        cursor += size
        if i < len(lines) - 1:
            boundary = "\n✄\n".encode()
            if data[cursor:cursor + len(boundary)] != boundary:
                raise ValueError("Invalid bundle separator")
            cursor += len(boundary)
    if cursor != len(data):
        raise ValueError("Unexpected trailing bundle data")
    return files, sizes


def apply_patch(original):
    actual = sha256(original)
    if actual != SOURCE_SHA256:
        raise ValueError(
            f"Input SHA-256 {actual} does not match the analyzed file. "
            "Refusing to guess byte offsets."
        )
    before_files, before_sizes = unpack_bundle(original)
    patched = bytearray(original)
    allowed = set()
    for edit in PATCHES:
        offset, old, new = edit["offset"], edit["old"], edit["new"]
        if len(old) != len(new) or original[offset:offset + len(old)] != old:
            raise ValueError(f"Expected bytes do not match for {edit['variable']}")
        allowed.update(range(offset, offset + len(old)))
        patched[offset:offset + len(old)] = new
    patched = bytes(patched)
    changed = {i for i, (a, b) in enumerate(zip(original, patched)) if a != b}
    if len(patched) != len(original) or changed != allowed or len(changed) != 17:
        raise ValueError("Unexpected byte diff")
    if patched[0x24FC8:0x24FCB] != b"![]":
        raise ValueError("The potentially harmful purchase flag must remain false")
    after_files, after_sizes = unpack_bundle(patched)
    if before_sizes != after_sizes or after_sizes != {"/avatar.js": 225474, "/avatar.js.map": 131221}:
        raise ValueError("Bundle entry lengths changed")
    if before_files["/avatar.js.map"] != after_files["/avatar.js.map"]:
        raise ValueError("Source map bytes changed")
    after_files["/avatar.js"].decode("utf-8", errors="strict")
    json.loads(after_files["/avatar.js.map"].decode("utf-8"))
    return patched, after_sizes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", nargs="?", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("output", nargs="?", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    source, output = args.source.resolve(), args.output.resolve()
    manifest_path = output.parent / "patch.json"
    if source in (output, manifest_path.resolve()):
        raise ValueError("Refusing to overwrite the original input")
    original = source.read_bytes()
    patched, entries = apply_patch(original)
    manifest = {
        "source_name": source.name,
        "output_name": output.name,
        "source_sha256": sha256(original),
        "output_sha256": sha256(patched),
        "source_bytes": len(original),
        "output_bytes": len(patched),
        "changed_bytes": 17,
        "entry_byte_lengths": entries,
        "patches": [
            {
                "variable": edit["variable"],
                "role_vi": edit["role_vi"],
                "offset_decimal": edit["offset"],
                "offset_hex": f"0x{edit['offset']:X}",
                "old_hex": edit["old"].hex(" ").upper(),
                "new_hex": edit["new"].hex(" ").upper(),
                "old_ascii": edit["old"].decode("ascii"),
                "new_ascii": edit["new"].decode("ascii"),
                "boolean_before": edit["boolean_before"],
                "boolean_after": edit["boolean_after"],
            }
            for edit in PATCHES
        ],
        "other_bytes_unchanged": True,
        "purchase_flag_0x2f6780_unchanged_false": True,
        "scope": "Initial values only; zoneoff/fastoff/questoff can still turn features off.",
        "runtime_tested": False,
    }
    manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
    if output.exists() and output.read_bytes() != patched:
        raise ValueError("Output already exists with different contents; refusing to overwrite")
    if manifest_path.exists() and manifest_path.read_text(encoding="utf-8") != manifest_text:
        raise ValueError("Patch manifest already exists with different contents; refusing to overwrite")
    output.parent.mkdir(parents=True, exist_ok=True)
    if not output.exists():
        with output.open("xb") as fp:
            fp.write(patched)
    if not manifest_path.exists():
        with manifest_path.open("x", encoding="utf-8") as fp:
            fp.write(manifest_text)
    if source.read_bytes() != original:
        raise ValueError("Source changed while patching; inspect it before using the output")
    print(f"Output: {output}")
    print(f"Bytes: {len(patched)}; changed bytes: 17; original input unchanged")
    print(f"SHA-256: {sha256(patched)}")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError) as exc:
        raise SystemExit(f"Patch refused: {exc}")
