# {Topic title}

> Status: stub \| draft \| reviewed  
> Brand: FANUC  
> Mode: learner \| operator \| programmer \| integrator  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/...`

## Overview

What this is and why it matters.

## When to use

Bullet list of situations (and when not to).

## Definition

Precise terms.

## System

```mermaid
flowchart LR
  operator[Operator]
  pendant[TeachPendant]
  controller[Controller]
  robot[Robot]
  eot[EOAT]
  operator --> pendant --> controller --> robot --> eot
```

## Path / origin

When the topic **moves the TCP** (OFFSET, INC, frames, pallet, pick/place, skip, square), add a spatial Mermaid: taught **1-2-3-4** then OFFSET **1'-2'-3'-4'**, grid cells, or Joint vs Linear. Rule: [mermaid-path-origin](../../.cursor/rules/documentation/mermaid-path-origin.mdc). Skill: `fanuc-path-diagram`. Caption: study sketch; teach on the cell.

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
  subgraph off["1'-2'-3'-4'"]
    direction TB
    q1["1'"] --> q2["2'"]
    q2 --> q3["3'"]
    q3 --> q4["4'"]
    q4 --> q1
  end
  taught ==> shift ==> off
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef shiftc fill:#E1D5E7,stroke:#9673A6
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class p1,p2,p3,p4 proc
  class q1,q2,q3,q4 shiftc
  class shift origin
```

## Worked example

Short TP or pendant sequence. Link a practice id.

## Practice

- [`practice/fanuc/00N-slug/`](../../practice/fanuc/00N-slug/)

## Common mistakes

- ...

## Safety notes

- Site SOP and OEM manuals override this page.

## Official references

On manuals **licensed to your site**: the HandlingTool / operator chapter for this topic. Do not paste OEM pages here.

## Repo references

- Related articles
- Practice ids

## Rights

See [`LEGAL.md`](../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
