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

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Atom for L. Wrong frames put the square in the wrong place.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.

