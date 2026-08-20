# Motion, paths, and home

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, operator, learner  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/001-home-safe`, `practice/fanuc/002-square-path`, `practice/fanuc/003-circular-path`

## Overview

A useful path is **approach → process → retreat → home**, not a single heroic Linear. Motion types **J / L / C / A**. Termination **FINE** (stop) vs **CNT n** (round the corner). Home is a **taught** `PR[]` (or CALL to a home program).

`.ls` files in `practice/` are **study listings**. `ATTR` size fields may be zero; they are not controller backups.

## When to use

- Fly through free space: **Joint**
- Process along a part: **Linear** (or **Circular** for arcs)
- Stop for I/O or a precise corner: **FINE**
- Sweep when the envelope is proven: **CNT** at low override first

## Definition

| Type | Feed (typical) | Use |
|------|----------------|-----|
| J | percent of joint speed | fly-over, home |
| L | mm/s (or inch/s) | straight TCP |
| C | mm/s | arc; each C needs via + destination (see ASCII two-line form) |
| A | incremental / additional (site usage) | confirm on your software |

Mastering (zero / single-axis) is maintenance. This article does not walk remastering — use the OEM procedure after battery or pulse-coder work.

## System

```mermaid
flowchart LR
  home[HomePR]
  approach[J_approach]
  process[L_or_C]
  retreat[J_retreat]
  home --> approach --> process --> retreat --> home
```

## Worked example

Joint to an approach point FINE, Linear around a square FINE at corners — [`002-square-path`](../../../practice/fanuc/002-square-path/). Arcs — [`003-circular-path`](../../../practice/fanuc/003-circular-path/). Always be able to [`001-home-safe`](../../../practice/fanuc/001-home-safe/) at low percent.

Detail on FINE/CNT: [`../programming-tp/motion-types-fine-cnt.md`](../programming-tp/motion-types-fine-cnt.md).

## Practice

[`001-home-safe`](../../../practice/fanuc/001-home-safe/), [`002-square-path`](../../../practice/fanuc/002-square-path/), [`003-circular-path`](../../../practice/fanuc/003-circular-path/), [`009-fault-home`](../../../practice/fanuc/009-fault-home/).

## Common mistakes

- Linear through a fixture because Joint “looked slower”
- CNT 100 at full override beside a clamp
- Home as “J1–J6 zeros” instead of a taught safe pose
- Circular with only one recorded point

## Safety notes

Do not jog production after battery work until mastering is confirmed per OEM. Prove FINE paths before CNT.

## Official references

On manuals **licensed to your site**: motion types, termination, position registers, circular teaching.

## Repo references

- [`jog-and-recovery.md`](jog-and-recovery.md)
- [`../programming-tp/motion-types-fine-cnt.md`](../programming-tp/motion-types-fine-cnt.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
