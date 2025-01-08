import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FREE_TIER_MODELS } from "@/types/models";
import { Badge } from "@/components/ui/badge";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  temporaryChat: boolean;
}

export const ModelSelector = ({ selectedModel, onModelChange, temporaryChat }: ModelSelectorProps) => {
  return (
    <div className="w-full relative">
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="bg-[#202123] border-white/20 text-white">
          <div className="flex items-center gap-2">
            <SelectValue placeholder="Select a model" />
            {temporaryChat && (
              <Badge variant="secondary" className="ml-2">
                Temporary Chat
              </Badge>
            )}
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#202123] border-white/20">
          {FREE_TIER_MODELS.map((model) => (
            <SelectItem 
              key={model.id} 
              value={model.id}
              className="text-white hover:bg-[#2A2B32] focus:bg-[#2A2B32] cursor-pointer"
            >
              <div className="flex flex-col items-start">
                <span>{model.name}</span>
                <span className="text-xs text-gray-400">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};