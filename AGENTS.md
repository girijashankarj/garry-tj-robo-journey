# AGENTS.md — Instructions for AI Agents

> Instructions for agents working in **garry-tj-robo-journey**, a multi-persona FANUC-first robot knowledge repo (industrial arms and cobots). Later brands: ABB, Yaskawa, KUKA.

## Project overview

This is a **docs + robot-programs** repo (no application package.json). Knowledge lives in `docs/`; Teach Pendant, Karel, and sample programs live in `programs/`. Cursor configuration lives in `.cursor/`.

Configuration: `.cursor/config/project.json`. Handbook components still use `{{CONFIG.section.key}}` placeholders that resolve from that file.

## Personas (go-through)

Work for the persona in context. See `docs/personas.md`.

| Persona | Focus |
|---------|--------|
| **Operator** | Safe teach, jogging, production recovery, pendant UI — not cell redesign |
| **Programmer** | TP / Karel structure, registers, motion, I/O mapping, comments |
| **Integrator** | Cell layout, EOAT, safety (DCS), PLC/HMI, commissioning |
| **Student / learner** | Definitions, diagrams, small examples; no assumed plant jargon |
| **Notes-reviewer** | Inbox notes vs original wording; promote only after review |

## Brand convention

- **FANUC first.** Do not invent ABB / Yaskawa / KUKA content until those trees exist.
- Brand-specific Cursor files **must** use a prefix: `fanuc-*` now; later `abb-*`, `yaskawa-*`, `kuka-*`.
- Prefer `@fanuc-programmer-agent`, `@fanuc-explainer-agent`, `/fanuc-program`, `/fanuc-explain` when those exist.

## Cell questions (required)

Before generating or explaining programs, ask **only relevant** cell details, for example:

- Robot model and payload
- Controller (e.g. R-30iB Plus) and software options (iRVision, DCS, etc.)
- Teach pendant type
- EOAT, I/O, home / safe path, frame usage

Do not dump a full questionnaire when the user already supplied the facts.

## Paths

| Path | Purpose |
|------|---------|
| `docs/` | Topic manuals: overview, definitions, diagrams, references |
| `programs/` | Robot programs by brand |
| `temp/<skill-name>/` | Skill scratch only — not promoted until accepted |
| `inbox/` | Incoming notes/PDFs; not processed until reviewed |
| `.cursor/` | Rules, agents, skills, commands, hooks |

## After accepted updates

When docs or programs are accepted, check **cross-links and indexes** (`@fanuc-knowledge-sync` / `/fanuc-topic` then sync). Do not leave orphan topics or programs.

## Safety and legal

- Examples here are **not** a substitute for OEM manuals, DCS, or site safety.
- **NEVER** hardcode secrets, API keys, passwords, or tokens.
- **NEVER** log PII (names, emails, phone numbers, badges).
- **NEVER** commit copyrighted OEM manuals verbatim. Link official references; keep originals in `inbox/` until reviewed.
- Use placeholders for infrastructure: `[ACCOUNT_ID]`, `[RESOURCE_NAME]`.

## Token efficiency

- **NEVER** auto-run full test suites (there is no app test suite; do not invent one).
- **NEVER** auto-run full lint.
- Prefer targeted file reads and type-check / skipped commands from `project.json`.
- Require confirmation before 50K+ token operations.

## Component map

- **Rules**: `.cursor/rules/*.mdc`
- **Agents**: `.cursor/agents/*.md`
- **Skills**: `.cursor/skills/*/SKILL.md`
- **Commands**: `.cursor/commands/*.md`
- **Hooks**: `.cursor/hooks/*.sh`
