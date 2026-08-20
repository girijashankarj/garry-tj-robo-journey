---
name: fanuc-path-diagram
description: Generate spatial Mermaid (OFFSET 1-2-3-4 then 1'-2'-3'-4', frames, pallet, INC). Use when writing motion/frame articles or drill guides.
---

# Skill: FANUC path / origin diagrams

## Trigger

New or updated `docs/fanuc/` article or `doc/guide.md` whose topic **moves the TCP** (OFFSET, INC, UFRAME, square, pallet, pick/place, skip, contour, circular).

## Steps

1. Read `.cursor/rules/documentation/mermaid-path-origin.mdc`.
2. Add `## Path / origin` **after Purpose / Overview** (geometry before L# program flow).
3. One sketch, one idea. Caption: study sketch in UFRAME; teach on the cell.
4. If the page also explains a listing, keep the **program-flow** chart separate (mermaid-program-flow).
5. Placeholders only. No plant millimetres.

## Canonical copies

Use the OFFSET, INC, frame, pallet, and pick/place examples in that rule. Primed labels **1' 2' 3' 4'** mean the **same taught P[]** after OFFSET CONDITION, not new recorded corners.

## Related

- `@fanuc-docs-agent`, `/fanuc-topic`, `fanuc-topic-writer`
- `@diagram-agent` (Mermaid syntax)
- `fanuc-knowledge-sync`

## Rights

Educational sketches only. FANUC retains all rights. See `LEGAL.md`.
