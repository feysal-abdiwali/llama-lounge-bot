const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const sendMessage = async (message: string) => {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.href,
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',  // Using Mistral 7B as default for free tier
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