# Contributing

This is an educational HandlingTool study guide. Prefer small, reviewable additions.

## Add an article

1. Copy [`docs/_templates/topic.md`](docs/_templates/topic.md).
2. Put it under `docs/fanuc/<area>/`.
3. Link it from [`docs/fanuc/README.md`](docs/fanuc/README.md) and [`docs/fanuc/learning-path.md`](docs/fanuc/learning-path.md). Use relative `.md` paths (the local UI rewrites them to in-app routes).
4. Link at least one `practice/fanuc/` drill when the topic is programmable.
5. Use `/fanuc-topic` or `@fanuc-docs-agent`, then `@fanuc-knowledge-sync`.

Do not paste OEM manuals. Official-reference sections should name **what to look up on licensed site manuals**, not dump pages.

## Add a drill

Guides use [`docs/fanuc/how-to-read-a-guide.md`](docs/fanuc/how-to-read-a-guide.md) for GitHub readers. Authors: [mermaid-program-flow](.cursor/rules/documentation/mermaid-program-flow.mdc) and, for TCP geometry, [mermaid-path-origin](.cursor/rules/documentation/mermaid-path-origin.mdc) (`fanuc-path-diagram`).

1. Next id under `practice/fanuc/00N-slug/` with:
   - `README.md` (statement)
   - `code/solution.ls`
   - `doc/guide.md` from [`docs/_templates/program-guide.md`](docs/_templates/program-guide.md) (path/origin sketch if the TCP moves; one mermaid program flow with shapes/L#/colors — [mermaid-program-flow](.cursor/rules/documentation/mermaid-program-flow.mdc); block-by-block)
2. Placeholder I/O, frames, and poses only.
3. Index row in [`practice/fanuc/README.md`](practice/fanuc/README.md).
4. ATTR size fields may stay zero — these are study listings, not backups.

Inner pages may use the short LEGAL pointer from the templates. Keep the full notice on `LEGAL.md` and the root README.

`Status: reviewed` on an article means a **curriculum** pass. Confirm pendant menus on the cell before you treat wording as official.

## Promote a cell program

After the user accepts a real-cell program, store `code/` + `doc/` under `programs/fanuc/tp/<name>/`, not as a second copy of a drill.

## Legal

Original writing is licensed in [`LICENSE.md`](LICENSE.md). FANUC rights and educational consent: [`LEGAL.md`](LEGAL.md).
