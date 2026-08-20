---
name: fanuc-topic
description: FANUC topic — FANUC-first robot knowledge workflow.
---

# Command: FANUC topic

## Invocation
`/fanuc-topic`

## Description
Follow `@fanuc-docs-agent` and template `docs/_templates/topic.md`.

## Action
1. Apply clarification gate (relevant cell fields only).
2. Follow skill `fanuc-topic-writer`.
3. After user accepts a promote, run skill `fanuc-knowledge-sync`.

## When to Use
FANUC queries, code, explanations, or topic docs.

## Expected Output
Scratch files under `temp/<skill-name>/`, then optional promote to `docs/` or `programs/`.
