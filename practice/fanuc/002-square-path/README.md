# Square Path: Square path (J then L)

| | |
|--|--|
| **Id** | `002-square-path` |
| **Difficulty** | Easy |
| **Tags** | motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/motion-types-fine-cnt.md`](../../../docs/fanuc/programming-tp/motion-types-fine-cnt.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`SQUARE`) |

## Statement

Approach in Joint, trace a square in Linear at 500 mm/s FINE, return home in Joint.

## Constraints

Teach P[1]–P[5] in World. UFRAME_NUM=1, UTOOL_NUM=1 until the cell is mapped.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

J for fly-over, L for the work square so TCP stays straight. FINE at corners for the first drill; CNT is a follow-up variant.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
