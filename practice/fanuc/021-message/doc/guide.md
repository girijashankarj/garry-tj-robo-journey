# MESSAGE then Joint — guide

> Drill: `021-message`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: show a **message** on the pendant, then Joint home. This is **not** the same as a user alarm — it should **not** halt like UALM.

On the pendant: **MESSAGE[1]**, then **J**. Confirm the instruction name on your software. Atom: [MESSAGE](../../../../docs/fanuc/programming-tp/message.md).

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 does not halt")
  fr["L2-3 UFRAME UTOOL"]
  msg[/"L4 MESSAGE1"/]
  j["L5 J home"]
  endn(["L6 END"])
  start -.-> rem
  rem --> fr
  fr ==> msg
  msg ==> j
  j ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class fr,j proc
  class msg io
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: MESSAGE does not halt. Confirm instruction name on your software. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  MESSAGE[1] ;
   5:  J PR[1:Home] 15% FINE    ;
   6:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + does-not-halt remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4 | MESSAGE[1] | [MESSAGE](../../../../docs/fanuc/programming-tp/message.md) |
| 5 | Joint home | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
