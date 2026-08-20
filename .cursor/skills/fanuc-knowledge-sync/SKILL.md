---
name: fanuc-knowledge-sync
description: After accepted topic, practice, or program changes, check indexes and cross-links. Use when docs/, practice/, programs/, or FANUC cursor files changed.
---

# Skill: FANUC knowledge sync

## Trigger
Accepted edit to the study guide, a drill, or a promoted cell program.

## Steps

### 1. What changed
List paths.

### 2. Checklist
- [ ] `docs/fanuc/README.md`
- [ ] `docs/fanuc/how-to-read-a-guide.md`
- [ ] `docs/fanuc/learning-path.md` if modules or drills changed
- [ ] `docs/fanuc/topic-map.md` if atoms or unions changed
- [ ] `docs/glossary.md` / `docs/jargons.md` if new terms were introduced
- [ ] `practice/fanuc/README.md`
- [ ] Each drill has `code/solution.ls` and `doc/guide.md` (one mermaid program flow + block table)
- [ ] Motion/frame/OFFSET/pallet/pick/skip pages have Path / origin Mermaid (1-2-3-4 vs 1'-2'-3'-4' where OFFSET)
- [ ] No `docs/grossary.md`
- [ ] `programs/fanuc/README.md` if `tp/` or `karel/` changed
- [ ] Root `README.md` / `CHANGELOG.md`
- [ ] `AGENTS.md` if conventions changed
- [ ] No secrets or verbatim OEM manuals
- [ ] FANUC-rights + educational consent footer present
- [ ] Public credit Garry TJ only
- [ ] No unpublished local scratch copied into docs
- [ ] Incoming listings stay under `temp/clients/` (not `practice/` / `programs/`) unless explicit redact-and-promote

### 3. Report
Table: file | update | done / skipped.

## Rules
- **ALWAYS** run after promote into `docs/`, `practice/`, or `programs/`.
- Do not invent extra topics.

## Completion
Drift report plus index/link edits.

## Rights
Include `LEGAL.md` notices on promoted docs and programs. FANUC retains all rights. Educational use; user consent and risk. Public credit: Garry TJ only.
