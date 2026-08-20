export type ChatRequest = {
  message: string;
  vendor?: string;
  domain?: string;
};

export type Source = {
  id: string;
  title: string;
  reference: string;
  score?: number;
};

export type ChatResponse = {
  answer: string;
  provider: string;
  sources: Source[];
  safety: "normal" | "caution" | "high-risk";
};

export interface ChatProvider {
  readonly name: string;
  answer(request: ChatRequest): Promise<ChatResponse>;
}
