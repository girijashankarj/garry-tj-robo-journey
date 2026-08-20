# Incremental box — guide

> Drill: `004-incremental-box`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: Joint to a corner, then move **along the edges by a small delta** (not to a new named pose), then Joint back.

On the pendant that delta is **INC** on **Linear** lines. Millimetres here are class examples, not your cell.

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

One taught corner, then **INC** deltas. Not OFFSET 1'-2'-3'-4'.

```mermaid
flowchart LR
  c["taught corner"]
  x["+X INC"]
  y["+Y INC"]
  xm["-X INC"]
  ym["-Y INC"]
  c ==> x ==> y ==> xm ==> ym
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class c origin
  class x,y,xm,ym proc
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 edit increments")
  fr["L2-3 UFRAME UTOOL"]
  jc["L4-5 J to corner"]
  box["L6-9 L INC edges"]
  jh["L10 J return"]
  endn(["L11 END"])
  start -.-> rem
  rem --> fr
  fr ==> jc
  jc ==> box
  box ==> jh
  jh ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class fr,jc,box,jh proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! After INC, edit position index XYZWPR (example 200mm).
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  J P[1] 100% FINE    ;
   5:  J P[2] 100% FINE    ;
   6:  L P[3] 500mm/sec FINE INC    ;
   7:  L P[4] 500mm/sec FINE INC    ;
   8:  L P[5] 500mm/sec FINE INC    ;
   9:  L P[6] 500mm/sec FINE INC    ;
   10:  J P[1] 100% FINE    ;
   11:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + edit-increments remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4–5 | Joint to start corner | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6–9 | Linear INC sides | [L](../../../../docs/fanuc/programming-tp/motion-l.md) + [INC](../../../../docs/fanuc/programming-tp/offset-and-incremental.md) |
| 10 | Joint return | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 11 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
