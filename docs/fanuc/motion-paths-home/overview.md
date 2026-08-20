# Motion, paths, and home

> Status: stub  
> Brand: FANUC  
> Personas: student, operator, programmer, integrator  
> Related programs: `programs/fanuc/samples/`

## Overview

Joint vs linear vs circular motion, CNT vs FINE, position registers, and a defined **home / recovery** path so the arm can leave a nest safely. Work envelope / tour size constrains taught points.

## Definition

**Home** is a known safe pose (not always mechanical zero). A **recovery path** is a taught or PR-based route that avoids fixtures.

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

## Use cases

```mermaid
flowchart TD
  actor[Persona]
  uc1[LearnConcept]
  uc2[ApplyInCell]
  actor --> uc1
  actor --> uc2
```

## Sequence

```mermaid
sequenceDiagram
  participant Operator
  participant Pendant
  participant Controller
  participant Robot
  Operator->>Pendant: Select procedure
  Pendant->>Controller: Command
  Controller->>Robot: MotionOrIO
  Robot-->>Operator: Status
```

## Safety notes

- OEM manuals and site rules override this stub.
- Validate on a teach pendant in a controlled cell.

## Official references

- FANUC handling tool / operator manual: `[OFFICIAL_URL]`
- Software version: `[CONTROLLER_SOFT_VERSION]`

## Repo references

- Index: [`../README.md`](../README.md)
- Template: [`../../_templates/topic.md`](../../_templates/topic.md)
- Sample program: [`../../../programs/fanuc/samples/HOME_SAFE.ls`](../../../programs/fanuc/samples/HOME_SAFE.ls)

## TODO

- Expand from reviewed notes in `inbox/pdf/` and licensed manuals (link, do not paste).
