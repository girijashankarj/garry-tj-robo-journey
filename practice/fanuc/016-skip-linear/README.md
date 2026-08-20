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

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Union of L + SKIP + LBL. Confirm Skip,LBL wording on your controller.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.

