import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { BoardState, MotionKind, Term, Tool, Waypoint } from "./types";
import { SNAP, snap, uid } from "./types";
import { atDistance, defaultMid, lengthOf, offsetPoints, pathPolyline } from "./geometry";
import { studyListing } from "./listing";
import { PRESETS, defaultBoard } from "./presets";
import { useTheme } from "../../theme";
import { CodeBlock } from "../CodeBlock";
import { drills } from "../../content/load";
import { parseProgram } from "../../tp/parse";

const VB = { w: 640, h: 420 };

/** Convert a drill listing into editable board waypoints (study geometry only).
 *  Unique motion targets are placed around a circle; the sequence of motion
 *  instructions becomes the point order, so repeats revisit the same spot. */
function listingToBoard(listing: string): BoardState {
  const prog = parseProgram(listing);
  const keys: string[] = [];
  const seen = new Set<string>();
  for (const ins of prog.instrs) {
    if (ins.op === "motion" || ins.op === "cvia" || ins.op === "cdest") {
      const k = `${ins.target.kind}[${ins.target.index}]`;
      if (!seen.has(k)) {
        seen.add(k);
        keys.push(k);
      }
    }
  }
  const coord = new Map<string, { x: number; y: number }>();
  keys.forEach((k, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(keys.length, 3);
    coord.set(k, { x: snap(Math.cos(a) * 90), y: snap(Math.sin(a) * -70) });
  });
  const points: Waypoint[] = [];
  let pendingVia: { x: number; y: number } | null = null;
  for (const ins of prog.instrs) {
    if (ins.op === "cvia") {
      pendingVia = coord.get(`${ins.target.kind}[${ins.target.index}]`) ?? null;
      continue;
    }
    if (ins.op === "motion" || ins.op === "cdest") {
      const c = coord.get(`${ins.target.kind}[${ins.target.index}]`);
      if (!c) continue;
      const wp: Waypoint = {
        id: uid(),
        x: c.x,
        y: c.y,
        into: ins.op === "cdest" ? "C" : ins.motion,
        term: ins.term.startsWith("CNT") ? "CNT" : "FINE",
      };
      if (ins.op === "cdest" && pendingVia) {
        wp.midX = pendingVia.x;
        wp.midY = pendingVia.y;
        pendingVia = null;
      }
      points.push(wp);
    }
  }
  const homeKey = keys.find((k) => k.startsWith("PR["));
  const base = JSON.parse(JSON.stringify(defaultBoard)) as BoardState;
  return {
    ...base,
    points,
    showHome: homeKey !== undefined,
    home: homeKey ? coord.get(homeKey)! : base.home,
    offsetOn: false,
    showPallet: false,
    showInc: false,
  };
}

function toScreen(x: number, y: number, panX: number, panY: number, zoom: number) {
  return {
    sx: VB.w / 2 + (x - panX) * zoom,
    sy: VB.h / 2 - (y - panY) * zoom,
  };
}

function toWorld(sx: number, sy: number, panX: number, panY: number, zoom: number) {
  return {
    x: panX + (sx - VB.w / 2) / zoom,
    y: panY - (sy - VB.h / 2) / zoom,
  };
}

function clone(s: BoardState): BoardState {
  return JSON.parse(JSON.stringify(s)) as BoardState;
}

