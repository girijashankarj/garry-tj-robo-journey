# Home Safe — guide

> Drill: `001-home-safe`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: send the arm to a **safe taught pose** (home), slowly, and **stop**. You teach that pose on the real robot; this file only shows the idea.

On the pendant that is **Joint (J)** to **PR[1:Home]** at 20% with **FINE**. An optional “at home” output is commented out (placeholder).

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-2 notes")
  fr["L3-4 user and tool frame"]
  teach("L5 teach Home on cell")
  j["L6 Joint to Home 20% FINE"]
  opt("L7-8 optional DO remarked")
  endn(["L9 END"])
  start -.-> rem
  rem --> fr
  fr -.-> teach
  teach ==> j
  j -.-> opt
  opt ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem,teach,opt note
  class fr,j proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! SAMPLE ONLY - replace frames I/O home with cell data ;
   2:  ! Ask: model controller pendant EOAT UTOOL UFRAME home ;
   3:  UFRAME_NUM=1 ;
   4:  UTOOL_NUM=1 ;
   5:  ! PR[1:Home] must be taught on the real robot ;
   6:  J PR[1:Home] 20% FINE    ;
   7:  ! Optional DO handshake - numbers are PLACEHOLDERS ;
   8:  ! DO[101:AtHome]=ON ;
   9:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–2 | LEGAL / sample / ask remarks | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 3–4 | User and tool frame placeholders | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 5 | Teach PR[1:Home] on the cell | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 6 | Joint home 20% FINE | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 7–8 | Optional DO commented — not executed | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 9 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
