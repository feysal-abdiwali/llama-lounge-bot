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
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.txt"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => document.getElementById("file-upload")?.click()}
        disabled={disabled}
        className="bg-[#403E43] border-[#8E9196] hover:bg-[#4A484D] text-white transition-colors"
      >
        <Upload size={20} />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-[#403E43] border-[#8E9196] text-white placeholder:text-[#8E9196] focus:ring-[#D6BCFA] focus:border-[#D6BCFA]"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="bg-[#D6BCFA] text-[#1A1F2C] hover:bg-[#C4A3F7] transition-colors"
      >
        <Send size={20} className="mr-2" />
        Send
      </Button>
    </form>
  );
};