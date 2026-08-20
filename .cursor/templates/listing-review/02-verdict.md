# Verdict

> Program: `{program-slug}`

**Healthy but undocumented** is a valid verdict. Separate **fact** (in the listing) from **assumption**.

## Summary

One paragraph: what this listing is, whether it is internally consistent, whether it is safe to run as-is in T1.

## Severity

| ID | Area | Severity | Fact or assumption | Note |
|----|------|----------|--------------------|------|
| V1 | Safety / crash | | | |
| V2 | Logic / handshake | | | |
| V3 | Opacity (hard to maintain) | | | Unknown EOAT / I/O / backup → P2 **assumption** until provided |
| V4 | Cycle time | | | |
| V5 | Surroundings / backup | | | SRAM/FROM/auto backup unknown is not a listing bug — record as assumption |

Severity: P1 stop / crash · P2 wrong cycle · P3 maintainability · P4 nit.

## What is fine

-

## What is not proven

- I/O meaning, millimetres, taught poses, missing CALL bodies
- Gripper / peripherals / backup set if intake says unknown

## Rights

FANUC retains all rights in its trademarks, software, and manuals. This pack is unofficial. Site SOP and licensed OEM manuals override it.