export function PathBoard() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [state, setState] = useState<BoardState>(clone(defaultBoard));
  const [, setHistory] = useState<BoardState[]>([]);
  const [tool, setTool] = useState<Tool>("select");
  const [kind, setKind] = useState<MotionKind>("L");
  const [term, setTerm] = useState<Term>("FINE");
  const [selected, setSelected] = useState<string | null>(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(2.2);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const drag = useRef<{ id: string; panning?: boolean; lx: number; ly: number } | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const push = (next: BoardState) => {
    setHistory((h) => [...h.slice(-24), clone(state)]);
    setState(next);
  };

  const undo = () => {
    setHistory((h) => {
      const prev = h[h.length - 1];
      if (prev) setState(prev);
      return h.slice(0, -1);
    });
  };

  const poly = useMemo(() => pathPolyline(state.points), [state.points]);
  const offPts = useMemo(() => offsetPoints(state), [state]);
  const offPoly = useMemo(() => pathPolyline(offPts), [offPts]);
  const playPoly = state.offsetOn && offPoly.length ? [...poly, ...offPoly] : poly;
  const total = lengthOf(playPoly);
  const toolPos = playPoly.length ? atDistance(playPoly, t * (total || 1)) : { x: 0, y: 0 };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (playingRef.current) setT((v) => (v + dt * 0.18) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const grid: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
  for (let x = -200; x <= 200; x += SNAP) {
    const a = toScreen(x, -160, panX, panY, zoom);
    const b = toScreen(x, 160, panX, panY, zoom);
    grid.push({ x1: a.sx, y1: a.sy, x2: b.sx, y2: b.sy, major: x % 50 === 0 });
  }
  for (let y = -160; y <= 160; y += SNAP) {
    const a = toScreen(-220, y, panX, panY, zoom);
    const b = toScreen(220, y, panX, panY, zoom);
    grid.push({ x1: a.sx, y1: a.sy, x2: b.sx, y2: b.sy, major: y % 50 === 0 });
  }

  const lineColor = (into: MotionKind) => (into === "J" ? (dark ? "#94a3b8" : "#78716c") : into === "C" ? "#0ea5e9" : dark ? "#e39475" : "#c96442");

  function svgPoint(e: MouseEvent<SVGSVGElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { sx: ((e.clientX - r.left) / r.width) * VB.w, sy: ((e.clientY - r.top) / r.height) * VB.h };
  }

  function onDown(e: MouseEvent<SVGSVGElement>) {
    const { sx, sy } = svgPoint(e);
    if (e.button === 1 || e.shiftKey) {
      drag.current = { id: "", panning: true, lx: sx, ly: sy };
      return;
    }
    const hit = [...state.points].reverse().find((p) => {
      const s = toScreen(p.x, p.y, panX, panY, zoom);
      return Math.hypot(s.sx - sx, s.sy - sy) < 10;
    });
    if (tool === "add" && !hit) {
      const w = toWorld(sx, sy, panX, panY, zoom);
      const np: Waypoint = { id: uid(), x: snap(w.x), y: snap(w.y), into: kind, term };
      if (kind === "C" && state.points.length) {
        const mid = defaultMid(state.points[state.points.length - 1], np);
        np.midX = mid.midX;
        np.midY = mid.midY;
      }
      push({ ...state, points: [...state.points, np] });
      setSelected(np.id);
      return;
    }
    if (hit) {
      setSelected(hit.id);
      drag.current = { id: hit.id, lx: sx, ly: sy };
    } else {
      setSelected(null);
      drag.current = { id: "", panning: true, lx: sx, ly: sy };
    }
  }

  function onMove(e: MouseEvent<SVGSVGElement>) {
    const d = drag.current;
    if (!d) return;
    const { sx, sy } = svgPoint(e);
    if (d.panning) {
      setPanX((p) => p - (sx - d.lx) / zoom);
      setPanY((p) => p + (sy - d.ly) / zoom);
      d.lx = sx;
      d.ly = sy;
      return;
    }
    const w = toWorld(sx, sy, panX, panY, zoom);
    setState((s) => ({
      ...s,
      points: s.points.map((p) => (p.id === d.id ? { ...p, x: snap(w.x), y: snap(w.y) } : p)),
    }));
  }

  function onUp() {
    if (drag.current && !drag.current.panning && drag.current.id) {
      setHistory((h) => [...h.slice(-24), clone(state)]);
    }
    drag.current = null;
  }

  function updateSelected(patch: Partial<Waypoint>) {
    if (!selected) return;
    push({
      ...state,
      points: state.points.map((p) => (p.id === selected ? { ...p, ...patch } : p)),
    });
  }

  function removeSelected() {
    if (!selected) return;
    push({ ...state, points: state.points.filter((p) => p.id !== selected) });
    setSelected(null);
  }

  const origin = toScreen(0, 0, panX, panY, zoom);
  const homeS = toScreen(state.home.x, state.home.y, panX, panY, zoom);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-3">
        <div className="rounded-lg border border-app-warn-border bg-app-warn-bg px-3 py-2 text-sm text-app-warn-fg">
          Study sketch, not OEM simulation. Not FANUC RoboGuide. Study millimetres — teach on the cell.
        </div>
        <div className="flex flex-wrap gap-2">
          {(["select", "add"] as const).map((tb) => (
            <button
              key={tb}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${tool === tb ? "bg-app-accent-bg text-app-accent" : "border border-app-border"}`}
              onClick={() => setTool(tb)}
            >
              {tb === "select" ? "Select" : "Add"}
            </button>
          ))}
          {(["J", "L", "C"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${kind === k ? "bg-app-accent-bg text-app-accent" : "border border-app-border"}`}
              onClick={() => {
                setKind(k);
                if (selected) updateSelected({ into: k, ...(k === "C" ? (() => {
                  const i = state.points.findIndex((p) => p.id === selected);
                  const prev = state.points[i - 1];
                  const cur = state.points[i];
                  if (prev && cur) return defaultMid(prev, cur);
                  return {};
                })() : {}) });
              }}
            >
              {k}
            </button>
          ))}
          {(["FINE", "CNT"] as const).map((tm) => (
            <button
              key={tm}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${term === tm ? "bg-app-accent-bg text-app-accent" : "border border-app-border"}`}
              onClick={() => {
                setTerm(tm);
                if (selected) updateSelected({ term: tm });
              }}
            >
              {tm}
            </button>
          ))}
          <button type="button" className="rounded-lg border border-app-border px-3 py-1.5 text-sm" onClick={() => push({ ...state, offsetOn: !state.offsetOn })}>
            {state.offsetOn ? "Hide OFFSET" : "OFFSET 1'-2'-3'-4'"}
          </button>
          <button type="button" className="rounded-lg border border-app-border px-3 py-1.5 text-sm" onClick={() => setPlaying((p) => !p)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" className="rounded-lg border border-app-border px-3 py-1.5 text-sm" onClick={() => setT((v) => Math.min(1, v + 0.08))}>
            Step
          </button>
          <button type="button" className="rounded-lg border border-app-border px-3 py-1.5 text-sm" onClick={undo}>
            Undo
          </button>
          <button type="button" className="rounded-lg border border-app-border px-3 py-1.5 text-sm" onClick={removeSelected}>
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="rounded-lg border border-app-border px-3 py-1.5 text-sm hover:bg-app-hover"
              onClick={() => {
                push(clone(p.state));
                setT(0);
              }}
            >
              {p.label}
            </button>
          ))}
          <select
            value=""
            onChange={(e) => {
              const d = drills.find((x) => x.slug === e.target.value);
              if (d) {
                push(listingToBoard(d.listing));
                setT(0);
                setSelected(null);
              }
            }}
            className="rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-sm text-app-muted focus:border-app-accent focus:outline-none"
            aria-label="Load a drill listing onto the board"
          >
            <option value="" disabled>
              Load drill…
            </option>
            {drills.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.id} · {d.title}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-hidden rounded-xl border border-app-border bg-app-surface">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="h-[min(62vh,560px)] w-full cursor-crosshair touch-none"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((z) => Math.min(8, Math.max(0.6, z * (e.deltaY > 0 ? 0.92 : 1.08))));
            }}
            role="img"
            aria-label="UFRAME path board"
          >
            <rect width={VB.w} height={VB.h} fill={dark ? "#1a1918" : "#f7f4ee"} />
            {grid.map((g, i) => (
              <line key={i} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke={dark ? "#3d3b38" : "#e4dfd4"} strokeWidth={g.major ? 1.2 : 0.5} />
            ))}
            <line x1={origin.sx} y1={0} x2={origin.sx} y2={VB.h} stroke={dark ? "#57534e" : "#d6d3cd"} />
            <line x1={0} y1={origin.sy} x2={VB.w} y2={origin.sy} stroke={dark ? "#57534e" : "#d6d3cd"} />
            {state.showPallet
              ? [0, 1, 2].flatMap((r) =>
                  [0, 1].map((c) => {
                    const a = toScreen(-90 + c * 80, -50 + r * 50, panX, panY, zoom);
                    const b = toScreen(-90 + (c + 1) * 80, -50 + (r + 1) * 50, panX, panY, zoom);
                    return <rect key={`pal-${r}-${c}`} x={Math.min(a.sx, b.sx)} y={Math.min(a.sy, b.sy)} width={Math.abs(b.sx - a.sx)} height={Math.abs(b.sy - a.sy)} fill="none" stroke="#22c55e" strokeDasharray="4 3" />;
                  }),
                )
              : null}
            {state.showInc ? (
              <rect
                x={toScreen(0, 80, panX, panY, zoom).sx}
                y={toScreen(0, 80, panX, panY, zoom).sy}
                width={80 * zoom}
                height={80 * zoom}
                fill="none"
                stroke="#a78bfa"
                strokeDasharray="6 4"
              />
            ) : null}
            {state.showHome ? <circle cx={homeS.sx} cy={homeS.sy} r="6" fill="none" stroke="#16a34a" strokeWidth="2" /> : null}
            {state.points.map((p, i) => {
              if (i === 0) return null;
              const a = state.points[i - 1];
              const sa = toScreen(a.x, a.y, panX, panY, zoom);
              const sb = toScreen(p.x, p.y, panX, panY, zoom);
              if (p.into === "C" && p.midX !== undefined && p.midY !== undefined) {
                const sm = toScreen(p.midX, p.midY, panX, panY, zoom);
                return <path key={`seg-${p.id}`} d={`M ${sa.sx} ${sa.sy} Q ${sm.sx} ${sm.sy} ${sb.sx} ${sb.sy}`} fill="none" stroke={lineColor("C")} strokeWidth="2.5" />;
              }
              return (
                <line
                  key={`seg-${p.id}`}
                  x1={sa.sx}
                  y1={sa.sy}
                  x2={sb.sx}
                  y2={sb.sy}
                  stroke={lineColor(p.into)}
                  strokeWidth="2.5"
                  strokeDasharray={p.into === "J" ? "7 5" : p.term === "CNT" ? "2 0" : undefined}
                />
              );
            })}
            {state.offsetOn
              ? offPts.map((p, i) => {
                  if (i === 0) return null;
                  const a = offPts[i - 1];
                  const sa = toScreen(a.x, a.y, panX, panY, zoom);
                  const sb = toScreen(p.x, p.y, panX, panY, zoom);
                  return <line key={`off-${p.id}`} x1={sa.sx} y1={sa.sy} x2={sb.sx} y2={sb.sy} stroke="#ca8a04" strokeWidth="2" strokeDasharray="8 5" />;
                })
              : null}
            {state.points.map((p, i) => {
              const s = toScreen(p.x, p.y, panX, panY, zoom);
              return (
                <g key={p.id}>
                  <circle cx={s.sx} cy={s.sy} r={selected === p.id ? 8 : 6} fill={selected === p.id ? "#c96442" : dark ? "#f5f2ec" : "#141413"} stroke={dark ? "#1a1918" : "#fff"} strokeWidth="2" />
                  <text x={s.sx} y={s.sy - 12} textAnchor="middle" fontSize="12" fill={dark ? "#f5f2ec" : "#141413"}>
                    {i + 1}
                  </text>
                </g>
              );
            })}
            {state.offsetOn
              ? offPts.map((p, i) => {
                  const s = toScreen(p.x, p.y, panX, panY, zoom);
                  return (
                    <text key={`ol-${p.id}`} x={s.sx} y={s.sy - 10} textAnchor="middle" fontSize="11" fill="#ca8a04">
                      {`${i + 1}'`}
                    </text>
                  );
                })
              : null}
            {playPoly.length ? (
              <circle cx={toScreen(toolPos.x, toolPos.y, panX, panY, zoom).sx} cy={toScreen(toolPos.x, toolPos.y, panX, panY, zoom).sy} r="7" fill="#c96442" stroke={dark ? "#1a1918" : "#fff"} strokeWidth="2" />
            ) : null}
          </svg>
        </div>
        <p className="font-mono text-xs text-app-faint">
          Tool dot at ({Math.round(toolPos.x)}, {Math.round(toolPos.y)}) study mm
        </p>
        <p className="text-xs text-app-faint">Shift-drag or empty-drag to pan. Wheel zoom. Snap {SNAP} mm study units. J is dashed (not joint space).</p>
      </div>
      <aside className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-app-faint">Points</p>
          <ul className="max-h-48 space-y-1 overflow-y-auto text-sm">
            {state.points.map((p, i) => (
              <li key={p.id}>
                <button type="button" className={`w-full rounded px-2 py-1 text-left ${selected === p.id ? "bg-app-accent-bg" : "hover:bg-app-hover"}`} onClick={() => setSelected(p.id)}>
                  {i + 1} · {p.into} {p.term} · {p.x},{p.y}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {(() => {
          const i = state.points.findIndex((p) => p.id === selected);
          const p = state.points[i];
          if (!p) return null;
          return (
            <div className="rounded-lg border border-app-border p-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-app-faint">
                Point {i + 1} · {p.into} {p.term}
              </p>
              <div className="flex gap-2">
                {(["x", "y"] as const).map((axis) => (
                  <label key={axis} className="flex items-center gap-1 font-mono text-xs text-app-muted">
                    {axis.toUpperCase()}
                    <input
                      type="number"
                      step={SNAP}
                      value={p[axis]}
                      onChange={(e) => updateSelected({ [axis]: snap(Number(e.target.value) || 0) })}
                      className="w-20 rounded border border-app-border bg-app-surface px-1.5 py-0.5 text-xs"
                    />
                  </label>
                ))}
              </div>
            </div>
          );
        })()}
        <label className="block text-sm text-app-muted">
          Offset X (study mm)
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-app-border bg-app-surface px-2 py-1"
            value={state.dx}
            onChange={(e) => push({ ...state, dx: Number(e.target.value) || 0 })}
          />
        </label>
        <label className="block text-sm text-app-muted">
          Offset Y (study mm)
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-app-border bg-app-surface px-2 py-1"
            value={state.dy}
            onChange={(e) => push({ ...state, dy: Number(e.target.value) || 0 })}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={state.showHome} onChange={(e) => push({ ...state, showHome: e.target.checked })} /> Home
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={state.showPallet} onChange={(e) => push({ ...state, showPallet: e.target.checked })} /> Pallet cells
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={state.showInc} onChange={(e) => push({ ...state, showInc: e.target.checked })} /> INC box
        </label>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-app-faint">Study listing preview</p>
          <CodeBlock code={studyListing(state)} language="plaintext" />
        </div>
      </aside>
    </div>
  );
}
