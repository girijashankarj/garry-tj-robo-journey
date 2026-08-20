import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "robotics-chatbot-api" });
});

app.post("/api/chat", (req, res) => {
  const { message, vendor, domain } = req.body as {
    message?: string;
    vendor?: string | null;
    domain?: string | null;
  };

  if (!message?.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  // Placeholder only. Replace this adapter with RAG/SLM orchestration.
  return res.json({
    id: crypto.randomUUID(),
    answer: "Robotics SLM inference is not connected yet.",
    context: { vendor: vendor ?? null, domain: domain ?? null },
    citations: [],
    model: "placeholder",
  });
});

app.listen(port, () => {
  console.log(`Robotics chatbot API listening on http://localhost:${port}`);
});
