# {Topic title}

> Status: stub | draft | reviewed  
> Brand: FANUC  
> Personas: operator | programmer | integrator | student | notes-reviewer  
> Related programs: `programs/fanuc/...`

## Overview

One short paragraph: what this topic is and why it matters in a cell.

## Definition

Precise terms. Distinguish industrial arm vs collaborative robot when relevant.

## System

Block diagram of components and data/motion flow.

```mermaid
flowchart LR
  operator[Operator]
  pendant[TeachPendant]
  controller[Controller]
  robot[RobotArmOrCobot]
  eot[EOAT]
  operator --> pendant --> controller --> robot --> eot
```

## Use cases

```mermaid
flowchart TD
  actor[Persona]
  uc1[UseCase1]
  uc2[UseCase2]
  actor --> uc1
  actor --> uc2
```

## Sequence

Use when the topic is a procedure (teach, recover, cycle).

```mermaid
sequenceDiagram
  participant Operator
  participant Pendant
  participant Controller
  participant Robot
  Operator->>Pendant: Request
  Pendant->>Controller: Command
  Controller->>Robot: MotionOrIO
  Robot-->>Controller: Status
```

## Safety notes

- Site procedures and OEM manuals override this page.
- Collaborative and industrial cells have different force, speed, and fencing rules.

## Official references

- FANUC operator / handling tool / DCS manuals (link only; do not paste copyrighted text): `[OFFICIAL_URL]`
- Controller software version: `[CONTROLLER_SOFT_VERSION]`

## Repo references

- Docs: `docs/fanuc/...`
- Programs: `programs/fanuc/...`
- Temp drafts: `temp/<skill-name>/`

## TODO

- Fill from reviewed notes in `inbox/pdf/` when available.
