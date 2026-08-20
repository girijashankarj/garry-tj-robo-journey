import Fuse from "fuse.js";
import { searchIndex } from "./load";
import type { SearchHit } from "./types";

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 0.6 },
    { name: "excerpt", weight: 0.3 },
    { name: "kind", weight: 0.1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
});

export function searchContent(query: string): SearchHit[] {
  const q = query.trim();
  if (!q) return searchIndex.slice(0, 12);
  return fuse.search(q, { limit: 20 }).map((r) => r.item);
}
