export interface ChatRequest {
  model: string;
  messages: { role: string; content: string }[];
  jsonSchema?: any;
}
