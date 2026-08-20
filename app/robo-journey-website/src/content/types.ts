export type TopicDoc = {
  slug: string;
  title: string;
  markdown: string;
  group: string;
};

export type DrillDoc = {
  id: string;
  slug: string;
  title: string;
  difficulty: string;
  tags: string[];
  kind: "atom" | "union" | "core";
  statement: string;
  guide: string;
  listing: string;
};

export type SearchHit = {
  id: string;
  kind: "topic" | "drill" | "glossary" | "jargons";
  title: string;
  href: string;
  excerpt: string;
};
