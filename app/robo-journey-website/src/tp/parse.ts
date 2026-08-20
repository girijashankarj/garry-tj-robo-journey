// Structured parser for ASCII TP /MN bodies — feeds the step-runner.
// Study model only: unknown lines become "opaque" instructions the runner
// steps over with a note, so a partial parse never blocks the simulator.

export type PosRef = { kind: "P" | "PR"; index: number; label?: string };

export type Cond =
  | { type: "io"; signal: string; on: boolean }
  | { type: "cmp"; lhs: string; cmp: "<" | ">" | "<=" | ">=" | "=" | "<>"; rhs: string };

export type Instr =
  | { op: "remark"; n: number; text: string }
  | { op: "motion"; n: number; motion: "J" | "L"; target: PosRef; speed: string; term: string; options: string[] }
  | { op: "cvia"; n: number; target: PosRef }
  | { op: "cdest"; n: number; target: PosRef; speed: string; term: string; options: string[] }
  | { op: "frame"; n: number; which: "UFRAME_NUM" | "UTOOL_NUM"; value: number }
  | { op: "assignR"; n: number; index: number; expr: string }
  | { op: "assignPR"; n: number; index: number; element: number | null; expr: string }
  | { op: "ioset"; n: number; signal: string; value: "ON" | "OFF" }
  | { op: "wait"; n: number; cond: Cond; timeoutLbl: number | null }
  | { op: "if"; n: number; cond: Cond; target: number }
  | { op: "jmp"; n: number; target: number }
  | { op: "lbl"; n: number; label: number }
  | { op: "call"; n: number; name: string }
  | { op: "skipcond"; n: number; cond: Cond }
  | { op: "offsetcond"; n: number; pr: number }
  | { op: "ualm"; n: number; index: number }
  | { op: "message"; n: number; text: string }
  | { op: "override"; n: number; value: number }
  | { op: "abort"; n: number }
  | { op: "end"; n: number }
  | { op: "opaque"; n: number; text: string };

export type Program = { name: string | null; instrs: Instr[]; raw: Map<number, string> };

const POS_RE = /^(P|PR)\[(\d+)(?::([^\]]*))?\]/;

function parsePos(text: string): { ref: PosRef; rest: string } | null {
  const m = text.match(POS_RE);
  if (!m) return null;
  return {
    ref: { kind: m[1] as "P" | "PR", index: Number(m[2]), label: m[3] || undefined },
    rest: text.slice(m[0].length).trim(),
  };
}

function parseCond(text: string): Cond | null {
  const io = text.match(/^(RI|DI|RO|DO|SI|UI)\[(\d+)\]\s*=\s*(ON|OFF)$/);
  if (io) return { type: "io", signal: `${io[1]}[${io[2]}]`, on: io[3] === "ON" };
  const cmp = text.match(/^(.+?)(<=|>=|<>|<|>|=)(.+)$/);
  if (cmp) return { type: "cmp", lhs: cmp[1].trim(), cmp: cmp[2] as "<" | ">" | "<=" | ">=" | "=" | "<>", rhs: cmp[3].trim() };
  return null;
}

