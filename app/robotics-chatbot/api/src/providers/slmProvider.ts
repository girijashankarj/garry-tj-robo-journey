import type { ChatProvider, ChatRequest, ChatResponse } from "./types.js";

/** Adapter contract for the future Robotics SLM inference service. */
export class SlmProvider implements ChatProvider {
  readonly name = "robotics-slm";

  constructor(private readonly endpoint?: string) {}

  async answer(request: ChatRequest): Promise<ChatResponse> {
    if (!this.endpoint) {
      return {
        answer: "The Robotics SLM inference endpoint is not configured yet. The chatbot is currently using the approved RAG baseline.",
        provider: this.name,
        sources: [],
        safety: "normal",
      };
    }

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) throw new Error(`SLM inference failed: ${response.status}`);
    return (await response.json()) as ChatResponse;
  }
}
