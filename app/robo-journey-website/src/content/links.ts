const PRACTICE = /(?:^|\/)practice\/fanuc\/(\d{3}-[a-z0-9-]+)/;
const TOPIC = /(?:^|\/)docs\/fanuc\/(.+?)(?:\.md)?$/;

export function posixJoin(fromDir: string, rel: string): string {
  const parts = [...fromDir.split("/").filter(Boolean), ...rel.replace(/\\/g, "/").split("/")];
  const out: string[] = [];
  for (const p of parts) {
    if (!p || p === ".") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return out.join("/");
}

export function dirnameOf(slug: string): string {
  const i = slug.lastIndexOf("/");
  return i === -1 ? "" : slug.slice(0, i);
}

/**
 * Map a markdown href to an in-app route, or return the original href if it is
 * http / mailto / hash / a file the UI does not host (LEGAL, .ls, .cursor).
 */
export function resolveContentHref(href: string | undefined, fromDir: string): string | undefined {
  if (!href) return href;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return href;

  const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";
  const clean = (href.split("#")[0] ?? href).replace(/\\/g, "/");

  const resolved = clean.startsWith("/")
    ? clean.replace(/^\//, "")
    : posixJoin(fromDir, clean);

  const noMd = resolved.replace(/\.md$/i, "").replace(/\/$/, "");

  const drill = PRACTICE.exec(noMd) ?? PRACTICE.exec(clean);
  if (drill) return `/drill/${drill[1]}${hash}`;

  if (/(?:^|\/)practice\/fanuc(?:\/README)?$/i.test(noMd)) return `/${hash}`;

  if (/(?:^|\/)glossary$/i.test(noMd) || /glossary\.md$/i.test(clean)) return `/glossary${hash}`;
  if (/(?:^|\/)jargons$/i.test(noMd) || /jargons\.md$/i.test(clean)) return `/jargons${hash}`;

  const topic = noMd.match(TOPIC);
  if (topic) {
    const slug = topic[1].replace(/\.md$/i, "");
    if (slug === "README" || slug === "") return `/${hash}`;
    return `/topic/${slug}${hash}`;
  }

  return href;
}

export function topicFromDir(fromSlug: string): string {
  const dir = dirnameOf(fromSlug);
  return dir ? `docs/fanuc/${dir}` : "docs/fanuc";
}
