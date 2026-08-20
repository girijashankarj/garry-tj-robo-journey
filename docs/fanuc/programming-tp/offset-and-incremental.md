# OFFSET and INC

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, learner

## Overview

**INC** edits known XYZWPR deltas on Linear lines. **OFFSET CONDITION PR[n]** then **OFFSET** on following motions shifts a taught path. The class pattern does not mix OFFSET with INC.

## Path / origin

Study sketch in **UFRAME**. Not millimetres. Teach on the cell.

**OFFSET:** first pass is taught **1-2-3-4**. After **OFFSET CONDITION** on a PR, the **same P[]** run as **1'-2'-3'-4'**. You do not re-teach four new corners for the shift.

```mermaid
flowchart LR
  subgraph taught["Taught 1-2-3-4"]
    direction TB
    p1["1"] --> p2["2"]
    p2 --> p3["3"]
    p3 --> p4["4"]
    p4 --> p1
  end
  shift(["OFFSET PR"])
  subgraph off["Same P[] as 1'-2'-3'-4'"]
    direction TB
    q1["1'"] --> q2["2'"]
    q2 --> q3["3'"]
    q3 --> q4["4'"]
    q4 --> q1
  end
  taught ==> shift
  shift ==> off
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef shiftc fill:#E1D5E7,stroke:#9673A6
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class p1,p2,p3,p4 proc
  class q1,q2,q3,q4 shiftc
  class shift origin
```

**INC:** one taught corner, then **deltas** along the edges. Those INC poses are not extra named square corners.

```mermaid
flowchart LR
  c["taught corner"]
  x["+X INC"]
  y["+Y INC"]
  xm["-X INC"]
  ym["-Y INC"]
  c ==> x ==> y ==> xm ==> ym
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class c origin
  class x,y,xm,ym proc
```

## When to use

- INC: known pitch, avoid re-jogging every corner
- OFFSET: same path, family of parts / nested rows

## Definition

Set PR via Data → Position Register. Instruction: OFFSET/FRAMES → OFFSET CONDITION.

## System

```mermaid
flowchart LR
  taught[TaughtPath]
  pr[PR_Offset]
  taught --> shifted[ShiftedPath]
  pr --> shifted
```

## Worked example

[`004-incremental-box`](../../../practice/fanuc/004-incremental-box/), [`005-offset-path`](../../../practice/fanuc/005-offset-path/), [`008-pr-lpos`](../../../practice/fanuc/008-pr-lpos/) (`PR[1]=LPOS` then element math).

## Practice

Those three problem ids.

## Common mistakes

- OFFSET on INC lines
- Forgetting to teach PR[1] as the shift

## Safety notes

Prove offset in T1 away from people.

## Official references

On manuals **licensed to your site**: the operator / HandlingTool chapter for this topic. Do not paste OEM pages here.

## Repo references

- [`motion-types-fine-cnt.md`](motion-types-fine-cnt.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
