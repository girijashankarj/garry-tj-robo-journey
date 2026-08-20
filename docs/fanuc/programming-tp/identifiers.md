# Identifiers (names and indices)

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, learner  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/010-main-call`, `practice/fanuc/001-home-safe`

## Overview

An **identifier** is a name or number **you** assign: program name, `CALL` target, `P[]` / `PR[]` / `R[]` / `LBL[]` index, I/O point number, optional comment after a colon (`PR[1:Home]`). **Keywords** (`J`, `CALL`, `END`) are reserved words — see [`keywords.md`](keywords.md).

This page is HandlingTool / Teach Pendant, not Karel.

## When to use

- Creating a TP program or a `CALL` sub
- Teaching `P[]` / `PR[]` and writing remarks that match those numbers
- Not for: inventing plant I/O maps; numbers in drills are placeholders

## Definition

| Kind | Study shape | You choose |
|------|-------------|------------|
| **Program name** | `/PROG NAME` in `.ls`; Create on the pendant | Uppercase letters and digits. Older HandlingTool often **8 characters**; confirm max length on **your** software. No spaces in study listings. |
| **ATTR COMMENT** | Header string on the program | Human title. **Not** a TP remark line (`!`). See [`remark.md`](remark.md). |
| **Position comment** | `P[1:PkAp]`, `PR[1:Home]` | Text after `:` is a label on that point, not a second program. |
| **P[n]** | Position stored in **this** program | Index `n`. Teach on the cell. |
| **PR[n]** / **PR[n,e]** | Position register (global pose / element) | Index and optional Cartesian element (confirm X=1, Y=2). |
| **R[n]** | Numeric register | Index only — not a pose. |
| **LBL[n]** | Jump target in **this** program | Same `n` as `JMP LBL[n]`. |
| **I/O** | `DI[n]`, `DO[n]`, `RI[n]`, `RO[n]`, … | Class + number from **your** I/O map. |
| **CALL target** | `CALL HOME_SAFE` | Must match a program name that **exists on the controller**. |
| **Frame select** | `UFRAME_NUM=1`, `UTOOL_NUM=1` | Frame **numbers**, not names. Teach frames on the cell. |

Reserved instruction words are **not** good program names if the controller rejects them. Confirm the name rules on your version.

## System

```mermaid
flowchart TB
  prog[ProgramName]
  call[CALL_target]
  idx[P_PR_R_LBL_IO_index]
  prog --> call
  prog --> idx
```

## Worked example

[`010-main-call`](../../../practice/fanuc/010-main-call/) `CALL`s `HOME_SAFE` and `SQUARE` — those strings are identifiers. [`001-home-safe`](../../../practice/fanuc/001-home-safe/) uses identifier `PR[1:Home]` (register 1, comment Home).

## Practice

- [`010`](../../../practice/fanuc/010-main-call/) — program names as `CALL` targets
- [`001`](../../../practice/fanuc/001-home-safe/) — `PR[1:Home]`
- [`006`](../../../practice/fanuc/006-loop-call/) — `R[]` and `LBL[]` indices
- [`007`](../../../practice/fanuc/007-wait-gripper/) — placeholder `RI`/`RO` numbers

## Common mistakes

- Treating ATTR `COMMENT` as a remark instruction
- `CALL`ing a name that is only in this Git repo, not on the controller
- Copying drill I/O and pose indices onto a real cell
- Assuming every controller still uses 8-character program names

## Safety notes

Wrong frame number or wrong `PR[]` home is a crash risk. Prove in T1. Site SOP and OEM manuals override this page.

## Official references

On manuals **licensed to your site**: program create / name rules, register and I/O indexing. Do not paste OEM pages here.

## Repo references

- [`keywords.md`](keywords.md)
- [`remark.md`](remark.md)
- [`../io-frames-tools/pr-vs-r.md`](../io-frames-tools/pr-vs-r.md)
- [`../topic-map.md`](../topic-map.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
