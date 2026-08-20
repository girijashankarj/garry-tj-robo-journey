// Pendant-style static checks for ASCII TP study listings (.ls).
// Models what a controller would reject at load/teach time plus repo study
// conventions (see practice/fanuc/README.md: listings are not backups).
// Used by the drill pages ("Pendant check" panel) and scripts/validate-ls.ts.

export type Severity = "error" | "warning" | "info";

export type Finding = {
  severity: Severity;
  /** /MN line number (the N in "N: ..."), or null for file-level findings */
  line: number | null;
  code: string;
  message: string;
};

export type ValidateOptions = {
  /** /PROG names that exist (CALL targets outside this set get a warning) */
  knownPrograms?: string[];
};

type MnLine = {
  n: number;
  /** instruction text without line number or trailing ";" */
  text: string;
  hasSemi: boolean;
  isRemark: boolean;
};

const MOTION_RE = /^(J|L|C)\s+(P|PR)\[(\d+)(?:,\d+)?(?::[^\]]*)?\]\s*(.*)$/;
const CONTINUATION_RE = /^(P|PR)\[(\d+)(?::[^\]]*)?\]\s+(.*)$/;
const LABEL_RE = /^LBL\[(\d+)\]$/;
const JMP_RE = /^JMP\s+LBL\[(\d+)\]$/;
const IF_RE = /^IF\s+(.+?),\s*JMP\s+LBL\[(\d+)\]$/;
const CALL_RE = /^CALL\s+([A-Z][A-Z0-9_]*)$/;
const WAIT_RE = /^WAIT\s+(.+?)(?:\s+TIMEOUT\s*,\s*LBL\[(\d+)\])?$/;
const SKIP_COND_RE = /^SKIP CONDITION\s+.+$/;
const OFFSET_COND_RE = /^OFFSET CONDITION\s+PR\[(\d+)\]$/;
const IO_SET_RE = /^(RO|DO|GO)\[(\d+)\]=(ON|OFF|\S+)$/;
const R_ASSIGN_RE = /^R\[(\d+)\]=(.+)$/;
const PR_ASSIGN_RE = /^PR\[(\d+)(?:,(\d+))?\]=(.+)$/;
const FRAME_RE = /^(UFRAME_NUM|UTOOL_NUM)=(\d+)$/;
const OVERRIDE_RE = /^OVERRIDE=(\d+)%$/;
const UALM_RE = /^UALM\[(\d+)\]$/;
const MESSAGE_RE = /^MESSAGE\[.*\]$/;
const TERM_RE = /^(FINE|CNT(\d+))$/;

function parseSpeed(tok: string): { kind: "percent" | "linear"; value: number } | null {
  const pct = tok.match(/^(\d+)%$/);
  if (pct) return { kind: "percent", value: Number(pct[1]) };
  const lin = tok.match(/^(\d+(?:\.\d+)?)(mm\/sec|cm\/min|inch\/min|sec|msec)$/);
  if (lin) return { kind: "linear", value: Number(lin[1]) };
  return null;
}

