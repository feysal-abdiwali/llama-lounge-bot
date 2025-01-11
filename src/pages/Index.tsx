import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { sendMessage } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";
import { FREE_TIER_MODELS } from "@/types/models";
import { Menu, X, Sun, Zap, AlertTriangle, MessageSquarePlus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { v4 as uuidv4 } from 'uuid';
import { ChatHeader } from "@/components/ChatHeader";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState(FREE_TIER_MODELS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [temporaryChat, setTemporaryChatToggle] = useState(false);
  const { toast } = useToast();
  const { messages, addMessageToSession, createNewSession } = useChat();

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: uuidv4(),
      content,
      role: 'user' as const,
      isBot: false
    };
    
    addMessageToSession(userMessage);
    setIsProcessing(true);

    try {
      const response = await sendMessage([...messages, userMessage], selectedModel);
      const botMessage = {
        id: uuidv4(),
        content: response,
        role: 'assistant' as const,
        isBot: true,
      };
      addMessageToSession(botMessage);
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
    <div className="flex h-screen bg-transparent text-foreground">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-[260px]' : 'w-0'
        } transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden flex flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button 
              className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground flex items-center gap-3 border border-gray-200 dark:border-gray-700 transition-colors duration-200"
              onClick={createNewSession}
            >
              <MessageSquarePlus className="sidebar-icon" />
              <span>New chat</span>
            </button>
          </div>
          
          {messages.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-900/50 mx-2 rounded-md">
              History is temporarily unavailable.
              <br />
              We're working to restore this feature.
            </div>
          )}
          
          <div className="space-y-2 px-2">
            {messages.filter(m => !m.isBot).map((message) => (
              <div 
                key={message.id}
                className="px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer truncate text-sm transition-colors"
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-2 space-y-2">
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground flex items-center gap-3 transition-colors">
            <Settings className="sidebar-icon" />
            <span>Settings</span>
          </button>
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground flex items-center gap-3 transition-colors">
            <LogOut className="sidebar-icon" />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-2 left-2 text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <ChatHeader 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel}
          temporaryChat={temporaryChat}
          onTemporaryChatToggle={setTemporaryChatToggle}
        />

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 animate-fade-up">
            <h1 className="mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Llama
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
              <div className="flex flex-col items-center gap-3 card-hover p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
                <Sun className="h-6 w-6 text-yellow-500" />
                <h2 className="text-lg font-medium mb-2">Examples</h2>
                <div className="space-y-3 w-full">
                  {examples.map((example, i) => (
                    <button
                      key={i}
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-left transition-colors"
                      onClick={() => handleSendMessage(example.text)}
                    >
                      {example.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 card-hover p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
                <Zap className="h-6 w-6 text-purple-500" />
                <h2 className="text-lg font-medium mb-2">Capabilities</h2>
                <div className="space-y-3 w-full">
                  {capabilities.map((capability, i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-sm">
                      {capability}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 card-hover p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-medium mb-2">Limitations</h2>
                <div className="space-y-3 w-full">
                  {limitations.map((limitation, i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-sm">
                      {limitation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pt-16">
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
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-3xl mx-auto input-area p-2">
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
