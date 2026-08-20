# Garry TJ Robo Journey

Local docs site and 2D UFRAME path board for this repository’s FANUC HandlingTool pages. Read-only curriculum. No student accounts. Does **not** load unpublished `temp/clients/` packs.

## Start

Node 20+. From this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Light theme is the default. In Cursor: **Run and Debug → App: Chrome**.

## What it shows

- Topics from `docs/fanuc/`
- Drills from `practice/fanuc/`
- Glossary and jargons
- Search (⌘K)
- Mind map
- Path board (`/plan`): graph-paper UFRAME, J / L / C, OFFSET 1'-2'-3'-4' — **study sketch, not OEM simulation / RoboGuide**

Markdown links between those pages follow the same relative paths as on GitHub and open in-app (`/topic/…`, `/drill/…`, `/glossary`, `/jargons`). `LEGAL.md`, `.ls` listings, and other files the UI does not host stay as ordinary links.

## Rights

See [`../../LEGAL.md`](../../LEGAL.md). FANUC retains all rights. Educational use at your own consent and risk. This UI is not an official FANUC product.
