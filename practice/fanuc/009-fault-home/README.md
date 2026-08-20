# Fault Home: recover to taught home

| | |
|--|--|
| **Id** | `009-fault-home` |
| **Difficulty** | Easy |
| **Tags** | motion, safety, alarms |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/alarms/overview.md`](../../../docs/fanuc/alarms/overview.md), [`docs/fanuc/motion-paths-home/jog-and-recovery.md`](../../../docs/fanuc/motion-paths-home/jog-and-recovery.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`FAULT_HOME`) |

## Statement

After a stop you **understand** (Hold, timeout, cleared cause), send the arm **Joint** to the same taught home as `001` at **low** percent and stop **FINE**. Do not add process motion.

## Constraints

Teach `PR[1:Home]` on the cell. This is not a substitute for Reset SOP or for jogging around a crash. If the path to home is blocked, jog Joint in free space first — see the jog article.

All `P[]` / `PR[]` / I/O numbers are **placeholders**.

## Approach

Reuse one home PR so recovery and production agree. Keep speed lower than the production home move. No CNT.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. Study drill, not a commissioned cell.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
