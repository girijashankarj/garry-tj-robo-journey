import type { ReactNode } from "react";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function headingsFromMarkdown(md: string): { id: string; title: string }[] {
  const out: { id: string; title: string }[] = [];
  for (const line of md.split("\n")) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const title = m[2].replace(/[*_`]/g, "").trim();
    out.push({ id: slugify(title), title });
  }
  return out;
}

export function OnThisPage({ headings }: { headings: { id: string; title: string }[] }) {
  if (headings.length < 2) return null;
  return (
    <nav className="sticky top-6 hidden w-48 shrink-0 xl:block" aria-label="On this page">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-app-faint">On this page</p>
      <ul className="space-y-1.5 border-l border-app-border pl-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-sm text-app-muted hover:text-app-fg">
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DocMeasure({ children, headings }: { children: ReactNode; headings?: { id: string; title: string }[] }) {
  return (
    <div className="mx-auto flex max-w-5xl gap-12">
      <div className="min-w-0 flex-1" style={{ maxWidth: "42rem" }}>
        {children}
      </div>
      {headings ? <OnThisPage headings={headings} /> : null}
    </div>
  );
}
