// Step-runner "machine" for TP study listings — a pendant-style FWD-step
// interpreter over parse.ts output. Study plane only: positions get
// auto-layout XY coordinates (P[n] are placeholders in this repo), so the
// trace teaches sequence, branching, and I/O handshakes — not real geometry.

import { parseProgram, type Cond, type Instr, type PosRef, type Program } from "./parse";

export type Segment = { x1: number; y1: number; x2: number; y2: number; vx?: number; vy?: number; motion: "J" | "L" | "C"; term: string };

export type MachineStatus = "idle" | "running" | "waiting" | "alarm" | "aborted" | "done";

export type MachineState = {
  status: MachineStatus;
  /** current /MN line (next to execute), or null when done/aborted */
  line: number | null;
  R: Record<number, number>;
  PR: Record<number, { x: number; y: number }>;
  io: Record<string, boolean>;
  pos: { x: number; y: number };
  trail: Segment[];
  uframe: number | null;
  utool: number | null;
  override: number;
  alarm: string | null;
  waitingOn: { text: string; hasTimeout: boolean } | null;
  events: string[];
  steps: number;
};

export const CANVAS = { w: 460, h: 300 };

function posKey(ref: PosRef): string {
  return `${ref.kind}[${ref.index}]`;
}

export function posLabel(ref: PosRef): string {
  return ref.label ? `${ref.kind}${ref.index}:${ref.label}` : `${ref.kind}${ref.index}`;
}

/** Fixed study-plane coordinates for every position the program can move to. */
export function layoutPositions(program: Program): Map<string, { x: number; y: number; ref: PosRef }> {
  const order: PosRef[] = [];
  const seen = new Set<string>();
  for (const ins of program.instrs) {
    if (ins.op === "motion" || ins.op === "cvia" || ins.op === "cdest") {
      const k = posKey(ins.target);
      if (!seen.has(k)) {
        seen.add(k);
        order.push(ins.target);
      }
    }
  }
  const map = new Map<string, { x: number; y: number; ref: PosRef }>();
  const cx = CANVAS.w / 2;
  const cy = CANVAS.h / 2;
  order.forEach((ref, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(order.length, 3);
    map.set(posKey(ref), { x: Math.round(cx + 150 * Math.cos(angle)), y: Math.round(cy + 95 * Math.sin(angle)), ref });
  });
  return map;
}

function condText(c: Cond): string {
  return c.type === "io" ? `${c.signal}=${c.on ? "ON" : "OFF"}` : `${c.lhs}${c.cmp}${c.rhs}`;
}

