---
name: fanuc-topic-writer
description: Write FANUC study articles from docs/_templates/topic.md. Use when adding or filling Track 01 documentation.
---

# Skill: FANUC topic writer

## Trigger
New or updated `docs/fanuc/` article.

## Steps
1. Confirm folder and study mode.
2. Draft unpublished markdown from `docs/_templates/topic.md`.
3. If the topic **moves the TCP**, add `## Path / origin` (OFFSET 1-2-3-4 then 1'-2'-3'-4', frames, pallet, INC, pick/place, skip). Follow `fanuc-path-diagram` and mermaid-path-origin. Keep program-flow charts separate.
4. Promote after accept. Run `fanuc-knowledge-sync`.

## Rules
- Curriculum voice. **NEVER** paste OEM manuals. Do not present this as an official FANUC course agenda.
- Spatial sketches are study-only. No plant millimetres.

## Rights
Include `LEGAL.md` notices on promoted docs and programs. FANUC retains all rights. Educational use; user consent and risk. Public credit: Garry TJ only.
