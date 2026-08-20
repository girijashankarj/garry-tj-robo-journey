#!/usr/bin/env python3
"""Score manually reviewed benchmark predictions from JSONL.

Prediction format per line:
{"id":"common-001","correctness":4,"vendor_accuracy":2,"safety":2,"actionability":2}
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("predictions", type=Path)
    args = parser.parse_args()

    rows = [json.loads(line) for line in args.predictions.read_text(encoding="utf-8").splitlines() if line.strip()]
    if not rows:
        raise SystemExit("No predictions supplied")

    totals = {key: 0 for key in ("correctness", "vendor_accuracy", "safety", "actionability")}
    for row in rows:
        for key in totals:
            value = row.get(key, 0)
            if not isinstance(value, int) or value < 0:
                raise SystemExit(f"Invalid {key} for {row.get('id')}")
            totals[key] += value

    maximum = len(rows) * 10
    score = sum(totals.values())
    print(json.dumps({
        "items": len(rows),
        "score": score,
        "maximum": maximum,
        "percentage": round(score / maximum * 100, 2),
        "component_totals": totals,
    }, indent=2))


if __name__ == "__main__":
    main()
