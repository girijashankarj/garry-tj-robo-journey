# Pick and place — guide

> Drill: `017-pick-place`  
> Code: [`code/solution.ls`](../code/solution.ls)

## Purpose

Union of Joint approach, Linear pick/place, gripper **RO/WAIT RI**, retreat, home. Timeout fires **UALM** and **ABORT**.

## Flowchart

```mermaid
flowchart TB
  jap[J_pick_approach]
  lp[L_pick]
  grip[RO_WAIT_RI]
  ret[L_retreat]
  place[J_L_place]
  home[J_home]
  jap --> lp --> grip --> ret --> place --> home
```

## Decisions (diamond)

```mermaid
flowchart TD
  w{RI_ON_in_time}
  ok[Retreat_place_home]
  bad[UALM_ABORT]
  w -->|yes| ok
  w -->|TIMEOUT| bad
```

## Block-by-block

| Line | What | Atom |
|------|------|------|
| 0–3 | LEGAL, placeholders, frames | Remark / Frame |
| 4–5 | Approach J, pick L | J / L |
| 6–7 | Gripper ON, WAIT RI | I/O / WAIT |
| 8–13 | Retreat, place, home | L / J |
| 14 | Skip fault | JMP |
| 15–17 | UALM, ABORT | UALM |
| 18–19 | Success END | LBL |

## Safety

FINE at pick and place. I/O placeholders. Prove in T1.

## Rights

See [`LEGAL.md`](../../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
