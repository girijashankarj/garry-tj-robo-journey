# garry-tj-robo-journey

Study guide by **Garry TJ** for industrial robots, with **Cursor as the tutor**. **Track 01 is FANUC HandlingTool** (six-axis and collaborative). ABB, Yaskawa, and KUKA are future tracks — **no pages yet**.

Educational material only. See [`LEGAL.md`](LEGAL.md) for FANUC rights and use at your own consent and risk. Original writing: [`LICENSE.md`](LICENSE.md). How to add pages: [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Learning path

1. Pick a **mode**: operator, programmer, integrator, or learner — [`docs/personas.md`](docs/personas.md)
2. Read articles in [`docs/fanuc/`](docs/fanuc/) (order: [`learning-path.md`](docs/fanuc/learning-path.md)). Terms: [`docs/glossary.md`](docs/glossary.md), shop talk: [`docs/jargons.md`](docs/jargons.md)
3. Solve drills in [`practice/fanuc/`](practice/fanuc/). Start at [`001-home-safe`](practice/fanuc/001-home-safe/) after [how to read a program guide](docs/fanuc/how-to-read-a-guide.md).
4. Use Cursor for the case you are in (table below)

## Cursor cases

| You want to | Command / agent |
|-------------|-----------------|
| Study a concept | `/fanuc-topic` or `@fanuc-docs-agent` |
| Solve or vary a drill | `/fanuc-program` or `@fanuc-programmer-agent` |
| Explain pasted TP / Karel | `/fanuc-explain` or `@fanuc-explainer-agent` |
| After an accepted edit, fix indexes | `@fanuc-knowledge-sync` |

Agents ask only the **cell fields that matter** (model, controller, pendant, EOAT, I/O, frames, home). Promote accepted work into `docs/`, `practice/`, or `programs/`.

## Layout

| Path | Role |
|------|------|
| [`docs/fanuc/`](docs/fanuc/) | Topic articles |
| [`docs/fanuc/how-to-read-a-guide.md`](docs/fanuc/how-to-read-a-guide.md) | Chart legend for drill guides |
| [`docs/fanuc/topic-map.md`](docs/fanuc/topic-map.md) | Atom vs union map |
| [`docs/glossary.md`](docs/glossary.md) | Term definitions |
| [`docs/jargons.md`](docs/jargons.md) | Shop-floor slang vs pendant meaning |
| [`practice/fanuc/`](practice/fanuc/) | Numbered problems: `code/` + `doc/` |
| [`programs/fanuc/`](programs/fanuc/) | Cell programs you promote (`tp/`, `karel/`) |
| [`.cursor/`](.cursor/) | Rules, `fanuc-*` agents/skills, hooks |
| [`LEGAL.md`](LEGAL.md) | FANUC rights + educational use / own consent |
| [`LICENSE.md`](LICENSE.md) | License for Garry TJ original writing |

## Safety

Examples are study material, not a commissioned cell. Prove in T1, then T2 step, then Auto. Site SOP and OEM manuals override this repo.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
