---
name: fanuc-explain
description: FANUC explain — FANUC-first robot knowledge workflow.
---

# Command: FANUC explain

## Invocation
`/fanuc-explain`

## Description
Follow `@fanuc-explainer-agent`. Write `temp/fanuc-program-explain/`.

## Action
1. Apply clarification gate (relevant cell fields only).
2. Follow skill `fanuc-program-explain`.
3. After user accepts a promote, run skill `fanuc-knowledge-sync`.

## When to Use
FANUC queries, code, explanations, or topic docs.

## Expected Output
Scratch files under `temp/<skill-name>/`, then optional promote to `docs/` or `programs/`.
