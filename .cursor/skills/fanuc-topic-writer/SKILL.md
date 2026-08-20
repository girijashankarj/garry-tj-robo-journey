---
name: fanuc-topic-writer
description: Write FANUC topic pages from docs/_templates/topic.md with Mermaid diagrams and official/repo references. Use when adding or filling FANUC documentation topics.
---

# Skill: FANUC topic writer

## Trigger
New or stub FANUC topic under `docs/fanuc/`.

## Prerequisites
- [ ] Template `docs/_templates/topic.md` exists
- [ ] Target folder chosen (industrial-arm, collaborative, controller-pendant, etc.)

## Steps

### 1. Scope
Confirm topic title, persona depth, cobot vs industrial if relevant.

### 2. Draft
Copy template structure into `temp/fanuc-topic-writer/<slug>.md`. Fill:
- Overview, definition
- System block diagram (Mermaid flowchart)
- Use case diagram (Mermaid)
- Sequence diagram (Mermaid) when a procedure exists
- Safety notes
- Official references (URLs/placeholders — no verbatim manuals)
- Repo references (`docs/…`, `programs/…`)

### 3. Promote after accept
Write to `docs/fanuc/<area>/<slug>.md`. Run `fanuc-knowledge-sync`.

## Rules
- **NEVER** scrape or paste copyrighted OEM manual text.
- Keep stubs honest: mark TODO where PDFs/notes are still pending.

## Completion
Topic draft in temp, then promoted page + index update.
