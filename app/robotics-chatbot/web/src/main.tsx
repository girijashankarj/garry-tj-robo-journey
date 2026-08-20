import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Message = { role: "user" | "assistant"; content: string };

const vendors = ["Auto-detect", "FANUC", "ABB", "KUKA", "Yaskawa", "Universal Robots", "Kawasaki", "Stäubli", "DENSO", "Epson", "Omron"];
const domains = ["All domains", "Programming", "Kinematics", "PLC integration", "Machine tending", "Vision", "Welding", "Troubleshooting", "Safety"];

function App() {
  const [message, setMessage] = useState("");
  const [vendor, setVendor] = useState(vendors[0]);
  const [domain, setDomain] = useState(domains[0]);
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage() {
    const text = message.trim();
    if (!text) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setMessage("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: text, vendor: vendor === "Auto-detect" ? null : vendor, domain }),
    });
    const data = await response.json();
    setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
  }

  return (
    <main className="app-shell">
      <header>
        <div>
          <p className="eyebrow">INDUSTRIAL ROBOTICS AI</p>
          <h1>Robotics Chatbot</h1>
          <p className="subtitle">Vendor-aware assistant powered by the Robotics SLM.</p>
        </div>
        <div className="status">SLM · NOT CONNECTED</div>
      </header>

      <section className="context-bar">
        <label>Robot vendor<select value={vendor} onChange={(event) => setVendor(event.target.value)}>{vendors.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Domain<select value={domain} onChange={(event) => setDomain(event.target.value)}>{domains.map((item) => <option key={item}>{item}</option>)}</select></label>
      </section>

      <section className="chat-panel">
        {messages.length === 0 ? (
          <div className="empty"><h2>Ask about your robot cell</h2><p>Programming, frames, I/O, PLC handshakes, machine tending, troubleshooting and more.</p></div>
        ) : messages.map((item, index) => <article className={`message ${item.role}`} key={`${item.role}-${index}`}><span>{item.role === "user" ? "You" : "Robotics AI"}</span><p>{item.content}</p></article>)}
      </section>

      <div className="composer">
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); } }} placeholder="Ask a robotics question..." />
        <button onClick={() => void sendMessage()}>Send</button>
      </div>
      <footer>Answers will require validation before use on physical equipment.</footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
