# Main CALL — guide

> Drill: `010-main-call`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: a **main** that only starts other programs: home, do work, home. The names you CALL must already exist on the controller.

On the pendant: three **CALL** lines, then **END**. No motion in this file.

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 names on controller")
  h1[["L2 CALL HOME_SAFE"]]
  work[["L3 CALL SQUARE"]]
  h2[["L4 CALL HOME_SAFE"]]
  endn(["L5 END"])
  start -.-> rem
  rem ==> h1
  h1 ==> work
  work ==> h2
  h2 ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class h1,work,h2 call
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Study listing. Callee names must exist on the controller. ;
   2:  CALL HOME_SAFE ;
   3:  CALL SQUARE ;
   4:  CALL HOME_SAFE ;
   5:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + names-must-exist remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2 | Home | [CALL](../../../../docs/fanuc/programming-tp/registers-jumps-call.md) |
| 3 | Process placeholder name | [CALL](../../../../docs/fanuc/programming-tp/registers-jumps-call.md) |
| 4 | Home | [CALL](../../../../docs/fanuc/programming-tp/registers-jumps-call.md) |
| 5 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
