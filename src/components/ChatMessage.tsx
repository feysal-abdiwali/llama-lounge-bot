import { cn } from "@/lib/utils";
import { MessageCircle, Bot } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isBot?: boolean;
  isPending?: boolean;
}

export const ChatMessage = ({ content, isBot = false, isPending = false }: ChatMessageProps) => {
  return (
    <div className={cn(
      "group w-full text-gray-100 border-b border-black/10",
      isBot ? "bg-[#444654]" : "bg-[#343541]"
    )}>
      <div className="max-w-3xl mx-auto flex p-4 text-base gap-4">
        <div className={cn(
          "w-8 h-8 rounded-sm flex items-center justify-center",
          isBot ? "bg-teal-500" : "bg-[#7C3AED]"
        )}>
          {isBot ? <Bot size={20} /> : <MessageCircle size={20} />}
        </div>
        <div className="flex-1 space-y-2">
          <p className={cn(
            "text-sm leading-relaxed",
            isPending && "text-gray-400"
          )}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};