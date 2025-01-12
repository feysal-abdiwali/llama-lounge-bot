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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-foreground hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Llama Lounge
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ModelSelector 
              selectedModel={selectedModel}
              onModelChange={onModelChange}
              temporaryChat={temporaryChat}
              onTemporaryChatToggle={onTemporaryChatToggle}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};