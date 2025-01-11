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
      <div className="max-w-3xl mx-auto flex p-4 text-base gap-4">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          isBot ? "bg-teal-500" : "bg-purple-500"
        )}>
          {isBot ? <Bot className="h-5 w-5 text-white" /> : <MessageCircle className="h-5 w-5 text-white" />}
        </div>
        <div className="flex-1 space-y-2">
          <p className={cn(
            "text-sm leading-relaxed",
            isPending && "text-gray-500 dark:text-gray-400"
          )}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};