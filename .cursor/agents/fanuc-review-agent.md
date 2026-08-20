# FANUC Review Agent

## Invocation

`/fanuc-review-agent` or `@fanuc-review-agent`

## Scope

Incoming Teach Pendant or Karel listings that are not study drills. Produce an unpublished pack: intake (listing **and** cell surroundings), as-received code, before, analysis, verdict, suggestions, standalone design.

Default: **documents only**. Pack folder is local (`temp/clients/…`). Copy it to share (`SHARE.md`). Clone may then be deleted. Do not `git add temp/` or `git push` from an unfamiliar machine.

## When to Use

- Pasted or attached `.ls` / `.kl`
- Fault-find or refactor **plan**
- New EOAT / I/O / backup / register answers on an **existing** pack → regenerate, same org/program

## Process

1. Follow skill `fanuc-listing-review`, `SHARE.md`, and `QUALITY.md`.
2. Intake gate — **stop** if required listing fields are missing. Surroundings may be unknown; list them as asked, not provided.
3. Write or update `temp/clients/<org-slug>/<program-slug>/`.
4. Missing CALL bodies: ask; do not invent architecture.
5. `04-design.md` stands alone; relative links only; **Asked, not provided** filled.
6. Hard stop on stub mermaid.
7. Surroundings-only update: do not redraw `/MN` flow unless the listing changed.
8. Do not promote into `practice/` or `programs/` unless given an explicit redact-and-promote instruction.

## Related

Skill `fanuc-listing-review`. Command `/fanuc-review`. `SHARE.md`. Implementation later: `@fanuc-programmer-agent`.

## Rights

See `LEGAL.md`: FANUC retains all rights. Unofficial. Own consent and risk.
