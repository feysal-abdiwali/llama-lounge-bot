import { Sun, Zap, AlertTriangle } from "lucide-react";

interface WelcomeProps {
  onExampleClick: (text: string) => void;
}

export const Welcome = ({ onExampleClick }: WelcomeProps) => {
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
    <div className="flex-1 flex flex-col items-center justify-center p-4 animate-fade-up">
      <h1 className="mb-8 text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Llama
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mb-8 sm:mb-12">
        <div className="flex flex-col items-center gap-3 card-hover p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
          <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
          <h2 className="text-base sm:text-lg font-medium mb-2">Examples</h2>
          <div className="space-y-2 sm:space-y-3 w-full">
            {examples.map((example, i) => (
              <button
                key={i}
                className="w-full p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm text-left transition-colors"
                onClick={() => onExampleClick(example.text)}
              >
                {example.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 card-hover p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
          <h2 className="text-base sm:text-lg font-medium mb-2">Capabilities</h2>
          <div className="space-y-2 sm:space-y-3 w-full">
            {capabilities.map((capability, i) => (
              <div key={i} className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-xs sm:text-sm">
                {capability}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 card-hover p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
          <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
          <h2 className="text-base sm:text-lg font-medium mb-2">Limitations</h2>
          <div className="space-y-2 sm:space-y-3 w-full">
            {limitations.map((limitation, i) => (
              <div key={i} className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-xs sm:text-sm">
                {limitation}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};