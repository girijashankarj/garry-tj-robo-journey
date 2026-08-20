---
name: fanuc-program-author
description: Draft FANUC TP or Karel for study drills or cell variants after a clarification gate. Use for new programs, pick/place, path, I/O handshake, or practice variants.
---

# Skill: FANUC program author

## Trigger
New FANUC code, or a variant of `practice/fanuc/00N-*/`.

## Steps
1. Clarification (relevant fields only).
2. Draft unpublished `.ls`/`.kl` plus assumptions. Match study-guide tone.
3. User accept.
4. Promote: new drill under `practice/fanuc/` **or** cell program under `programs/fanuc/tp/` or `karel/`.
5. `fanuc-knowledge-sync`.

## Rules
- **NEVER** invent measured plant I/O.
- **NEVER** paste OEM manuals into the published guide.
- **ALWAYS** state home/safe if there is motion.
- **ALWAYS** put a FANUC-rights + educational / own-consent comment in `.ls` (see `LEGAL.md`).

## Rights
Include `LEGAL.md` notices on promoted docs and programs. FANUC retains all rights. Educational use; user consent and risk. Public credit: Garry TJ only.
