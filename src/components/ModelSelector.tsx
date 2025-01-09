import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FREE_TIER_MODELS, PAID_TIER_MODELS } from "@/types/models";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PaywallDialog } from "./PaywallDialog";
import { useToast } from "@/hooks/use-toast";
import { Lock, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  temporaryChat: boolean;
  onTemporaryChatToggle: (enabled: boolean) => void;
}

export const ModelSelector = ({ 
  selectedModel, 
  onModelChange, 
  temporaryChat,
  onTemporaryChatToggle 
}: ModelSelectorProps) => {
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedPaidModel, setSelectedPaidModel] = useState("");
  const { toast } = useToast();

  const handleModelChange = (modelId: string) => {
    const paidModel = PAID_TIER_MODELS.find(model => model.id === modelId);
    if (paidModel) {
      setSelectedPaidModel(modelId);
      setPaywallOpen(true);
    } else {
      onModelChange(modelId);
    }
  };

  const handlePurchase = () => {
    // This would be connected to your payment processing system
    toast({
      title: "Purchase successful!",
      description: "You now have access to premium models.",
    });
    setPaywallOpen(false);
    if (selectedPaidModel) {
      onModelChange(selectedPaidModel);
    }
  };

  return (
    <div className="w-full relative">
      <Select value={selectedModel} onValueChange={handleModelChange}>
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
          <div className="px-2 py-1.5 text-sm font-semibold text-white/70">Free Models</div>
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
          
          <div className="px-2 py-1.5 text-sm font-semibold text-white/70 mt-2">Premium Models</div>
          {PAID_TIER_MODELS.map((model) => (
            <SelectItem 
              key={model.id} 
              value={model.id}
              className="text-white hover:bg-[#2A2B32] focus:bg-[#2A2B32] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3 text-primary" />
                <div className="flex flex-col items-start">
                  <span>{model.name}</span>
                  <span className="text-xs text-gray-400">{model.description}</span>
                </div>
              </div>
            </SelectItem>
          ))}

          <Separator className="my-2 bg-white/20" />
          
          <div className="px-3 py-2">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">Temporary chat</span>
              </div>
              <Switch
                checked={temporaryChat}
                onCheckedChange={onTemporaryChatToggle}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </SelectContent>
      </Select>

      <PaywallDialog
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onPurchase={handlePurchase}
        modelName={PAID_TIER_MODELS.find(m => m.id === selectedPaidModel)?.name || "Premium Model"}
      />
    </div>
  );
};