# LBL / JMP — guide

> Drill: `013-lbl-jmp`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

**JMP LBL** skips a block of remarks, then Joint home. There is **no GOTO** on HandlingTool.

## Flowchart

```mermaid
flowchart TB
  jmp[JMP_LBL10]
  skip[Skipped_remarks]
  lbl[LBL10]
  home[J_home]
  jmp --> lbl --> home
  jmp -.-> skip
```

## Decisions (diamond)

Unconditional JMP (always skip the remarks).

```mermaid
flowchart TD
  q{Always}
  skip[Never_run_remark_block]
  go[LBL10_then_Joint]
  q -->|JMP| go
  q -.-> skip
```

## Block-by-block

| Line | What | Atom |
|------|------|------|
| 0–1 | LEGAL + “not GOTO” | Remark |
| 2–3 | Frames | Frame |
| 4 | JMP LBL[10] | JMP |
| 5–6 | Remarks that do not run | Remark |
| 7 | Landing label | LBL |
| 8 | Joint home | J |
| 9 | END | END |

## Safety

Prove in T1. Site SOP and OEM manuals override this page.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
