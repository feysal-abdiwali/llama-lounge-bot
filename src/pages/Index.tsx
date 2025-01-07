import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ModelSelector } from "@/components/ModelSelector";
import { sendMessage } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";
import { FREE_TIER_MODELS } from "@/types/models";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState(FREE_TIER_MODELS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    const userMessage = { id: Date.now().toString(), content, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await sendMessage(content, selectedModel);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleSendMessage(`Processing file: ${file.name}\n\nContent: ${content}`);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen bg-[#1A1F2C] text-white">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-[#222222] border-r border-[#403E43] overflow-hidden`}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#D6BCFA]">Chat History</h2>
          <div className="space-y-2">
            {messages.filter(m => !m.isBot).map((message) => (
              <div 
                key={message.id}
                className="p-3 rounded-lg hover:bg-[#403E43] cursor-pointer truncate text-sm transition-colors"
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#222222] p-4 flex items-center justify-between border-b border-[#403E43] sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-[#403E43] transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          {isProcessing && (
            <ChatMessage content="Thinking..." isBot isPending />
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#403E43] bg-[#222222] p-4">
          <div className="max-w-4xl mx-auto w-full">
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;