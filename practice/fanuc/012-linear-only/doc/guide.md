# Linear only — guide

> Drill: `012-linear-only`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: only **straight-line** moves between taught points, then back to the first. No Joint.

On the pendant: **L** **P[1]**–**P[3]**–**P[1]**, **FINE**, **mm/sec**. Atom for [Linear](../../../../docs/fanuc/programming-tp/motion-l.md).

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 no Joint")
  fr["L2-3 UFRAME UTOOL"]
  path["L4-7 L P1 P2 P3 P1"]
  endn(["L8 END"])
  start -.-> rem
  rem --> fr
  fr ==> path
  path ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class fr,path proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: Linear only. No J. Placeholders. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  L P[1] 100mm/sec FINE    ;
   5:  L P[2] 100mm/sec FINE    ;
   6:  L P[3] 100mm/sec FINE    ;
   7:  L P[1] 100mm/sec FINE    ;
   8:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + no-J remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4–7 | Linear P[1]–P[3]–P[1] | [L](../../../../docs/fanuc/programming-tp/motion-l.md) |
| 8 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
