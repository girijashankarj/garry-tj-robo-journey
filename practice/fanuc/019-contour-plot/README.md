# Contour plot: polyline of Linear points

| | |
|--|--|
| **Id** | `019-contour-plot` |
| **Difficulty** | Easy |
| **Tags** | motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/applications/skip-and-contour.md`](../../../docs/fanuc/applications/skip-and-contour.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`CONTOUR`) |

## Statement

Joint to P[1], then Linear FINE through P[2]–P[5] (polyline / plot), Joint home. Not Circular.

## Constraints

Teach points in order. Contrast with 003 (C) and 012 (L-only square).

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Union of J + several L. Prove FINE before CNT.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

