import type { BoardState, Waypoint } from "./types";

export type Sample = { x: number; y: number };

function lerp(a: Sample, b: Sample, t: number): Sample {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function dist(a: Sample, b: Sample): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function quad(a: Sample, m: Sample, b: Sample, t: number): Sample {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * m.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * m.y + t * t * b.y,
  };
}

export function offsetPoints(state: BoardState): Waypoint[] {
  if (!state.offsetOn) return [];
  return state.points.map((p) => ({
    ...p,
    id: `${p.id}o`,
    x: p.x + state.dx,
    y: p.y + state.dy,
    midX: p.midX !== undefined ? p.midX + state.dx : undefined,
    midY: p.midY !== undefined ? p.midY + state.dy : undefined,
  }));
}

function segmentSamples(a: Waypoint, b: Waypoint, term: Waypoint["term"]): Sample[] {
  const start = { x: a.x, y: a.y };
  const end = { x: b.x, y: b.y };
  if (b.into === "C" && b.midX !== undefined && b.midY !== undefined) {
    const m = { x: b.midX, y: b.midY };
    const n = 16;
    const pts = Array.from({ length: n + 1 }, (_, i) => quad(start, m, end, i / n));
    return term === "CNT" ? chamfer(pts) : pts;
  }
  const straight = [start, end];
  return term === "CNT" ? chamfer(straight) : straight;
}

function chamfer(pts: Sample[]): Sample[] {
  if (pts.length < 2) return pts;
  const a = pts[0];
  const b = pts[pts.length - 1];
  const d = dist(a, b);
  if (d < 30) return pts;
  const cut = 12 / d;
  return [lerp(a, b, cut), lerp(a, b, 1 - cut)];
}

export function pathPolyline(points: Waypoint[]): Sample[] {
  const out: Sample[] = [];
  for (let i = 1; i < points.length; i++) {
    const seg = segmentSamples(points[i - 1], points[i], points[i].term);
    if (out.length) seg.shift();
    out.push(...seg);
  }
  return out;
}

export function lengthOf(pts: Sample[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i++) s += dist(pts[i - 1], pts[i]);
  return s;
}

export function atDistance(pts: Sample[], distWanted: number): Sample {
  let remain = distWanted;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const seg = dist(a, b);
    if (remain <= seg) return lerp(a, b, seg === 0 ? 0 : remain / seg);
    remain -= seg;
  }
  return pts[pts.length - 1] ?? { x: 0, y: 0 };
}

export function defaultMid(a: Waypoint, b: Waypoint): { midX: number; midY: number } {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { midX: mx - (dy / len) * 40, midY: my + (dx / len) * 40 };
}
