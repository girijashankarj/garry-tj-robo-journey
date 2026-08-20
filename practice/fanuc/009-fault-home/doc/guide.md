# Fault home — guide

> Drill: `009-fault-home`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: **after** you understand why it faulted, send the arm **slowly to taught home** and stop.

On the pendant: **J** **PR[1:Home]** at low percent, **FINE**. This is not a substitute for finding the cause. ATTR sizes may be zero (study ASCII).

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-2 after cause ATTR")
  fr["L3-4 UFRAME UTOOL"]
  j["L5 J PR1 10% FINE"]
  endn(["L6 END"])
  start -.-> rem
  rem --> fr
  fr ==> j
  j ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class fr,j proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Study listing: ATTR size fields are not a backup. Teach PR[1:Home] on the cell. ;
   2:  ! Use only after the fault cause is understood. Joint, low percent, FINE. ;
   3:  UFRAME_NUM=1 ;
   4:  UTOOL_NUM=1 ;
   5:  J PR[1:Home] 10% FINE    ;
   6:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–2 | LEGAL + ATTR + after-cause remarks | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 3–4 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 5 | Joint home 10% FINE | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
