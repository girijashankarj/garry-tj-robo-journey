import { Link } from "react-router";
import { drills, topics } from "../content/load";

const cards = [
  {
    to: "/topic/how-to-read-a-guide",
    title: "Start here",
    body: "How to read a program guide, then Home / safe pose (drill 001).",
  },
  {
    to: "/drill/001-home-safe",
    title: "Drills",
    body: "Numbered HandlingTool problems with listings and flowcharts.",
  },
  {
    to: "/plan",
    title: "Path board",
    body: "Plan J / L / C on a UFRAME grid. Study sketch, not RoboGuide.",
  },
  {
    to: "/glossary",
    title: "Glossary",
    body: "Pendant words and shop talk.",
  },
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <p className="text-sm font-medium text-app-accent">Educational · local</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Garry TJ Robo Journey</h1>
        <p className="mt-4 text-lg leading-relaxed text-app-muted">
          HandlingTool study pages from this repo. Not an official FANUC product.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-xl border border-app-border bg-app-surface p-5 shadow-sm transition hover:border-app-accent"
          >
            <h2 className="text-base font-semibold text-app-fg">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-app-muted">{c.body}</p>
          </Link>
        ))}
      </div>
      <p className="text-sm text-app-faint">
        {topics.length} topics · {drills.length} drills · ⌘K search
      </p>
    </div>
  );
}
