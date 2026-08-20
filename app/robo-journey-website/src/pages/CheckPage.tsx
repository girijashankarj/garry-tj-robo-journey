import { useMemo, useState } from "react";
import { drills, programNames } from "../content/load";
import { PendantCheck } from "../components/PendantCheck";
import { StepRunner } from "../components/StepRunner";
import { parseProgram } from "../tp/parse";

export function CheckPage() {
  const [source, setSource] = useState("");
  const trimmed = source.trim();
  const runnable = useMemo(() => (trimmed ? parseProgram(source).instrs.length > 0 : false), [source, trimmed]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Pendant check</h1>
        <p className="mt-2 max-w-3xl text-app-muted">
          Paste an ASCII Teach Pendant listing (<code className="text-sm">.ls</code>). It gets the same pendant-style
          static checks as the drills — sections, line numbers, J/L/C speed units, FINE/CNT, labels, Offset/Skip arming —
          and you can step it like T2. Everything runs in your browser; nothing is uploaded.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value=""
          onChange={(e) => {
            const d = drills.find((x) => x.slug === e.target.value);
            if (d) setSource(d.listing);
          }}
          className="rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-sm text-app-muted focus:border-app-accent focus:outline-none"
          aria-label="Load a drill listing"
        >
          <option value="" disabled>
            Load a drill listing…
          </option>
          {drills.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.id} · {d.title}
            </option>
          ))}
        </select>
        {trimmed ? (
          <button type="button" onClick={() => setSource("")} className="rounded-lg border border-app-border px-3 py-1.5 text-sm text-app-muted hover:text-app-fg">
            Clear
          </button>
        ) : null}
        <span className="text-xs text-app-faint">Loaded listings stay editable — change lines and the findings update live.</span>
      </div>

      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        spellCheck={false}
        placeholder={"/PROG MYPROG\n/ATTR\n/MN\n   1:  UFRAME_NUM=1 ;\n   2:  J P[1] 20% FINE ;\n   3:  END ;\n/POS\n/END"}
        className="h-56 w-full rounded-xl border border-app-border bg-app-surface p-3 font-mono text-xs leading-5 text-app-fg placeholder:text-app-faint focus:border-app-accent focus:outline-none"
      />

      {trimmed ? (
        <>
          <PendantCheck listing={source} knownPrograms={programNames} defaultOpen />
          {runnable ? <StepRunner listing={source} /> : null}
        </>
      ) : (
        <p className="text-sm text-app-faint">Paste a listing or load the example to see findings and the step-runner.</p>
      )}

      <p className="text-sm text-app-faint">
        Study check only — not a cell verification. Prove in T1, then T2, then Auto. Site SOP and OEM manuals override this page.
      </p>
    </div>
  );
}
