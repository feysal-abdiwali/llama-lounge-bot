import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface PaywallDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  modelName: string;
}

export const PaywallDialog = ({ isOpen, onClose, onPurchase, modelName }: PaywallDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Upgrade to Access {modelName}
          </DialogTitle>
          <DialogDescription>
            Get access to our most powerful models with competitive pricing.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Token Pricing</h4>
            <p className="text-sm text-muted-foreground mb-4">
              1 million tokens = $1 (for both input and output)
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Starting package</span>
                <span className="font-medium">$10 = 10M tokens</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Popular package</span>
                <span className="font-medium">$50 = 50M tokens</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onPurchase}>Purchase Tokens</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};