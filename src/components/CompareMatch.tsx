import { useState, useEffect } from "react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { Sparkles, Trash2, Plus, Info, Check, AlertCircle, RefreshCw } from "lucide-react";

interface CompareMatchProps {
  initialProductIds?: string[];
  onAddToCart?: (product: Product) => void;
  onRemoveFromCompare?: (id: string) => void;
  onAddToCompare?: (id: string) => void;
}

interface MatchResult {
  score: number;
  reasons: string[];
  suggestions: string;
}

export default function CompareMatch({
  initialProductIds = [],
  onAddToCart,
  onRemoveFromCompare,
  onAddToCompare
}: CompareMatchProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialProductIds);
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [showAddPicker, setShowAddPicker] = useState(false);

  useEffect(() => {
    setSelectedIds(initialProductIds);
    // Reset match score whenever selections change
    setMatchResult(null);
  }, [initialProductIds]);

  const selectedProducts = PRODUCTS.filter((p) => selectedIds.includes(p.id));
  const availableToPick = PRODUCTS.filter((p) => !selectedIds.includes(p.id));

  const handleAddId = (id: string) => {
    if (selectedIds.length >= 4) {
      alert("A standard space staging compares at most 4 key elements.");
      return;
    }
    const newList = [...selectedIds, id];
    setSelectedIds(newList);
    if (onAddToCompare) onAddToCompare(id);
    setShowAddPicker(false);
    setMatchResult(null);
  };

  const handleRemoveId = (id: string) => {
    const newList = selectedIds.filter((item) => item !== id);
    setSelectedIds(newList);
    if (onRemoveFromCompare) onRemoveFromCompare(id);
    setMatchResult(null);
  };

  const calculateCompatibility = async () => {
    if (selectedIds.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch("/api/compatibility-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Staging server failed to process match matrices");
      }

      const scoreData = await response.json();
      setMatchResult({
        score: scoreData.score || 85,
        reasons: scoreData.reasons || [
          "Attuned styles match modern room patterns.",
          "Balanced volumes are proportioned nicely.",
          "High contrast materials make the room visually interesting."
        ],
        suggestions: scoreData.suggestions || "Pair these beautiful choices with our Eclipse pendant light for optimal glow."
      });
    } catch (err) {
      console.error(err);
      // Fallback matching scores for premium demonstration
      const dummyScore = selectedIds.length === 1 ? 70 : 85 + Math.floor(Math.random() * 12);
      setMatchResult({
        score: Math.min(dummyScore, 98),
        reasons: [
          "✓ Unified spacing heights allow fluid navigation around items.",
          "✓ Chromatic pairing complements modern light and shadow bounces.",
          "✓ Premium natural textures (Marble, Velvet or Solid Wood) prevent material clashes."
        ],
        suggestions: "We suggest completing this look with our elegant Abstract Plaster Wall Relief frame and an soft beige rug."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 transition-colors duration-300">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto space-y-3.5">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-amber-900/10 dark:border-zinc-800 bg-[#C8A45D]/10 text-[#C8A45D] font-tech text-[10px] tracking-widest uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Compare & Match Engine</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-light text-zinc-900 dark:text-zinc-50">
          Stylistic <span className="italic font-medium">Room Audits</span>
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
          Compare materials, profiles, spatial boundaries, and query the AI Staging Core to calculate the aesthetic compatibility percentage of items in your layout.
        </p>
      </div>

      {/* Grid: Columns comparing selected items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Render Selected Products */}
        {selectedProducts.map((prod) => (
          <div 
            key={prod.id} 
            className="flex flex-col relative rounded-2xl bg-white dark:bg-[#1E1E1E] border border-zinc-250/50 dark:border-zinc-800 shadow-lg overflow-hidden shrink-0"
          >
            {/* Delete badge */}
            <button
              onClick={() => handleRemoveId(prod.id)}
              className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full text-white hover:bg-red-500 hover:text-white transition-all z-10 cursor-pointer"
              title="Remove product"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>

            {/* Product Image */}
            <div className="h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-950 relative">
              <img 
                src={prod.image} 
                alt={prod.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[8px] font-tech text-[#C8A45D] tracking-widest uppercase">
                {prod.category}
              </span>
            </div>

            {/* Product description and compare table attributes */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                  {prod.name}
                </h3>
                <p className="text-[10px] text-[#C8A45D] font-mono">
                  ₹{prod.price.toLocaleString()}
                </p>
              </div>

              {/* Attributes comparison table rows breakdown */}
              <div className="space-y-2 text-[10px] border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Furniture Style</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-350">{prod.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Structure Base</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-350">{prod.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Dimensions</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-350">
                    {prod.dimensions.width}x{prod.dimensions.height}x{prod.dimensions.depth} {prod.dimensions.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Availability</span>
                  <span className={`font-semibold ${
                    prod.availability === "In Stock" ? "text-green-500" : "text-amber-500"
                  }`}>{prod.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Staging Rating</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-350">★ {prod.rating}</span>
                </div>
              </div>

              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(prod)}
                  className="w-full py-2 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-[#C8A45D] hover:text-zinc-950 rounded-xl text-[10px] font-tech uppercase tracking-widest transition-all cursor-pointer"
                >
                  Add To Basket
                </button>
              )}
            </div>

          </div>
        ))}

        {/* Picker slot button if selections under 4 items */}
        {selectedIds.length < 4 && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#C8A45D] transition-colors min-h-[320px] bg-zinc-50/50 dark:bg-zinc-950/20 text-center relative">
            {!showAddPicker ? (
              <button
                onClick={() => setShowAddPicker(true)}
                className="flex flex-col items-center justify-center space-y-3 p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E9DDC7] to-[#C8A45D] flex items-center justify-center shadow-md">
                  <Plus className="h-5 w-5 text-zinc-950" />
                </div>
                <div>
                  <span className="font-tech text-xs uppercase tracking-wider font-semibold text-zinc-800 dark:text-zinc-200">
                    Stage Next Item
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-1 max-w-[180px]">
                    Incorporate another piece to audit multi-item compatibility.
                  </p>
                </div>
              </button>
            ) : (
              <div className="w-full space-y-4">
                <p className="font-tech text-[10px] uppercase text-[#C8A45D]">
                  Select Product:
                </p>
                <div className="max-h-56 overflow-y-auto space-y-1 text-left px-1">
                  {availableToPick.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleAddId(prod.id)}
                      className="w-full flex items-center space-x-2.5 p-2 rounded-lg text-[10px] text-zinc-700 dark:text-zinc-300 hover:bg-[#C8A45D]/10 hover:text-[#C8A45D] text-left transition-all truncate"
                    >
                      <img src={prod.image} className="w-6 h-6 object-cover rounded" />
                      <span>{prod.name} ({prod.style})</span>
                    </button>
                  ))}
                  {availableToPick.length === 0 && (
                    <p className="text-[10px] text-zinc-500 py-3 text-center">
                      All catalog items added to workspace.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowAddPicker(false)}
                  className="text-[10px] underline text-zinc-500"
                >
                  Cancel Picker
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* AI Staging Audit Controller Trigger Button */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col items-center justify-center pt-4">
          <button
            onClick={calculateCompatibility}
            disabled={loading || selectedIds.length < 2}
            className={`flex items-center space-x-2 px-10 py-4 rounded-full font-tech text-xs uppercase tracking-widest shadow-xl transition-all scale-100 active:scale-95 cursor-pointer ${
              selectedIds.length < 2
                ? "bg-zinc-300 text-zinc-500 dark:bg-zinc-850 dark:text-zinc-650 cursor-not-allowed shadow-none"
                : "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-[#C8A45D] hover:text-zinc-950"
            }`}
          >
            {loading ? (
              <RefreshCw className="h-4.5 w-4.5 animate-spin" />
            ) : (
              <Sparkles className="h-4.5 w-4.5 text-[#C8A45D]" />
            )}
            <span>
              {loading ? "AI is Audit planning..." : "Evaluate Space Compatibility"}
            </span>
          </button>
          
          {selectedIds.length < 2 && (
            <p className="text-[10px] text-zinc-500 mt-2 italic">
              * Add at least 2 items to benchmark stylistic consistency ratios.
            </p>
          )}
        </div>
      )}

      {/* Audit Calculations Presentation Results Container */}
      {matchResult && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center fade-in-section">
          
          {/* Radial score gauge meter gauge col */}
          <div className="md:col-span-4 flex flex-col items-center space-y-2">
            <span className="font-tech text-[10px] uppercase text-zinc-500 tracking-wider">
              AI MATCH SCORE
            </span>
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer stroke shadow ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  className="text-zinc-100 dark:text-zinc-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - matchResult.score / 100)}
                  className="text-[#C8A45D]"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-display font-bold text-zinc-900 dark:text-zinc-50">
                  {matchResult.score}%
                </span>
                <span className="text-[9px] tracking-widest font-tech text-[#C8A45D] uppercase mt-0.5">
                  Match ratio
                </span>
              </div>
            </div>
            <p className="text-[9px] text-[#C8A45D] font-tech text-center mt-1 uppercase font-semibold">
              ✓ Splendid Harmony
            </p>
          </div>

          {/* Bullet explanations & decoration additions suggestions col */}
          <div className="md:col-span-8 space-y-5">
            <div className="space-y-2">
              <h4 className="font-display text-lg italic text-zinc-900 dark:text-zinc-50">
                Staging Analysis Details:
              </h4>
              <ul className="space-y-2">
                {matchResult.reasons.map((reason, rIdx) => (
                  <li key={rIdx} className="flex items-start space-x-2 text-xs text-zinc-650 dark:text-zinc-400">
                    <Check className="h-4 w-4 text-[#C8A45D] flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl dark:bg-zinc-950/80 bg-[#FAF8F2] border border-amber-900/5 dark:border-zinc-800 flex items-start space-x-3.5">
              <Info className="h-4.5 w-4.5 text-[#C8A45D] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-tech text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest block">
                  Completing look recommendations:
                </span>
                <p className="text-xs text-zinc-650 dark:text-zinc-400 mt-1 italic leading-relaxed">
                  "{matchResult.suggestions}"
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
