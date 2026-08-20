# Remarks then motion — guide

> Drill: `014-remark-header`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: write **notes** at the top (who / cell / placeholders), then one Joint home. Remarks do not move the arm.

On the pendant: stacked **!** lines (no block comments). The ATTR **COMMENT** field is **not** a TP remark. Atom: [remark](../../../../docs/fanuc/programming-tp/remark.md).

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

**Remarks never move the TCP.** Five comment lines execute as nothing; the path is a single Joint sweep home.

```mermaid
flowchart LR
  rem["L0-4 remarks — no motion"]
  cur["current pose"]
  home(["PR[1:Home]"])
  rem -.-> cur
  cur -.->|"J 15% FINE"| home
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef term fill:#F5F5F5,stroke:#666666
  classDef origin fill:#FFF2CC,stroke:#D6B656
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class rem note
  class cur proc
  class home term
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  stack("L0-4 stacked remarks")
  fr["L5-6 UFRAME UTOOL"]
  j["L7 J home"]
  endn(["L8 END"])
  start -.-> stack
  stack --> fr
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
  class stack note
  class fr,j proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: remarks. Replace with your cell notes. ;
   2:  ! UFRAME_NUM placeholder 1 ;
   3:  ! UTOOL_NUM placeholder 1 ;
   4:  ! I/O not used in this drill ;
   5:  UFRAME_NUM=1 ;
   6:  UTOOL_NUM=1 ;
   7:  J PR[1:Home] 15% FINE    ;
   8:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–4 | LEGAL + stacked cell-note remarks | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 5–6 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 7 | Joint home | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 8 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
