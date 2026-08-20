# Pr Lpos: PR from LPOS, element offsets

| | |
|--|--|
| **Id** | `008-pr-lpos` |
| **Difficulty** | Medium |
| **Tags** | motion, frames |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/offset-and-incremental.md`](../../../docs/fanuc/programming-tp/offset-and-incremental.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`PR_LPOS`) |

## Statement

Capture Cartesian pose into PR[1] with LPOS, then walk a 300 mm XY pattern by editing PR[1,1] and PR[1,2].

## Constraints

Distances are examples. LPOS is World/Cartesian; JPOS is joint.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

PR[1]=LPOS, add/sub X then Y, Linear to PR[1] each time, return to P[1].

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
