import { useState } from "react";
import { Link, useParams } from "react-router";
import { getDrill, neighborDrills, programNames } from "../content/load";
import { drillNavLabel, drillTitle, kindLabel } from "../content/labels";
import { MarkdownView } from "../components/MarkdownView";
import { CodeBlock } from "../components/CodeBlock";
import { PendantCheck } from "../components/PendantCheck";
import { DocMeasure, headingsFromMarkdown } from "../components/DocChrome";

type Tab = "statement" | "listing" | "guide";

export function DrillPage() {
  const { slug } = useParams();
  const drill = slug ? getDrill(slug) : undefined;
  const [tab, setTab] = useState<Tab>("guide");
  if (!drill) {
    return <p className="text-app-faint">Drill not found.</p>;
  }
  const { prev, next } = neighborDrills(drill.slug);
  const md = tab === "statement" ? drill.statement : tab === "guide" ? drill.guide : "";
  const headings = headingsFromMarkdown(md);

  return (
    <DocMeasure headings={tab === "listing" ? [] : headings}>
      <p className="text-xs uppercase tracking-wide text-app-faint">
        Drill {drill.id}
        {kindLabel(drill.kind) ? ` · ${kindLabel(drill.kind)}` : ""}
        {drill.difficulty ? ` · ${drill.difficulty}` : ""}
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{drillTitle(drill)}</h1>
      <div className="mt-5 flex gap-2">
        {(["statement", "listing", "guide"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-sm ${tab === t ? "bg-app-accent-bg text-app-accent" : "border border-app-border text-app-muted"}`}
          >
            {t === "listing" ? "Listing" : t === "statement" ? "Statement" : "Guide"}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tab === "statement" ? <MarkdownView markdown={drill.statement} fromDir={`practice/fanuc/${drill.slug}`} /> : null}
        {tab === "guide" ? <MarkdownView markdown={drill.guide} fromDir={`practice/fanuc/${drill.slug}/doc`} /> : null}
        {tab === "listing" ? (
          <>
            <PendantCheck listing={drill.listing} knownPrograms={programNames} />
            <CodeBlock code={drill.listing} language="plaintext" />
          </>
        ) : null}
      </div>
      <nav className="mt-12 flex justify-between border-t border-app-border pt-6 text-sm">
        {prev ? (
          <Link className="text-app-accent hover:underline" to={`/drill/${prev.slug}`}>
            ← {drillNavLabel(prev)}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="text-app-accent hover:underline" to={`/drill/${next.slug}`}>
            {drillNavLabel(next)} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </DocMeasure>
  );
}
