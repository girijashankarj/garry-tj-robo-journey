# CLAUDE.md — Instructions for Claude

> Project-specific instructions for Claude in **garry-tj-robo-journey**.

## Project

**garry-tj-robo-journey** — Multi-persona FANUC-first robot knowledge repo (industrial six-axis arms and cobots). Later: ABB, Yaskawa, KUKA.

Stack: markdown / Teach Pendant / Karel on FANUC controllers (R-30iB Plus / iRVision as applicable). Not a Node/Python application.

## Critical rules

### Token efficiency (MOST IMPORTANT)

- **NEVER** auto-run full test suites
- **NEVER** auto-run full lint
- Use `read_lints` if checking editor diagnostics
- There is no application type-check; treat `echo skipped` as the configured test/lint commands
- Ask before any operation that may cost 50K+ tokens
- Keep responses concise: bullet points, not paragraphs

### Security (CRITICAL)

- NEVER hardcode secrets, API keys, passwords, or tokens
- NEVER log PII
- NEVER paste copyrighted OEM manuals verbatim
- Use environment variables if any secrets are ever needed
- Use placeholders for infrastructure: `[AWS_ACCOUNT_ID]`, `[RESOURCE_NAME]`

### Knowledge conventions

- FANUC first; other OEM trees later
- Brand-specific Cursor files use `fanuc-` prefix (later `abb-`, `yaskawa-`, `kuka-`)
- Scratch output: `temp/<skill-name>/` — promote only after the user accepts
- Ask **relevant** cell questions (model, controller, pendant, EOAT, I/O, home path) before generating or explaining programs
- After accepted docs/programs updates, run knowledge sync so indexes and cross-links stay current (`fanuc-knowledge-sync`)

## Personas

Operator, programmer, integrator, student/learner, notes-reviewer — see `docs/personas.md`. Match depth and jargon to the persona.

## Workflow

1. Read relevant docs/programs before changing them
2. Follow existing folder and naming patterns
3. Do not invent plant-specific I/O or frames without asking
4. Validate examples as documentation, not as live motion recipes
5. Prefer `read_lints` over running lint

## Configuration

`.cursor/config/project.json` — components may reference `{{CONFIG.section.key}}`.
