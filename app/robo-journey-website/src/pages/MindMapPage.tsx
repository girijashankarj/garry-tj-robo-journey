import { MindMapView } from "../components/MindMapView";

export function MindMapPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h1 className="text-2xl font-semibold">Classroom mind map</h1>
      <p className="text-app-muted">Atoms first, then unions. OFFSET is taught 1-2-3-4, then copy 1'-2'-3'-4'.</p>
      <MindMapView />
    </div>
  );
}
