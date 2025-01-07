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
        isBot ? "bg-[#403E43]" : "bg-[#1A1F2C]"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "bg-[#D6BCFA] text-[#1A1F2C]" : "bg-[#403E43]"
        )}
      >
        {isBot ? <Bot size={20} /> : <MessageCircle size={20} />}
      </div>
      <div className="flex-1">
        <p className={cn("text-sm leading-relaxed", isPending && "text-[#8E9196]")}>
          {content}
        </p>
      </div>
    </div>
  );
};