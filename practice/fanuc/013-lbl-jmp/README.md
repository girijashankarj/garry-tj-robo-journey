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

## Approach

Atom for JMP/LBL. Unions: 006 loop, 007 wait branch.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

