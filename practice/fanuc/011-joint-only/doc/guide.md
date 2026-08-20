# Joint only: two Joint moves FINE — guide

> Drill: `011-joint-only`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Study listing for **Joint only: two Joint moves FINE**. Confirm frames, poses, and I/O on your cell.

## Flowchart

```mermaid
flowchart TB
  n0["! FANUC retains all rights in its m"]
  n1["! Atom: Joint only. Teach PR(1) PR("]
  n2["UFRAME_NUM=1 ;"]
  n3["UTOOL_NUM=1 ;"]
  n4["J PR(1) 15% FINE    ;"]
  n5["J PR(2) 15% FINE    ;"]
  n6["END ;"]
  n0 --> n1
  n1 --> n2
  n2 --> n3
  n3 --> n4
  n4 --> n5
  n5 --> n6
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
| 1 | `! Atom: Joint only. Teach PR[1] PR[2] on the cell. ;` | Remark |
| 2 | `UFRAME_NUM=1 ;` | Frame |
| 3 | `UTOOL_NUM=1 ;` | Frame |
| 4 | `J PR[1] 15% FINE    ;` | J |
| 5 | `J PR[2] 15% FINE    ;` | J |
| 6 | `END ;` | END |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

