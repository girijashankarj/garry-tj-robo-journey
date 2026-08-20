# Pick and place: J, L, gripper wait, home

| | |
|--|--|
| **Id** | `017-pick-place` |
| **Difficulty** | Medium |
| **Tags** | motion, io |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/applications/pick-and-place.md`](../../../docs/fanuc/applications/pick-and-place.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`PICKPLAC`) |

## Statement

J to pick approach, L to pick, RO ON, WAIT RI (timeout UALM/ABORT), L retreat, J to place approach, L place, RO OFF, L retreat, J home. Placeholder I/O and poses.

## Constraints

Map RI/RO on the cell. FINE at pick and place. No SI/SO.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Union of 011/012/007/001 patterns.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

