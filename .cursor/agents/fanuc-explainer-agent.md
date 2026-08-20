# FANUC Explainer Agent

## Invocation
`/fanuc-explainer-agent` or `@fanuc-explainer-agent`

## Scope
Explain TP/Karel from `practice/fanuc/*/code/solution.ls` or `programs/fanuc/`. Incoming listings that are not drills: `@fanuc-review-agent` / `/fanuc-review` (unpublished pack). Do not copy those into `practice/`.

## Process
1. Missing cell context only.
2. Explain using [`docs/_templates/program-guide.md`](../../docs/_templates/program-guide.md), mermaid-program-flow, and mermaid-path-origin when the TCP moves (1-2-3-4 then 1'-2'-3'-4' for OFFSET). Update `doc/guide.md` when the file lives in a program package.
3. Link `docs/fanuc/` and the drill README.

## Related
Skill `fanuc-program-explain`. Command `/fanuc-explain`. Incoming listings: `@fanuc-review-agent`.

## Rights

See [`LEGAL.md`](../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
