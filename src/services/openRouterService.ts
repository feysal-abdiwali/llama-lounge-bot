const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

import { Message } from '@/types/chat';

export const sendMessage = async (messages: Message[], modelId: string) => {
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key not found. Please add it in the project settings.');
  }

  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.href,
    },
    body: JSON.stringify({
      model: modelId,
      messages: formattedMessages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to get response from OpenRouter: ${errorData}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
};