/** Parse "<speed> <term> [options...]" after the position of a motion line. */
function checkMotionTail(
  kind: "J" | "L" | "C",
  tail: string,
  n: number,
  out: Finding[],
  state: { offsetArmed: boolean; skipArmed: boolean; labels: Set<number>; jumpRefs: Array<{ n: number; target: number }> },
): void {
  const toks = tail.split(/\s+/).filter(Boolean);
  if (toks.length < 2) {
    out.push({ severity: "error", line: n, code: "MOTN_INCOMPLETE", message: `${kind} motion needs speed and termination (e.g. "FINE")` });
    return;
  }
  const speed = parseSpeed(toks[0]);
  if (!speed) {
    out.push({ severity: "error", line: n, code: "MOTN_SPEED", message: `unreadable speed "${toks[0]}" — pendant inserts e.g. "20%" (J) or "100mm/sec" (L/C)` });
  } else if (kind === "J" && speed.kind !== "percent") {
    out.push({ severity: "error", line: n, code: "MOTN_J_UNITS", message: `Joint speed is a percent — pendant would not accept "${toks[0]}" on a J line` });
  } else if (kind !== "J" && speed.kind === "percent") {
    out.push({ severity: "error", line: n, code: "MOTN_LC_UNITS", message: `${kind} speed is a feed (mm/sec) — pendant would not accept "${toks[0]}" on a ${kind} line` });
  } else if (speed.kind === "percent" && (speed.value < 1 || speed.value > 100)) {
    out.push({ severity: "error", line: n, code: "MOTN_PCT_RANGE", message: `Joint percent out of range 1–100: ${speed.value}` });
  }
  const term = toks[1]?.match(TERM_RE);
  if (!term) {
    out.push({ severity: "error", line: n, code: "MOTN_TERM", message: `termination must be FINE or CNTn, got "${toks[1] ?? ""}"` });
  } else if (term[2] !== undefined) {
    const cnt = Number(term[2]);
    if (cnt < 0 || cnt > 100) out.push({ severity: "error", line: n, code: "MOTN_CNT_RANGE", message: `CNT value out of range 0–100: ${cnt}` });
  }
  for (const opt of toks.slice(2)) {
    const skipOpt = opt.match(/^Skip,LBL\[(\d+)\]$/);
    if (skipOpt) {
      state.jumpRefs.push({ n, target: Number(skipOpt[1]) });
      if (!state.skipArmed) out.push({ severity: "warning", line: n, code: "SKIP_UNARMED", message: "Skip,LBL without a prior SKIP CONDITION — controller faults at run time" });
      continue;
    }
    if (/^Offset(,PR\[\d+\])?$/.test(opt)) {
      if (!/,/.test(opt) && !state.offsetArmed) out.push({ severity: "warning", line: n, code: "OFFSET_UNARMED", message: "Offset without a prior OFFSET CONDITION — controller faults at run time" });
      continue;
    }
    if (/^OFFSET$/i.test(opt)) {
      out.push({ severity: "warning", line: n, code: "OFFSET_CASE", message: `pendant prints the motion option as "Offset" — use that casing, not "${opt}"` });
      if (!state.offsetArmed) out.push({ severity: "warning", line: n, code: "OFFSET_UNARMED", message: "Offset without a prior OFFSET CONDITION — controller faults at run time" });
      continue;
    }
    if (opt === "INC") continue;
    if (/^ACC\d+$/.test(opt)) continue;
    out.push({ severity: "warning", line: n, code: "MOTN_OPT_UNKNOWN", message: `unknown motion option "${opt}" — confirm on your software` });
  }
}

