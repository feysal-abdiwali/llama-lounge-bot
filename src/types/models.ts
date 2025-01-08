export interface Model {
  id: string;
  name: string;
  description: string;
}

export const FREE_TIER_MODELS: Model[] = [
  {
    id: "meta-llama/llama-2-70b-chat",
    name: "Llama 2 70B",
    description: "Meta's most capable Llama 2 model for chat",
  },
  {
    id: "meta-llama/llama-2-13b-chat",
    name: "Llama 2 13B",
    description: "Balanced performance and efficiency",
  },
  {
    id: "meta-llama/llama-2-7b-chat",
    name: "Llama 2 7B",
    description: "Fast and efficient chat model",
  }
];