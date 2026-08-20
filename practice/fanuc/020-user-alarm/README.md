# User Alarm: UALM then home

| | |
|--|--|
| **Id** | `020-user-alarm` |
| **Difficulty** | Easy |
| **Tags** | alarms, logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/ualm.md`](../../../docs/fanuc/programming-tp/ualm.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`USER_ALM`) |

## Statement

Fire **UALM[1]** (placeholder; configure text on the controller), then Joint to taught home FINE. Contrast with MESSAGE (021), which does not halt the same way.

## Constraints

UALM[1] message string is **not** in this file. Some cells ABORT after UALM instead of continuing — confirm SOP.

All numbers are **placeholders**.

## Approach

Atom for UALM. Union: 007 wait timeout.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
