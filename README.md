# garry-tj-robo-journey

A shared go-through repo for **multiple personas** learning and working with industrial robots. **FANUC first** (six-axis arms and collaborative robots). Later brands: ABB, Yaskawa, KUKA.

## What lives here

| Path | Purpose |
|------|---------|
| [`docs/`](docs/) | Topic manuals: overview, definitions, Mermaid diagrams, official and repo references |
| [`programs/`](programs/) | Teach Pendant, Karel, and sample programs (by brand) |
| [`temp/`](temp/) | Skill scratch output (`temp/<skill-name>/`). Not promoted until accepted |
| [`inbox/pdf/`](inbox/pdf/) | Future notes ingest (your/friend PDFs). Not processed in this cut |
| [`.cursor/`](.cursor/) | Rules, agents, skills, commands, hooks, guardrails |

Brand-specific Cursor files use a prefix: `fanuc-*` now; later `abb-*`, `yaskawa-*`, `kuka-*`.

## Personas

See [`docs/personas.md`](docs/personas.md): operator, programmer, integrator, student/learner, notes-reviewer.

## How to work in Cursor

1. Open this folder as the workspace.
2. Restart Cursor so `.cursor/` rules, agents, skills, and hooks load.
3. For FANUC program or explanation work, use `@fanuc-programmer-agent`, `@fanuc-explainer-agent`, or `/fanuc-program` / `/fanuc-explain`.
4. Agents ask **only relevant** cell details (model, controller, pendant, EOAT, I/O, home path, and so on) before generating or explaining code.
5. After accepted topic/program/doc changes, run `@fanuc-knowledge-sync` (or `/fanuc-topic` then sync) so indexes and cross-links stay current.

## Safety

Robot motion and I/O in this repo are **documentation and examples**, not a substitute for OEM manuals, DCS setup, or site safety procedures. Validate on a teach pendant in a controlled cell.

## License / manuals

Do not commit copyrighted OEM manuals verbatim. Link official references; keep original notes in `inbox/` until reviewed.
