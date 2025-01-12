import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, onFileUpload, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "text/plain") {
        onFileUpload?.(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Only PDF and text files are supported",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.txt"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => document.getElementById("file-upload")?.click()}
        disabled={disabled}
        className="shrink-0"
      >
        <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
        className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        variant="ghost"
        size="icon"
        className="shrink-0"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </form>
  );
};