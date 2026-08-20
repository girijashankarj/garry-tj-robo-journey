import type { DrillDoc } from "./types";

export function plainText(s: string): string {
  return s
    .replace(/[*_`]/g, "")
    .replace(/\s+—\s+(union|atom)\s*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function drillTitle(d: Pick<DrillDoc, "title">): string {
  return plainText(d.title);
}

export function drillNavLabel(d: Pick<DrillDoc, "id" | "title">): string {
  return `${d.id} · ${drillTitle(d)}`;
}

export function kindLabel(kind: DrillDoc["kind"]): string | null {
  if (kind === "union") return "Union";
  if (kind === "atom") return "Atom";
  return null;
}

const GROUP_LABELS: Record<string, string> = {
  Path: "Getting started",
  "safety-dcs": "Safety and DCS",
  "controller-pendant": "Controller and pendant",
  "motion-paths-home": "Motion, paths, and home",
  "io-frames-tools": "I/O and frames",
  "programming-tp": "Teach Pendant",
  applications: "Applications",
  alarms: "Alarms",
  "industrial-arm": "Industrial arm",
  collaborative: "Collaborative",
  "programming-karel": "Karel",
};

export function topicGroupLabel(group: string): string {
  if (GROUP_LABELS[group]) return GROUP_LABELS[group];
  return group
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
