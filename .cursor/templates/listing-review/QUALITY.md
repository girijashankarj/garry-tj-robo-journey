# Pack complete — do not skip

Finish **only** if every box is true. Otherwise stop and say what is missing.

## Completeness (hard stop)

- [ ] `/MN` line count matches the block table (every numbered line accounted for; remarks may group)
- [ ] Every **JMP, LBL, IF, WAIT, SKIP, UALM, CALL** in `/MN` appears in `01-analysis.md` **and** `04-design.md`
- [ ] Program-flow Mermaid is **not** the stub `start → END` with no `L#`
- [ ] If any **J / L / C / OFFSET / INC** exists: path/origin is **not** the stub `1 → 2`; if no TCP motion, say so in one sentence (do not paste a fake square)
- [ ] `04-design.md` control-flow chart has the same branches as `01` (timeout, skip, abort, END)

## Missing callees (hard stop before a full 04 architecture)

- [ ] Every `CALL` target is either in the paste **or** listed as **missing**
- [ ] If any CALL body is missing: `04` architecture section titled **Incomplete — missing callees**; do **not** describe those programs as known

## Sendable

- [ ] No PII, IPs, operator names, or plant hostnames in filenames or docs
- [ ] Every verdict row is **fact** or **assumption**
- [ ] `04-design.md` readable with `00–03` closed
- [ ] No `proposed.ls` unless an implementation pass was requested
- [ ] Surroundings that are unknown appear under **Asked, not provided** on `04-design.md` (not invented)
- [ ] Pack uses relative links only (no `practice/` paths) so a copied folder still works

Forbidden leftover from stubs: a flowchart whose only nodes are `start` and `END`, or path nodes only `1` and `2` with no OFFSET/INC story.
