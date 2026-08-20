---
name: fanuc-knowledge-sync
description: After accepted topic, program, or doc changes, check indexes and cross-links. Use when anything in docs/, programs/, or FANUC cursor files was updated.
---

# Skill: FANUC knowledge sync

## Trigger
A topic, program, README, or FANUC agent/skill was accepted and written to the repo.

## Steps

### 1. What changed
List added/edited paths.

### 2. Checklist
- [ ] `docs/fanuc/README.md` index lists new/renamed topics
- [ ] Topic "Repo references" point at real files
- [ ] `programs/fanuc/README.md` lists new programs
- [ ] Root `README.md` if navigation changed
- [ ] `CHANGELOG.md` under `[Unreleased]`
- [ ] `AGENTS.md` / `CLAUDE.md` if conventions changed
- [ ] Related stubs (e.g. TP topic vs sample program) still agree
- [ ] No new secrets or verbatim OEM manuals

### 3. Report
Table: file | needed update | done / skipped (why).

## Rules
- **ALWAYS** run this after promote from temp.
- Do not invent extra topics; only fix drift from this change.

## Completion
Drift report plus any index/link edits applied.
