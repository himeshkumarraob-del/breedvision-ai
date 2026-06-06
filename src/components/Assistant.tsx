import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Sparkles, 
  BrainCircuit, 
  Clock, 
  HelpCircle, 
  User, 
  RefreshCw,
  PlusCircle,
  TrendingUp,
  Activity
} from "lucide-react";
import { ChatMessage } from "../types";

interface AssistantProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

const RECOMMENDED_TOPICS = [
  { id: "ration", text: "Optimize dairy A2 feed ration" },
  { id: "friesian", text: "Crossbreed Sahiwal with Holstein" },
  { id: "mastitis", text: "Early mastitis teat hygiene" },
  { id: "buffalo", text: "Thermoregulation of dark buffaloes" }
];

export default function Assistant({ initialPrompt, onClearInitialPrompt }: AssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Hello! I am the BreedVision AI Veterinary & Genetic Advisor. I can assist you with optimizing milk fat counts, formulating mineral diets, diagnosing cattle fever, and designing conservation plans for indigenous Indian bovine breeds. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to lowest message in chat stream
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle passed in prompt from other components (such as "Consult AI" action)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== "") {
      handleDirectPrompt(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const handleDirectPrompt = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const parsedJSON = await response.json();
      setIsTyping(false);

      if (parsedJSON.content) {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            role: "model",
            content: parsedJSON.content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error("No response body");
      }

    } catch (err) {
      console.error("Chat failure:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          role: "model",
          content: "I ran into a connection exception syncing with the central GenAI node. Please confirm process.env.GEMINI_API_KEY is defined. Offline mock advice serves as fallback diagnostic utility.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    const textMsg = inputMessage;
    setInputMessage("");
    handleDirectPrompt(textMsg);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: "Hello! Chat protocol reset. Ask me anything regarding native Indian cows/buffaloes, agricultural production, health condition codes, or cross-breeding programs.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header section with Clear actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-cyan tracking-tight">BreedVision AI Assistant</h1>
          <p className="text-on-surface-variant font-sans text-sm mt-1">
            Consult the Gemini model fine-tuned for veterinary science, dairy nutrition calculations, and genetic preservation.
          </p>
        </div>
        <button
          onClick={handleClearChat}
          className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-on-surface hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
        >
          Reset Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[580px]">
        
        {/* Left Column: recommended topics sidebar (Col 3) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col h-full justify-between">
          
          <div className="glass-panel p-5 rounded-2xl space-y-4 bg-brand-dark/30 hover:border-white/10 transition-colors flex-1">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-white/5 pb-3">
              <BrainCircuit className="w-4 h-4 text-brand-cyan" /> Suggested Farming Consults
            </h4>
            
            <div className="space-y-3">
              {RECOMMENDED_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleDirectPrompt(topic.text)}
                  className="w-full text-left p-3 rounded-xl bg-white/3 hover:bg-brand-cyan/15 hover:text-brand-cyan border border-white/5 hover:border-brand-cyan/20 text-xs font-semibold leading-relaxed transition-all cursor-pointer"
                >
                  {topic.text}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl bg-brand-cyan/5 border-brand-cyan/20 space-y-2 text-xs">
            <span className="font-bold text-brand-cyan font-mono text-[10px] tracking-wider uppercase block">
              SECURE GENAI COMPLIANCE
            </span>
            <p className="text-on-surface-variant leading-relaxed">
              Diagnostic outputs rely on specialized multi-attribute inference. Always pair model suggestions with local physical veterinary inspections.
            </p>
          </div>

        </div>

        {/* Right Column: Active Chat Portal (Col 9) */}
        <div className="lg:col-span-9 glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col h-full bg-[#0c101c]">
          
          {/* Active Model Indicator Header */}
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-cyan/10 border border-brand-cyan/35 flex items-center justify-center text-brand-cyan">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Gemini Flash Core V3.5
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-brand-green font-mono">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                  Active Surveillance Node
                </div>
              </div>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div 
                  key={m.id}
                  className={`flex items-start gap-3.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}
                >
                  {/* Sender Avatar */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 font-bold ${
                    isUser 
                      ? "bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan" 
                      : "bg-white/5 border-white/10 text-brand-green"
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
                  </div>

                  {/* Bubble content */}
                  <div className="space-y-1">
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed font-sans ${
                      isUser 
                        ? "bg-brand-cyan text-on-primary font-medium rounded-tr-none shadow-[0_0_15px_rgba(0,219,233,0.15)]" 
                        : "glass-card text-on-surface rounded-tl-none border-white/5"
                    }`}>
                      {m.content}
                    </div>
                    {/* Timestamp label formatting */}
                    <div className={`text-[9px] font-mono font-semibold text-on-surface-variant flex items-center gap-1 ${isUser ? "justify-end" : ""}`}>
                      <Clock className="w-3 h-3" />
                      {m.timestamp}
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Model Typing simulation indicator */}
            {isTyping && (
              <div className="flex items-start gap-3.5 max-w-[80%]">
                <div className="w-8 h-8 rounded-full border bg-white/5 border-white/10 text-brand-green flex items-center justify-center animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="glass-card p-4 rounded-2xl rounded-tl-none text-xs text-on-surface-variant font-mono animate-pulse">
                  Synthesizing nutritional parameters...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input text form bar */}
          <form 
            onSubmit={handleSendMessage}
            className="p-4 bg-brand-dark/60 border-t border-white/5 flex gap-2"
          >
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about feed budgets, heat stroke treatment, genetic lines..."
              className="flex-1 px-4 py-3 text-xs bg-brand-dark rounded-xl border border-white/5 focus:border-brand-cyan focus:outline-none text-on-surface placeholder:text-on-surface-variant"
            />
            <button
              type="submit"
              className="px-4.5 bg-brand-cyan text-on-primary font-bold rounded-xl shadow-[0_0_12px_rgba(0,219,233,0.25)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
