# Register loop and CALL — guide

> Drill: `006-loop-call`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: count how many times to run a **subprogram**, call it, add one, and loop until the count is done.

On the pendant: **R[]** counter, **CALL**, **IF** + **JMP LBL**. `SUB100` is a placeholder name that must exist on the controller.

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 pair SUB100")
  init["L2-3 R1=0 R2=5"]
  lbl["L4 LBL50"]
  cal[["L5 CALL SUB100"]]
  inc["L6 R1=R1+1"]
  q{"L7 IF R1 less R2?"}
  endn(["L8 END"])
  start -.-> rem
  rem --> init
  init ==> lbl
  lbl ==> cal
  cal ==> inc
  inc ==> q
  q -->|yes JMP LBL50| lbl
  q -.->|no| endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class init,inc,lbl proc
  class cal call
  class q dec
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Pair with SUB100 on controller. Data via R[] only. ;
   2:  R[1]=0    ;
   3:  R[2]=5    ;
   4:  LBL[50] ;
   5:  CALL SUB100    ;
   6:  R[1]=R[1]+1    ;
   7:  IF R[1]<R[2],JMP LBL[50] ;
   8:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + sub-name remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Counter and limit | [R[]](../../../../docs/fanuc/programming-tp/registers-numeric.md) |
| 4–6 | Label, CALL, increment | [LBL](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) / [CALL](../../../../docs/fanuc/programming-tp/registers-jumps-call.md) / [R[]](../../../../docs/fanuc/programming-tp/registers-numeric.md) |
| 7 | Loop while R[1]<R[2] | [IF](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) / [JMP](../../../../docs/fanuc/programming-tp/logic-lbl-jmp.md) |
| 8 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
