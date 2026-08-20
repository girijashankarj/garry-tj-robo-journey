# Collaborative robots

> Status: draft  
> Brand: FANUC  
> Mode: learner, integrator

## Overview

Collaborative applications use assessed speed, force, and zones. Do not copy CRX DCS settings from study pages onto a live cell.

## When to use

- Comparing fenced arm vs cobot cell design
- After dedicated DCS / cobot commissioning training

## Definition

Collaboration is a **commissioned mode**, not a nickname for a model family.

## System

```mermaid
flowchart LR
  risk[RiskAssessment]
  limits[SpeedForceZones]
  cell[Cell]
  risk --> limits --> cell
```

## Worked example

If the cell is fenced industrial, use T1/T2/Auto and fence interlocks ([modes](../safety-dcs/modes-t1-t2-auto.md)), not “stop on touch” as a substitute.

## Practice

No cobot-specific drill yet. Use industrial motion set: [`practice/fanuc/`](../../practice/fanuc/).

## Common mistakes

- Equating “cobot” with “no risk assessment”

## Safety notes

ISO/TS-style collaborative limits must be measured on the actual tooling.

## Official references

On manuals **licensed to your site**: the operator / HandlingTool chapter for this topic. Do not paste OEM pages here.

## Repo references

- [`../industrial-arm/overview.md`](../industrial-arm/overview.md)
- [`../safety-dcs/overview.md`](../safety-dcs/overview.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
