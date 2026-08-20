# MESSAGE — guide

> Drill: `021-message`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Show a **MESSAGE** then Joint. Runtime **does not halt** for the message the way **UALM** does. Confirm the instruction name on your pendant.

## Flowchart

```mermaid
flowchart TB
  msg[MESSAGE]
  home[J_home]
  msg --> home
```

## Decisions (diamond)

No fault branch. Motion still runs.

```mermaid
flowchart TD
  msg[MESSAGE]
  go[Joint_still_runs]
  msg --> go
```

## Block-by-block

| Line | What | Atom |
|------|------|------|
| 0–1 | LEGAL + confirm menu name | Remark |
| 2–3 | Frames | Frame |
| 4 | MESSAGE[1] placeholder | MESSAGE |
| 5 | Joint home | J |
| 6 | END | END |

## Safety

MESSAGE is not a safety function. Prove in T1.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
