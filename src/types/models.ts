export interface LLMModel {
  id: string;
  name: string;
  description: string;
}

export const FREE_TIER_MODELS: LLMModel[] = [
  {
    id: 'gpt-3.5',
    name: 'GPT-3.5',
    description: 'Great for everyday tasks'
  },
  {
    id: 'o1-mini',
    name: 'o1-mini',
    description: 'Faster at reasoning'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Best for complex tasks'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    description: 'Faster for everyday tasks'
  },
  {
    id: 'dynamic',
    name: 'Dynamic',
    description: 'Use the right model from my requests'
  }
];