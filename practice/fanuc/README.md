# Practice — FANUC HandlingTool

Each drill folder: `README.md` (statement), `code/solution.ls`, `doc/guide.md`. First time: [`how-to-read-a-guide.md`](../../docs/fanuc/how-to-read-a-guide.md). Explain with `/fanuc-explain`. Local UI: [`../../app/robo-journey-website/`](../../app/robo-journey-website/).

`code/solution.ls` files are **study listings**, not controller backups. `/ATTR` fields such as `PROG_SIZE` and `LINE_COUNT` may be **zero**. All poses and I/O are placeholders.

Atom vs union map: [`../../docs/fanuc/topic-map.md`](../../docs/fanuc/topic-map.md). `011`–`015`, `020`–`021` are atoms; `002`, `016`–`019` are unions.

| Id | Title | Difficulty | Tags |
|----|-------|------------|------|
| [001-home-safe](001-home-safe/) | Home / safe pose | Easy | `motion, safety` |
| [002-square-path](002-square-path/) | Square path (J then L) — **union** | Easy | `motion` |
| [003-circular-path](003-circular-path/) | Circular path | Medium | `motion` |
| [004-incremental-box](004-incremental-box/) | Incremental box | Medium | `motion, frames` |
| [005-offset-path](005-offset-path/) | Offset a taught path | Medium | `motion, frames` |
| [006-loop-call](006-loop-call/) | Register loop and CALL | Medium | `logic` |
| [007-wait-gripper](007-wait-gripper/) | Gripper wait with timeout | Medium | `io, logic` |
| [008-pr-lpos](008-pr-lpos/) | PR from LPOS, element offsets | Medium | `motion, frames` |
| [009-fault-home](009-fault-home/) | Recover Joint to home | Easy | `motion, safety, alarms` |
| [010-main-call](010-main-call/) | Main that only CALLs | Easy | `logic` |
| [011-joint-only](011-joint-only/) | Joint only | Easy | `motion` |
| [012-linear-only](012-linear-only/) | Linear only | Easy | `motion` |
| [013-lbl-jmp](013-lbl-jmp/) | JMP LBL (not GOTO) | Easy | `logic` |
| [014-remark-header](014-remark-header/) | Remarks then one motion | Easy | `logic` |
| [015-override-instr](015-override-instr/) | OVERRIDE then Joint | Easy | `motion` |
| [016-skip-linear](016-skip-linear/) | SKIP on Linear | Medium | `motion, io, logic` |
| [017-pick-place](017-pick-place/) | Pick and place | Medium | `motion, io` |
| [018-pallet-grid](018-pallet-grid/) | Pallet grid | Medium | `logic, frames, motion` |
| [019-contour-plot](019-contour-plot/) | Contour / plot polyline | Easy | `motion` |
| [020-user-alarm](020-user-alarm/) | UALM then home | Easy | `alarms, logic` |
| [021-message](021-message/) | MESSAGE then Joint | Easy | `logic` |

Points and I/O are placeholders. `programs/fanuc/tp/` is for programs you promote from a real cell.

## Rights

See [`LEGAL.md`](../../LEGAL.md): FANUC retains all rights. Educational use; own consent and risk.
