import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const ChatToggle = ({ enabled, onToggle }: ChatToggleProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Switch
              id="chat-mode"
              checked={enabled}
              onCheckedChange={onToggle}
            />
            <Label htmlFor="chat-mode" className="text-white cursor-pointer">
              Temporary Chat
            </Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle temporary chat mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};