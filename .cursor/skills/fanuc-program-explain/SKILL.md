---
name: fanuc-program-explain
description: Explain FANUC TP or Karel using the program-guide format (flowchart, diamonds, block-by-block). Use when the user asks what a program does.
---

# Skill: FANUC program explain

## Trigger
Pasted TP/Karel, or a path under `practice/fanuc/` or `programs/fanuc/`.

## Steps
1. Clarification (missing cell fields only).
2. **Do not** answer with prose-only. Follow [`docs/_templates/program-guide.md`](../../../docs/_templates/program-guide.md):
   - Purpose
   - mermaid **flowchart TB** (happy path)
   - mermaid **decisions** with `{diamond}` nodes for WAIT / IF / SKIP / UALM
   - **Block-by-block** table (line, what, atom)
   - Safety + LEGAL
3. If the program is a drill or promoted TP, write or update `doc/guide.md` next to `code/` (create those folders if promoting).
4. After accept: `fanuc-knowledge-sync`.

## Rules
- Label unknown I/O as assumption.
- Prefer existing `doc/guide.md` and `code/solution.ls` (not a root `solution.ls`).

## Rights
Include `LEGAL.md` notices. FANUC retains all rights. Educational use; user consent and risk. Public credit: Garry TJ only.
