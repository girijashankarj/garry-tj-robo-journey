# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added

- Local classroom UI in [`app/robo-journey-website/`](app/robo-journey-website/) (Garry TJ Robo Journey; light/dark; path board; in-app markdown links; `npm run dev`)
- Path / origin Mermaid: OFFSET 1-2-3-4 then 1'-2'-3'-4', INC, frames, pallet, pick/place, skip; skill `fanuc-path-diagram`; rule mermaid-path-origin
- [`docs/fanuc/how-to-read-a-guide.md`](docs/fanuc/how-to-read-a-guide.md): chart legend for GitHub readers (no `.cursor` required)
- Mermaid program-flow rule: shapes (diamond, parallelogram, stadium, CALL), `L#` labels, `classDef` colors; one flowchart per guide
- Drills `009`–`021`; every drill is `README` + `code/solution.ls` + `doc/guide.md`
- TP atoms: J, L, JMP/LBL, SKIP, remark, UALM, MESSAGE, OVERRIDE, R[]; applications pick/place, pallet, skip/contour
- Pallet row/col matrix math; remarks single-line vs stacked
- `docs/glossary.md`, `docs/jargons.md`; alarms and jog/recovery articles
- `LICENSE.md` / `CONTRIBUTING.md`
- TP lexicon: `identifiers.md` and `keywords.md` (study set, not a full OEM list)
- Conceptual `doc/guide.md` for drills `002`–`005` and `008` (intent flowcharts, not line-dumps)
- `programs/fanuc/tp/README.md`: empty until a real cell program is promoted (do not copy drills here)
- Inner pages use a short LEGAL pointer; full notice stays on `LEGAL.md` and the root README
- Remaining auto-traced `doc/guide.md` files rewritten to intent flowcharts (`006`, `009`–`012`, `015`, `016`, `019`)
- Drill READMEs and `.ls` ATTR COMMENT label study ASCII (size fields may be zero)

### Fixed

- Classroom UI: relative markdown links (topics, drills, glossary, jargons, practice index) resolve from each file’s folder so hops work in the SPA

### Changed

- Root README: `/fanuc-review` row; path/origin sketches; local `app/robo-journey-website/` UI and in-app links
- VS Code launch config name: Garry TJ Robo Journey (was App: Chrome)
- Drill guides: plain-English Purpose, `/MN` listing next to the chart, Atom column links to articles; 018/016/017 say not to start there
- Drill guides: how-to-read + glossary under Block-by-block; 001 Purpose in plain English first
- Practice index: ATTR size fields called out as study ASCII, not backups
- Article/guide templates: short LEGAL pointer instead of a duplicated paragraph
- README brand scope: FANUC track only; other OEMs named as future, not present
- Cursor harness trimmed to Fanuc tutors plus a small docs/git/security slice
- `programs/fanuc/samples/` no longer duplicates practice listings
- Topic map: atoms vs unions
- Program guides: one mermaid flow with shapes, colors, and `/MN` line numbers

### Removed

- Unrelated handbook agents/skills/commands that were not Fanuc study tutors
- Duplicate Teach Pendant listings under `programs/fanuc/samples/`
- Misspelled alias `docs/grossary.md` (keep `docs/glossary.md` only)

## [0.1.0] - 2026-08-20

Commit `10cf4e3` — first published study-guide snapshot.

### Added

- `LEGAL.md`: FANUC retains all rights; educational use at the reader’s own consent and risk; public credit Garry TJ
- Practice track `practice/fanuc/` (problems `001`–`008` at this tag)
- Topic map later expanded in Unreleased; this tag had J/L/C union, offset/INC, JMP/CALL, frames, I/O, T1/T2, learning path
- Study-guide README, modes, and Cursor case table
- HandlingTool learning path (educational, not an official course agenda)

### Changed

- Public docs as curriculum articles (when to use, worked example, practice, common mistakes)
- Official-reference sections name licensed site manuals instead of placeholder URLs

## [0.0.1] - 2026-08-20

Commit `3c14f33` — repository skeleton and FANUC-prefixed Cursor harness.

## Rights

See [`LEGAL.md`](LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
