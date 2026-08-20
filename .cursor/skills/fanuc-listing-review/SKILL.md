---
name: fanuc-listing-review
description: Incoming or faulty TP/Karel listing — unpublished before/analysis/verdict/suggestions/design pack. Use when the user pastes cell code to understand, fault-find, or plan a refactor. Do not write replacement code unless asked.
---

# Skill: FANUC listing review

## Trigger

Incoming `.ls` / `.kl` (working, faulty, or to refactor). “What does this program do?” “Why does it abort?” “Document the branches.” Cell surroundings (EOAT, I/O, backups, R/PR/PNS, macros). Not a `practice/fanuc/00N-*` drill.

New answers for an **existing** pack folder: regenerate (step 9), do not invent a second org.

## Output root

Unpublished, **created on this machine**:

`temp/clients/<org-slug>/<program-slug>/`

A clone does **not** include this folder. Templates **are** in git: `.cursor/templates/listing-review/` (`SHARE.md`, `QUALITY.md`, stubs).

Copy stubs from those templates. Save as-received to `code/as-received.ls`. **Do not** write `code/proposed.ls` unless the user asks for an implementation pass.

Share: zip the pack folder (relative links only). Primary send file: `doc/04-design.md`. Then the clone may be deleted. **NEVER** `git add temp/`. **NEVER** `git push` from an unfamiliar machine. See `SHARE.md`.

Before calling the pack done, complete [QUALITY.md](../../templates/listing-review/QUALITY.md). **Stop** if any hard-stop box is false.

**NEVER** copy this listing into `practice/` or `programs/` unless the user later says to redact and promote as a drill.

## Steps

1. **Intake gate.** If required fields are empty, ask and **stop**. Do not invent I/O or millimetres. Required: org slug, program name, this pass (understand / fault-find / refactor-plan), listing source, controller/version if known, symptom if any.
2. **Cell surroundings.** Fill the intake table (EOAT, peripherals, I/O, frames/home, R/PR/P[], PNS/RSR/macros, backups SRAM/FROM/MD/USB/auto backup, T1/DCS). Unknown is valid — record **Asked, not provided**. Do not stop the first pack if only the listing exists.
3. Fill `doc/00-before.md` (inventory, CALL tree, **Cell vs listing**).
4. Fill `doc/01-analysis.md`. Every JMP, LBL, IF, WAIT, SKIP, UALM, CALL in `/MN` must appear. Program-flow Mermaid (`mermaid-program-flow`). Path/origin Mermaid if the TCP moves (`fanuc-path-diagram`). Run the pendant check on the as-received listing (from `app/robo-journey-website/`: `npm run validate:ls -- ../../temp/clients/<org>/<program>/code/as-received.ls`) and note unexplained errors in the analysis.
5. Fill `doc/02-verdict.md` (severity table; fact vs assumption). Unknown gripper/I/O/backup may be P2 **assumption**.
6. Fill `doc/03-suggestions.md` (numbered, effort S/M/L, ranked). Do not implement.
7. Fill `doc/04-design.md` last. Standalone. Include **Cell surroundings** (facts only) and **Asked, not provided**. Relative links only (no `practice/`).
8. **Missing CALL files:** if `/MN` has `CALL` and the callee is not in the paste, ask for those listings **before** a full `04` architecture. Until they arrive, mark architecture **Incomplete — missing callees**.
9. **Regenerate.** Listing changed → rewrite 00–04; keep prior listing as `code/as-received.vN.ls` if history is wanted. Surroundings only → update `intake.md`, then 00 (cell vs listing), 02 (assumptions that became facts), 03 if ranks change, **always** 04 surroundings + asked-not-provided. Do **not** redraw the flowchart unless `/MN` changed.
10. **QUALITY.md.** If program-flow is still stub `start`/`END`, or path/origin is stub `1`/`2` while motion exists, rewrite — do not leave stubs.

## Voice

Professional and cell-specific. Label assumptions. Not curriculum/drill voice. No Cursor product talk in the pack. Short FANUC-rights footer from the stubs.

## Rules

- **NEVER** invent plant I/O or millimetres as fact.
- **NEVER** paste OEM manuals.
- Default: documents only.
- Org slug: safe folder name (`org-a` if sensitive).
- **NEVER** finish with stub mermaid from the templates.
- **NEVER** describe missing CALL programs as known behavior.
- **NEVER** depend on gitignored example packs; QUALITY.md is the bar.

## Related

`/fanuc-review`, `@fanuc-review-agent`, `SHARE.md`. Implementation later: `@fanuc-programmer-agent` writes `code/proposed.ls` in the same folder.

## Rights

FANUC retains all rights in its trademarks, software, and manuals. Unofficial pack. Site SOP and licensed manuals override it.
