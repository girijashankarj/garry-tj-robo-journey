// CLI: pendant-style validation of .ls listings.
// No args: every study listing under practice/ and programs/ (CI mode).
// With args: just those files (paths relative to the current directory), e.g.
//   npm run validate:ls -- ../../temp/clients/org-a/prog/code/as-received.ls
// CALL targets are cross-checked against all repo /PROG names either way.
// Exit 1 if any checked listing has errors (warnings and infos do not fail).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { programName, validateLs, type Finding } from "../src/tp/validate";

const repoRoot = resolve(fileURLToPath(import.meta.url), "../../../..");

function findLs(dir: string): string[] {
  let out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out = out.concat(findLs(p));
    else if (e.endsWith(".ls")) out.push(p);
  }
  return out;
}

const repoFiles = [...findLs(join(repoRoot, "practice")), ...findLs(join(repoRoot, "programs"))].sort();
const args = process.argv.slice(2);
const files = args.length > 0 ? args.map((a) => resolve(process.cwd(), a)) : repoFiles;
if (files.length === 0) {
  console.error("no .ls files found under practice/ or programs/");
  process.exit(1);
}

function readOrDie(f: string): string {
  try {
    return readFileSync(f, "utf8");
  } catch {
    console.error(`cannot read ${f}`);
    process.exit(1);
  }
}

const sources = new Map(files.map((f) => [f, readOrDie(f)]));
const knownSources = new Map([...repoFiles.map((f) => [f, readOrDie(f)] as const), ...sources]);
const knownPrograms = [...knownSources.values()].map(programName).filter((n): n is string => n !== null);

const icon: Record<Finding["severity"], string> = { error: "✖", warning: "⚠", info: "ℹ" };
let errors = 0;
let warnings = 0;

for (const [file, source] of sources) {
  const findings = validateLs(source, { knownPrograms });
  if (findings.length === 0) continue;
  console.log(`\n${relative(repoRoot, file)}`);
  for (const f of findings) {
    if (f.severity === "error") errors++;
    if (f.severity === "warning") warnings++;
    const loc = f.line === null ? "file" : `L${f.line}`;
    console.log(`  ${icon[f.severity]} ${f.severity.padEnd(7)} ${loc.padEnd(5)} ${f.code}: ${f.message}`);
  }
}

console.log(`\n${files.length} listings checked — ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors > 0 ? 1 : 0);
