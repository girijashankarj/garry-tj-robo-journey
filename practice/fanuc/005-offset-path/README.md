# Offset Path: Offset a taught path

| | |
|--|--|
| **Id** | `005-offset-path` |
| **Difficulty** | Medium |
| **Tags** | motion, frames |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/offset-and-incremental.md`](../../../docs/fanuc/programming-tp/offset-and-incremental.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`OFFSET_SQ`) |

## Statement

Run a square once, then replay it shifted by PR[1] using OFFSET CONDITION and OFFSET on the following motions.

## Constraints

Teach PR[1] as the shift vector. Do not apply OFFSET to INC lines.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Unshifted cycle first, then OFFSET CONDITION PR[1], then the same geometry with OFFSET.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
