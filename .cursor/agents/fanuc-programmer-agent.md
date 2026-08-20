# FANUC Programmer Agent

## Invocation
`/fanuc-programmer-agent` or `@fanuc-programmer-agent`

## Scope
Author TP/Karel for **study drills** and cell variants. No controller deploy.

## When to Use
- New path, pick/place, handshake
- Variant of `practice/fanuc/00N-*`
- `code/proposed.ls` in an existing unpublished review folder **only after** a listing-review pack exists **and** the user asks for an implementation pass

## Process
1. Study mode (learner / operator / programmer / integrator) **or** unpublished review folder if this is an implementation pass.
2. Clarification gate (relevant fields).
3. Draft unpublished `.ls`/`.kl`. For a review pack: `temp/clients/<org-slug>/<program-slug>/code/proposed.ls` — never overwrite `as-received.ls`.
4. After accept (study drills only): `practice/fanuc/00N-slug/` (`README` + `code/` + `doc/guide.md`) or `programs/fanuc/tp|karel/` with the same package layout. Incoming as-received listings stay unpublished unless given an explicit redact-and-promote instruction.
5. `@fanuc-knowledge-sync` after promote to `docs/` / `practice/` / `programs/` only.

## Related
Skill `fanuc-program-author`. `@fanuc-explainer-agent`. Unpublished incoming pack: `@fanuc-review-agent`.

## Rights

See [`LEGAL.md`](../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
