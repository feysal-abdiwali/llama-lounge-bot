import { ChatMessage } from "@/components/ChatMessage";
import { Message } from "@/types/chat";

interface ChatAreaProps {
  messages: Message[];
  isProcessing: boolean;
}

export const ChatArea = ({ messages, isProcessing }: ChatAreaProps) => {
  return (
    <div className="flex-1 overflow-y-auto pt-16">
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
        {isProcessing && (
          <ChatMessage content="Thinking..." isBot isPending />
        )}
      </div>
    </div>
  );
};