import { Link } from "react-router";
import { BookA, Boxes, ClipboardCheck, GraduationCap, ListChecks, Waypoints } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { drills, topics } from "../content/load";

const cards: Array<{ to: string; icon: LucideIcon; title: string; body: string }> = [
  {
    to: "/topic/how-to-read-a-guide",
    icon: GraduationCap,
    title: "Start here",
    body: "How to read a program guide, then Home / safe pose (drill 001).",
  },
  {
    to: "/drill/001-home-safe",
    icon: ListChecks,
    title: "Drills",
    body: "Numbered HandlingTool problems — listing, flowchart, pendant check, and a Run tab.",
  },
  {
    to: "/check",
    icon: ClipboardCheck,
    title: "Pendant check",
    body: "Paste a TP listing, get pendant-style findings, and step it like T2. Runs in your browser.",
  },
  {
    to: "/plan",
    icon: Boxes,
    title: "Path board",
    body: "Plan J / L / C on a UFRAME grid. Study sketch, not RoboGuide.",
  },
  {
    to: "/mindmap",
    icon: Waypoints,
    title: "Mind map",
    body: "The whole curriculum on one zoomable map.",
  },
  {
    to: "/glossary",
    icon: BookA,
    title: "Glossary",
    body: "Pendant words and shop talk.",
  },
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <p className="text-sm font-medium text-app-accent">Educational · not an official FANUC product</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Garry TJ Robo Journey</h1>
        <p className="mt-4 text-lg leading-relaxed text-app-muted">
          A FANUC HandlingTool study guide: articles, drills, and hands-on study tools.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-xl border border-app-border bg-app-surface p-5 shadow-sm transition hover:border-app-accent"
          >
            <h2 className="flex items-center gap-2 text-base font-semibold text-app-fg">
              <c.icon className="h-4 w-4 text-app-accent" /> {c.title}
            </h2>
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
