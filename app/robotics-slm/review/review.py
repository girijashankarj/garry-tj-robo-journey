#!/usr/bin/env python3
"""Interactive human review tool for Robotics SLM dataset candidates."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

VALID = {"a": "approved", "r": "rejected", "v": "needs_revision"}


def read_jsonl(path: Path) -> list[dict]:
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def review(row: dict) -> dict:
    print("\n" + "=" * 80)
    print(f"ID: {row['id']}")
    print(f"Vendor: {row.get('vendor') or 'common'}")
    print(f"Domain: {row.get('domain')} | Task: {row.get('task')} | Safety: {row.get('safety')}")
    print(f"\nQ: {row.get('question', '')}")
    print(f"\nA: {row.get('answer', '')}")
    print(f"\nExpected concepts: {', '.join(row.get('expected_concepts', []))}")
    print("\n[a]pprove  [r]eject  [v]needs revision  [s]kip  [q]uit")

    while True:
        choice = input("> ").strip().lower()
        if choice == "s":
            return row
        if choice == "q":
            raise KeyboardInterrupt
        if choice in VALID:
            status = VALID[choice]
            break
        print("Choose a, r, v, s or q.")

    reviewer = input("Reviewer name (optional): ").strip() or None
    notes = input("Review notes (optional): ").strip() or None

    review_data = row.get("validation") or row.get("review") or {}
    review_data.update({
        "status": status,
        "technical_accuracy": "pass" if status == "approved" else "unknown",
        "safety_accuracy": "pass" if status == "approved" and row.get("safety") != "high-risk" else "unknown",
        "provenance_ok": bool((row.get("provenance") or {}).get("source_ref")),
        "reviewer": reviewer,
        "notes": notes,
    })
    row["validation"] = review_data
    return row


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--auto-pending", action="store_true", help="Keep already-reviewed records without prompting")
    args = parser.parse_args()

    rows = read_jsonl(args.input)
    output = []
    try:
        for row in rows:
            status = (row.get("validation") or row.get("review") or {}).get("status")
            if args.auto_pending and status in {"approved", "rejected", "needs_revision"}:
                output.append(row)
                continue
            output.append(review(row))
    except KeyboardInterrupt:
        print("\nReview stopped. Writing decisions made so far.")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text("\n".join(json.dumps(row, ensure_ascii=False) for row in output) + "\n", encoding="utf-8")
    print(f"Wrote {len(output)} records to {args.output}")


if __name__ == "__main__":
    main()
