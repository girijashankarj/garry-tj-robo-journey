# Home Safe: Home / safe pose

| | |
|--|--|
| **Id** | `001-home-safe` |
| **Difficulty** | Easy |
| **Tags** | motion, safety |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/motion-paths-home/overview.md`](../../../docs/fanuc/motion-paths-home/overview.md) |
| **Solution** | [`solution.ls`](solution.ls) (`HOME_SAFE`) |

## Statement

Move the arm to a taught home (safe) pose at low joint speed and stop FINE. Optional: signal AtHome (placeholder DO).

## Constraints

UFRAME/UTOOL placeholders. Teach PR[1:Home] on the real robot. T1 for first prove-out.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

## Approach

Use a named position register for home so recovery paths can reuse it. Joint motion in free space. FINE so the next cycle starts from a known stop.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
