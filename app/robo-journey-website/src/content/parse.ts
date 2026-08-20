const TITLE_RE = /^#\s+(.+)$/m;

export function titleFromMarkdown(md: string, fallback: string): string {
  const match = md.match(TITLE_RE);
  return match?.[1]?.replace(/[*_`]/g, "").trim() || fallback;
}

export function excerptFromMarkdown(md: string, max = 160): string {
  const line = md
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("```") && !l.startsWith("|"));
  if (!line) return "";
  const plain = line.replace(/[*_`[\]]/g, "");
  return plain.length > max ? `${plain.slice(0, max)}…` : plain;
}

export function normalizeVitePath(p: string): string {
  return p.replace(/\\/g, "/");
}
