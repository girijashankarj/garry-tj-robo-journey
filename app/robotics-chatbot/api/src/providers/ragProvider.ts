import type { ChatProvider, ChatRequest, ChatResponse, Source } from "./types.js";

/**
 * Local baseline provider. It uses approved dataset records as a deterministic
 * retrieval source until a vector DB and model endpoint are connected.
 */
export class RagProvider implements ChatProvider {
  readonly name = "approved-rag-baseline";

  constructor(private readonly records: Array<{ id: string; question: string; answer: string; vendor?: string | null; domain?: string; source?: string }>) {}

  async answer(request: ChatRequest): Promise<ChatResponse> {
    const query = request.message.toLowerCase();
    const matches = this.records
      .filter((record) => {
        const vendorMatch = !request.vendor || !record.vendor || record.vendor === request.vendor;
        const domainMatch = !request.domain || !record.domain || record.domain === request.domain;
        return vendorMatch && domainMatch;
      })
      .map((record) => ({
        record,
        score: this.score(query, record.question.toLowerCase()),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (!matches.length) {
      return {
        answer: "I don't have enough approved robotics knowledge to answer that reliably. Specify the robot vendor/controller and provide the relevant machine context.",
        provider: this.name,
        sources: [],
        safety: "caution",
      };
    }

    const sources: Source[] = matches.map(({ record, score }) => ({
      id: record.id,
      title: record.question,
      reference: record.source ?? "approved dataset",
      score,
    }));

    return {
      answer: matches[0].record.answer,
      provider: this.name,
      sources,
      safety: "normal",
    };
  }

  private score(query: string, candidate: string): number {
    const tokens = new Set(query.split(/\W+/).filter(Boolean));
    const candidateTokens = new Set(candidate.split(/\W+/).filter(Boolean));
    let overlap = 0;
    for (const token of tokens) if (candidateTokens.has(token)) overlap++;
    return overlap / Math.max(tokens.size, 1);
  }
}
