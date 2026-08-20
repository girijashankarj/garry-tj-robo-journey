import { useEffect, useRef } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import mindmapMd from "../content/mindmap.md?raw";

export function MindMapView({ markdown = mindmapMd }: { markdown?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { root } = new Transformer().transform(markdown);
    if (!mmRef.current) {
      mmRef.current = Markmap.create(svg, { autoFit: true, duration: 200 }, root);
    } else {
      mmRef.current.setData(root);
      void mmRef.current.fit();
    }
  }, [markdown]);

  return (
    <svg
      ref={svgRef}
      className="h-[70vh] w-full rounded-xl border border-app-border bg-app-surface"
      role="img"
      aria-label="Classroom mind map"
    />
  );
}
