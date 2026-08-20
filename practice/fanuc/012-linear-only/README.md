# Linear only: L between taught points

| | |
|--|--|
| **Id** | `012-linear-only` |
| **Difficulty** | Easy |
| **Tags** | motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/motion-l.md`](../../../docs/fanuc/programming-tp/motion-l.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`LIN_ONLY`) |

## Statement

Move **Linear only** P[1]→P[2]→P[3]→P[1], FINE. No Joint in this program.

## Constraints

Teach points with UFRAME/UTOOL set. First prove at low mm/s. 002 is the J+L union.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Atom for L. Wrong frames put the square in the wrong place.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

