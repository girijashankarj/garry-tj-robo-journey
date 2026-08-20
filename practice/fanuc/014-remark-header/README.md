# Remark header then one motion

| | |
|--|--|
| **Id** | `014-remark-header` |
| **Difficulty** | Easy |
| **Tags** | logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/remark.md`](../../../docs/fanuc/programming-tp/remark.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`REMARK_HD`) |

## Statement

Write a program that is mostly remarks (cell, frames, LEGAL) then one Joint to home.

## Constraints

Remarks do not execute. EDCMD Remark on the pendant is the same idea.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Atom for remark: one LEGAL line plus **stacked** remarks (multi-line notes). No `/* */`. Then Joint.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.

