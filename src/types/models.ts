export interface Model {
  id: string;
  name: string;
  description: string;
  isPaid?: boolean;
}

export const FREE_TIER_MODELS: Model[] = [
  {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama 3.2 3B',
    description: 'Fast and efficient for simple tasks'
  },
  {
    id: 'meta-llama/llama-3.2-11b-vision-instruct:free',
    name: 'Llama 3.2 11B Vision',
    description: 'Balanced performance with vision capabilities'
  }
];

export const PAID_TIER_MODELS: Model[] = [
  {
    id: 'meta-llama/llama-3.1-70b-instruct:free',
    name: 'Llama 3.1 70B',
    description: 'Advanced reasoning and complex tasks',
    isPaid: true
  },
  {
    id: 'meta-llama/llama-3.1-405b-instruct:free',
    name: 'Llama 3.1 405B',
    description: 'Superior performance for demanding tasks',
    isPaid: true
  },
  {
    id: 'meta-llama/llama-3.2-90b-vision-instruct:free',
    name: 'Llama 3.2 90B Vision',
    description: 'State-of-the-art with vision capabilities',
    isPaid: true
  }
];