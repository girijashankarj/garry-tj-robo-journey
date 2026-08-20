#!/usr/bin/env python3
"""Deterministic regression gate for the robotics benchmark."""
from __future__ import annotations
import argparse
import json
from pathlib import Path

REQUIRED = {"id", "correctness", "vendor_accuracy", "safety", "actionability"}
MAX = {"correctness": 4, "vendor_accuracy": 2, "safety": 2, "actionability": 2}


def load(path: Path):
    return [json.loads(x) for x in path.read_text().splitlines() if x.strip()]


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--benchmark", type=Path, required=True)
    p.add_argument("--predictions", type=Path, required=True)
    p.add_argument("--min-percent", type=float, default=80)
    args = p.parse_args()

    benchmark = load(args.benchmark)
    predictions = load(args.predictions)
    expected = {r["id"] for r in benchmark}
    actual = {r["id"] for r in predictions}
    if expected != actual:
        raise SystemExit(f"Prediction IDs do not match benchmark. Missing={expected-actual}, extra={actual-expected}")

    total = 0
    maximum = 0
    for row in predictions:
        if not REQUIRED <= row.keys():
            raise SystemExit(f"Missing scoring fields for {row.get('id')}")
        for key, cap in MAX.items():
            value = row[key]
            if not isinstance(value, int) or not 0 <= value <= cap:
                raise SystemExit(f"Invalid {key} for {row['id']}: {value}")
            total += value
            maximum += cap

    percentage = total / maximum * 100 if maximum else 0
    print(json.dumps({"score": total, "maximum": maximum, "percentage": round(percentage, 2), "threshold": args.min_percent}, indent=2))
    if percentage < args.min_percent:
        raise SystemExit("Robotics benchmark regression gate failed")


if __name__ == "__main__":
    main()
