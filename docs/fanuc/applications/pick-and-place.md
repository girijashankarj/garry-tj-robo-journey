# Pick and place (union)

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, learner  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/017-pick-place`

## Overview

A handling cycle **unions** Joint fly-over, Linear to the part, EOAT I/O, retreat, place, and home. Atoms: [`../programming-tp/motion-j.md`](../programming-tp/motion-j.md), [`../programming-tp/motion-l.md`](../programming-tp/motion-l.md), [`../io-frames-tools/io-classes.md`](../io-frames-tools/io-classes.md).

## When to use

- Study a full pick → place → home before writing a cell main
- Not for: commissioned payload, real I/O maps, or Auto without T1/T2

## Definition

Typical skeleton: J approach → L pick → RO/WAIT RI → L retreat → J to place approach → L place → release → retreat → J home. All indexes are placeholders.

## Path / origin

Study sketch. Heights: fly **approach**, Linear **down** to pick/place, retreat, then the other nest. Not millimetres.

```mermaid
flowchart TB
  hm(["home"])
  pka["pick approach"]
  pk["pick"]
  pla["place approach"]
  pl["place"]
  hm ==> pka
  pka ==> pk
  pk ==> pka
  pka ==> pla
  pla ==> pl
  pl ==> pla
  pla ==> hm
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef term fill:#F5F5F5,stroke:#666666
  classDef origin fill:#FFF2CC,stroke:#D6B656
  class hm term
  class pka,pla origin
  class pk,pl proc
```

## System

```mermaid
flowchart TB
  home(["J home"])
  ap["J approach"]
  pk["L pick"]
  grip[/"RO WAIT RI"/]
  wait{"RI ON?"}
  pl["L place"]
  ualm["UALM"]
  home ==> ap
  ap ==> pk
  pk --> grip
  grip ==> wait
  wait -->|yes| pl
  wait -.->|TIMEOUT| ualm
  pl ==> home
  classDef proc fill:#DAE8FC,stroke:#6C8EBF
  classDef io fill:#D5E8D4,stroke:#82B366
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  class home term
  class ap,pk,pl proc
  class grip io
  class wait dec
  class ualm fault
```

## Worked example

[`017-pick-place`](../../../practice/fanuc/017-pick-place/). Timeout style: [`007-wait-gripper`](../../../practice/fanuc/007-wait-gripper/).

## Practice

[`017-pick-place`](../../../practice/fanuc/017-pick-place/)

## Common mistakes

- Linear from home through the fixture
- Gripper bits copied from another cell
- No FINE at pick/place

## Safety notes

Prove in T1. Payload and UTOOL must match the EOAT. Site SOP and OEM manuals override this page.

## Official references

On manuals **licensed to your site**: motion, I/O WAIT. Do not paste OEM pages here.

## Repo references

- [`../topic-map.md`](../topic-map.md)
- [`pallet-grid.md`](pallet-grid.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
