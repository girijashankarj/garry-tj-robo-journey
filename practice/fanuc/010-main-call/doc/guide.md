# Main Call: CALL home then process then home — guide

> Drill: `010-main-call`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Study listing for **Main Call: CALL home then process then home**. Confirm frames, poses, and I/O on your cell.

## Flowchart

```mermaid
flowchart TB
  n0["! FANUC retains all rights in its m"]
  n1["! Study listing. Callee names must "]
  n2["CALL HOME_SAFE ;"]
  n3["CALL SQUARE ;"]
  n4["CALL HOME_SAFE ;"]
  n5["END ;"]
  n0 --> n1
  n1 --> n2
  n2 --> n3
  n3 --> n4
  n4 --> n5
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
| 1 | `! Study listing. Callee names must exist on the controller. ;` | Remark |
| 2 | `CALL HOME_SAFE ;` | CALL |
| 3 | `CALL SQUARE ;` | CALL |
| 4 | `CALL HOME_SAFE ;` | CALL |
| 5 | `END ;` | END |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.

