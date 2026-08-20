import { useMemo, useReducer } from "react";
import { CANVAS, Machine, posLabel } from "../tp/run";

const statusChip: Record<string, string> = {
  idle: "bg-app-accent-bg text-app-accent",
  running: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  waiting: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  alarm: "bg-red-500/10 text-red-600 dark:text-red-400",
  aborted: "bg-red-500/10 text-red-600 dark:text-red-400",
  done: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export function StepRunner({ listing }: { listing: string }) {
  const machine = useMemo(() => new Machine(listing), [listing]);
  const [, redraw] = useReducer((x: number) => x + 1, 0);
  const s = machine.state;
  const lines = [...machine.program.raw.entries()];
  const inputs = Object.keys(s.io).filter((k) => /^(RI|DI|SI|UI)\[/.test(k));
  const outputs = Object.keys(s.io).filter((k) => /^(RO|DO|GO)\[/.test(k));
  const rIdx = Object.keys(s.R).map(Number).sort((a, b) => a - b);
  const prIdx = Object.keys(s.PR).map(Number).sort((a, b) => a - b);
  const act = (fn: () => void) => {
    fn();
    redraw();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => act(() => machine.step())}
          className="rounded-lg bg-app-accent-bg px-4 py-1.5 text-sm font-semibold text-app-accent"
        >
          FWD step
        </button>
        <button type="button" onClick={() => act(() => machine.reset())} className="rounded-lg border border-app-border px-3 py-1.5 text-sm text-app-muted">
          Reset
        </button>
        {s.status === "alarm" ? (
          <button type="button" onClick={() => act(() => machine.resetAlarm())} className="rounded-lg bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-600 dark:text-red-400">
            RESET alarm
          </button>
        ) : null}
        {s.status === "waiting" && s.waitingOn?.hasTimeout ? (
          <button type="button" onClick={() => act(() => machine.forceTimeout())} className="rounded-lg bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
            Force timeout
          </button>
        ) : null}
        <span className={`rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${statusChip[s.status]}`}>{s.status}</span>
        {s.waitingOn ? <span className="text-sm text-app-muted">waiting on {s.waitingOn.text}</span> : null}
        {s.alarm ? <span className="text-sm text-red-600 dark:text-red-400">{s.alarm}</span> : null}
        <span className="ml-auto text-xs text-app-faint">
          UF {s.uframe ?? "—"} · UT {s.utool ?? "—"} · OVR {s.override}% · {s.steps} steps
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="max-h-[420px] overflow-auto rounded-xl border border-app-border p-3 font-mono text-xs leading-6">
          {lines.map(([n, text]) => (
            <div key={n} className={`whitespace-pre rounded px-1 ${n === s.line ? "bg-app-accent-bg text-app-accent" : "text-app-muted"}`}>
              {String(n).padStart(4, " ")}: {text}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="w-full rounded-xl border border-app-border" role="img" aria-label="Study-plane TCP trace">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.08" />
              </pattern>
            </defs>
            <rect width={CANVAS.w} height={CANVAS.h} fill="url(#grid)" className="text-app-muted" />
            {[...machine.layout.values()].map((p) => (
              <g key={posLabel(p.ref)} className="text-app-faint">
                <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="currentColor" />
                <text x={p.x + 7} y={p.y - 6} fontSize="10" fill="currentColor">
                  {posLabel(p.ref)}
                </text>
              </g>
            ))}
            {s.trail.map((seg, i) => (
              <g key={i} className="text-app-accent">
                <path
                  d={seg.vx !== undefined ? `M ${seg.x1} ${seg.y1} Q ${seg.vx} ${seg.vy} ${seg.x2} ${seg.y2}` : `M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={seg.motion === "J" ? "4 4" : undefined}
                  strokeOpacity="0.8"
                />
                <circle cx={seg.x2} cy={seg.y2} r="3.5" fill={seg.term === "FINE" ? "currentColor" : "none"} stroke="currentColor" />
              </g>
            ))}
            <circle cx={s.pos.x} cy={s.pos.y} r="6" className="text-app-accent" fill="currentColor" fillOpacity="0.9" />
          </svg>
          <p className="text-xs text-app-faint">
            Study plane, not millimetres — P[n] spots are auto-placed (poses are placeholders). Dashed = J (joint sweep), solid = L, curve = C. Filled dot = FINE stop, open = CNT.
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-app-border p-3">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-app-faint">Inputs (toggle)</p>
              {inputs.length === 0 ? <p className="text-xs text-app-faint">none referenced</p> : null}
              {inputs.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => act(() => machine.toggleInput(k))}
                  className={`mb-1 mr-1 rounded-lg px-2 py-1 font-mono text-xs ${s.io[k] ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "border border-app-border text-app-muted"}`}
                >
                  {k} {s.io[k] ? "ON" : "OFF"}
                </button>
              ))}
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-app-faint">Outputs (click to force)</p>
              {outputs.length === 0 ? <p className="text-xs text-app-faint">none</p> : null}
              {outputs.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => act(() => machine.toggleInput(k))}
                  className={`mb-1 mr-1 rounded-lg px-2 py-1 font-mono text-xs ${s.io[k] ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "border border-app-border text-app-faint"}`}
                >
                  {k} {s.io[k] ? "ON" : "OFF"}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-app-border p-3">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-app-faint">Registers (editable)</p>
              {rIdx.length === 0 && prIdx.length === 0 ? <p className="text-xs text-app-faint">none referenced</p> : null}
              {rIdx.map((i) => (
                <label key={i} className="mb-1 flex items-center gap-2 font-mono text-xs text-app-muted">
                  R[{i}] =
                  <input
                    type="number"
                    value={s.R[i]}
                    onChange={(e) => act(() => machine.setR(i, Number(e.target.value)))}
                    className="w-20 rounded border border-app-border bg-app-surface px-1.5 py-0.5 font-mono text-xs text-app-fg focus:border-app-accent focus:outline-none"
                  />
                </label>
              ))}
              {prIdx.map((i) => (
                <p key={i} className="font-mono text-xs text-app-muted">
                  PR[{i}] = ({Math.round(s.PR[i].x)}, {Math.round(s.PR[i].y)})
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-40 overflow-auto rounded-xl border border-app-border p-3 font-mono text-xs leading-5 text-app-muted">
        {s.events.length === 0 ? <p className="text-app-faint">Press FWD step — like stepping a program in T2. Not a cell simulation; prove on the robot.</p> : null}
        {s.events.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    </div>
  );
}
