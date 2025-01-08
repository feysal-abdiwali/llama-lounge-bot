import React, { createContext, useContext, useState } from 'react';
import { ChatSession, Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  currentSession: ChatSession | null;
  createNewSession: () => void;
  addMessageToSession: (message: Omit<Message, 'id'>) => void;
  messages: Message[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: uuidv4(),
      messages: [],
      createdAt: new Date(),
    };
    setCurrentSession(newSession);
  };

  const addMessageToSession = (message: Omit<Message, 'id'>) => {
    if (!currentSession) {
      createNewSession();
    }
    
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
    };

    setCurrentSession(prev => {
      if (!prev) return {
        id: uuidv4(),
        messages: [newMessage],
        createdAt: new Date(),
      };
      
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      };
    });
  };

  return (
    <ChatContext.Provider value={{
      currentSession,
      createNewSession,
      addMessageToSession,
      messages: currentSession?.messages || [],
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};