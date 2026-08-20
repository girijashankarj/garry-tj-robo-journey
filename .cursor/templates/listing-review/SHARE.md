# Share the pack

Templates in this folder are **committed**. Packs under `temp/clients/` are **not**. A clone on another machine has SHARE.md and QUALITY.md. It does **not** have any `temp/clients/…` example.

## Run

1. Clone the repo. Open it in Cursor.
2. `/fanuc-review` (or `@fanuc-review-agent`).
3. Output is created locally: `temp/clients/<org-slug>/<program-slug>/`

## Copy (self-contained)

Zip or copy **that whole folder**. It must contain only relative links:

```text
intake.md
code/as-received.ls
doc/00-before.md … 04-design.md
```

**Primary file to send:** `doc/04-design.md` (must stand alone). The rest is working paper.

Do not link `practice/`, `docs/`, or any gitignored dry-run.

## Wipe

After the copy is off the machine: delete the clone. Do not `git add temp/`. Do not `git push` from an unfamiliar machine.

## Surroundings

If EOAT, I/O, backups, R/PR/PNS, or macros were unknown, they stay in **Asked, not provided** on `04-design.md`. When those answers arrive, run `/fanuc-review` on the **same** folder to regenerate (see the listing-review skill).
