# Wait Gripper — guide

> Drill: `007-wait-gripper`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Turn a placeholder **RO** on, **WAIT** for **RI**. On timeout, **UALM** then **ABORT**. On success, skip the fault block with **JMP LBL**.

## Flowchart

```mermaid
flowchart TB
  ro[RO_ON]
  wait[WAIT_RI]
  ok[JMP_LBL30]
  endn[END]
  fail[LBL20_UALM_ABORT]
  ro --> wait
  wait --> ok --> endn
  wait --> fail
```

## Decisions (diamond)

```mermaid
flowchart TD
  w{RI_ON_before_timeout}
  ok[JMP_to_LBL30_END]
  bad[UALM_then_ABORT]
  w -->|yes| ok
  w -->|TIMEOUT| bad
```

## Block-by-block

| Line | What | Atom |
|------|------|------|
| 0–1 | LEGAL + placeholder I/O remarks | Remark |
| 2 | Gripper output ON | I/O |
| 3 | WAIT RI; timeout → LBL[20] | WAIT |
| 4 | Success: jump past alarm | JMP |
| 5–7 | Fault: UALM[1], ABORT | UALM |
| 8–9 | Success label and END | LBL |

`UALM[1]` text is configured on the **controller**, not in this listing.

## Safety

Prove in T1. RI/RO are placeholders. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
