# User alarm — guide

> Drill: `020-user-alarm`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: raise a **user alarm** the operator can see, then Joint home. The **words** of the alarm are set on the controller, not in this listing.

On the pendant: **UALM[1]**, then **J** home. Contrast with **MESSAGE** (021), which does not halt the same way. Atom: [UALM](../../../../docs/fanuc/programming-tp/ualm.md).

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 configure UALM text")
  fr["L2-3 UFRAME UTOOL"]
  ualm["L4 UALM1"]
  j["L5 J home"]
  endn(["L6 END"])
  start -.-> rem
  rem --> fr
  fr --> ualm
  ualm ==> j
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
  class ualm fault
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: UALM. Configure User Alarm 1 text on the controller. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  UALM[1] ;
   5:  J PR[1:Home] 10% FINE    ;
   6:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + configure-text remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4 | UALM[1] | [UALM](../../../../docs/fanuc/programming-tp/ualm.md) |
| 5 | Joint home | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
