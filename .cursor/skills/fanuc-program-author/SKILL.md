---
name: fanuc-program-author
description: Draft FANUC Teach Pendant or Karel programs after a cell clarification gate. Use when the user asks for FANUC code, a robot program, pick/place, path, or I/O handshake.
---

# Skill: FANUC program author

## Trigger
User wants new FANUC TP or Karel code (arm or cobot).

## Prerequisites
- [ ] Brand is FANUC (or user confirmed)
- [ ] Clarification gate completed or assumptions listed
- [ ] Output dir `temp/fanuc-program-author/` exists (create if needed)

## Steps

### 1. Clarification (relevant only)
Ask as needed: model, controller, teach pendant, EOAT/gripper, payload, UTOOL/UFRAME, I/O, DCS/collaborative vs industrial, home/recovery, envelope/tour size, TP vs Karel.

### 2. Draft
- Create `temp/fanuc-program-author/` files (`.ls` or `.kl` plus a short `.md` assumptions note).
- Comment the program for the active persona.
- Do **not** write into `programs/` yet.

### 3. Review with user
- Show assumptions, I/O map, motion outline.
- Wait for accept.

### 4. Promote (only after accept)
- Copy to `programs/fanuc/tp/` or `programs/fanuc/karel/`.
- Run skill `fanuc-knowledge-sync`.

## Rules
- **NEVER** invent plant I/O numbers as if they were measured on a real cell.
- **NEVER** treat drafts as verified motion.
- **ALWAYS** state home/safe pose if motion is included.

## Completion
Draft in `temp/fanuc-program-author/` with assumptions; promoted only after accept.
