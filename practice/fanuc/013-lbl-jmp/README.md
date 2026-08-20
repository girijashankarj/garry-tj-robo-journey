# LBL / JMP: jump over remarks (not GOTO)

| | |
|--|--|
| **Id** | `013-lbl-jmp` |
| **Difficulty** | Easy |
| **Tags** | logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/logic-lbl-jmp.md`](../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`LBL_JMP`) |

## Statement

Use JMP LBL to skip a block of remarks, then one Joint FINE. No CALL. There is no GOTO.

## Constraints

LBL numbers must exist. Unconditional loops are not this drill.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Atom for JMP/LBL. Unions: 006 loop, 007 wait branch.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.

