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
    <form onSubmit={handleSubmit} className="relative flex items-center">
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
        className="absolute left-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <Upload className="h-5 w-5" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
        className="flex-1 bg-transparent border-0 rounded-lg pl-12 pr-14 py-3 text-foreground placeholder:text-gray-400 focus:ring-0 focus:outline-none"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="absolute right-2 bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};