export function validateLs(source: string, opts: ValidateOptions = {}): Finding[] {
  const out: Finding[] = [];
  const rawLines = source.split(/\r?\n/);

  // ---- sections -----------------------------------------------------------
  const progMatch = source.match(/^\/PROG\s+(\S+)/m);
  if (!progMatch) out.push({ severity: "error", line: null, code: "NO_PROG", message: "missing /PROG header" });
  else if (!/^[A-Z][A-Z0-9_]{0,35}$/.test(progMatch[1]))
    out.push({ severity: "error", line: null, code: "PROG_NAME", message: `program name "${progMatch[1]}" — pendant allows A–Z, 0–9, _ (start with a letter, max 36)` });
  for (const sect of ["/MN", "/END"]) {
    if (!rawLines.some((l) => l.trim() === sect)) out.push({ severity: "error", line: null, code: "NO_SECTION", message: `missing ${sect} section` });
  }
  const order = ["/PROG", "/ATTR", "/APPL", "/MN", "/POS", "/END"];
  let lastIdx = -1;
  for (const l of rawLines) {
    const tag = order.find((s) => l.startsWith(s));
    if (!tag) continue;
    const i = order.indexOf(tag);
    if (i < lastIdx) out.push({ severity: "error", line: null, code: "SECTION_ORDER", message: `${tag} out of order — expected /PROG, /ATTR, /APPL, /MN, /POS, /END` });
    lastIdx = Math.max(lastIdx, i);
  }

  // ---- /MN body -----------------------------------------------------------
  const mnStart = rawLines.findIndex((l) => l.trim() === "/MN");
  const mnEnd = rawLines.findIndex((l, i) => i > mnStart && (l.trim() === "/POS" || l.trim() === "/END"));
  const body: MnLine[] = [];
  if (mnStart !== -1) {
    for (const raw of rawLines.slice(mnStart + 1, mnEnd === -1 ? rawLines.length : mnEnd)) {
      if (!raw.trim()) continue;
      const m = raw.match(/^\s*(\d+)\s*:(.*)$/);
      if (!m) {
        out.push({ severity: "error", line: null, code: "MN_LINE_FORMAT", message: `unnumbered /MN line: "${raw.trim().slice(0, 60)}"` });
        continue;
      }
      const content = m[2].trim();
      const hasSemi = content.endsWith(";");
      const text = (hasSemi ? content.slice(0, -1) : content).trim();
      body.push({ n: Number(m[1]), text, hasSemi, isRemark: text.startsWith("!") });
    }
  }

  // numbering + terminators
  body.forEach((l, i) => {
    if (i > 0 && l.n !== body[i - 1].n + 1)
      out.push({ severity: "error", line: l.n, code: "MN_NUMBERING", message: `line numbers jump ${body[i - 1].n} → ${l.n} — pendant keeps them sequential` });
    if (!l.hasSemi) out.push({ severity: "error", line: l.n, code: "MN_SEMI", message: `line does not end with ";"` });
  });

  // ---- first pass: labels -------------------------------------------------
  const labels = new Set<number>();
  for (const l of body) {
    if (l.isRemark) continue;
    const lbl = l.text.match(LABEL_RE);
    if (lbl) {
      const num = Number(lbl[1]);
      if (labels.has(num)) out.push({ severity: "error", line: l.n, code: "LBL_DUP", message: `duplicate LBL[${num}]` });
      labels.add(num);
    }
  }

  // ---- second pass: instructions ------------------------------------------
  const state = { offsetArmed: false, skipArmed: false, labels, jumpRefs: [] as Array<{ n: number; target: number }> };
  const known = opts.knownPrograms ? new Set(opts.knownPrograms) : null;
  let framesSet = { uframe: false, utool: false };
  let sawEnd = false;
  let pendingCircular: MnLine | null = null;
  let usesPositions = false;

  for (let i = 0; i < body.length; i++) {
    const l = body[i];
    if (l.isRemark) continue;
    if (sawEnd) {
      out.push({ severity: "error", line: l.n, code: "AFTER_END", message: "instruction after END is never executed" });
    }
    const t = l.text;

    if (pendingCircular) {
      const cont = t.match(CONTINUATION_RE);
      if (cont) {
        usesPositions = usesPositions || cont[1] === "P";
        checkMotionTail("C", cont[3], l.n, out, state);
        pendingCircular = null;
        continue;
      }
      out.push({ severity: "error", line: pendingCircular.n, code: "C_NO_DEST", message: "C via point has no destination line (P[n] speed term expected next)" });
      pendingCircular = null;
    }

    const motion = t.match(MOTION_RE);
    if (motion) {
      const [, kind, posKind, , tail] = motion;
      usesPositions = usesPositions || posKind === "P";
      if (kind === "C" && tail.trim() === "") {
        pendingCircular = l; // via line; dest expected on the next line
        continue;
      }
      if ((kind === "L" || kind === "C") && (!framesSet.uframe || !framesSet.utool)) {
        out.push({ severity: "warning", line: l.n, code: "FRAMES_UNSET", message: "Cartesian motion before UFRAME_NUM / UTOOL_NUM are set in this program" });
        framesSet = { uframe: true, utool: true }; // report once
      }
      checkMotionTail(kind as "J" | "L" | "C", tail, l.n, out, state);
      continue;
    }
    if (CONTINUATION_RE.test(t) && /(%|mm\/sec|FINE|CNT)/.test(t)) {
      out.push({ severity: "error", line: l.n, code: "DEST_NO_VIA", message: "bare position line is only valid as the destination after a C via line" });
      continue;
    }

    const frame = t.match(FRAME_RE);
    if (frame) {
      if (frame[1] === "UFRAME_NUM") framesSet.uframe = true;
      else framesSet.utool = true;
      continue;
    }
    if (LABEL_RE.test(t)) continue;
    const jmp = t.match(JMP_RE);
    if (jmp) {
      state.jumpRefs.push({ n: l.n, target: Number(jmp[1]) });
      continue;
    }
    const iff = t.match(IF_RE);
    if (iff) {
      state.jumpRefs.push({ n: l.n, target: Number(iff[2]) });
      continue;
    }
    const call = t.match(CALL_RE);
    if (call) {
      if (known && !known.has(call[1]))
        out.push({ severity: "warning", line: l.n, code: "CALL_UNKNOWN", message: `CALL ${call[1]} — no such program in this repo; it must exist on the controller` });
      continue;
    }
    const wait = t.match(WAIT_RE);
    if (wait) {
      if (wait[2] !== undefined) {
        state.jumpRefs.push({ n: l.n, target: Number(wait[2]) });
        out.push({ severity: "info", line: l.n, code: "WAIT_TMOUT", message: "TIMEOUT branch uses the controller's wait-timeout setting ($WAITTMOUT) — confirm it on the cell" });
      }
      continue;
    }
    if (SKIP_COND_RE.test(t)) {
      state.skipArmed = true;
      continue;
    }
    if (OFFSET_COND_RE.test(t)) {
      state.offsetArmed = true;
      continue;
    }
    if (IO_SET_RE.test(t) || OVERRIDE_RE.test(t) || MESSAGE_RE.test(t) || t === "ABORT") continue;
    const ualm = t.match(UALM_RE);
    if (ualm) {
      if (Number(ualm[1]) < 1) out.push({ severity: "error", line: l.n, code: "UALM_INDEX", message: "UALM index starts at 1" });
      continue;
    }
    const rAssign = t.match(R_ASSIGN_RE);
    if (rAssign) {
      const idx = Number(rAssign[1]);
      if (idx < 1 || idx > 200) out.push({ severity: "warning", line: l.n, code: "R_RANGE", message: `R[${idx}] — typical controllers have R[1..200]; confirm on the cell` });
      continue;
    }
    const prAssign = t.match(PR_ASSIGN_RE);
    if (prAssign) {
      const idx = Number(prAssign[1]);
      if (idx < 1 || idx > 100) out.push({ severity: "warning", line: l.n, code: "PR_RANGE", message: `PR[${idx}] — typical controllers have PR[1..100]; confirm on the cell` });
      continue;
    }
    if (t === "END") {
      sawEnd = true;
      continue;
    }
    if (/^GOTO\b/.test(t)) {
      out.push({ severity: "error", line: l.n, code: "NO_GOTO", message: "there is no GOTO on HandlingTool — use JMP LBL[n]" });
      continue;
    }
    out.push({ severity: "error", line: l.n, code: "UNKNOWN_INSTR", message: `pendant would not accept this line: "${t.slice(0, 60)}"` });
  }
  if (pendingCircular) out.push({ severity: "error", line: pendingCircular.n, code: "C_NO_DEST", message: "C via point has no destination line" });
  if (body.length > 0 && !sawEnd) out.push({ severity: "error", line: null, code: "NO_END", message: "no END instruction — pendant programs end with END" });

  // jump targets
  for (const ref of state.jumpRefs) {
    if (!labels.has(ref.target)) out.push({ severity: "error", line: ref.n, code: "LBL_MISSING", message: `jump to LBL[${ref.target}] but that label is not defined` });
  }

  // study-listing conventions (expected here, informational)
  const posIdx = rawLines.findIndex((l) => l.trim() === "/POS");
  const endIdx = rawLines.findIndex((l) => l.trim() === "/END");
  const posEmpty = posIdx !== -1 && endIdx !== -1 && rawLines.slice(posIdx + 1, endIdx).every((l) => !l.trim());
  if (usesPositions && posEmpty)
    out.push({ severity: "info", line: null, code: "POS_EMPTY", message: "P[n] used with an empty /POS — fine for a study listing; poses are taught on the cell" });

  const sevRank = { error: 0, warning: 1, info: 2 } as const;
  return out.sort((a, b) => sevRank[a.severity] - sevRank[b.severity] || (a.line ?? -1) - (b.line ?? -1));
}

/** Extract the /PROG name from a listing, if present. */
export function programName(source: string): string | null {
  return source.match(/^\/PROG\s+(\S+)/m)?.[1] ?? null;
}
