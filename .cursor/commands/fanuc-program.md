---
name: fanuc-program
description: FANUC program — FANUC-first robot knowledge workflow.
---

# Command: FANUC program

## Invocation
`/fanuc-program`

## Description
Follow `@fanuc-programmer-agent`. Draft under `temp/fanuc-program-author/`.

## Action
1. Apply clarification gate (relevant cell fields only).
2. Follow skill `fanuc-program-author`.
3. After user accepts a promote, run skill `fanuc-knowledge-sync`.

## When to Use
FANUC queries, code, explanations, or topic docs.

## Expected Output
Scratch files under `temp/<skill-name>/`, then optional promote to `docs/` or `programs/`.
