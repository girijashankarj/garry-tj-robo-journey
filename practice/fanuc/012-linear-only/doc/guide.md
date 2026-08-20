# Linear only: L between taught points — guide

> Drill: `012-linear-only`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Study listing for **Linear only: L between taught points**. Confirm frames, poses, and I/O on your cell.

## Flowchart

```mermaid
flowchart TB
  n0["! FANUC retains all rights in its m"]
  n1["! Atom: Linear only. No J. Placehol"]
  n2["UFRAME_NUM=1 ;"]
  n3["UTOOL_NUM=1 ;"]
  n4["L P(1) 100mm/sec FINE    ;"]
  n5["L P(2) 100mm/sec FINE    ;"]
  n6["L P(3) 100mm/sec FINE    ;"]
  n7["L P(1) 100mm/sec FINE    ;"]
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

No IF / WAIT / SKIP / UALM branch. Straight sequence.

```mermaid
flowchart TD
  go[Run_lines]
  endn[END]
  go --> endn
```

## Block-by-block

| Line | What | Atom |
|------|------|------|
| 0 | `! FANUC retains all rights in its marks/software/manuals. Educational only. Use ` | Remark |
| 1 | `! Atom: Linear only. No J. Placeholders. ;` | Remark |
| 2 | `UFRAME_NUM=1 ;` | Frame |
| 3 | `UTOOL_NUM=1 ;` | Frame |
| 4 | `L P[1] 100mm/sec FINE    ;` | L |
| 5 | `L P[2] 100mm/sec FINE    ;` | L |
| 6 | `L P[3] 100mm/sec FINE    ;` | L |
| 7 | `L P[1] 100mm/sec FINE    ;` | L |
| 8 | `END ;` | END |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

