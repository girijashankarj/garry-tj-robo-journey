export type MotionKind = "J" | "L" | "C";
export type Term = "FINE" | "CNT";

export type Waypoint = {
  id: string;
  x: number;
  y: number;
  into: MotionKind;
  term: Term;
  midX?: number;
  midY?: number;
};

export type BoardState = {
  points: Waypoint[];
  offsetOn: boolean;
  dx: number;
  dy: number;
  showHome: boolean;
  showPallet: boolean;
  showInc: boolean;
  home: { x: number; y: number };
};

export type Tool = "select" | "add";

export const SNAP = 10;

export function snap(n: number): number {
  return Math.round(n / SNAP) * SNAP;
}

export function uid(): string {
  return `p${Math.random().toString(36).slice(2, 8)}`;
}
