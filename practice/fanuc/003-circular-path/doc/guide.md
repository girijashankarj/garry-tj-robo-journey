# Circular path — guide

> Drill: `003-circular-path`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: Joint to the start, then several **arcs**, then Joint home. Each arc needs two taught points (via and destination).

On the pendant those arcs are **C** (via, dest) pairs. Teach all points on the cell.

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

Each **C** is **via** then **dest**. Not a square OFFSET.

```mermaid
flowchart LR
  st["start"] --> via["via"]
  via --> dest["dest"]
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class st proc
  class via,dest origin
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 via dest remark")
  fr["L2-3 UFRAME UTOOL"]
  js["L4-5 J to start"]
  arcs["L6-13 C via dest pairs"]
  jh["L14 J home"]
  endn(["L15 END"])
  start -.-> rem
  rem --> fr
  fr ==> js
  js ==> arcs
  arcs ==> jh
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
  class fr,js,arcs,jh proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! C via,dest. Prefer CNT near a round path; FINE to stop. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  J P[1] 100% FINE    ;
   5:  J P[2] 100% FINE    ;
   6:  C P[3]    ;
   7:    P[4] 500mm/sec FINE    ;
   8:  C P[5]    ;
   9:    P[6] 500mm/sec FINE    ;
   10:  C P[7]    ;
   11:    P[8] 500mm/sec FINE    ;
   12:  C P[9]    ;
   13:    P[2] 500mm/sec FINE    ;
   14:  J P[1] 100% FINE    ;
   15:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + via/dest remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4–5 | Joint to path start | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6–13 | Four C via/dest pairs | [C](../../../../docs/fanuc/programming-tp/motion-types-fine-cnt.md) |
| 14 | Joint home | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 15 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
