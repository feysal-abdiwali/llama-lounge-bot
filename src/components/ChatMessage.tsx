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
        "flex items-start gap-3 p-4 rounded-lg animate-message-fade-in max-w-3xl",
        isBot ? "bg-[#403E43] mr-auto" : "bg-[#D6BCFA] text-[#1A1F2C] ml-auto"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "bg-[#D6BCFA] text-[#1A1F2C]" : "bg-[#1A1F2C] text-[#D6BCFA]"
        )}
      >
        {isBot ? <Bot size={20} /> : <MessageCircle size={20} />}
      </div>
      <div className="flex-1">
        <p className={cn(
          "text-sm leading-relaxed",
          isPending && "text-[#8E9196]",
          !isBot && "text-[#1A1F2C]"
        )}>
          {content}
        </p>
      </div>
    </div>
  );
};