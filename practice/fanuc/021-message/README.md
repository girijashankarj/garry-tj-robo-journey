# MESSAGE: inform then Joint (does not halt)

| | |
|--|--|
| **Id** | `021-message` |
| **Difficulty** | Easy |
| **Tags** | logic |
| **Track** | 01 — FANUC HandlingTool |
| **Article** | [`docs/fanuc/programming-tp/message.md`](../../../docs/fanuc/programming-tp/message.md) |
| **Guide** | [`doc/guide.md`](doc/guide.md) |
| **Solution** | [`code/solution.ls`](code/solution.ls) (`MSG_JT`) |

## Statement

Issue a **MESSAGE** (confirm instruction name on your software), then one Joint FINE. The program **continues**. Do not use this instead of UALM for a fault.

## Constraints

Message text/index is a placeholder. Not a safety function.

This `.ls` is study ASCII, not a backup: `/ATTR` `PROG_SIZE` / `LINE_COUNT` may be **zero**.

## Approach

Atom vs [`020-user-alarm`](../020-user-alarm/).

## Cursor

- Explain this file: `@fanuc-explainer-agent` or `/fanuc-explain`
- Variant: `/fanuc-program`

## Safety

Prove in T1. Study drill, not a commissioned cell.

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
