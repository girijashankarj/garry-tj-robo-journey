# Loop Call: Register loop and CALL

| | |
|--|--|
| **Id** | `006-loop-call` |
| **Difficulty** | Medium |
| **Tags** | logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/registers-jumps-call.md`](../../../docs/fanuc/programming-tp/registers-jumps-call.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`LOOP_CALL`) |

## Statement

Call a motion subroutine N times using R[1] as a counter and R[2] as the limit. Share data via registers only.

## Constraints

Create SUB100 (or rename CALL) on the controller. Unconditional JMP without an exit will hang in Auto.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

LBL, CALL, increment, IF R[1]<R[2] JMP LBL. Pair with a motion sub from 002.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
