# JMP LBL — guide

> Drill: `013-lbl-jmp`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: **jump over** some remarks, then Joint home. HandlingTool does **not** use BASIC `GOTO`.

On the pendant: **JMP LBL[10]**, skipped remarks, **LBL[10]**, **J** home. Atom: [JMP/LBL](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md).

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

**JMP changes which lines run, not where the TCP goes.** The jump lands past the skipped remarks; the only motion is one Joint sweep home.

```mermaid
flowchart LR
  jmp(["JMP LBL[10]"])
  lbl["LBL[10]"]
  home(["PR[1:Home]"])
  jmp ==>|"skips L5-6"| lbl
  lbl -.->|"J 15% FINE"| home
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef term fill:#F5F5F5,stroke:#666666
  classDef origin fill:#FFF2CC,stroke:#D6B656
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef io fill:#D5E8D4,stroke:#82B366
  class jmp,lbl origin
  class home term
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 not GOTO")
  fr["L2-3 UFRAME UTOOL"]
  jmp["L4 JMP LBL10"]
  skip("L5-6 skipped remarks")
  lbl["L7 LBL10"]
  j["L8 J home"]
  endn(["L9 END"])
  start -.-> rem
  rem --> fr
  fr ==> jmp
  jmp ==> lbl
  jmp -.-> skip
  skip -.-> lbl
  lbl ==> j
  j ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem,skip note
  class fr,jmp,lbl,j proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: JMP LBL, not GOTO. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  JMP LBL[10] ;
   5:  ! skipped remarks ;
   6:  ! do not run this block ;
   7:  LBL[10] ;
   8:  J PR[1:Home] 15% FINE    ;
   9:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + JMP not GOTO | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4 | JMP LBL[10] | [JMP](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) |
| 5–6 | Skipped remarks | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 7–8 | Label then Joint home | [LBL](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) / [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 9 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
