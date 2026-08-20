# OVERRIDE instruction then Joint

| | |
|--|--|
| **Id** | `015-override-instr` |
| **Difficulty** | Easy |
| **Tags** | motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/override.md`](../../../docs/fanuc/programming-tp/override.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`OVRD_J`) |

## Statement

Set OVERRIDE to 50 percent (confirm instruction on your software), then one Joint FINE. Pendant override still applies. This is not a safety device.

## Constraints

T1 still caps TCP speed. Do not use this to defeat fences or DCS.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Atom for OVERRIDE. Confirm exact syntax on the pendant.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

