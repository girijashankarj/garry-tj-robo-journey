import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { searchContent } from "../content/search";

export function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const hits = useMemo(() => searchContent(q), [q]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function go(href: string) {
    navigate(href);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[12vh]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search study guide"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setI(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setI((n) => Math.min(n + 1, hits.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setI((n) => Math.max(n - 1, 0));
            }
            if (e.key === "Enter" && hits[i]) go(hits[i].href);
          }}
          placeholder="Search topics, drills, glossary…"
          className="w-full border-b border-app-border bg-transparent px-4 py-3 text-app-fg outline-none"
        />
        <ul className="max-h-80 overflow-y-auto">
          {hits.map((h, idx) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => go(h.href)}
                className={`flex w-full flex-col items-start px-4 py-2 text-left ${idx === i ? "bg-app-hover" : ""}`}
              >
                <span className="text-xs uppercase text-app-faint">{h.kind}</span>
                <span className="text-app-fg">{h.title}</span>
                {h.excerpt ? <span className="line-clamp-1 text-xs text-app-muted">{h.excerpt}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
