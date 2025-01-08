import { ModelSelector } from "./ModelSelector";

interface ChatHeaderProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const ChatHeader = ({ selectedModel, onModelChange }: ChatHeaderProps) => {
  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-10">
      <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />
    </div>
  );
};