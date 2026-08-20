import type { BoardState } from "./types";

export function studyListing(state: BoardState): string {
  const lines: string[] = [
    "   0:  ! FANUC retains all rights. Educational only. Own consent and risk. See LEGAL.md ;",
    "   1:  ! Study listing. Placeholders — teach on the cell. Not a backup. ;",
    "   2:  UFRAME_NUM=1 ;",
    "   3:  UTOOL_NUM=1 ;",
  ];
  let n = 4;
  if (state.showHome) {
    lines.push(`   ${n}:  J PR[1:Home] 100% FINE    ;`);
    n += 1;
  }
  if (state.offsetOn) {
    lines.push(`   ${n}:  ! OFFSET CONDITION PR[2]  study dx=${state.dx} dy=${state.dy} ;`);
    n += 1;
    lines.push(`   ${n}:  OFFSET CONDITION PR[2] ;`);
    n += 1;
  }
  state.points.forEach((p, i) => {
    const label = `P[${i + 1}]`;
    const term = p.term === "CNT" ? "CNT100" : "FINE";
    if (p.into === "J") {
      lines.push(`   ${n}:  J ${label} 100% ${term}    ;`);
    } else if (p.into === "C") {
      lines.push(`   ${n}:  C ${label} 200mm/sec ${term}    ;`);
    } else {
      lines.push(`   ${n}:  L ${label} 500mm/sec ${term}    ;`);
    }
    n += 1;
  });
  if (state.showHome) {
    lines.push(`   ${n}:  J PR[1:Home] 100% FINE    ;`);
    n += 1;
  }
  lines.push(`   ${n}:  END ;`);
  return lines.join("\n");
}
