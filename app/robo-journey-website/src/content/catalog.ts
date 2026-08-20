export const UNION_SLUGS = new Set([
  "002-square-path",
  "007-wait-gripper",
  "016-skip-linear",
  "017-pick-place",
  "018-pallet-grid",
  "019-contour-plot",
]);

export const ATOM_SLUGS = new Set([
  "011-joint-only",
  "012-linear-only",
  "003-circular-path",
  "013-lbl-jmp",
  "014-remark-header",
  "015-override-instr",
  "020-user-alarm",
  "021-message",
  "006-loop-call",
  "004-incremental-box",
  "005-offset-path",
  "008-pr-lpos",
  "010-main-call",
]);

export const LEARNING_STEPS: { label: string; topicSlugs: string[]; drillSlugs: string[] }[] = [
  {
    label: "1 · Safety, jog, home",
    topicSlugs: [
      "how-to-read-a-guide",
      "safety-dcs/modes-t1-t2-auto",
      "controller-pendant/teach-pendant",
      "motion-paths-home/jog-and-recovery",
      "motion-paths-home/overview",
    ],
    drillSlugs: ["001-home-safe", "002-square-path"],
  },
  {
    label: "2 · Frames and motion",
    topicSlugs: [
      "io-frames-tools/frames",
      "programming-tp/identifiers",
      "programming-tp/keywords",
      "programming-tp/motion-types-fine-cnt",
      "programming-tp/offset-and-incremental",
    ],
    drillSlugs: ["003-circular-path", "004-incremental-box", "005-offset-path", "008-pr-lpos"],
  },
  {
    label: "3 · I/O and CALL",
    topicSlugs: ["io-frames-tools/io-classes", "programming-tp/registers-jumps-call"],
    drillSlugs: ["006-loop-call", "007-wait-gripper", "010-main-call"],
  },
  {
    label: "4 · Backup",
    topicSlugs: ["controller-pendant/backup-restore"],
    drillSlugs: [],
  },
  {
    label: "5 · Alarms",
    topicSlugs: ["alarms/overview", "programming-tp/ualm"],
    drillSlugs: ["007-wait-gripper", "009-fault-home", "020-user-alarm"],
  },
  {
    label: "6 · Atoms then unions",
    topicSlugs: ["topic-map"],
    drillSlugs: [
      "011-joint-only",
      "012-linear-only",
      "013-lbl-jmp",
      "014-remark-header",
      "015-override-instr",
      "016-skip-linear",
      "017-pick-place",
      "018-pallet-grid",
      "019-contour-plot",
      "020-user-alarm",
      "021-message",
    ],
  },
];

export function drillKind(slug: string): "atom" | "union" | "core" {
  if (UNION_SLUGS.has(slug)) return "union";
  if (ATOM_SLUGS.has(slug)) return "atom";
  return "core";
}
