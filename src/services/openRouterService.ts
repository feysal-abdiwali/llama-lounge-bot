const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = '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';

export const sendMessage = async (message: string, modelId: string) => {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.href,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'user', content: message }
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from OpenRouter');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
};