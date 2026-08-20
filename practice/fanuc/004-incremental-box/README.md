# Incremental Box: Incremental box

| | |
|--|--|
| **Id** | `004-incremental-box` |
| **Difficulty** | Medium |
| **Tags** | motion, frames |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/offset-and-incremental.md`](../../../docs/fanuc/programming-tp/offset-and-incremental.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`INC_BOX`) |

## Statement

Trace a rectangle by editing XYZWPR increments on Linear INC lines (example 200 mm) without re-jogging every corner.

## Constraints

You must know the part pitch. INC does not combine with OFFSET CONDITION in the class pattern.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Teach approach points, mark Linear lines INC, then edit the position index deltas.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
