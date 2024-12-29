import { cn } from "@/lib/utils";
import { MessageCircle, Bot } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isBot?: boolean;
  isPending?: boolean;
}

export const ChatMessage = ({ content, isBot = false, isPending = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg animate-message-fade-in",
        isBot ? "bg-secondary" : "bg-white"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "bg-primary text-white" : "bg-gray-100"
        )}
      >
        {isBot ? <Bot size={20} /> : <MessageCircle size={20} />}
      </div>
      <div className="flex-1">
        <p className={cn("text-sm leading-relaxed", isPending && "text-gray-400")}>
          {content}
        </p>
      </div>
    </div>
  );
};