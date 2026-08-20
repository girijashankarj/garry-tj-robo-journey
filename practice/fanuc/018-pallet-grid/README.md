# Pallet grid: R[] loops and OFFSET

| | |
|--|--|
| **Id** | `018-pallet-grid` |
| **Difficulty** | Medium |
| **Tags** | logic, frames, motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/applications/pallet-grid.md`](../../../docs/fanuc/applications/pallet-grid.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`PALLET`) |

## Statement

Nested row/col using R[1] and R[2]. OFFSET CONDITION with a placeholder PR, Linear to a taught nest P[2], increment, JMP until limits. Then Joint home.

## Constraints

Pitch in PR is taught on the cell. Do not copy mm from this file. Avoid infinite JMP.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Union of R[], JMP, OFFSET displacement. Simpler OFFSET: 005.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.

