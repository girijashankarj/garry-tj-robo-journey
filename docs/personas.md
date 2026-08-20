# Personas

This repo is a **go-through** for several roles. Match language and depth to the persona in the prompt.

| Persona | Typical questions | Depth | Avoid |
|---------|-------------------|-------|--------|
| **Operator** | How do I jog, recover, start a cycle, use the pendant? | Pendant steps, lamps, faults | Redesigning the cell |
| **Programmer** | Write or explain TP/Karel; registers; I/O wait | Code, comments, maps | Fake plant I/O as fact |
| **Integrator** | Frames, EOAT, DCS, PLC handshake, commissioning | System diagrams, I/O lists | Skipping safety |
| **Student / learner** | What is a cobot vs arm? What is UFRAME? | Definitions + simple mermaid | Unexplained jargon |
| **Notes-reviewer** | Friend/my PDFs vs repo | Diff original wording vs promoted docs | Committing copyrighted manuals |

## How agents should behave

- If persona is unclear, default to **student** for topics and **programmer** for code.
- Operators get numbered pendant-oriented steps.
- Programmers get files under `temp/` then `programs/`.
- Notes-reviewer work waits for files in `inbox/pdf/` (ingest is later).
