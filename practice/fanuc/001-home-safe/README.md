# Home Safe: Home / safe pose

| | |
|--|--|
| **Id** | `001-home-safe` |
| **Difficulty** | Easy |
| **Tags** | motion, safety |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/motion-paths-home/overview.md`](../../../docs/fanuc/motion-paths-home/overview.md), [`jog-and-recovery`](../../../docs/fanuc/motion-paths-home/jog-and-recovery.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`HOME_SAFE`) |

## Statement

Move the robot to a **safe pose you taught** (home). Go there in **Joint**, slowly, and **stop completely** (FINE). Optional: turn on a placeholder “at home” output.

You must teach `PR[1:Home]` on **your** arm. Numbers in the listing are not a real cell.

How to read the solution: [`how-to-read-a-guide.md`](../../../docs/fanuc/how-to-read-a-guide.md).

## Constraints

UFRAME/UTOOL placeholders. Teach PR[1:Home] on the real robot. T1 for first prove-out.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Use a named position register for home so recovery paths can reuse it. Joint motion in free space. FINE so the next cycle starts from a known stop.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
