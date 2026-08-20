import cors from "cors";
import express from "express";
import { resolve } from "node:path";
import { loadApprovedDataset } from "./knowledge/loadApprovedDataset.js";
import { RagProvider } from "./providers/ragProvider.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const datasetPath = process.env.ROBOTICS_DATASET_PATH ??
  resolve(process.cwd(), "../robotics-slm/datasets/v0.1/fanuc-reviewed.jsonl");

let provider: RagProvider | null = null;
let loadError: string | null = null;

async function getProvider(): Promise<RagProvider> {
  if (provider) return provider;

  try {
    const records = await loadApprovedDataset(datasetPath);
    provider = new RagProvider(records);
    loadError = null;
    return provider;
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown dataset load error";
    throw error;
  }
}

app.get("/health", async (_req, res) => {
  let approvedRecords = 0;
  try {
    approvedRecords = (await getProvider())["recordsCount"] ?? 0;
  } catch {
    // Health remains available even when the optional dataset is not mounted.
  }

  res.json({
    status: "ok",
    service: "robotics-chatbot-api",
    provider: "approved-rag-baseline",
    approvedRecords,
    datasetLoaded: !loadError,
    datasetError: loadError,
  });
});

app.post("/api/chat", async (req, res) => {
  const { message, vendor, domain } = req.body as {
    message?: string;
    vendor?: string | null;
    domain?: string | null;
  };

  if (!message?.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const result = await (await getProvider()).answer({
      message: message.trim(),
      vendor: vendor ?? undefined,
      domain: domain ?? undefined,
    });

    return res.json({ id: crypto.randomUUID(), ...result });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown dataset error";
    return res.status(503).json({
      error: "Approved robotics knowledge is not available.",
      detail: "Mount the reviewed dataset or configure ROBOTICS_DATASET_PATH.",
    });
  }
});

app.listen(port, () => {
  console.log(`Robotics chatbot API listening on http://localhost:${port}`);
});
