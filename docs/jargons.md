# Jargons

> Status: reviewed  
> Brand: FANUC  
> Mode: learner, operator, programmer  
> Track: 01 HandlingTool

What people **say** on the floor vs what the pendant / this guide **means**. Formal terms: [`glossary.md`](glossary.md). Atom vs union: [`fanuc/topic-map.md`](fanuc/topic-map.md).

These are study hints, not official FANUC definitions. Confirm on your cell.

| You might hear | Usually means | Do not assume |
|----------------|---------------|----------------|
| **Pendant / iPendant / TP** | The teach device; or a Teach Pendant **program** | Every “TP” is the same file on disk |
| **In teach / in T1** | Mode select on T1, deadman + Shift to move | T1 is as fast as Auto |
| **In Auto / in production** | Auto mode, panel start, interlocks | You can still jog like T1 |
| **Hit deadman** | Squeeze the enable switch | Holding it bypasses the fence |
| **Kill it / Hold** | Hold (or e-stop if it is an emergency) | Hold and e-stop are the same recovery |
| **It’s faulted** | Alarm is up; motion will not run until the condition is handled | Reset alone fixed the cause |
| **Reset it and go** | Clear the alarm and restart | Safe without looking at the code |
| **Step it** | Step / single-instruction run | Same as Auto cycle |
| **Touch it up** | Touch-Up the point under the cursor | The whole path is now safe |
| **Home it** | Run or jog to the **taught** home | J1–J6 at zero |
| **Jog it in Joint** | Coordinate = Joint | World will move the same way |
| **It’s in World / User / Tool** | Coordinate (and maybe UFRAME/UTOOL) | Frames were not changed by the last person |
| **Fine that corner** | FINE termination | CNT 100 is “more accurate” |
| **CNT it / round it** | CNT termination | OK at 100% beside a clamp |
| **Fly over** | Joint move in free space | Linear through the fixture is fine |
| **Main** | A program that mostly `CALL`s others (often what PNS selects) | Main contains all points |
| **Sub / routine** | A CALLed program | Karel by default |
| **Program name / job name** | `/PROG` identifier (often 8 chars on older software) | ATTR COMMENT is the program name |
| **Instruction / keyword** | Reserved word: J, L, CALL, END | You can invent new keywords |
| **Gripper bits / robot I/O** | Often RI/RO on the arm | Same numbers as the last cell |
| **PLC bits** | Often DI/DO or GI/GO | Interchangeable with RI/RO |
| **Remote** | Remote/Local or UOP start from PLC | Pendant Cycle still starts Auto |
| **PNS’d** | Program number select from the PLC | The PLC sent a program name as text |
| **Override at 10** | Speed override low | Units always percent of programmed feed |
| **Image vs AOA / backup** | Image/FROM vs application (SRAM) backup — **use the OEM backup article** | One USB stick holds everything |
| **Mastered** | Pulse-coder / mastering is valid | You can skip OEM procedure after a battery |
| **Cobot so no fence** | Collaborative design **and** configured limits | Speed and DCS are optional |
| **User alarm** | `UALM` or a configured user message | The number in a drill matches your cell |
| **Message on the TP** | MESSAGE instruction (does not halt) | Same as UALM |
| **Group 1** | Motion group for the six-axis arm (typical) | Other groups do not exist |
| **Skip the part / skip to label** | SKIP CONDITION on a motion, or JMP LBL | Safety I/O or e-stop |
| **Remark / comment it** | Stacked `!` lines; no C-style `/* */` | ATTR COMMENT is a TP remark |
| **Pallet it / nest it** | Grid of OFFSET / PR displacements | Pitch copied from a study listing |
| **Drop it / pick it** | Pick-and-place with RO/RI | Same I/O as the last cell |
| **Plot the path / contour it** | Polyline of Linear points, or Circular | CNT 100 on first teach |
| **GOTO** | People mean JMP LBL | A GOTO instruction on HandlingTool |

## How to use this page

1. Hear a word → find the row.
2. Open the glossary term.
3. Open the article and a drill.
4. On the real pendant, match the **menu label** (it varies by software).

## Official references

On manuals **licensed to your site**: operator / HandlingTool naming for keys, modes, and I/O. Do not paste OEM pages here.

## Rights, education, and consent

FANUC retains **all rights** in its trademarks, software, and manuals. See [`LEGAL.md`](../LEGAL.md).

This page and any linked programs are **educational and study-aid only**. Use at **your own consent and risk**. Garry TJ / this repo are not FANUC and offer no warranty.
