import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const UpgradePrompt = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Star className="text-primary" size={20} />
        <h3 className="font-semibold">Upgrade to Pro</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Get access to larger models, text-to-speech, and more file types.
      </p>
      <Button variant="default" className="w-full">
        Upgrade Now
      </Button>
    </div>
  );
};