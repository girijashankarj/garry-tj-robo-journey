# SKIP CONDITION on a Linear

| | |
|--|--|
| **Id** | `016-skip-linear` |
| **Difficulty** | Medium |
| **Tags** | motion, io, logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/logic-skip.md`](../../../docs/fanuc/programming-tp/logic-skip.md), [`skip-and-contour`](../../../docs/fanuc/applications/skip-and-contour.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`SKIP_LIN`) |

## Statement

Arm SKIP CONDITION on a placeholder DI. Linear toward P[2] with Skip,LBL. After skip (or arrival), Joint home.

## Constraints

DI[1] is a placeholder. SKIP is not e-stop or SI/SO. After skip you may not be at P[2].

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Union of L + SKIP + LBL. Confirm Skip,LBL wording on your controller.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

