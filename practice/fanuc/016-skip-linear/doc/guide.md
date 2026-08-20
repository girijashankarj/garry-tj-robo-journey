# SKIP CONDITION on a Linear — guide

> Drill: `016-skip-linear`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Study listing for **SKIP CONDITION on a Linear**. Confirm frames, poses, and I/O on your cell.

## Flowchart

```mermaid
flowchart TB
  n0["! FANUC retains all rights in its m"]
  n1["! Union: SKIP + Linear. DI(1) PLACE"]
  n2["UFRAME_NUM=1 ;"]
  n3["UTOOL_NUM=1 ;"]
  n4["SKIP CONDITION DI(1)=ON ;"]
  n5["L P(2) 150mm/sec FINE Skip,LBL(10) "]
  n6["LBL(10) ;"]
  n7["J PR(1:Home) 15% FINE    ;"]
  n8["END ;"]
  n0 --> n1
  n1 --> n2
  n2 --> n3
  n3 --> n4
  n4 --> n5
  n5 --> n6
  n6 --> n7
  n7 --> n8
```

## Decisions (diamond)

```mermaid
flowchart TD
  q{Branch}
  y[Taken_path]
  n[Other_path]
  q -->|yes| y
  q -->|no| n
```

## Block-by-block

| Line | What | Atom |
|------|------|------|
| 0 | `! FANUC retains all rights in its marks/software/manuals. Educational only. Use ` | Remark |
| 1 | `! Union: SKIP + Linear. DI[1] PLACEHOLDER. Not safety I/O. ;` | Remark |
| 2 | `UFRAME_NUM=1 ;` | Frame |
| 3 | `UTOOL_NUM=1 ;` | Frame |
| 4 | `SKIP CONDITION DI[1]=ON ;` | SKIP |
| 5 | `L P[2] 150mm/sec FINE Skip,LBL[10] ;` | SKIP |
| 6 | `LBL[10] ;` | LBL |
| 7 | `J PR[1:Home] 15% FINE    ;` | J |
| 8 | `END ;` | END |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

