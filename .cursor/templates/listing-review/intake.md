# Intake

> Org slug: `{org-slug}`  
> Program: `{program-slug}`  
> Path: `temp/clients/{org-slug}/{program-slug}/`  
> Pass: understand | fault-find | refactor-plan  
> Implementation this pass: **no** (default)

## Required (stop if empty)

| Field | Answer | Gap? |
|-------|--------|------|
| Org slug | | |
| Program name | | |
| This pass | understand / fault-find / refactor-plan | |
| Listing source | paste / file / backup excerpt | |
| Controller family + software version | known / unknown | |
| Symptom (if any) | alarm / crash / cycle time / undocumented / none | |

## Cell surroundings

Unknown is valid. Never invent. Copy unknowns to **Asked, not provided** on `04-design.md`.

| Topic | Answer | Known / unknown |
|-------|--------|-----------------|
| Arm / EOAT / gripper / payload | | |
| Peripherals (PLC, vision, conveyor, other) | | |
| I/O map (RI/RO DI/DO GI/GO SOP UOP SI/SO) | | |
| UFRAME / UTOOL / home | | |
| R[] / PR[] / P[] used vs taught | | |
| PNS / RSR / macros / CALL names | | |
| Backups: MD/USB present? SRAM vs FROM image? Auto backup set? | | |
| T1 prove-out / DCS vs industrial | | |

## Ask only if relevant

| Field | Answer | Assumption? |
|-------|--------|-------------|
| CALL targets missing from paste | | |
| Must not retain (PII, IPs, names) | | |

## Open questions

- …

## Rights

FANUC retains all rights in its trademarks, software, and manuals. This pack is unofficial. Site SOP and licensed OEM manuals override it.
