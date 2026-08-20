# Wait Gripper: Gripper wait with timeout

| | |
|--|--|
| **Id** | `007-wait-gripper` |
| **Difficulty** | Medium |
| **Tags** | io, logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/io-frames-tools/io-classes.md`](../../../docs/fanuc/io-frames-tools/io-classes.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`WAIT_GRIPPER`) |

## Statement

Turn RO[1] on, wait for RI[1]. On timeout jump to a user alarm and ABORT; otherwise continue.

## Constraints

RI/RO numbers are placeholders. Map to the real EOAT. Set WAIT timeout in System Config as required.

All `P[]` / `PR[]` / I/O numbers are **placeholders**. Teach them on your cell.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Handshake then TIMEOUT LBL → UALM → ABORT; success path JMP past the fault.

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant (CNT, different N, extra I/O): `/fanuc-program`

## Safety

Prove in T1, then T2 step, then Auto. This is a study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
