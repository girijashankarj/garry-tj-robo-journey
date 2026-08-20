import { FormEvent, useState } from "react";
import { Bot, Send, ShieldCheck } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string; sources?: Array<{ title: string; reference: string }> };

const API_URL = import.meta.env.VITE_ROBOTICS_API_URL || "http://localhost:3001";
const vendors = ["fanuc", "abb", "kuka", "yaskawa", "universal-robots", "kawasaki", "staubli", "denso", "epson", "omron"];

export function ChatbotPage() {
  const [vendor, setVendor] = useState("fanuc");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Ask a robotics question. I will use only approved knowledge available to the connected Robotics Chatbot API." },
  ]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = message.trim();
    if (!text || busy) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setMessage("");
    setBusy(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, vendor }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Chat API unavailable");
      setMessages((current) => [...current, { role: "assistant", content: data.answer, sources: data.sources }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", content: error instanceof Error ? error.message : "Unable to reach the robotics API." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-app-accent"><Bot className="h-4 w-4" /> Robotics AI</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Robotics Chatbot</h1>
        <p className="mt-2 max-w-3xl text-app-muted">A multi-vendor robotics assistant backed by the approved Robotics SLM/RAG stack. Vendor-specific syntax is never assumed when context is missing.</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-app-warn-border bg-app-warn-bg p-3 text-sm text-app-warn-fg">
        <ShieldCheck className="h-4 w-4 shrink-0" /> Safety-critical robot operation, interlocks and cell procedures must be verified against OEM manuals and site SOPs by qualified personnel.
      </div>

      <section className="flex min-h-[55vh] flex-col overflow-hidden rounded-2xl border border-app-border bg-app-surface">
        <div className="border-b border-app-border p-4">
          <label className="text-xs font-medium uppercase tracking-wide text-app-faint" htmlFor="robot-vendor">Robot vendor</label>
          <select id="robot-vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} className="mt-1 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-fg">
            {vendors.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((item, index) => (
            <div key={`${item.role}-${index}`} className={item.role === "user" ? "ml-auto max-w-3xl rounded-2xl bg-app-accent-bg p-4" : "max-w-3xl rounded-2xl border border-app-border p-4"}>
              <p className="text-xs font-semibold uppercase tracking-wide text-app-faint">{item.role === "user" ? "You" : "Robotics AI"}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-app-fg">{item.content}</p>
              {item.sources?.length ? <div className="mt-3 border-t border-app-border pt-3 text-xs text-app-faint">Sources: {item.sources.map((source) => `${source.title} (${source.reference})`).join(" · ")}</div> : null}
            </div>
          ))}
          {busy ? <p className="text-sm text-app-faint">Checking approved robotics knowledge…</p> : null}
        </div>

        <form onSubmit={submit} className="flex gap-2 border-t border-app-border p-4">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about motion, frames, I/O, PLC, programming…" className="min-w-0 flex-1 rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-fg outline-none focus:border-app-accent" />
          <button type="submit" disabled={busy || !message.trim()} className="inline-flex items-center gap-2 rounded-xl bg-app-accent px-4 py-3 text-sm font-medium text-white disabled:opacity-50"><Send className="h-4 w-4" /> Send</button>
        </form>
      </section>

      <p className="text-xs text-app-faint">API: {API_URL}. The GitHub Pages UI requires VITE_ROBOTICS_API_URL to point to a deployed chatbot API. Local development defaults to localhost:3001.</p>
    </div>
  );
}
