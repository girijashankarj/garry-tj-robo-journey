# {Program name} — guide

> Drill: `practice/fanuc/00N-slug/`  
> Code: `code/solution.ls`

## Purpose

Plain English first (what the arm does), then the pendant words. Unions that are not on-ramps start with **Do not start here** plus the drills to read first.

## Path / origin

If this drill **moves the TCP in space**, add a sketch (OFFSET **1-2-3-4** then **1'-2'-3'-4'**, INC deltas, pallet grid). Rule: [mermaid-path-origin](../../.cursor/rules/documentation/mermaid-path-origin.mdc). Skip this section for UALM/MESSAGE-only atoms.

## Program flow

One mermaid flowchart. Shapes, colors, `L#` labels: [`how-to-read-a-guide.md`](../fanuc/how-to-read-a-guide.md) (authors: [mermaid-program-flow](../../.cursor/rules/documentation/mermaid-program-flow.mdc)).

```mermaid
flowchart TB
  start(["start"])
  rem("L0-1 remarks")
  step["L2 process"]
  endn(["L3 END"])
  start -.-> rem
  rem ==> step
  step ==> endn
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef call fill:#E1D5E7,stroke:#9673A6
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  classDef note fill:#FFFFFF,stroke:#999999,stroke-dasharray: 5 5
  class start,endn term
  class rem note
  class step proc
```

Straight programs: no fake diamond. IF / WAIT / SKIP: rhombus `{ }` with `|yes|` / `|TIMEOUT|`. I/O: `[/ /]`. CALL: `[[ ]]`. Happy path `==>`. Optional/fault `-.->`.

## Listing (`/MN`)

Paste the `/MN` body from `code/solution.ls` so `L6` on the chart is the line that starts `6:`.

```
   0:  ! remarks ;
   2:  J PR[1:Home] 20% FINE    ;
```

## Block-by-block

How to read this chart: [`how-to-read-a-guide.md`](../fanuc/how-to-read-a-guide.md). Atoms (J, L, WAIT, …): [`glossary.md`](../glossary.md). Copy these links into `practice/.../doc/guide.md` with `../../../../docs/...` paths.

| Lines | What it does | Atom |
|-------|----------------|------|
| 0 | LEGAL remark | [Remark](../fanuc/programming-tp/remark.md) |
| … | … | … |

## Safety

Prove in T1, then T2, then Auto. Site SOP and OEM manuals override this page. I/O and poses are placeholders. `/ATTR` size fields may be zero — study ASCII, not a backup.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
