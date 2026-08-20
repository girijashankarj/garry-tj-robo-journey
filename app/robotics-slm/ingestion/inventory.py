#!/usr/bin/env python3
"""Inventory existing Robo Journey material for Robotics SLM dataset candidates.

This is deliberately an inventory step, not an automatic training-data importer.
It records provenance, likely vendor/domain, content type, and safety signals so
human review can happen before material enters a training split.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path
from typing import Iterable

ROOT_DEFAULT = Path(__file__).resolve().parents[3]
OUTPUT_DEFAULT = Path(__file__).resolve().parent / "inventory.jsonl"

TEXT_EXTENSIONS = {".md", ".mdx", ".txt", ".json", ".yaml", ".yml", ".ts", ".tsx", ".py", ".karel", ".ls", ".tp"}
SKIP_PARTS = {".git", "node_modules", "dist", "build", ".vite", "coverage"}

VENDOR_RULES = {
    "fanuc": ["fanuc", "handlingtool", "karel", "teach pendant", "tp program", "roboguide"],
    "abb": ["abb", "rapid", "robotstudio"],
    "kuka": ["kuka", "krl", "workvisual", "kuka.sim"],
    "yaskawa": ["yaskawa", "motoman", "inform"],
    "universal-robots": ["universal robots", "ur robot", "urscript", "polyscope"],
    "kawasaki": ["kawasaki robot", "as language"],
    "staubli": ["staubli", "val3"],
    "denso": ["denso robot", "pacscript"],
    "epson": ["epson robot", "spe l+"],
    "omron": ["omron robot", "adept"],
}

DOMAIN_RULES = {
    "programming": ["program", "code", "tp", "karel", "rapid", "krl", "inform", "urscript", "motion"],
    "kinematics": ["kinematic", "joint", "axis", "coordinate", "frame", "tool frame", "user frame"],
    "io-sequencing": ["input", "output", "i/o", "io[", "sequence", "handshake", "interlock"],
    "plc-integration": ["plc", "profinet", "ethernet/ip", "ethernet ip", "fieldbus", "modbus", "opc ua"],
    "machine-tending": ["machine tending", "loading", "unloading", "cnc", "chuck", "machine tool"],
    "press-stamping": ["press", "stamping", "stamp", "die", "sheet metal"],
    "welding": ["welding", "welder", "arc weld", "spot weld", "seam"],
    "pick-place": ["pick and place", "pick-and-place", "gripper", "vacuum", "pick", "place"],
    "palletising": ["pallet", "palletising", "palletizing"],
    "vision": ["vision", "camera", "inspection", "calibration", "opencv", "machine vision"],
    "safety": ["safety", "e-stop", "emergency stop", "fence", "interlock", "risk assessment", "safe"],
    "commissioning": ["commission", "commissioning", "mastering", "calibration", "startup", "setup"],
    "maintenance": ["maintenance", "alarm", "fault", "diagnostic", "troubleshoot", "preventive"],
    "simulation-olp": ["offline programming", "olp", "simulation", "robotstudio", "roboguide", "sim"],
    "fundamentals": ["robotics", "robot arm", "six axis", "6-axis", "degrees of freedom", "end effector"],
}

HIGH_RISK_TERMS = [
    "safety", "e-stop", "emergency stop", "mastering", "calibration", "motion enable",
    "servo", "override", "collision", "fence", "interlock", "bypass", "disable safety",
]


def iter_files(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        if any(part in SKIP_PARTS for part in path.parts):
            continue
        if "app/robotics-slm" in path.as_posix():
            continue
        yield path


def matches(text: str, rules: dict[str, list[str]]) -> list[str]:
    lowered = text.lower()
    return [name for name, terms in rules.items() if any(term in lowered for term in terms)]


def vendor_from_path(path: Path) -> str | None:
    parts = {part.lower() for part in path.parts}
    for vendor in VENDOR_RULES:
        if vendor in parts or vendor.replace("-", "_") in parts:
            return vendor
    return None


def classify(path: Path, text: str) -> tuple[str, str | None, list[str], str]:
    combined = f"{path.as_posix()}\n{text}"
    vendor = vendor_from_path(path)
    vendor_hits = matches(combined, VENDOR_RULES)
    domain_hits = matches(combined, DOMAIN_RULES)
    if vendor is None and len(vendor_hits) == 1:
        vendor = vendor_hits[0]

    if vendor:
        knowledge_type = "vendor_specific"
    elif domain_hits:
        knowledge_type = "common"
    else:
        knowledge_type = "unknown"

    risk = "high-risk" if any(term in combined.lower() for term in HIGH_RISK_TERMS) else "normal"
    return knowledge_type, vendor, domain_hits, risk


def inventory(root: Path) -> list[dict]:
    rows: list[dict] = []
    for path in sorted(iter_files(root)):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        relative = path.relative_to(root).as_posix()
        knowledge_type, vendor, domains, risk = classify(path, text)
        content_hash = hashlib.sha256(text.encode("utf-8")).hexdigest()
        rows.append({
            "id": f"repo-{content_hash[:16]}",
            "source_path": relative,
            "source_type": "repo",
            "source_ref": relative,
            "license": None,
            "knowledge_type": knowledge_type,
            "vendor": vendor,
            "candidate_domains": domains,
            "risk": risk,
            "extension": path.suffix.lower(),
            "bytes": len(text.encode("utf-8")),
            "sha256": content_hash,
            "review_status": "unreviewed",
            "training_eligible": False,
        })
    return rows


def main() -> None:
    parser = argparse.ArgumentParser(description="Inventory robotics content for SLM dataset review")
    parser.add_argument("--root", type=Path, default=ROOT_DEFAULT, help="Repository root")
    parser.add_argument("--output", type=Path, default=OUTPUT_DEFAULT, help="JSONL output path")
    args = parser.parse_args()

    rows = inventory(args.root)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")

    summary = {
        "files": len(rows),
        "vendor_specific": sum(r["knowledge_type"] == "vendor_specific" for r in rows),
        "common": sum(r["knowledge_type"] == "common" for r in rows),
        "unknown": sum(r["knowledge_type"] == "unknown" for r in rows),
        "high_risk": sum(r["risk"] == "high-risk" for r in rows),
        "training_eligible": 0,
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
