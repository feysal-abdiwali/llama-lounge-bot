import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ModelSelector } from "@/components/ModelSelector";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  temporaryChat: boolean;
  onTemporaryChatToggle: (enabled: boolean) => void;
}

export const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedModel,
  onModelChange,
  temporaryChat,
  onTemporaryChatToggle
}: HeaderProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-2 left-2 text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 z-[60]"
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div className="absolute top-2 right-2 flex items-center gap-4 z-10">
        <ModelSelector 
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          temporaryChat={temporaryChat}
          onTemporaryChatToggle={onTemporaryChatToggle}
        />
        <ThemeToggle />
      </div>

      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Llama Lounge
        </h1>
      </div>
    </>
  );
};