# AGENTS.md — Instructions for AI Agents

**garry-tj-robo-journey** is a **study guide plus Cursor tutor** (articles + practice drills), FANUC-first. Later: ABB, Yaskawa, KUKA. Author: **Garry TJ**. Educational use only (`LEGAL.md`).

Config: `.cursor/config/project.json`. Handbook files may still use `{{CONFIG.section.key}}`.

## Product

- **Learn:** `docs/fanuc/`
- **Practice:** `practice/fanuc/`
- **Promote:** `programs/fanuc/tp/` or `karel/` after the user accepts a real-cell program
- Public credit: **Garry TJ** only

## Study modes

See `docs/personas.md`.

## Cursor cases

| Intent | Use |
|--------|-----|
| Learn | `/fanuc-topic`, `@fanuc-docs-agent` |
| Drill / generate | `/fanuc-program`, `@fanuc-programmer-agent` |
| Explain code | `/fanuc-explain`, `@fanuc-explainer-agent` |
| Sync indexes | `@fanuc-knowledge-sync` |

Promote accepted work into `docs/`, `practice/`, or `programs/`.

## Brand convention

- Default OEM: FANUC. Do not invent ABB / Yaskawa / KUKA trees yet.
- Brand-specific Cursor files: `fanuc-*` (later `abb-*`, `yaskawa-*`, `kuka-*`).

## Clarification gate

Before generating or explaining programs, ask **only relevant** fields: model, controller, pendant, EOAT/gripper, payload, UTOOL/UFRAME, I/O, DCS vs industrial, home/recovery, envelope, TP vs Karel.

## Paths

| Path | Purpose |
|------|---------|
| `docs/` | Study articles |
| `practice/` | Numbered drills |
| `programs/` | Promoted cell programs |
| `.cursor/` | Harness |

## After accepted updates

Run `fanuc-knowledge-sync`: docs index, practice index, programs README, CHANGELOG, AGENTS if conventions changed.

## Safety and legal

- Not a substitute for OEM manuals or site safety
- **NEVER** hardcode secrets or log PII
- **NEVER** commit or paste copyrighted manuals
- Placeholders: `[ACCOUNT_ID]`, `[RESOURCE_NAME]`
- Do not present this material as an official FANUC course or agenda

## Token efficiency

- No full test suite or full lint
- Confirm before 50K+ token operations

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
