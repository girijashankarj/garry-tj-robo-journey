# Wait gripper — guide

> Drill: `007-wait-gripper`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: turn the **gripper output** on, then **wait** until the gripper says it is closed. If that never happens, **alarm and stop**. If it does, skip the alarm and **END**.

On the pendant: placeholder **RO** ON, **WAIT** **RI** with **TIMEOUT** to **LBL[20]**, then **UALM** + **ABORT**, or **JMP** past that block. Read [I/O classes](../../../../docs/fanuc/io-frames-tools/io-classes.md) first.

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 placeholder I/O")
  ro[/"L2 RO1=ON"/]
  wait{"L3 WAIT RI TIMEOUT?"}
  jmp["L4 JMP LBL30"]
  ualm["L6 UALM1"]
  abort["L7 ABORT"]
  endn(["L9 END"])
  start -.-> rem
  rem --> ro
  ro ==> wait
  wait -->|ON| jmp
  wait -.->|TIMEOUT LBL20| ualm
  ualm --> abort
  jmp ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class ro io
  class wait dec
  class jmp proc
  class ualm,abort fault
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! RI/RO numbers are PLACEHOLDERS. Map on cell. ;
   2:  RO[1]=ON ;
   3:  WAIT RI[1]=ON TIMEOUT,LBL[20] ;
   4:  JMP LBL[30] ;
   5:  LBL[20] ;
   6:  UALM[1] ;
   7:  ABORT ;
   8:  LBL[30] ;
   9:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + placeholder I/O remarks | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2 | Gripper output ON | [I/O](../../../../docs/fanuc/io-frames-tools/io-classes.md) |
| 3 | WAIT RI; timeout to LBL[20] | [WAIT](../../../../docs/fanuc/io-frames-tools/io-classes.md) |
| 4 | Success: jump past alarm | [JMP](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) |
| 5–7 | Fault: UALM[1], ABORT | [UALM](../../../../docs/fanuc/programming-tp/ualm.md) |
| 8–9 | Success label and END | [LBL](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) |

UALM[1] text is configured on the **controller**, not in this listing.

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
