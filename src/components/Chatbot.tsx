import { useState, useRef, useEffect, FormEvent } from "react";
import { Sparkles, Send, Bot, User, ShoppingCart, RefreshCw, Eye, ThumbsUp, Layers, Minimize2, Maximize2 } from "lucide-react";
import { PRODUCTS } from "../data";
import { ChatMessage, Product } from "../types";

interface ChatbotProps {
  embeddedMode?: boolean; // If true, displays inline as a full layout. If false, floats in bottom right.
  cartItemsCount?: number;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export default function Chatbot({
  embeddedMode = true,
  onAddToCart,
  onQuickView
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(embeddedMode);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from the Interior Designer AI
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "assistant",
          text: "Salutation! I am your personal **Interior AI Assistant**. \n\nI can help you audit colors, recommend product couplings, orchestrate bespoke layouts, or curate a layout within your specific financial limits (e.g., under ₹50,000 or ₹1,00,000).\n\nWhat space are we reimagining today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestedProducts: []
        }
      ]);
    }
  }, [messages]);

  // Check if there was an initial query left by the Hero simulation
  useEffect(() => {
    const preloaded = sessionStorage.getItem("ai_initial_msg");
    if (preloaded) {
      sessionStorage.removeItem("ai_initial_msg");
      setIsOpen(true);
      sendQuery(preloaded);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Math.random().toString(36).substr(2, 9),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      // Gather all messages for server history context
      const serverPayload = [...messages, userMsg].map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      // Post dialogue context to proxy server
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: serverPayload }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the interior design server");
      }

      const responseData = await response.json();

      // Find recommended products inside the database using the IDs array returned by Gemini
      let recommendedList: Product[] = [];
      if (responseData.suggestedProductIds && Array.isArray(responseData.suggestedProductIds)) {
        recommendedList = PRODUCTS.filter((item) => 
          responseData.suggestedProductIds.includes(item.id)
        );
      }

      const assistantMsg: ChatMessage = {
        id: "ai-" + Math.random().toString(36).substr(2, 9),
        sender: "assistant",
        text: responseData.text || "I apologize. I couldn't process that configuration. What furniture category are you scouting for?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedProducts: recommendedList
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      
      // Fallback local response if server is disconnected or starts up slow
      const fallbackText = "I have reviewed your request. Based on our **Interiors** collection, I highly recommend our hand-tufted furniture. Would you like to check the *Aurelia Velvet Lounge Sofa* (ID: sofa-1)? It aligns beautifully with clean aesthetics.";
      const reccs = PRODUCTS.filter(p => p.id === "sofa-1");

      const assistantMsg: ChatMessage = {
        id: "ai-fallback",
        sender: "assistant",
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedProducts: reccs
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuery(inputVal);
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "assistant",
        text: "Design record initialized. Let us model a clean canvas. Ask me anything about furniture pairs, dimension balance, or color layouts.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  const quickPrompts = [
    { title: "Sofa Suggestion", text: "Suggest a luxury sofa and matching table for a modern apartment." },
    { title: "Bedroom under ₹50k", text: "Assemble a premium, minimalist bedroom design setup under ₹50,000." },
    { title: "Matching Table", text: "What coffee table matches the Nordic Bouclé Accent Chair?" },
    { title: "Workspace Vibe", text: "Suggest some modern workspace furniture setups that use walnut wood." }
  ];

  if (!isOpen && !embeddedMode) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-[#C8A45D] to-[#E9DDC7] text-zinc-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center space-x-2 group cursor-pointer"
        style={{ boxShadow: "0 20px 40px rgba(200, 164, 93, 0.3)" }}
      >
        <Sparkles className="h-5 w-5 animate-pulse" />
        <span className="text-xs font-tech font-bold tracking-widest uppercase pr-1">AI Designer</span>
      </button>
    );
  }

  return (
    <div 
      className={`transition-colors duration-300 ${
        embeddedMode 
          ? "w-full max-w-5xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#FAF8F2] dark:bg-[#1E1E1E] shadow-2xl overflow-hidden min-h-[600px] flex flex-col"
          : "fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[85vh] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#FAF8F2] dark:bg-[#1E1E1E] shadow-2xl overflow-hidden flex flex-col"
      }`}
    >
      {/* Header Container */}
      <div className="bg-zinc-950 dark:bg-zinc-900 border-b border-zinc-800/80 px-5 py-4 flex items-center justify-between text-[#FAF8F2]">
        <div className="flex items-center space-x-3.5">
          <div className="p-2 bg-[#C8A45D]/10 rounded-full border border-[#C8A45D]/20">
            <Sparkles className="h-4.5 w-4.5 text-[#C8A45D]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display text-base tracking-wider font-semibold">Interior AI Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
            <p className="font-tech text-[8px] tracking-[0.2em] text-[#C8A45D] uppercase">
              MILAN DESIGN LAB ENGINE
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button 
            onClick={clearChatHistory}
            className="p-1 px-2.5 rounded border border-zinc-800 hover:border-[#C8A45D]/40 text-[9px] font-tech text-zinc-400 hover:text-[#C8A45D] transition-colors"
            title="Reset Conversation"
          >
            Clear Sheet
          </button>
          {!embeddedMode && (
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Minimize2 className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Dialogue Content scrollbox */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map((message, idx) => {
          const isUser = message.sender === "user";
          return (
            <div 
              key={message.id || idx}
              className={`flex items-start gap-3 fade-in-section ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar circle */}
              <div className={`p-2 rounded-full border flex-shrink-0 ${
                isUser 
                  ? "bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200" 
                  : "bg-[#C8A45D]/10 border-[#C8A45D]/30 text-[#C8A45D]"
              }`}>
                {isUser ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
              </div>

              {/* Message text bubble */}
              <div 
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser 
                    ? "bg-[#C8A45D] text-zinc-950 font-medium rounded-tr-none" 
                    : "bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-tl-none shadow-sm"
                }`}
              >
                {/* Parse Markdown-like simple links and bold tags */}
                <p className="whitespace-pre-line">
                  {message.text.split("**").map((chunk, cidx) => {
                    const isOdd = cidx % 2 !== 0;
                    return isOdd ? <strong key={cidx} className="font-semibold text-zinc-950 dark:text-zinc-50">{chunk}</strong> : chunk;
                  })}
                </p>

                {/* Meta timing line */}
                <span className={`block text-[8px] mt-2 text-right ${isUser ? "text-zinc-800/60" : "text-zinc-400"}`}>
                  {message.timestamp}
                </span>

                {/* Render embedded recommended furniture cards right in the layout */}
                {message.suggestedProducts && message.suggestedProducts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3.5">
                    <p className="font-tech text-[9px] tracking-wider uppercase font-semibold text-[#C8A45D]">
                      ✓ AI Recommended Staging Items
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {message.suggestedProducts.map((prod) => (
                        <div 
                          key={prod.id}
                          className="flex items-center space-x-3 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 group"
                        >
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-medium text-zinc-900 dark:text-zinc-100 truncate">
                              {prod.name}
                            </h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                              ₹{prod.discountPrice ? prod.discountPrice.toLocaleString() : prod.price.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            {onQuickView && (
                              <button
                                onClick={() => onQuickView(prod)}
                                className="p-1.5 rounded-lg hover:bg-[#C8A45D]/10 text-zinc-500 hover:text-[#C8A45D] transition-all cursor-pointer"
                                title="Inspect Details"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {onAddToCart && (
                              <button
                                onClick={() => onAddToCart(prod)}
                                className="p-1.5 rounded-lg bg-[#C8A45D] text-zinc-950 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer"
                                title="Add to Cart"
                              >
                                <ShoppingCart className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing loading indicators state */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full border bg-[#C8A45D]/10 border-[#C8A45D]/30 text-[#C8A45D] flex-shrink-0">
              <Bot className="h-4.5 w-4.5 animate-bounce" />
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
              <div className="flex items-center space-x-1.5 py-1">
                <span className="w-2 h-2 bg-[#C8A45D] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-[#C8A45D] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-[#C8A45D] rounded-full animate-bounce" />
              </div>
              <span className="font-tech text-[8px] tracking-wider text-zinc-400 uppercase mt-2 block">
                Placing items in digital space...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Pre-designed floating helpers cards (only shown when conversation state is small) */}
      {messages.length < 3 && (
        <div className="px-5 py-3 border-t dark:border-zinc-800/80 border-zinc-200/50 bg-zinc-50/55 dark:bg-zinc-950/20">
          <p className="font-tech text-[9px] tracking-widest text-[#C8A45D] uppercase font-bold mb-2">
            Ask Design Prompts:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.map((p, pIdx) => (
              <button
                key={pIdx}
                onClick={() => sendQuery(p.text)}
                className="text-left text-[10px] p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#C8A45D] hover:shadow-sm transition-all text-zinc-700 dark:text-zinc-400 font-light truncate max-w-full cursor-pointer"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form container */}
      <form 
        onSubmit={handleSendSubmit}
        className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-850 flex items-center gap-3.5"
      >
        <input
          type="text"
          placeholder="e.g., Assemble a dining setup under ₹1,00,000..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={loading}
          className="flex-1 py-3 px-4 rounded-xl text-xs outline-none border focus:border-[#C8A45D] dark:bg-zinc-950 dark:border-zinc-800 border-zinc-205 text-zinc-900 dark:text-zinc-50"
          required
        />
        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="p-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-[#FAF8F2] hover:bg-[#C8A45D] hover:text-zinc-900 transition-all cursor-pointer flex-shrink-0 disabled:opacity-40"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
}
