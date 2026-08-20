# AGENTS.md — Instructions for AI Agents

**garry-tj-robo-journey** is a **study guide plus Cursor tutor** (articles + practice drills), FANUC-first. Later: ABB, Yaskawa, KUKA. Author: **Garry TJ**. Educational use only (`LEGAL.md`).

Config: `.cursor/config/project.json`. Handbook files may still use `{{CONFIG.section.key}}`.

## Product

- **Learn:** `docs/fanuc/`
- **Practice:** `practice/fanuc/` (`code/` + `doc/guide.md`)
- **Promote:** `programs/fanuc/tp/` or `karel/` after the user accepts a real-cell program
- Public credit: **Garry TJ** only

## Study modes

See `docs/personas.md`.

## Cursor cases

| Intent | Use |
|--------|-----|
| Learn | `/fanuc-topic`, `@fanuc-docs-agent` (`fanuc-path-diagram` for OFFSET 1-2-3-4 / 1'-2'-3'-4') |
| Drill / generate | `/fanuc-program`, `@fanuc-programmer-agent` |
| Explain code | `/fanuc-explain`, `@fanuc-explainer-agent` |
| Incoming listing pack (unpublished) | `/fanuc-review`, `@fanuc-review-agent` — pack is local `temp/clients/…`; copy folder per `.cursor/templates/listing-review/SHARE.md` |
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
| `docs/` | Study articles (`topic-map.md` = atom vs union) |
| `practice/` | Numbered drills |
| `programs/` | Promoted cell programs |
| `.cursor/` | Harness |

## Cursor harness (keep small)

Fanuc tutors: `@fanuc-docs-agent`, `@fanuc-programmer-agent`, `@fanuc-explainer-agent`, `@fanuc-review-agent`, `@fanuc-knowledge-sync`.
Also useful: `@diagram-agent`, `@docs-agent` / `@doc-sync-agent`, `@git-agent`, `@guardrail-agent`, `@security-audit-agent`.

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

## Rights

See [`LEGAL.md`](LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
