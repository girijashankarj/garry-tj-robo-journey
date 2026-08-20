import { LEARNING_STEPS } from "../content/catalog";
import { drills, getTopic, topics } from "../content/load";
import type { TopicDoc } from "../content/types";
import { drillNavLabel, kindLabel, topicGroupLabel } from "../content/labels";
import { NavLink } from "react-router";
import { BookOpen, Boxes, Map, Route, Waypoints } from "lucide-react";

const groupOrder = [
  "Path",
  "safety-dcs",
  "controller-pendant",
  "motion-paths-home",
  "io-frames-tools",
  "programming-tp",
  "applications",
  "alarms",
  "industrial-arm",
  "collaborative",
  "programming-karel",
];

function groupedTopics(): [string, TopicDoc[]][] {
  const map: Record<string, TopicDoc[]> = {};
  for (const t of topics) {
    (map[t.group] ??= []).push(t);
  }
  const keys = Object.keys(map).sort((a, b) => {
    const ia = groupOrder.indexOf(a);
    const ib = groupOrder.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  return keys.map((k) => [k, map[k] ?? []]);
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded px-2 py-1 text-sm ${isActive ? "bg-app-accent-bg text-app-accent" : "text-app-muted hover:bg-app-hover hover:text-app-fg"}`;

export function Sidebar() {
  return (
    <nav className="space-y-6 text-sm">
      <section>
        <p className="mb-2 flex items-center gap-2 font-semibold uppercase tracking-wide text-app-faint">
          <Route className="h-3.5 w-3.5" /> Classroom
        </p>
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/mindmap" className={linkClass}>
          <span className="inline-flex items-center gap-2">
            <Waypoints className="h-3.5 w-3.5" /> Mind map
          </span>
        </NavLink>
        <NavLink to="/plan" className={linkClass}>
          <span className="inline-flex items-center gap-2">
            <Boxes className="h-3.5 w-3.5" /> Path board
          </span>
        </NavLink>
        <NavLink to="/glossary" className={linkClass}>
          Glossary
        </NavLink>
        <NavLink to="/jargons" className={linkClass}>
          Jargons
        </NavLink>
      </section>

      <section>
        <p className="mb-2 flex items-center gap-2 font-semibold uppercase tracking-wide text-app-faint">
          <Map className="h-3.5 w-3.5" /> Learning path
        </p>
        {LEARNING_STEPS.map((step) => (
          <div key={step.label} className="mb-3">
            <p className="px-2 text-xs font-medium text-app-faint">{step.label}</p>
            {step.topicSlugs.map((slug) => {
              const t = getTopic(slug);
              return (
                <NavLink key={slug} to={`/topic/${slug}`} className={linkClass}>
                  {t?.title ?? slug}
                </NavLink>
              );
            })}
          </div>
        ))}
      </section>

      <section>
        <p className="mb-2 flex items-center gap-2 font-semibold uppercase tracking-wide text-app-faint">
          <BookOpen className="h-3.5 w-3.5" /> All topics
        </p>
        {groupedTopics().map(([group, list]) => (
          <details key={group} className="mb-1">
            <summary className="cursor-pointer px-2 py-1 text-app-faint hover:text-app-fg">{topicGroupLabel(group)}</summary>
            {list.map((t) => (
              <NavLink key={t.slug} to={`/topic/${t.slug}`} className={linkClass}>
                {t.title}
              </NavLink>
            ))}
          </details>
        ))}
      </section>

      <section>
        <p className="mb-2 font-semibold uppercase tracking-wide text-app-faint">Drills</p>
        {drills.map((d) => {
          const kind = kindLabel(d.kind);
          return (
            <NavLink key={d.slug} to={`/drill/${d.slug}`} className={linkClass}>
              {drillNavLabel(d)}
              {kind ? <span className="ml-1 text-[10px] text-app-faint">{kind}</span> : null}
            </NavLink>
          );
        })}
      </section>
    </nav>
  );
}
