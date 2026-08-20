# OVERRIDE then Joint — guide

> Drill: `015-override-instr`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

In plain English: cap **program speed** (study 50%), then Joint home. This is **not** a safety device.

On the pendant: **OVERRIDE=50%**, then **J** home. Confirm the instruction on your software. Atom: [override](../../../../docs/fanuc/programming-tp/override.md).

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

**OVERRIDE scales speed, not geometry.** The same sweep happens at half pace: programmed J 100% runs under OVERRIDE=50%.

```mermaid
flowchart LR
  ovr(["OVERRIDE=50%"])
  cur["current pose"]
  home(["PR[1:Home]"])
  ovr ==> cur
  cur -.->|"J 100% × OVR 50%"| home
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef term fill:#F5F5F5,stroke:#666666
  classDef origin fill:#FFF2CC,stroke:#D6B656
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef io fill:#D5E8D4,stroke:#82B366
  class ovr origin
  class cur proc
  class home term
```

## Program flow

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 not a safety device")
  fr["L2-3 UFRAME UTOOL"]
  ov["L4 OVERRIDE 50pct"]
  j["L5 J home 100pct"]
  endn(["L6 END"])
  start -.-> rem
  rem --> fr
  fr ==> ov
  ov ==> j
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
  class fr,ov,j proc
```

## Listing (`/MN`)

`L#` on the chart is the number before `:` here. Full file: [`code/solution.ls`](../code/solution.ls). Step it yourself: the **Run** tab on this drill's page in the study UI (FWD like T2, toggle I/O, watch registers).

```
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Atom: OVERRIDE instruction. Confirm name on your software. Not a safety device. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  OVERRIDE=50% ;
   5:  J PR[1:Home] 100% FINE    ;
   6:  END ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../../../../docs/fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../../../../docs/glossary.md).

| Lines | What | Atom |
|-------|------|------|
| 0–1 | LEGAL + not-safety remark | [Remark](../../../../docs/fanuc/programming-tp/remark.md) |
| 2–3 | Frame select | [Frame](../../../../docs/fanuc/io-frames-tools/frames.md) |
| 4 | OVERRIDE=50% | [OVERRIDE](../../../../docs/fanuc/programming-tp/override.md) |
| 5 | Joint home (scaled by override) | [J](../../../../docs/fanuc/programming-tp/motion-j.md) |
| 6 | END | [END](../../../../docs/glossary.md) |

## Safety

Prove in T1, then T2 step, then Auto. Placeholders only. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
