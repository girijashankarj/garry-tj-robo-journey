# PR from LPOS — guide

> Drill: `008-pr-lpos`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: remember **where the arm is now**, nudge that pose a little in X/Y, then Linear to the nudged pose.

On the pendant: **PR[1]=LPOS**, then Cartesian elements (study X=1 Y=2 — confirm on your software), **L** to that PR. Distances are class examples.

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

Capture **where you are**, nudge X/Y in the **user** origin, Linear to that PR.

```mermaid
flowchart LR
  now["LPOS"]
  nud["PR + dX dY"]
  lin["L to PR"]
  now ==> nud ==> lin
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class now,nud origin
  class lin proc
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 element remark")
  frames["L2-3 UFRAME UTOOL"]
  ap["L4-5 J to work"]
  snap["L6 PR1=LPOS"]
  walk["L7-14 nudge XY then L"]
  jh["L15 J return"]
  endn(["L16 END"])
  start -.-> rem
  rem --> frames
  frames --> ap
  ap ==> snap
  snap ==> walk
  walk ==> jh
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
  class frames,ap,snap,walk,jh proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! PR[1,1]=X PR[1,2]=Y. Distances are class examples. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  J P[1] 100% FINE    ;
   5:  J P[2] 100% FINE    ;
   6:  PR[1]=LPOS    ;
   7:  PR[1,1]=PR[1,1]+300    ;
   8:  L PR[1] 800mm/sec FINE    ;
   9:  PR[1,2]=PR[1,2]+300    ;
  10:  L PR[1] 800mm/sec FINE    ;
  11:  PR[1,1]=PR[1,1]-300    ;
  12:  L PR[1] 800mm/sec FINE    ;
  13:  PR[1,2]=PR[1,2]-300    ;
  14:  L PR[1] 800mm/sec FINE    ;
  15:  J P[1] 100% FINE    ;
  16:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + element remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | UFRAME / UTOOL before Cartesian | [Frames](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4–5 | Joint to work | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6 | PR[1]=LPOS | [PR](../../../../docs/fanuc/io-frames-tools/pr-vs-r.md) / [LPOS](../../../../docs/fanuc/io-frames-tools/pr-vs-r.md) |
| 7–14 | ±X / ±Y then Linear to PR | [PR](../../../../docs/fanuc/io-frames-tools/pr-vs-r.md) + [L](../../../../docs/fanuc/programming-tp/motion-l.md) |
| 15 | Joint return | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 16 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
