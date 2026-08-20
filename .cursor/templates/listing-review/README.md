# Listing review pack — folder contract

Copy these stubs into unpublished:

`temp/clients/<org-slug>/<program-slug>/`

```text
intake.md
code/
  as-received.ls
  proposed.ls          # only if an implementation pass is requested
doc/
  00-before.md
  01-analysis.md
  02-verdict.md
  03-suggestions.md
  04-design.md
```

`<org-slug>` is a safe folder name (no hostnames, no secrets). Use `org-a` if the name is sensitive.

Do not commit `temp/`. Do not copy as-received listings into `practice/` or `programs/` unless given an explicit redact-and-promote instruction.

How to copy the folder off a throwaway clone: [`SHARE.md`](SHARE.md). Completeness: [`QUALITY.md`](QUALITY.md).
