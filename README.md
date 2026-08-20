# garry-tj-robo-journey

Study guide by **Garry TJ** for industrial robots, with **Cursor as the tutor**. FANUC HandlingTool first (six-axis arms and collaborative robots). Later tracks: ABB, Yaskawa, KUKA.

Educational material only. See [`LEGAL.md`](LEGAL.md) for FANUC rights and use at your own consent and risk.

## Learning path

1. Pick a **mode**: operator, programmer, integrator, or learner — [`docs/personas.md`](docs/personas.md)
2. Read articles in [`docs/fanuc/`](docs/fanuc/) (order: [`learning-path.md`](docs/fanuc/learning-path.md))
3. Solve drills in [`practice/fanuc/`](practice/fanuc/) (statement → your attempt → `solution.ls`)
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
| [`practice/fanuc/`](practice/fanuc/) | Numbered problems + `solution.ls` |
| [`programs/fanuc/`](programs/fanuc/) | Cell programs you promote (`tp/`, `karel/`) |
| [`.cursor/`](.cursor/) | Rules, `fanuc-*` agents/skills, hooks |
| [`LEGAL.md`](LEGAL.md) | FANUC rights + educational use / own consent |

## Safety

Examples are study material, not a commissioned cell. Prove in T1, then T2 step, then Auto. Site SOP and OEM manuals override this repo.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
