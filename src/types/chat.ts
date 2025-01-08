export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  role: 'user' | 'assistant';
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
}