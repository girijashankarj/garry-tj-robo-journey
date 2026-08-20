# User alarm (UALM)

> Status: reviewed  
> Brand: FANUC  
> Mode: programmer, operator, learner  
> Track: 01 HandlingTool  
> Practice: `practice/fanuc/020-user-alarm`

## Overview

**UALM[n]** raises a **user alarm** the operator sees on the pendant. The **text** is configured on the controller (User Alarm setup), not typed in the TP line. Unlike **MESSAGE**, a user alarm is a **fault-style** event (often with ABORT or a stop — confirm on your software).

## When to use

- Handshake timeout, missing part, “do not continue”
- Not for: chatty “cycle started” (use MESSAGE)
- Not for: fence / SI/SO (safety I/O)

## Definition

Placeholder `UALM[1]` in this repo. Map n and the message string on the cell. Pair with JMP to a recovery home or ABORT. See [`message.md`](message.md).

## System

```mermaid
flowchart TB
  cond{"timeout or IF?"}
  ualm["UALM n"]
  stop(["ABORT or home"])
  cond -.->|fault| ualm
  ualm --> stop
  classDef dec fill:#FFF2CC,stroke:#D6B656
  classDef fault fill:#F8CECC,stroke:#B85450
  classDef term fill:#F5F5F5,stroke:#666666
  class cond dec
  class ualm fault
  class stop term
```

## Worked example

Atom: [`020-user-alarm`](../../../practice/fanuc/020-user-alarm/). Union: [`007-wait-gripper`](../../../practice/fanuc/007-wait-gripper/) (`doc/guide.md` program flow).

## Practice

- [`020-user-alarm`](../../../practice/fanuc/020-user-alarm/)
- [`007-wait-gripper`](../../../practice/fanuc/007-wait-gripper/)

## Common mistakes

- Assuming UALM[1] text from this repo
- Using UALM where a non-stopping MESSAGE was enough
- Skipping operator-readable alarm text on the controller

## Safety notes

Prove in T1. Site SOP and OEM manuals override this page.

## Official references

On manuals **licensed to your site**: User Alarm, UALM instruction. Do not paste OEM pages here.

## Repo references

- [`message.md`](message.md)
- [`../alarms/overview.md`](../alarms/overview.md)
- [`../topic-map.md`](../topic-map.md)

## Rights

See [`LEGAL.md`](../../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
