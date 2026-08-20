import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "../theme";

/** Mermaid 11 treats these as keywords; GitHub still accepts them in classDef. */
const RESERVED_CLASS = ["io", "call", "note", "end", "class", "click", "callback", "default", "style"];

export function sanitizeMermaid(src: string): string {
  let out = src.trim().replace(/stroke-dasharray:\s*5\s+5/g, "stroke-dasharray:5");
  for (const name of RESERVED_CLASS) {
    const alias = `${name}Cls`;
    out = out.replace(new RegExp(`\\bclassDef ${name}\\b`, "g"), `classDef ${alias}`);
    out = out.replace(new RegExp(`(\\bclass\\s+[\\w,]+)\\s+${name}\\b`, "g"), `$1 ${alias}`);
  }
  return out;
}

let renderSeq = 0;
let lastMermaidTheme: string | null = null;

async function mermaidApi(theme: "light" | "dark") {
  const mermaid = (await import("mermaid")).default;
  const mermaidTheme = theme === "dark" ? "dark" : "default";
  if (lastMermaidTheme !== mermaidTheme) {
    mermaid.initialize({
      startOnLoad: false,
      theme: mermaidTheme,
      securityLevel: "loose",
      suppressErrorRendering: true,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    });
    lastMermaidTheme = mermaidTheme;
  }
  return mermaid;
}

export function MermaidBlock({ chart }: { chart: string }) {
  const { theme } = useTheme();
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const src = sanitizeMermaid(chart);
    const renderId = `mmd-${id}-${++renderSeq}`;

    void mermaidApi(theme)
      .then((mermaid) => mermaid.render(renderId, src))
      .then(({ svg }) => {
        if (cancelled || !el) return;
        setErr(null);
        el.innerHTML = svg;
        const svgEl = el.querySelector("svg");
        if (svgEl) {
          svgEl.style.maxWidth = "100%";
          svgEl.style.height = "auto";
        }
      })
      .catch(() => {
        if (cancelled) return;
        setErr("Mermaid 11 rejected a class name that GitHub still accepts.");
        if (el) el.innerHTML = "";
      });

    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  return (
    <div className="my-4">
      {err ? (
        <p className="rounded-lg border border-app-warn-border bg-app-warn-bg px-3 py-2 text-sm text-app-warn-fg">
          Chart skipped ({err}) Same diagram still works on GitHub.
        </p>
      ) : null}
      <div
        ref={ref}
        className={err ? "hidden" : "overflow-x-auto rounded-lg border border-app-border bg-app-surface p-3"}
      />
    </div>
  );
}
