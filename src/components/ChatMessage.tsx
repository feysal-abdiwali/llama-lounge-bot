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
      "group w-full text-foreground border-b border-gray-200 dark:border-gray-700",
      isBot ? "bg-gray-50/50 dark:bg-gray-800/50" : "bg-white/50 dark:bg-gray-900/50",
      "animate-fade-up backdrop-blur-sm"
    )}>
      <div className="flex p-4 text-sm sm:text-base gap-3">
        <div className={cn(
          "shrink-0 w-6 h-6 rounded-lg flex items-center justify-center",
          isBot ? "bg-teal-500" : "bg-purple-500"
        )}>
          {isBot ? <Bot className="h-4 w-4 text-white" /> : <MessageCircle className="h-4 w-4 text-white" />}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <p className={cn(
            "leading-relaxed break-words",
            isPending && "text-gray-500 dark:text-gray-400"
          )}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};