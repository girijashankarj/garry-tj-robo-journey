import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type ApprovedRecord = {
  id: string;
  question: string;
  answer: string;
  vendor?: string | null;
  domain?: string;
  source?: string;
  validation?: { status?: string };
};

/** Load only approved/verified records. Pending candidates never reach retrieval. */
export async function loadApprovedDataset(path: string): Promise<ApprovedRecord[]> {
  const text = await readFile(resolve(path), "utf8");
  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as ApprovedRecord)
    .filter((record) => ["approved", "verified"].includes(record.validation?.status ?? ""));
}
