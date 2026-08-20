# Industrial arm

> Status: draft  
> Brand: FANUC  
> Mode: learner, integrator, programmer

## Overview

Six-axis **articulated** handling arms: select by application, payload, reach, and envelope. Payload includes gripper plus part.

## When to use

- Fenced industrial cells (LR / M-series class)
- Not for assuming cobot touch-stop behavior

## Definition

Rotary joints J1–J6. Gear reducers; mechanical and software travel limits.

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

## Worked example

Integrator worksheet: application (handling vs weld), payload (EOAT + part), reach, then fence and T1 250 mm/s teach.

## Practice

Motion drills assume an industrial trainer cell: [`practice/fanuc/002-square-path/`](../../../practice/fanuc/002-square-path/).

## Common mistakes

- Rating payload as “arm only” and ignoring EOAT mass
- Copying cobot notes onto a fenced arm

## Safety notes

Security fence and door interlock are the default for this track.

## Official references

On manuals **licensed to your site**: the operator / HandlingTool chapter for this topic. Do not paste OEM pages here.

## Repo references

- [`../collaborative/overview.md`](../collaborative/overview.md)
- [`../safety-dcs/modes-t1-t2-auto.md`](../safety-dcs/modes-t1-t2-auto.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
