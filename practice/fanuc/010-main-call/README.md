# Main Call: CALL home then process then home

| | |
|--|--|
| **Id** | `010-main-call` |
| **Difficulty** | Easy |
| **Tags** | logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/registers-jumps-call.md`](../../../docs/fanuc/programming-tp/registers-jumps-call.md), [`docs/fanuc/io-frames-tools/io-classes.md`](../../../docs/fanuc/io-frames-tools/io-classes.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`MAIN_CALL`) |

## Statement

Write a **main** that only `CALL`s other programs: home, a process (use the square drill as the callee name), home again. No inline path points in main.

## Constraints

Callee names must exist on the controller (`HOME_SAFE`, `SQUARE` in this study set). PNS/RSR would select **this** main, not every subroutine. Placeholders only.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Keep Auto entry at one program. Subprograms own motion. Same pattern as [`006-loop-call`](../006-loop-call/) but as a cell main rather than a counted loop.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
