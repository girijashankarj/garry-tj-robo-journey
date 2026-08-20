import type { BoardState, Waypoint } from "./types";

function wp(id: string, x: number, y: number, into: Waypoint["into"], term: Waypoint["term"] = "FINE"): Waypoint {
  return { id, x, y, into, term };
}

const empty: BoardState = {
  points: [],
  offsetOn: false,
  dx: 40,
  dy: 30,
  showHome: true,
  showPallet: false,
  showInc: false,
  home: { x: -80, y: -80 },
};

export const PRESETS: { id: string; label: string; state: BoardState }[] = [
  {
    id: "002",
    label: "Square (J then L) — drill 002",
    state: {
      ...empty,
      points: [
        wp("a", -60, -60, "J"),
        wp("b", 60, -60, "L"),
        wp("c", 60, 60, "L"),
        wp("d", -60, 60, "L"),
        wp("e", -60, -60, "L"),
      ],
    },
  },
  {
    id: "003",
    label: "Circular (C) — drill 003",
    state: {
      ...empty,
      points: [
        wp("a", -50, 0, "J"),
        { id: "b", x: 0, y: 70, into: "C", term: "FINE", midX: -40, midY: 50 },
        { id: "c", x: 50, y: 0, into: "C", term: "FINE", midX: 40, midY: 50 },
      ],
    },
  },
  {
    id: "004",
    label: "Incremental box — drill 004",
    state: {
      ...empty,
      showInc: true,
      points: [
        wp("a", 0, 0, "J"),
        wp("b", 80, 0, "L"),
        wp("c", 80, 80, "L"),
        wp("d", 0, 80, "L"),
        wp("e", 0, 0, "L"),
      ],
    },
  },
  {
    id: "005",
    label: "Offset path — drill 005",
    state: {
      ...empty,
      offsetOn: true,
      dx: 50,
      dy: 25,
      points: [
        wp("a", -70, -50, "J"),
        wp("b", 50, -50, "L"),
        wp("c", 50, 50, "L"),
        wp("d", -70, 50, "L"),
        wp("e", -70, -50, "L"),
      ],
    },
  },
  {
    id: "018",
    label: "Pallet grid — drill 018",
    state: {
      ...empty,
      showPallet: true,
      points: [
        wp("a", -90, -50, "J"),
        wp("b", -90, -50, "L"),
      ],
    },
  },
];

export const defaultBoard: BoardState = PRESETS[3].state;
