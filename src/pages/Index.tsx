import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ModelSelector } from "@/components/ModelSelector";
import { sendMessage } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";
import { FREE_TIER_MODELS } from "@/types/models";
import { Menu, X, Sun, Zap, AlertTriangle, MessageSquarePlus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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

  const examples = [
    { text: '"Explain quantum computing in simple terms" →', icon: Sun },
    { text: '"Got any creative ideas for a 10 year old\'s birthday?" →', icon: Zap },
    { text: '"How do I make an HTTP request in JavaScript?" →', icon: AlertTriangle },
  ];

  const capabilities = [
    "Remembers what user said earlier in the conversation",
    "Allows user to provide follow-up corrections",
    "Trained to decline inappropriate requests"
  ];

  const limitations = [
    "May occasionally generate incorrect information",
    "May occasionally produce harmful instructions or biased content",
    "Limited knowledge of world and events after 2021"
  ];

  return (
    <div className="flex h-screen bg-[#343541] text-white">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-[260px]' : 'w-0'
        } transition-all duration-300 bg-[#202123] overflow-hidden flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button 
              className="w-full text-left px-3 py-3 rounded-lg bg-[#202123] hover:bg-[#2A2B32] text-white flex items-center gap-3 border border-white/20"
              onClick={() => setMessages([])}
            >
              <MessageSquarePlus size={16} />
              <span>New chat</span>
            </button>
          </div>
          
          {messages.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-400 italic">
              History is temporarily unavailable.
              <br />
              We're working to restore this feature as soon as possible.
            </div>
          )}
          
          <div className="space-y-2 px-2">
            {messages.filter(m => !m.isBot).map((message) => (
              <div 
                key={message.id}
                className="px-3 py-3 rounded-lg hover:bg-[#2A2B32] cursor-pointer truncate text-sm transition-colors"
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 p-2 space-y-2">
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-[#2A2B32] text-white flex items-center gap-3">
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-[#2A2B32] text-white flex items-center gap-3">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-[#343541]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-2 left-2 text-white hover:bg-[#2A2B32] z-10"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold mb-8">ChatGPT</h1>
            
            <div className="flex gap-3 justify-center max-w-4xl w-full mb-12">
              <div className="flex-1 flex flex-col items-center gap-3">
                <Sun className="h-6 w-6" />
                <h2 className="text-lg font-medium mb-2">Examples</h2>
                <div className="space-y-3">
                  {examples.map((example, i) => (
                    <button
                      key={i}
                      className="w-full p-3 rounded-lg bg-[#3E3F4B] hover:bg-[#2A2B32] text-sm text-left"
                      onClick={() => handleSendMessage(example.text)}
                    >
                      {example.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-3">
                <Zap className="h-6 w-6" />
                <h2 className="text-lg font-medium mb-2">Capabilities</h2>
                <div className="space-y-3">
                  {capabilities.map((capability, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#3E3F4B] text-sm">
                      {capability}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                <h2 className="text-lg font-medium mb-2">Limitations</h2>
                <div className="space-y-3">
                  {limitations.map((limitation, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#3E3F4B] text-sm">
                      {limitation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pt-10">
            <div className="max-w-3xl mx-auto px-4 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              {isProcessing && (
                <ChatMessage content="Thinking..." isBot isPending />
              )}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-white/20 bg-[#343541] p-4">
          <div className="max-w-3xl mx-auto">
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