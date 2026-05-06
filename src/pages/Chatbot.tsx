import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Mic, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { askGemini, isLegalQuestion } from "@/services/geminiService";
import chatbotIcon from "../assets/chatbot-icon.jpg";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What is Article 21?",
  "Explain Fundamental Rights",
  "What are Fundamental Duties?",
  "Who wrote the Constitution?",
  "What is the Preamble?",
  "Explain Right to Equality",
];

// Fallback responses for offline mode
const constitutionalKnowledge: Record<string, string> = {
  "article 21": "Article 21 of the Indian Constitution states: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' This is considered the most important fundamental right.",
  "fundamental rights": "The Indian Constitution guarantees 6 Fundamental Rights:\n\n1. Right to Equality (Articles 14-18)\n2. Right to Freedom (Articles 19-22)\n3. Right Against Exploitation (Articles 23-24)\n4. Right to Freedom of Religion (Articles 25-28)\n5. Cultural & Educational Rights (Articles 29-30)\n6. Right to Constitutional Remedies (Article 32)",
  "fundamental duties": "The 11 Fundamental Duties (Article 51A) include respecting the Constitution, promoting harmony, protecting sovereignty, defending the country, and more.",
  "preamble": "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic promising Justice, Liberty, Equality, and Fraternity.",
  "who wrote": "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is called the 'Father of the Constitution'.",
};

const getOfflineResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(constitutionalKnowledge)) {
    if (lowerQuery.includes(key)) return value;
  }
  return "I can help you with constitutional and legal questions. Try asking about Fundamental Rights, Articles, Preamble, or other constitutional topics.";
};

const NON_LEGAL_RESPONSE = "I'm specialized in answering questions about the Indian Constitution and legal matters only. Please ask me about:\n\n• Fundamental Rights & Duties\n• Constitutional Articles\n• Legal procedures and laws\n• Government structure\n• Landmark judgments\n\nI cannot help with other topics.";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! 🙏 I'm your Constitution Guardian AI powered by Gemini. Ask me anything about the Indian Constitution, laws, or legal matters. I'll explain it in simple words!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response: string;
      
      // Check if question is law/constitution related
      if (!isLegalQuestion(text)) {
        response = NON_LEGAL_RESPONSE;
      } else {
        // Try Gemini API
        response = await askGemini(text);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      let response: string;
      
      if (error.message === 'API_KEY_MISSING') {
        // Fallback to offline mode
        response = isLegalQuestion(text) ? getOfflineResponse(text) : NON_LEGAL_RESPONSE;
        toast.info("Running in offline mode. Add VITE_GEMINI_API_KEY for AI responses.");
      } else {
        response = getOfflineResponse(text);
        toast.error("Could not connect to AI. Using offline responses.");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported in your browser");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Could not recognize speech. Please try again.");
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech not supported");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown from text
    const cleanText = text.replace(/[*#]/g, '').replace(/\n+/g, '. ');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 flex items-center justify-center gap-2">
              <img 
                src={chatbotIcon}
                alt="AI Icon"
                className="w-8 h-8 md:w-10 md:h-10"
              />
              Constitution AI Chat
            </h1>
            <p className="text-muted-foreground">
              Ask anything about the Indian Constitution
            </p>
          </div>

          <Card className="h-[500px] flex flex-col">
            <CardHeader className="border-b py-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <img 
                src={chatbotIcon}
                alt="AI Icon"
                className="w-8 h-8 md:w-10 md:h-10"
                />
                Constitution Guardian
              </CardTitle>
            </CardHeader>
            
            <ScrollArea ref={scrollRef} className="h-80 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        <p className="whitespace-pre-line text-sm">{message.content}</p>
                      </div>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 mt-1"
                          onClick={() => speakText(message.content)}
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <CardContent className="border-t p-4">
              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestedQuestions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => sendMessage(q)}
                    disabled={isLoading}
                  >
                    {q}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={startVoiceInput}
                  disabled={isLoading}
                  className={isListening ? "bg-destructive text-destructive-foreground" : ""}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the Constitution..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  disabled={isLoading}
                />
                <Button onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Chatbot;
