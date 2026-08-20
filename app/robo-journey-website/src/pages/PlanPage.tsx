import { PathBoard } from "../components/path-board/PathBoard";

export function PlanPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Path board</h1>
      <p className="text-app-muted">
        Graph-paper UFRAME. Place points, mark each move J / L / C, FINE or CNT, then OFFSET copy 1'-2'-3'-4'. Placeholders only.
      </p>
      <PathBoard />
    </div>
  );
}
