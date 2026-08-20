# Joint only: two Joint moves FINE

| | |
|--|--|
| **Id** | `011-joint-only` |
| **Difficulty** | Easy |
| **Tags** | motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/motion-j.md`](../../../docs/fanuc/programming-tp/motion-j.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`JOINT_ONLY`) |

## Statement

Move **Joint only** to PR[1] then PR[2], FINE, low percent. No Linear.

## Constraints

Teach both PRs in free space. Contrast with 002 which adds L.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Atom for J. Union later: 002 square.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

