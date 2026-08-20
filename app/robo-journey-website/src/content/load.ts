import type { DrillDoc, SearchHit, TopicDoc } from "./types";
import { ATOM_SLUGS, drillKind, UNION_SLUGS } from "./catalog";
import { excerptFromMarkdown, normalizeVitePath, titleFromMarkdown } from "./parse";
import { drillNavLabel, drillTitle, plainText } from "./labels";

const topicFiles = import.meta.glob("../../../../docs/fanuc/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const practiceMd = import.meta.glob("../../../../practice/fanuc/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const practiceLs = import.meta.glob("../../../../practice/fanuc/**/*.ls", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const glossaryMd = import.meta.glob("../../../../docs/glossary.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const jargonsMd = import.meta.glob("../../../../docs/jargons.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function groupFromSlug(slug: string): string {
  if (!slug.includes("/")) return "Path";
  return slug.split("/")[0] ?? "Other";
}

function parsePracticeIndex(md: string): Map<string, { title: string; difficulty: string; tags: string[] }> {
  const map = new Map<string, { title: string; difficulty: string; tags: string[] }>();
  for (const line of md.split("\n")) {
    const m = line.match(/^\|\s*\[(\d{3}-[a-z0-9-]+)\][^|]*\|\s*([^|]+)\|\s*([^|]+)\|\s*`([^`]+)`/);
    if (!m) continue;
    map.set(m[1], {
      title: plainText(m[2].trim()),
      difficulty: m[3].trim(),
      tags: m[4].split(",").map((t) => t.trim()),
    });
  }
  return map;
}

export const glossaryMarkdown = Object.values(glossaryMd)[0] ?? "";
export const jargonsMarkdown = Object.values(jargonsMd)[0] ?? "";

const practiceIndexMd = practiceMd[Object.keys(practiceMd).find((k) => k.endsWith("practice/fanuc/README.md")) ?? ""] ?? "";
const drillMeta = parsePracticeIndex(practiceIndexMd);

export const topics: TopicDoc[] = Object.entries(topicFiles)
  .map(([file, markdown]) => {
    const norm = normalizeVitePath(file);
    const match = norm.match(/docs\/fanuc\/(.+)\.md$/);
    if (!match) return null;
    const slug = match[1];
    if (slug === "README") return null;
    return {
      slug,
      title: plainText(titleFromMarkdown(markdown, slug)),
      markdown,
      group: groupFromSlug(slug),
    } satisfies TopicDoc;
  })
  .filter((t): t is TopicDoc => t !== null)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const topicBySlug = new Map(topics.map((t) => [t.slug, t]));

export function getTopic(slug: string): TopicDoc | undefined {
  return topicBySlug.get(slug);
}

export const drills: DrillDoc[] = (() => {
  const slugs = new Set<string>();
  for (const key of [...Object.keys(practiceMd), ...Object.keys(practiceLs)]) {
    const m = normalizeVitePath(key).match(/practice\/fanuc\/(\d{3}-[a-z0-9-]+)\//);
    if (m) slugs.add(m[1]);
  }
  return [...slugs]
    .sort()
    .map((slug) => {
      const statementKey = Object.keys(practiceMd).find((k) => normalizeVitePath(k).endsWith(`practice/fanuc/${slug}/README.md`));
      const guideKey = Object.keys(practiceMd).find((k) => normalizeVitePath(k).endsWith(`practice/fanuc/${slug}/doc/guide.md`));
      const lsKey = Object.keys(practiceLs).find((k) => normalizeVitePath(k).includes(`practice/fanuc/${slug}/`));
      const meta = drillMeta.get(slug);
      const statement = statementKey ? practiceMd[statementKey] : "";
      return {
        id: slug.slice(0, 3),
        slug,
        title: drillTitle({ title: meta?.title ?? titleFromMarkdown(statement, slug) }),
        difficulty: meta?.difficulty ?? "",
        tags: meta?.tags ?? [],
        kind: drillKind(slug),
        statement,
        guide: guideKey ? practiceMd[guideKey] : "",
        listing: lsKey ? practiceLs[lsKey] : "",
      } satisfies DrillDoc;
    });
})();

const drillBySlug = new Map(drills.map((d) => [d.slug, d]));

/** /PROG names across all drill listings (for CALL cross-checks). */
export const programNames: string[] = drills
  .map((d) => d.listing.match(/^\/PROG\s+(\S+)/m)?.[1])
  .filter((n): n is string => n !== undefined);

export function getDrill(slug: string): DrillDoc | undefined {
  return drillBySlug.get(slug);
}

export function neighborDrills(slug: string): { prev?: DrillDoc; next?: DrillDoc } {
  const i = drills.findIndex((d) => d.slug === slug);
  return { prev: drills[i - 1], next: drills[i + 1] };
}

export function neighborTopics(slug: string): { prev?: TopicDoc; next?: TopicDoc } {
  const i = topics.findIndex((t) => t.slug === slug);
  return { prev: topics[i - 1], next: topics[i + 1] };
}

export const searchIndex: SearchHit[] = [
  ...topics.map((t) => ({
    id: `topic:${t.slug}`,
    kind: "topic" as const,
    title: t.title,
    href: `/topic/${t.slug}`,
    excerpt: excerptFromMarkdown(t.markdown),
  })),
  ...drills.map((d) => ({
    id: `drill:${d.slug}`,
    kind: "drill" as const,
    title: drillNavLabel(d),
    href: `/drill/${d.slug}`,
    excerpt: [d.kind === "union" ? "Union" : d.kind === "atom" ? "Atom" : "", d.difficulty, d.tags.join(", "), excerptFromMarkdown(d.statement)].filter(Boolean).join(" · "),
  })),
  {
    id: "glossary",
    kind: "glossary",
    title: "Glossary",
    href: "/glossary",
    excerpt: excerptFromMarkdown(glossaryMarkdown),
  },
  {
    id: "jargons",
    kind: "jargons",
    title: "Shop talk / jargons",
    href: "/jargons",
    excerpt: excerptFromMarkdown(jargonsMarkdown),
  },
];

export { ATOM_SLUGS, UNION_SLUGS };
