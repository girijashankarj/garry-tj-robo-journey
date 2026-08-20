# Joint only — guide

> Drill: `011-joint-only`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: two Joint moves only — no straight-line Cartesian path.

On the pendant: **J** to **PR[1]** then **PR[2]**, **FINE**, feed in **percent**. Teach both PRs on the cell. Atom for [Joint](../../../../docs/fanuc/programming-tp/motion-j.md).

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

Two Joint targets, FINE stop at each. Both sweeps are axis space — neither leg is a straight TCP line (compare [`012-linear-only`](../../012-linear-only/)).

```mermaid
flowchart LR
  cur["current pose"]
  p1["PR[1]"]
  p2(["PR[2]"])
  cur -.->|"J 15% FINE"| p1
  p1 -.->|"J 15% FINE"| p2
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef term fill:#F5F5F5,stroke:#666666
  classDef origin fill:#FFF2CC,stroke:#D6B656
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef io fill:#D5E8D4,stroke:#82B366
  class cur,p1 proc
  class p2 term
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 teach PR1 PR2")
  fr["L2-3 UFRAME UTOOL"]
  a["L4 J PR1 15% FINE"]
  b["L5 J PR2 15% FINE"]
  endn(["L6 END"])
  start -.-> rem
  rem --> fr
  fr ==> a
  a ==> b
  b ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class fr,a,b proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: Joint only. Teach PR[1] PR[2] on the cell. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  J PR[1] 15% FINE    ;
   5:  J PR[2] 15% FINE    ;
   6:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + teach-PR remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4–5 | Joint PR[1] then PR[2] | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
