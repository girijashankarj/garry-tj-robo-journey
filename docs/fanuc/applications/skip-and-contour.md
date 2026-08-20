# Skip and contour / plot (union)

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, learner  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/016-skip-linear`, `practice/fanuc/019-contour-plot`

## Overview

Two different unions that both use **Linear**:

1. **Skip** — leave a Linear early when a condition is true ([`../programming-tp/logic-skip.md`](../programming-tp/logic-skip.md)).
2. **Contour / plot** — teach a **polyline** of L points (FINE), Joint home. Not the same as Circular (C).

## When to use

- Skip: search, “until sensor,” optional segment
- Plot: a path that is many straight segments (gasket-ish, deburr polyline)
- Circular arcs: [`../programming-tp/motion-types-fine-cnt.md`](../programming-tp/motion-types-fine-cnt.md) and [003](../../../practice/fanuc/003-circular-path/)

## Definition

Skip uses a **placeholder DI**. After skip, the TCP is where the skip fired. A plot listing is just sequential `L P[n]`.

## Path / origin

Study sketch. **Skip:** Linear toward dest; leave early. **Plot:** polyline **1-2-3-4** (not Circular).

```mermaid
flowchart LR
  subgraph sk["Skip"]
    direction LR
    a["start"] ==> x["skip fires"]
    x -.-> z["dest not reached"]
  end
  subgraph pl["Plot"]
    direction TB
    n1["1"] --> n2["2"]
    n2 --> n3["3"]
    n3 --> n4["4"]
  end
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef origin fill:#FFF2CC,stroke:#D6B656
  classDef shiftc fill:#E1D5E7,stroke:#9673A6
  class a,n1,n2,n3,n4 proc
  class x origin
  class z shiftc
```

## System

```mermaid
flowchart TB
  skip{"Skip on L?"}
  plot["L polyline"]
  home(["J home"])
  skip -->|leave path| home
  plot ==> home
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef term fill:#F5F5F5,stroke:#666666
  class skip dec
  class plot proc
  class home term
```

## Worked example

[`016-skip-linear`](../../../practice/fanuc/016-skip-linear/), [`019-contour-plot`](../../../practice/fanuc/019-contour-plot/).

## Practice

- [`016-skip-linear`](../../../practice/fanuc/016-skip-linear/)
- [`019-contour-plot`](../../../practice/fanuc/019-contour-plot/)

## Common mistakes

- Skip as e-stop
- Calling a polyline a Circular program
- CNT on a plot before FINE is proven

## Safety notes

Prove in T1. Site SOP and OEM manuals override this page.

## Official references

On manuals **licensed to your site**: SKIP CONDITION, Linear. Do not paste OEM pages here.

## Repo references

- [`../programming-tp/logic-skip.md`](../programming-tp/logic-skip.md)
- [`../programming-tp/motion-l.md`](../programming-tp/motion-l.md)
- [`../topic-map.md`](../topic-map.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
