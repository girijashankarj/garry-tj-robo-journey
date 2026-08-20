#!/usr/bin/env python3
"""Generate a coverage matrix of robotics tasks from the taxonomy.

The matrix is a planning manifest. It does not generate training answers.
Each row identifies a knowledge/task combination that should eventually have
validated examples or an explicit reason for being out of scope.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--taxonomy", type=Path, default=Path(__file__).with_name("taxonomy.json"))
    parser.add_argument("--output", type=Path, default=Path(__file__).with_name("coverage-matrix.jsonl"))
    args = parser.parse_args()

    taxonomy = json.loads(args.taxonomy.read_text(encoding="utf-8"))
    rows = []
    for domain in taxonomy["common_domains"]:
        for task in taxonomy["task_types"]:
            rows.append({
                "id": f"common::{domain}::{task}",
                "scope": "common",
                "domain": domain,
                "vendor": None,
                "task": task,
                "status": "planned",
                "target_examples": 25,
            })

    for vendor in taxonomy["vendors"]:
        for domain in taxonomy["common_domains"]:
            for task in taxonomy["task_types"]:
                rows.append({
                    "id": f"vendor::{vendor}::{domain}::{task}",
                    "scope": "vendor",
                    "domain": domain,
                    "vendor": vendor,
                    "task": task,
                    "status": "planned",
                    "target_examples": 10,
                })

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "\n".join(json.dumps(row, ensure_ascii=False) for row in rows) + "\n",
        encoding="utf-8",
    )

    print(json.dumps({
        "rows": len(rows),
        "common_rows": len(taxonomy["common_domains"]) * len(taxonomy["task_types"]),
        "vendor_rows": len(taxonomy["vendors"]) * len(taxonomy["common_domains"]) * len(taxonomy["task_types"]),
        "planned_example_slots": sum(row["target_examples"] for row in rows),
        "output": str(args.output),
    }, indent=2))


if __name__ == "__main__":
    main()
