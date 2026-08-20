# SKIP on Linear — guide

> Drill: `016-skip-linear`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Do **not** start here. After 001, 012, and [SKIP](../../../../docs/fanuc/programming-tp/logic-skip.md):

In plain English: move Linear toward a point; if a **placeholder input** turns on, **leave the path** and go home.

On the pendant: **SKIP CONDITION** on a **DI**, **L** with **Skip,LBL**, then home. Not safety I/O.

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

Linear toward dest; **leave the line** when skip fires.

```mermaid
flowchart LR
  a["start"] ==> x["skip fires"]
  x -.-> z["dest not reached"]
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef origin fill:#FFF2CC,stroke:#D6B656
  classDef shiftc fill:#E1D5E7,stroke:#9673A6
  class a proc
  class x origin
  class z shiftc
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 DI placeholder")
  fr["L2-3 UFRAME UTOOL"]
  arm[/"L4 SKIP CONDITION DI1"/]
  lin{"L5 L Skip LBL10?"}
  home["L7 J home"]
  endn(["L8 END"])
  start -.-> rem
  rem --> fr
  fr --> arm
  arm ==> lin
  lin -->|skip or arrive LBL10| home
  lin -.->|during L| home
  home ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class fr,home proc
  class arm io
  class lin dec
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Union: SKIP + Linear. DI[1] PLACEHOLDER. Not safety I/O. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  SKIP CONDITION DI[1]=ON ;
   5:  L P[2] 150mm/sec FINE Skip,LBL[10] ;
   6:  LBL[10] ;
   7:  J PR[1:Home] 15% FINE    ;
   8:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + placeholder DI | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4 | Arm skip | [SKIP CONDITION](../../../../docs/fanuc/programming-tp/logic-skip.md) |
| 5 | Linear Skip,LBL[10] | [L](../../../../docs/fanuc/programming-tp/motion-l.md) + [SKIP](../../../../docs/fanuc/programming-tp/logic-skip.md) |
| 6–7 | Label and Joint home | [LBL](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) / [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 8 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
