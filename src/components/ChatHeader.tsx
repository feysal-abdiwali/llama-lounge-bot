import { ModelSelector } from "./ModelSelector";
import { ChatToggle } from "./ChatToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatHeaderProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  temporaryChat: boolean;
  onTemporaryChatToggle: (enabled: boolean) => void;
}

export const ChatHeader = ({ 
  selectedModel, 
  onModelChange,
  temporaryChat,
  onTemporaryChatToggle 
}: ChatHeaderProps) => {
  return (
    <div className="fixed top-2 left-0 right-0 flex justify-center items-center space-x-4 z-10 px-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full max-w-xs">
              <ModelSelector 
                selectedModel={selectedModel} 
                onModelChange={onModelChange}
                temporaryChat={temporaryChat}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select an AI model to chat with</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ChatToggle enabled={temporaryChat} onToggle={onTemporaryChatToggle} />
    </div>
  );
};