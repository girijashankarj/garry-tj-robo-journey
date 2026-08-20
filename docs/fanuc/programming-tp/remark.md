# Remark

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, learner  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/014-remark-header`

## Overview

A **remark** is a non-executing line (`!` in `.ls`, EDCMD → Remark on the pendant). Use it for home, frames, I/O assumptions, and LEGAL notices. Remarks do not replace `LBL`.

## When to use

- Header: cell, UFRAME, UTOOL, placeholder I/O
- Explaining a JMP target
- Not for: turning code off by remarking a motion you still need in Auto without a JMP

## Definition

**Single-line:** one TP instruction that is a remark (`!` in `.ls`, EDCMD Remark).

**Multi-line:** there is **no** C-style `/* */` block. Stack several remark instructions in a row ([`014`](../../../practice/fanuc/014-remark-header/)).

**ATTR COMMENT** (the `/ATTR` `COMMENT = "..."` string) is the **program header** on the select list, not a motion-line remark.

EDCMD wording varies. This repo’s LEGAL line is a remark, not an executable.

## System

```mermaid
flowchart LR
  r[Remark]
  m[Motion]
  r -.-> m
```

## Worked example

[`014-remark-header`](../../../practice/fanuc/014-remark-header/): one LEGAL remark plus stacked cell remarks, then Joint. Guide: [`doc/guide.md`](../../../practice/fanuc/014-remark-header/doc/guide.md).

## Practice

[`014-remark-header`](../../../practice/fanuc/014-remark-header/)

## Common mistakes

- Assuming more than one undo after editing remarks
- Putting the only documentation in a Git `.ls` that never loaded on the robot

## Safety notes

A remarked motion will not run. Site SOP and OEM manuals override this page.

## Official references

On manuals **licensed to your site**: EDCMD Remark. Do not paste OEM pages here.

## Repo references

- [`overview.md`](overview.md)
- [`logic-lbl-jmp.md`](logic-lbl-jmp.md)

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../../../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
