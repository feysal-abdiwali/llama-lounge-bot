import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { UpgradePrompt } from "@/components/UpgradePrompt";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage = { id: Date.now().toString(), content, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm a demo bot. This is a simulated response to your message: " + content,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleSendMessage(`Processing file: ${file.name}`);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 max-w-4xl mx-auto flex flex-col">
        <main className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          {isProcessing && (
            <ChatMessage content="Thinking..." isBot isPending />
          )}
        </main>
        <div className="space-y-4 p-4">
          <UpgradePrompt />
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;