# Glossary

> Status: reviewed  
> Brand: FANUC  
> Mode: learner, operator, programmer, integrator  
> Track: 01 HandlingTool

Study definitions for this guide. Confirm wording on **your** pendant and software version. Shop-floor slang: [`jargons.md`](jargons.md). Atom vs union: [`fanuc/topic-map.md`](fanuc/topic-map.md).

| Term | Meaning (study level) | Read |
|------|------------------------|------|
| **ABORT** | Ends the running program; you do not resume the same line as after a pause. | [Alarms](fanuc/alarms/overview.md) |
| **AI / AO** | Analog input / output. | [I/O](fanuc/io-frames-tools/io-classes.md) |
| **ATTR** | Header block in a `.ls` listing (comment, dates, sizes). Study files may show size fields as zero; they are not backups. | [Motion](fanuc/motion-paths-home/overview.md) |
| **Auto** | Production mode: typically operator panel + interlocks, not casual pendant start. | [T1 T2 Auto](fanuc/safety-dcs/modes-t1-t2-auto.md) |
| **CALL** | Runs another TP program, then returns. | [Registers / CALL](fanuc/programming-tp/registers-jumps-call.md), [010](../practice/fanuc/010-main-call/) |
| **Circular (C)** | Arc motion. ASCII `.ls` often shows via on one line and destination on the next. | [J/L/C](fanuc/programming-tp/motion-types-fine-cnt.md), [003](../practice/fanuc/003-circular-path/) |
| **CNT n** | Corner rounding / continuous termination (n typically 1–100). Prove FINE first. | [J/L/C](fanuc/programming-tp/motion-types-fine-cnt.md) |
| **Cobot / CRX** | Collaborative arm family (site DCS and speed limits still apply). | [Collaborative](fanuc/collaborative/overview.md) |
| **Controller** | Cabinet that runs TP, I/O, and motion (e.g. R-30iB class — confirm yours). | [Controller](fanuc/controller-pendant/overview.md) |
| **Coordinate** | Pendant key: Joint, World, User, Tool, Jog — jog direction follows this. | [Pendant](fanuc/controller-pendant/teach-pendant.md) |
| **DCS** | Dual Check Safety (and related safety functions). Not a TP style choice. | [Safety](fanuc/safety-dcs/overview.md) |
| **Deadman** | Enable switch on the pendant; release stops motion in teach. | [Jog](fanuc/motion-paths-home/jog-and-recovery.md) |
| **DI / DO** | General digital input / output (often PLC). | [I/O](fanuc/io-frames-tools/io-classes.md) |
| **EOAT** | End of arm tooling (gripper, tool, torch, etc.). | [I/O overview](fanuc/io-frames-tools/overview.md) |
| **FINE** | Termination that stops the TCP before the next instruction. | [J/L/C](fanuc/programming-tp/motion-types-fine-cnt.md) |
| **FROM / image** | System software image on the controller (vs user SRAM data). | [Backup](fanuc/controller-pendant/backup-restore.md) |
| **GI / GO** | Group I/O: several bits packed as an integer. | [I/O](fanuc/io-frames-tools/io-classes.md) |
| **HandlingTool** | Teach Pendant programming environment / language for this track. | [Learning path](fanuc/learning-path.md) |
| **Hold** | Pauses motion. In teach, releasing Shift/deadman also stops. | [Jog](fanuc/motion-paths-home/jog-and-recovery.md) |
| **Home** | Taught safe pose (`PR[]` or a home program), not mechanical zero. | [001](../practice/fanuc/001-home-safe/), [009](../practice/fanuc/009-fault-home/) |
| **GOTO** | Not a HandlingTool instruction. Use **JMP LBL**. | [JMP/LBL](fanuc/programming-tp/logic-lbl-jmp.md) |
| **Identifier** | Name or index you assign: program name, `P[]`/`PR[]`/`R[]`/`LBL[]`, I/O number, `CALL` target. | [Identifiers](fanuc/programming-tp/identifiers.md) |
| **INC** | Incremental motion: recorded pose used as a delta. | [Offset / INC](fanuc/programming-tp/offset-and-incremental.md), [004](../practice/fanuc/004-incremental-box/) |
| **INTP** | Interpreter / program-side alarm family (study label; look up the code). | [Alarms](fanuc/alarms/overview.md) |
| **iPendant** | FANUC teach pendant product name (trademark). | [Pendant](fanuc/controller-pendant/teach-pendant.md) |
| **JMP LBL** | Jump to a label in the same program (not GOTO). | [JMP/LBL](fanuc/programming-tp/logic-lbl-jmp.md), [013](../practice/fanuc/013-lbl-jmp/) |
| **Joint (J)** | Motion or jog in axis space; feed as percent. | [J atom](fanuc/programming-tp/motion-j.md), [011](../practice/fanuc/011-joint-only/) |
| **Karel** | Optional text language (later track). | [Karel](fanuc/programming-karel/overview.md) |
| **Keyword** | Reserved HandlingTool instruction or modifier (`J`, `CALL`, `END`). Not a name you invent. | [Keywords](fanuc/programming-tp/keywords.md) |
| **Linear (L)** | Straight-line TCP motion; feed typically mm/s. | [L atom](fanuc/programming-tp/motion-l.md), [012](../practice/fanuc/012-linear-only/) |
| **MESSAGE** | User message; does **not** halt like UALM. Confirm instruction name. | [MESSAGE](fanuc/programming-tp/message.md), [021](../practice/fanuc/021-message/) |
| **`.ls`** | ASCII Teach Pendant listing used as a study file in this repo. | [Practice](../practice/fanuc/) |
| **LPOS** | Current Cartesian pose (used with PR / offsets in drills). | [008](../practice/fanuc/008-pr-lpos/) |
| **OFFSET** | Shifts a taught path (do not stack blindly with INC). | [Offset / INC](fanuc/programming-tp/offset-and-incremental.md), [005](../practice/fanuc/005-offset-path/), [018](../practice/fanuc/018-pallet-grid/) |
| **Override** | Pendant/panel speed scale, or `OVERRIDE` instruction. Not a safety device. | [Override](fanuc/programming-tp/override.md), [015](../practice/fanuc/015-override-instr/) |
| **Pallet index** | Study math: `X = X0 + col*dx`, `Y = Y0 + row*dy`; optional `index = row * nCols + col`. Pitch is taught on the cell. | [Pallet](fanuc/applications/pallet-grid.md), [018](../practice/fanuc/018-pallet-grid/) |
| **P[]** | Position in the program (taught point). | [Motion](fanuc/motion-paths-home/overview.md) |
| **Payload** | Mass and inertia the controller assumes for the EOAT + part. | [I/O overview](fanuc/io-frames-tools/overview.md) |
| **PNS / RSR** | Program select from a PLC (not the same as a single DI start). | [I/O](fanuc/io-frames-tools/io-classes.md) |
| **PR[]** | Position register: reusable pose (home, offset origin, etc.). | [001](../practice/fanuc/001-home-safe/), [008](../practice/fanuc/008-pr-lpos/) |
| **R[]** | Numeric register (counter), not a pose. | [R[]](fanuc/programming-tp/registers-numeric.md), [P vs PR vs R](fanuc/io-frames-tools/pr-vs-r.md) |
| **Remark** | Non-executing comment (`!` / EDCMD Remark). Multi-line = stacked remarks, not `/* */`. ATTR COMMENT is the program header, not a TP remark. | [Remark](fanuc/programming-tp/remark.md), [014](../practice/fanuc/014-remark-header/) |
| **Remote / Local** | System Config: PLC vs pendant as start source. | [T1 T2 Auto](fanuc/safety-dcs/modes-t1-t2-auto.md) |
| **Reset** | Clears a latched fault the controller will allow; does not by itself make the cell safe. | [Alarms](fanuc/alarms/overview.md) |
| **RI / RO** | Robot / tooling digital I/O (typical EOAT). | [I/O](fanuc/io-frames-tools/io-classes.md) |
| **SI / SO** | Safety-rated I/O (look up on the cell). Not gripper bits, not SKIP. | [SI/SO](fanuc/io-frames-tools/io-safety-si-so.md) |
| **SKIP CONDITION** | Arm a condition so a motion can Skip,LBL. | [SKIP](fanuc/programming-tp/logic-skip.md), [016](../practice/fanuc/016-skip-linear/) |
| **SOP** | Standard operator panel I/O. | [SOP/UOP](fanuc/io-frames-tools/io-sop-uop.md) |
| **SRAM** | User data (programs, variables) — back this up separately from the image. | [Backup](fanuc/controller-pendant/backup-restore.md) |
| **SRVO** | Servo / axis / hardware-side alarm family (study label). | [Alarms](fanuc/alarms/overview.md) |
| **Step** | Execute one instruction at a time (common in T2 prove-out). | [Pendant](fanuc/controller-pendant/teach-pendant.md) |
| **T1** | Teach mode: pendant enable, reduced TCP speed (confirm limit on your controller). | [T1 T2 Auto](fanuc/safety-dcs/modes-t1-t2-auto.md) |
| **T2** | Test mode: often used with Step before Auto. | [T1 T2 Auto](fanuc/safety-dcs/modes-t1-t2-auto.md) |
| **TCP** | Tool center point: origin of the tool frame. | [Frames](fanuc/io-frames-tools/frames.md) |
| **TP** | Teach Pendant program. | [TP overview](fanuc/programming-tp/overview.md) |
| **Touch-Up** | Record current pose into the motion line under the cursor. | [Jog](fanuc/motion-paths-home/jog-and-recovery.md) |
| **UALM** | User alarm raised from a TP program. Text is configured on the controller. | [UALM](fanuc/programming-tp/ualm.md), [020](../practice/fanuc/020-user-alarm/) |
| **UFRAME / UFRAME_NUM** | User (work) frame and the number a program selects. | [Frames](fanuc/io-frames-tools/frames.md) |
| **UOP** | User / peripheral panel I/O (remote start, hold, etc. — map on the cell). | [SOP/UOP](fanuc/io-frames-tools/io-sop-uop.md) |
| **UTOOL / UTOOL_NUM** | Tool frame and the number a program selects. | [Frames](fanuc/io-frames-tools/frames.md) |
| **WAIT … TIMEOUT** | Wait for I/O (or a condition) with a timeout branch. | [007](../practice/fanuc/007-wait-gripper/) |
| **World** | Cartesian jog/motion in the World frame. | [Pendant](fanuc/controller-pendant/teach-pendant.md) |

Numbers for I/O, frames, and positions in this repo are **placeholders**.

## Official references

On manuals **licensed to your site**: glossary / index of the operator and HandlingTool books for your software. Do not paste OEM pages here.

## Rights

See [`LEGAL.md`](../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
