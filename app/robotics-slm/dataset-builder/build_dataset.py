#!/usr/bin/env python3
"""Build canonical JSONL candidates from reviewed inventory records.

This stage is intentionally conservative: it never promotes unreviewed or
unverified source material into the training set.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        raise FileNotFoundError(path)
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def eligible(row: dict) -> bool:
    return bool(row.get("training_eligible")) and row.get("review_status") in {"reviewed", "verified"}


def to_candidate(row: dict) -> dict:
    source = row["source_path"]
    domains = row.get("candidate_domains") or ["fundamentals"]
    vendor = row.get("vendor")

    return {
        "id": row["id"],
        "domain": domains[0],
        "vendor": vendor,
        "robot_family": None,
        "task": "knowledge_extraction",
        "difficulty": "intermediate",
        "input": f"Explain the validated robotics knowledge contained in source: {source}",
        "output": "REVIEW_REQUIRED: source content must be transformed into a validated answer before training.",
        "reasoning_summary": None,
        "validation": {
            "status": "unverified",
            "reviewer": None,
            "notes": "Candidate generated from an approved source; answer still requires human authoring/review.",
        },
        "provenance": {
            "source_type": row.get("source_type", "repo"),
            "source_ref": source,
            "license": row.get("license"),
        },
        "safety": row.get("risk", "normal"),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--inventory", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    inventory = read_jsonl(args.inventory)
    candidates = [to_candidate(row) for row in inventory if eligible(row)]

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as handle:
        for candidate in candidates:
            handle.write(json.dumps(candidate, ensure_ascii=False) + "\n")

    print(json.dumps({"inventory": len(inventory), "eligible": len(candidates), "output": str(args.output)}, indent=2))


if __name__ == "__main__":
    main()
