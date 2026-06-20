import { useState, FormEvent } from "react";
import { Sparkles, ShoppingBag, Shield, CheckCircle2, ArrowRight } from "lucide-react";

interface HeroProps {
  onShopClick: () => void;
  onAiClick: () => void;
}

export default function Hero({ onShopClick, onAiClick }: HeroProps) {
  const [typedQuestion, setTypedQuestion] = useState("");
  const sampleSuggestions = [
    "Suggest a sofa for a modern living room",
    "What table matches my royal tufted bed?",
    "Create a living layout under ₹1,00,000",
  ];

  const handleSuggestionClick = (text: string) => {
    setTypedQuestion(text);
    // Automatically swap to AI chatbot with this text preloaded
    onAiClick();
    // Use session storage to pass initial message
    sessionStorage.setItem("ai_initial_msg", text);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (typedQuestion.trim()) {
      sessionStorage.setItem("ai_initial_msg", typedQuestion);
      onAiClick();
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 transition-colors duration-300 bg-[#FAF8F2] dark:bg-[#121212]">
      {/* Background radial soft light blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C8A45D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#E9DDC7]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text items column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tag/Badge pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-amber-900/10 dark:border-zinc-800 bg-[#C8A45D]/10 dark:bg-[#D4AF37]/5 transition-all">
              <Sparkles className="h-4 w-4 text-[#C8A45D] dark:text-[#D4AF37]" />
              <span className="font-tech text-[10px] tracking-widest uppercase font-semibold text-zinc-800 dark:text-zinc-200">
                AI-Powered Space Crafting Collective
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-zinc-50 tracking-tight font-light leading-[1.1]">
              Design Your <span className="font-semibold italic">Dream Home</span> With Smart Interiors
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl font-light">
              Explore premium hand-crafted furniture, discover complementary textures, and leverage real-time AI spatial reasoning to stage the perfect room instantly.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="flex items-center space-x-2.5 px-8 py-4 rounded-full font-tech text-xs uppercase tracking-widest text-[#FAF8F2] bg-zinc-950 hover:bg-[#C8A45D] hover:text-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#D4AF37] shadow-xl hover:shadow-[#C8A45D]/10 transition-all duration-300 scale-100 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop Furniture</span>
              </button>

              <button
                onClick={onAiClick}
                className="flex items-center space-x-2 px-8 py-4 rounded-full font-tech text-xs uppercase tracking-widest border border-zinc-300 dark:border-zinc-700 hover:border-[#C8A45D] text-zinc-800 dark:text-zinc-200 dark:hover:text-[#D4AF37] transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-[#C8A45D]" />
                <span>Ask AI Designer</span>
              </button>
            </div>

            {/* Core Pillars / Bullet points */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C8A45D]" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Premium Furniture</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C8A45D]" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">AI Suggestions</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C8A45D]" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Smart Comparison</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C8A45D]" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Personalized Stage</span>
              </div>
            </div>

          </div>

          {/* Luxury Room Image & Interactive Sandbox Previews Column */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Main Visual Image Card with Luxury Shadow & Roundings */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl dark:shadow-none transition-transform duration-500 hover:scale-[1.01] border border-zinc-100 dark:border-zinc-800/50">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
                alt="Modern staged living room"
                className="w-full h-[380px] sm:h-[450px] object-cover filter brightness-[0.93] transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Glassmorphism float accent card inside image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-[#FAF8F2]/75 dark:bg-[#121212]/75 border border-amber-900/10 dark:border-zinc-800/50 rounded-xl shadow-lg transition-colors">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-tech text-[10px] tracking-widest font-semibold uppercase text-zinc-800 dark:text-zinc-200">
                    Active Design Room: Warm Minimalist Haven
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 font-light">
                  Aurelia Curve Sofa and Travertine table scored <strong className="text-[#C8A45D] font-bold">94% compatibility representation</strong> in Milan staging rooms.
                </p>
              </div>

              {/* High-quality warranty ribbon */}
              <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-sm shadow border border-zinc-800 py-1.5 px-3 rounded-lg flex items-center space-x-1.5">
                <Shield className="h-3.5 w-3.5 text-[#C8A45D]" />
                <span className="font-tech text-[8px] font-bold text-zinc-200 uppercase tracking-widest">
                  10Y Product Seal
                </span>
              </div>
            </div>

            {/* Floating Mini Interactive AI Pre-test Panel */}
            <div className="absolute -top-6 -left-6 hidden sm:block w-72 p-5 bg-[#FAF8F2] dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3">
                <div className="flex items-center space-x-1.5">
                  <div className="p-1 rounded-full bg-[#C8A45D]/10">
                    <Sparkles className="h-3.5 w-3.5 text-[#C8A45D]" />
                  </div>
                  <span className="font-tech text-[10px] font-bold tracking-widest uppercase text-zinc-800 dark:text-zinc-200">
                    AI Preloaded prompts
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
              </div>

              <div className="space-y-1.5">
                {sampleSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full text-left p-2 rounded-lg text-[10px] transition-colors dark:hover:bg-zinc-900 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-400 group border border-transparent dark:hover:border-zinc-800 hover:border-zinc-200 flex items-center justify-between cursor-pointer"
                  >
                    <span className="line-clamp-1">{item}</span>
                    <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-[#C8A45D] transition-colors flex-shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
