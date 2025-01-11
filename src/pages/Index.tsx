import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { sendMessage } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";
import { FREE_TIER_MODELS } from "@/types/models";
import { RefreshCw, MessageSquarePlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useChat } from "@/contexts/ChatContext";
import { v4 as uuidv4 } from 'uuid';
import { Welcome } from "@/components/Welcome";
import { ChatArea } from "@/components/ChatArea";
import { Header } from "@/components/Header";

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

  return (
    <div className="flex h-screen bg-transparent text-foreground">
      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'w-[260px]' : 'w-0'
      } transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden flex flex-col border-r border-gray-200 dark:border-gray-700`}>
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <Header 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          temporaryChat={temporaryChat}
          onTemporaryChatToggle={setTemporaryChatToggle}
        />

        {messages.length === 0 ? (
          <Welcome onExampleClick={handleSendMessage} />
        ) : (
          <ChatArea messages={messages} isProcessing={isProcessing} />
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-3xl mx-auto input-area p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4" />
                <span>Temporary chat</span>
                <Switch
                  checked={temporaryChat}
                  onCheckedChange={setTemporaryChatToggle}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
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