/** Every R index and I/O signal the listing mentions anywhere (for panels). */
export function collectRefs(source: string): { rIndices: number[]; signals: string[] } {
  const rIndices = [...new Set([...source.matchAll(/R\[(\d+)\]/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const signals = [...new Set([...source.matchAll(/\b(RI|RO|DI|DO|GI|GO|SI|UI)\[(\d+)\]/g)].map((m) => `${m[1]}[${m[2]}]`))].sort();
  return { rIndices, signals };
}

export class Machine {
  program: Program;
  layout: Map<string, { x: number; y: number; ref: PosRef }>;
  state: MachineState;
  refs: { rIndices: number[]; signals: string[] };
  private pc = 0;
  private labels = new Map<number, number>();
  private offsetPR: number | null = null;
  private skipCond: Cond | null = null;
  private pendingVia: { x: number; y: number } | null = null;
  private incStep = 0;

  constructor(source: string) {
    this.program = parseProgram(source);
    this.refs = collectRefs(source);
    this.layout = layoutPositions(this.program);
    this.program.instrs.forEach((ins, i) => {
      if (ins.op === "lbl") this.labels.set(ins.label, i);
    });
    this.state = this.freshState();
  }

  private freshState(): MachineState {
    const io: Record<string, boolean> = {};
    for (const s of this.refs.signals) io[s] = false;
    const R: Record<number, number> = {};
    for (const i of this.refs.rIndices) R[i] = 0;
    return {
      status: "idle",
      line: this.program.instrs[0]?.n ?? null,
      R,
      PR: {},
      io,
      pos: { x: 30, y: CANVAS.h - 30 },
      trail: [],
      uframe: null,
      utool: null,
      override: 100,
      alarm: null,
      waitingOn: null,
      events: [],
      steps: 0,
    };
  }

  reset(): void {
    this.pc = 0;
    this.offsetPR = null;
    this.skipCond = null;
    this.pendingVia = null;
    this.incStep = 0;
    this.state = this.freshState();
  }

  toggleInput(signal: string): void {
    this.state.io[signal] = !this.state.io[signal];
    const forced = /^(RO|DO|GO)\[/.test(signal) ? "output forced (I/O Force)" : "input";
    this.log(`${forced} ${signal} → ${this.state.io[signal] ? "ON" : "OFF"}`);
    // waiting is re-evaluated on the next FWD step, like pressing FWD again in T2
  }

  /** Set a numeric register by hand (like DATA → Registers on the pendant). */
  setR(index: number, value: number): void {
    if (!Number.isFinite(value)) return;
    this.state.R[index] = value;
    this.log(`R[${index}]=${value} (set by you)`);
  }

  resetAlarm(): void {
    if (this.state.status !== "alarm") return;
    this.state.alarm = null;
    this.state.status = "running";
    this.log("RESET — alarm cleared, FWD to continue");
  }

  forceTimeout(): void {
    const ins = this.program.instrs[this.pc];
    if (this.state.status !== "waiting" || !ins || ins.op !== "wait" || ins.timeoutLbl === null) return;
    this.state.waitingOn = null;
    this.state.status = "running";
    this.log(`WAIT timed out ($WAITTMOUT) → JMP LBL[${ins.timeoutLbl}]`);
    this.jump(ins.timeoutLbl);
    this.state.line = this.program.instrs[this.pc]?.n ?? null;
  }

  private log(msg: string): void {
    this.state.events.push(msg);
    if (this.state.events.length > 60) this.state.events.shift();
  }

  private jump(label: number): void {
    const idx = this.labels.get(label);
    if (idx === undefined) {
      this.state.status = "alarm";
      this.state.alarm = `INTP: LBL[${label}] not found`;
      return;
    }
    this.pc = idx;
  }

  private num(expr: string): number {
    // tiny evaluator: numbers, R[n], PR[n,m], + - * / with the usual precedence
    const tokens = expr.match(/R\[\d+\]|PR\[\d+,\d+\]|\d+(?:\.\d+)?|[+\-*/()]/g) ?? [];
    let i = 0;
    const peek = () => tokens[i];
    const next = () => tokens[i++];
    const value = (tok: string | undefined): number => {
      if (tok === undefined) return NaN;
      if (tok === "(") {
        const v = addSub();
        next(); // ")"
        return v;
      }
      let m = tok.match(/^R\[(\d+)\]$/);
      if (m) return this.state.R[Number(m[1])] ?? 0;
      m = tok.match(/^PR\[(\d+),(\d+)\]$/);
      if (m) {
        const pr = this.state.PR[Number(m[1])];
        return pr ? (Number(m[2]) === 1 ? pr.x : Number(m[2]) === 2 ? pr.y : 0) : 0;
      }
      return Number(tok);
    };
    const mulDiv = (): number => {
      let v = value(next());
      while (peek() === "*" || peek() === "/") {
        const op = next();
        const rhs = value(next());
        v = op === "*" ? v * rhs : v / rhs;
      }
      return v;
    };
    const addSub = (): number => {
      let v = mulDiv();
      while (peek() === "+" || peek() === "-") {
        const op = next();
        const rhs = mulDiv();
        v = op === "+" ? v + rhs : v - rhs;
      }
      return v;
    };
    return addSub();
  }

  private evalCond(c: Cond): boolean {
    if (c.type === "io") return (this.state.io[c.signal] ?? false) === c.on;
    const l = this.num(c.lhs);
    const r = this.num(c.rhs);
    switch (c.cmp) {
      case "<": return l < r;
      case ">": return l > r;
      case "<=": return l <= r;
      case ">=": return l >= r;
      case "=": return l === r;
      case "<>": return l !== r;
    }
  }

  private targetXY(ref: PosRef, options: string[]): { x: number; y: number } {
    let xy: { x: number; y: number };
    if (ref.kind === "PR" && this.state.PR[ref.index]) {
      xy = { ...this.state.PR[ref.index] };
    } else {
      const laid = this.layout.get(posKey(ref));
      xy = laid ? { x: laid.x, y: laid.y } : { x: CANVAS.w / 2, y: CANVAS.h / 2 };
    }
    if (options.includes("INC")) {
      // study nudge: recorded pose treated as a delta; rotate direction per use
      const deltas = [ { x: 46, y: 0 }, { x: 0, y: -34 }, { x: -46, y: 0 }, { x: 0, y: 34 } ];
      const d = deltas[this.incStep % deltas.length];
      this.incStep += 1;
      xy = { x: this.state.pos.x + d.x, y: this.state.pos.y + d.y };
    }
    const withOffset = options.some((o) => /^Offset$/i.test(o) || /^OFFSET$/i.test(o));
    if (withOffset && this.offsetPR !== null && this.state.PR[this.offsetPR]) {
      const pr = this.state.PR[this.offsetPR];
      xy = { x: xy.x + pr.x, y: xy.y - pr.y }; // screen y grows downward; study +Y up
    }
    return xy;
  }

  private moveTo(kind: "J" | "L" | "C", xy: { x: number; y: number }, term: string, label: string): void {
    const seg: Segment = { x1: this.state.pos.x, y1: this.state.pos.y, x2: xy.x, y2: xy.y, motion: kind, term };
    if (kind === "C" && this.pendingVia) {
      seg.vx = this.pendingVia.x;
      seg.vy = this.pendingVia.y;
      this.pendingVia = null;
    }
    this.state.trail.push(seg);
    this.state.pos = xy;
    this.log(`TCP → ${label} (${kind}, ${term})`);
  }

  /** Execute one instruction (FWD step). Returns false when nothing ran. */
  step(): boolean {
    const s = this.state;
    if (s.status === "aborted" || s.status === "done" || s.status === "alarm") return false;
    const ins: Instr | undefined = this.program.instrs[this.pc];
    if (!ins) {
      s.status = "done";
      s.line = null;
      return false;
    }
    if (s.status === "idle") s.status = "running";

    if (s.status === "waiting") {
      if (ins.op === "wait" && this.evalCond(ins.cond)) {
        s.waitingOn = null;
        s.status = "running";
        this.log(`WAIT satisfied: ${condText(ins.cond)}`);
        this.pc += 1;
      } else {
        this.log("still waiting — toggle the input or force timeout");
        s.steps += 1;
        return true;
      }
      s.line = this.program.instrs[this.pc]?.n ?? null;
      s.steps += 1;
      return true;
    }

    s.steps += 1;
    let advance = true;
    switch (ins.op) {
      case "remark":
        break;
      case "frame":
        if (ins.which === "UFRAME_NUM") s.uframe = ins.value;
        else s.utool = ins.value;
        this.log(`${ins.which}=${ins.value}`);
        break;
      case "assignR": {
        const v = ins.expr === "LPOS" ? 0 : this.num(ins.expr);
        s.R[ins.index] = v;
        this.log(`R[${ins.index}]=${Number.isInteger(v) ? v : v.toFixed(1)}`);
        break;
      }
      case "assignPR": {
        if (ins.element === null) {
          if (ins.expr === "LPOS") {
            s.PR[ins.index] = { ...s.pos };
            this.log(`PR[${ins.index}]=LPOS (current pose)`);
          } else {
            const src = ins.expr.match(/^PR\[(\d+)\]$/);
            s.PR[ins.index] = src && s.PR[Number(src[1])] ? { ...s.PR[Number(src[1])] } : { x: 0, y: 0 };
            this.log(`PR[${ins.index}]=${ins.expr}`);
          }
        } else {
          const pr = (s.PR[ins.index] ??= { x: 0, y: 0 });
          const v = this.num(ins.expr);
          if (ins.element === 1) pr.x = v;
          else if (ins.element === 2) pr.y = v;
          this.log(`PR[${ins.index},${ins.element}]=${Number.isInteger(v) ? v : v.toFixed(1)}${ins.element > 2 ? " (element ignored in 2D study plane)" : ""}`);
        }
        break;
      }
      case "ioset":
        s.io[ins.signal] = ins.value === "ON";
        this.log(`${ins.signal}=${ins.value}`);
        break;
      case "wait":
        if (this.evalCond(ins.cond)) {
          this.log(`WAIT satisfied immediately: ${condText(ins.cond)}`);
        } else {
          s.status = "waiting";
          s.waitingOn = { text: condText(ins.cond), hasTimeout: ins.timeoutLbl !== null };
          this.log(`WAIT ${condText(ins.cond)}${ins.timeoutLbl !== null ? ` (TIMEOUT → LBL[${ins.timeoutLbl}])` : ""}`);
          advance = false;
        }
        break;
      case "if":
        if (this.evalCond(ins.cond)) {
          this.log(`IF ${condText(ins.cond)} true → JMP LBL[${ins.target}]`);
          this.jump(ins.target);
          advance = false;
          this.pc += 1; // land after the label line
        } else {
          this.log(`IF ${condText(ins.cond)} false — fall through`);
        }
        break;
      case "jmp":
        this.log(`JMP LBL[${ins.target}]`);
        this.jump(ins.target);
        advance = false;
        this.pc += 1;
        break;
      case "lbl":
        break;
      case "call":
        this.log(`CALL ${ins.name} — runs on the controller; stepped over here`);
        break;
      case "skipcond":
        this.skipCond = ins.cond;
        this.log(`SKIP CONDITION armed: ${condText(ins.cond)}`);
        break;
      case "offsetcond":
        this.offsetPR = ins.pr;
        this.log(`OFFSET CONDITION PR[${ins.pr}] armed`);
        break;
      case "override":
        s.override = ins.value;
        this.log(`OVERRIDE=${ins.value}%`);
        break;
      case "ualm":
        s.status = "alarm";
        s.alarm = `UALM[${ins.index}] — user alarm (text is configured on the controller)`;
        this.log(`UALM[${ins.index}] raised — press RESET`);
        break;
      case "message":
        this.log(`MESSAGE: ${ins.text}`);
        break;
      case "abort":
        s.status = "aborted";
        this.log("ABORT — program ended; RESET to start over");
        advance = false;
        break;
      case "end":
        s.status = "done";
        this.log("END — normal finish");
        advance = false;
        break;
      case "cvia": {
        const xy = this.targetXY(ins.target, []);
        this.pendingVia = xy;
        this.log(`C via ${posLabel(ins.target)}`);
        break;
      }
      case "cdest": {
        const xy = this.targetXY(ins.target, ins.options);
        this.moveTo("C", xy, ins.term, posLabel(ins.target));
        break;
      }
      case "motion": {
        const skipOpt = ins.options.find((o) => /^Skip,LBL\[(\d+)\]$/.test(o));
        if (skipOpt && this.skipCond && this.evalCond(this.skipCond)) {
          const lbl = Number(skipOpt.match(/^Skip,LBL\[(\d+)\]$/)![1]);
          this.log(`Skip triggered (${condText(this.skipCond)}) → LBL[${lbl}] without finishing the motion`);
          this.jump(lbl);
          advance = false;
          this.pc += 1;
          break;
        }
        const xy = this.targetXY(ins.target, ins.options);
        this.moveTo(ins.motion, xy, ins.term, posLabel(ins.target));
        break;
      }
      case "opaque":
        this.log(`(not simulated) ${ins.text}`);
        break;
    }
    if (advance && s.status !== "waiting") this.pc += 1;
    s.line = s.status === "done" || s.status === "aborted" ? ins.n : this.program.instrs[this.pc]?.n ?? null;
    return true;
  }
}
