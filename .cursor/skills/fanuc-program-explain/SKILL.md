---
name: fanuc-program-explain
description: Explain existing FANUC TP or Karel programs with annotations. Use when the user pastes FANUC code or asks what a program in programs/fanuc does.
---

# Skill: FANUC program explain

## Trigger
User provides FANUC source (paste, path, or screenshot transcription) and wants an explanation.

## Prerequisites
- [ ] Source text available
- [ ] Relevant cell questions asked if I/O or frames are unnamed

## Steps

### 1. Context
Ask only missing: model, controller, pendant, EOAT, frames, I/O meaning, home.

### 2. Explain
Write `temp/fanuc-program-explain/explanation.md`:
- Purpose summary
- Step sequence
- Block annotations
- Unknowns vs confirmed facts
- Safety notes
- Links to `docs/fanuc/` topics

### 3. Optional promote
If the user wants this as a lasting doc, use `fanuc-topic-writer` after accept.

## Rules
- **NEVER** guess I/O device names as fact; label as assumption.
- Prefer tables for registers and I/O.

## Completion
Annotated explanation in `temp/fanuc-program-explain/`.