export function parseProgram(source: string): Program {
  const rawLines = source.split(/\r?\n/);
  const name = source.match(/^\/PROG\s+(\S+)/m)?.[1] ?? null;
  const mnStart = rawLines.findIndex((l) => l.trim() === "/MN");
  const mnEnd = rawLines.findIndex((l, i) => i > mnStart && (l.trim() === "/POS" || l.trim() === "/END"));
  const instrs: Instr[] = [];
  const raw = new Map<number, string>();
  if (mnStart === -1) return { name, instrs, raw };

  for (const rawLine of rawLines.slice(mnStart + 1, mnEnd === -1 ? rawLines.length : mnEnd)) {
    const m = rawLine.match(/^\s*(\d+)\s*:(.*)$/);
    if (!m) continue;
    const n = Number(m[1]);
    let t = m[2].trim();
    raw.set(n, t);
    if (t.endsWith(";")) t = t.slice(0, -1).trim();

    if (t.startsWith("!")) {
      instrs.push({ op: "remark", n, text: t.slice(1).trim() });
      continue;
    }
    const motion = t.match(/^(J|L|C)\s+(.*)$/);
    if (motion) {
      const pos = parsePos(motion[2]);
      if (pos) {
        if (motion[1] === "C" && pos.rest === "") {
          instrs.push({ op: "cvia", n, target: pos.ref });
          continue;
        }
        const toks = pos.rest.split(/\s+/).filter(Boolean);
        if (toks.length >= 2) {
          instrs.push({ op: "motion", n, motion: motion[1] as "J" | "L", target: pos.ref, speed: toks[0], term: toks[1], options: toks.slice(2) });
          continue;
        }
      }
    }
    // bare position line = circular destination
    const bare = parsePos(t);
    if (bare && bare.rest) {
      const toks = bare.rest.split(/\s+/).filter(Boolean);
      if (toks.length >= 2 && /(FINE|CNT)/.test(toks[1])) {
        instrs.push({ op: "cdest", n, target: bare.ref, speed: toks[0], term: toks[1], options: toks.slice(2) });
        continue;
      }
    }
    let mm: RegExpMatchArray | null;
    if ((mm = t.match(/^(UFRAME_NUM|UTOOL_NUM)=(\d+)$/))) {
      instrs.push({ op: "frame", n, which: mm[1] as "UFRAME_NUM" | "UTOOL_NUM", value: Number(mm[2]) });
    } else if ((mm = t.match(/^R\[(\d+)\]=(.+)$/))) {
      instrs.push({ op: "assignR", n, index: Number(mm[1]), expr: mm[2].trim() });
    } else if ((mm = t.match(/^PR\[(\d+)(?:,(\d+))?\]=(.+)$/))) {
      instrs.push({ op: "assignPR", n, index: Number(mm[1]), element: mm[2] ? Number(mm[2]) : null, expr: mm[3].trim() });
    } else if ((mm = t.match(/^(RO|DO|GO)\[(\d+)\]=(ON|OFF)$/))) {
      instrs.push({ op: "ioset", n, signal: `${mm[1]}[${mm[2]}]`, value: mm[3] as "ON" | "OFF" });
    } else if ((mm = t.match(/^WAIT\s+(.+?)(?:\s+TIMEOUT\s*,\s*LBL\[(\d+)\])?$/))) {
      const cond = parseCond(mm[1].trim());
      if (cond) instrs.push({ op: "wait", n, cond, timeoutLbl: mm[2] ? Number(mm[2]) : null });
      else instrs.push({ op: "opaque", n, text: t });
    } else if ((mm = t.match(/^IF\s+(.+?),\s*JMP\s+LBL\[(\d+)\]$/))) {
      const cond = parseCond(mm[1].trim());
      if (cond) instrs.push({ op: "if", n, cond, target: Number(mm[2]) });
      else instrs.push({ op: "opaque", n, text: t });
    } else if ((mm = t.match(/^JMP\s+LBL\[(\d+)\]$/))) {
      instrs.push({ op: "jmp", n, target: Number(mm[1]) });
    } else if ((mm = t.match(/^LBL\[(\d+)\]$/))) {
      instrs.push({ op: "lbl", n, label: Number(mm[1]) });
    } else if ((mm = t.match(/^CALL\s+(\S+)$/))) {
      instrs.push({ op: "call", n, name: mm[1] });
    } else if ((mm = t.match(/^SKIP CONDITION\s+(.+)$/))) {
      const cond = parseCond(mm[1].trim());
      if (cond) instrs.push({ op: "skipcond", n, cond });
      else instrs.push({ op: "opaque", n, text: t });
    } else if ((mm = t.match(/^OFFSET CONDITION\s+PR\[(\d+)\]$/))) {
      instrs.push({ op: "offsetcond", n, pr: Number(mm[1]) });
    } else if ((mm = t.match(/^UALM\[(\d+)\]$/))) {
      instrs.push({ op: "ualm", n, index: Number(mm[1]) });
    } else if ((mm = t.match(/^MESSAGE\[(.*)\]$/))) {
      instrs.push({ op: "message", n, text: mm[1] });
    } else if ((mm = t.match(/^OVERRIDE=(\d+)%$/))) {
      instrs.push({ op: "override", n, value: Number(mm[1]) });
    } else if (t === "ABORT") {
      instrs.push({ op: "abort", n });
    } else if (t === "END") {
      instrs.push({ op: "end", n });
    } else {
      instrs.push({ op: "opaque", n, text: t });
    }
  }
  return { name, instrs, raw };
}
