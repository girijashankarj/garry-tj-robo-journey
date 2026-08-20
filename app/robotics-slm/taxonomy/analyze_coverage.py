#!/usr/bin/env python3
"""Analyze planned taxonomy coverage against reviewed dataset examples.

Expected dataset JSONL fields: domain, vendor, task, validation.status.
The script reports planned slots, approved examples, coverage percentage and
priority gaps. It is intentionally conservative: only approved/verified data
counts as coverage.
"""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def approved(row: dict) -> bool:
    validation = row.get("validation") or row.get("review") or {}
    status = validation.get("status")
    return status in {"approved", "verified"} or (
        row.get("review_status") in {"reviewed", "verified"} and row.get("training_eligible") is True
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--taxonomy", type=Path, default=Path(__file__).with_name("taxonomy.json"))
    parser.add_argument("--matrix", type=Path, default=Path(__file__).with_name("coverage-matrix.jsonl"))
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path(__file__).with_name("coverage-report.json"))
    args = parser.parse_args()

    matrix = read_jsonl(args.matrix)
    dataset = [row for row in read_jsonl(args.dataset) if approved(row)]

    counts = Counter()
    for row in dataset:
        domain = row.get("domain")
        vendor = row.get("vendor")
        task = row.get("task")
        if domain and task:
            counts[("common", domain, task)] += 1
        if vendor and domain and task:
            counts[("vendor", vendor, domain, task)] += 1

    gaps = []
    covered = 0
    planned_examples = 0
    for slot in matrix:
        key = ("common", slot["domain"], slot["task"]) if slot["scope"] == "common" else ("vendor", slot["vendor"], slot["domain"], slot["task"])
        actual = counts.get(key, 0)
        target = slot.get("target_examples", 0)
        planned_examples += target
        coverage = min(actual / target, 1.0) if target else 0.0
        if actual > 0:
            covered += 1
        if actual < target:
            gaps.append({**slot, "approved_examples": actual, "missing_examples": max(target - actual, 0), "coverage_percent": round(coverage * 100, 2)})

    gaps.sort(key=lambda row: (-row["missing_examples"], row["scope"], row["vendor"] or "", row["domain"], row["task"]))
    report = {
        "approved_dataset_rows": len(dataset),
        "taxonomy_slots": len(matrix),
        "slots_with_data": covered,
        "slot_coverage_percent": round(covered / len(matrix) * 100, 2) if matrix else 0,
        "planned_example_slots": planned_examples,
        "approved_example_count": len(dataset),
        "top_gaps": gaps[:100],
        "notes": [
            "Only approved/verified examples count toward coverage.",
            "Coverage means presence against the planning target, not model quality.",
            "Safety-critical coverage must be evaluated separately before release.",
        ],
    }

    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({k: report[k] for k in ("approved_dataset_rows", "taxonomy_slots", "slots_with_data", "slot_coverage_percent", "planned_example_slots")}, indent=2))


if __name__ == "__main__":
    main()
