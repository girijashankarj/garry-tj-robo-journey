import { useMemo, useState } from "react";
import { validateLs, type Finding } from "../tp/validate";

const badge: Record<Finding["severity"], string> = {
  error: "bg-red-500/10 text-red-600 dark:text-red-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  info: "bg-app-accent-bg text-app-accent",
};

export function PendantCheck({ listing, knownPrograms }: { listing: string; knownPrograms: string[] }) {
  const [open, setOpen] = useState(false);
  const findings = useMemo(() => validateLs(listing, { knownPrograms }), [listing, knownPrograms]);
  const errors = findings.filter((f) => f.severity === "error").length;
  const warnings = findings.filter((f) => f.severity === "warning").length;
  const clean = errors === 0 && warnings === 0;

  return (
    <div className="mb-4 rounded-xl border border-app-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm"
      >
        <span aria-hidden>{errors > 0 ? "🔴" : warnings > 0 ? "🟡" : "🟢"}</span>
        <span className="font-medium">
          Pendant check:{" "}
          {clean ? "listing loads clean" : [errors ? `${errors} error${errors > 1 ? "s" : ""}` : "", warnings ? `${warnings} warning${warnings > 1 ? "s" : ""}` : ""].filter(Boolean).join(", ")}
        </span>
        <span className="ml-auto text-app-faint">{open ? "▾" : "▸"}</span>
      </button>
      {open ? (
        <ul className="space-y-1.5 border-t border-app-border px-4 py-3 text-sm">
          {findings.length === 0 ? <li className="text-app-muted">No findings. Static study check only — prove on the cell in T1.</li> : null}
          {findings.map((f, i) => (
            <li key={i} className="flex items-baseline gap-2">
              <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${badge[f.severity]}`}>{f.severity}</span>
              <span className="shrink-0 font-mono text-xs text-app-faint">{f.line === null ? "file" : `L${f.line}`}</span>
              <span className="text-app-muted">{f.message}</span>
            </li>
          ))}
          <li className="pt-1 text-xs text-app-faint">Static pendant-style check of the ASCII listing. Not a cell verification — site SOP and OEM manuals override.</li>
        </ul>
      ) : null}
    </div>
  );
}
