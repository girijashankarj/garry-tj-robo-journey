# Circular Path: Circular path

| | |
|--|--|
| **Id** | `003-circular-path` |
| **Difficulty** | Medium |
| **Tags** | motion |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/motion-types-fine-cnt.md`](../../../docs/fanuc/programming-tp/motion-types-fine-cnt.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`CIRCLE`) |

## Statement

Approach in Joint, complete a circular pattern using Circular motion (via + destination per C line), return home.

## Constraints

Each C instruction needs two position IDs. Prove CNT vs FINE near fixtures at low override.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

C P[via] then dest on the next line is the ASCII form used here. Four C segments close the loop back to P[2].

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
