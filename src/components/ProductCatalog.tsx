import { useState, useMemo } from "react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { 
  Search, 
  Filter, 
  Menu, 
  Heart, 
  Plus, 
  Grid, 
  SlidersHorizontal, 
  Star, 
  Mic, 
  MicOff,
  Eye, 
  ShoppingBag,
  Sparkles,
  Check
} from "lucide-react";

interface ProductCatalogProps {
  onAddToCart: (product: Product, color?: { name: string; hex: string }) => void;
  onAddToWishlist: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  onQuickView: (product: Product) => void;
  compareIds: string[];
  wishlistIds: string[];
}

const CATEGORIES = [
  "All Spaces",
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Workspace",
  "Lighting",
  "Wall Décor",
  "Outdoor"
];

const STYLES = ["All", "Modern", "Classic", "Luxury", "Minimal"];
const MATERIALS = ["All", "Wood", "Metal", "Leather", "Fabric"];

export default function ProductCatalog({
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  onQuickView,
  compareIds,
  wishlistIds
}: ProductCatalogProps) {
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Spaces");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [priceRange, setPriceRange] = useState<number>(150000);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("Best Selling");
  
  // Search suggestion helpers
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Voice Search simulation state
  const [isListening, setIsListening] = useState(false);

  // Selected accent color tracking for each product card
  const [selectedColors, setSelectedColors] = useState<Record<string, { name: string; hex: string }>>({});

  const sampleVoiceSearches = [
    "Suggest a sofa for a modern living room",
    "Under 50,000",
    "Solid ash wood dining",
    "Velvet King Bed"
  ];

  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    setIsListening(true);
    // Simulate recording voice command
    setTimeout(() => {
      const phrases = ["velvet", "marble dining", "nordic", "travertine"];
      const match = phrases[Math.floor(Math.random() * phrases.length)];
      setSearchQuery(match);
      setIsListening(false);
    }, 2800);
  };

  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text);
    setShowSuggestions(false);
  };

  // Memoized filter-sort matching
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      const searchMatch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.style.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const categoryMatch = selectedCategory === "All Spaces" || p.category === selectedCategory;

      // Style
      const styleMatch = selectedStyle === "All" || p.style === selectedStyle;

      // Material
      const materialMatch = selectedMaterial === "All" || p.material === selectedMaterial;

      // Price limit
      const finalPrice = p.discountPrice || p.price;
      const priceMatch = finalPrice <= priceRange;

      // Rating limit
      const ratingMatch = p.rating >= selectedRating;

      return searchMatch && categoryMatch && styleMatch && materialMatch && priceMatch && ratingMatch;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === "Price Low-High") return priceA - priceB;
      if (sortBy === "Price High-Low") return priceB - priceA;
      if (sortBy === "Newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "Trending") return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      // Default: Rating scoring (Best Selling)
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, selectedStyle, selectedMaterial, priceRange, selectedRating, sortBy]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 4)
      .map(p => p.name);
  }, [searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Spaces");
    setSelectedStyle("All");
    setSelectedMaterial("All");
    setPriceRange(150000);
    setSelectedRating(0);
    setSortBy("Best Selling");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 transition-colors duration-300">
      
      {/* Title Header */}
      <div className="text-center md:text-left max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 font-light">
          Shop By <span className="italic font-medium">Space & Aesthetics</span>
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-light">
          Audit our handcrafted collections, customized perfectly with organic finishes, rich structural metals, and real-time comparative matching calculations.
        </p>
      </div>

      {/* Advanced search, voice simulation layout */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
        
        {/* Search Input Container */}
        <div className="relative flex-1 w-full relative">
          <input
            type="text"
            placeholder="Search catalog: 'Sofa', 'Velvet', 'Teak Wood lounger'..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full pl-11 pr-24 py-3.5 rounded-full text-xs outline-none border focus:border-[#C8A45D] dark:bg-zinc-900 bg-white border-zinc-250/60 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-md transition-all"
          />
          <Search className="absolute left-4 top-4.5 h-4 w-4 text-zinc-400" />
          
          {/* Voice Search Button with Active recording ring */}
          <button
            onClick={handleVoiceSearch}
            className={`absolute right-3 top-2.5 p-2 rounded-full transition-all flex items-center justify-center cursor-pointer ${
              isListening 
                ? "bg-red-500 text-white animate-pulse" 
                : "text-zinc-400 hover:text-[#C8A45D]"
            }`}
            title="Search by Speech Assistant"
          >
            {isListening ? (
              <div className="relative">
                <MicOff className="h-4 w-4" />
                <span className="absolute -inset-2 rounded-full border border-red-500 animate-ping opacity-60" />
              </div>
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </button>

          {/* Quick Clear */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-12 top-4 text-[10px] text-zinc-400 hover:text-zinc-600"
            >
              Clear
            </button>
          )}

          {/* Search suggestions panel */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-2 z-50 text-left">
              {searchSuggestions.map((sug, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleSuggestionClick(sug)}
                  className="w-full text-left p-2.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-[#C8A45D]/10 rounded-lg transition-colors truncate"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sorting selection Dropdown */}
        <div className="w-full md:w-56 shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-3.5 px-4 outline-none border dark:border-zinc-800 border-zinc-200 rounded-full text-xs dark:bg-zinc-900 bg-white text-zinc-700 dark:text-zinc-200 cursor-pointer shadow-md"
          >
            <option>Best Selling</option>
            <option>Trending</option>
            <option>Newest</option>
            <option>Price Low-High</option>
            <option>Price High-Low</option>
          </select>
        </div>

      </div>

      {/* Voice listening feedback banner */}
      {isListening && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 max-w-md mx-auto text-center font-tech text-xs tracking-wider text-red-500 animate-pulse">
           🎙️ Listening for interior concepts... Say "Velvet" or "Marble"
        </div>
      )}

      {/* Staged top spaces filter row banner */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 z-10 scrollbar-none">
        {CATEGORIES.map((space) => {
          const isSel = selectedCategory === space;
          return (
            <button
              key={space}
              onClick={() => setSelectedCategory(space)}
              className={`px-6 py-2.5 rounded-full text-xs font-tech font-light tracking-wider shrink-0 transition-all border cursor-pointer ${
                isSel
                  ? "bg-zinc-950 text-white dark:bg-[#FAF8F2] dark:text-zinc-950 border-zinc-950 dark:border-zinc-50"
                  : "bg-white dark:bg-[#1E1E1E] text-zinc-650 dark:text-zinc-350 hover:border-[#C8A45D] dark:border-zinc-800 border-zinc-200"
              }`}
            >
              {space === "All Spaces" ? "🚪 All Spaces" : space}
            </button>
          );
        })}
      </div>

      {/* Main Catalog View: Left filters rail, Right product cards grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Filter Rail Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-zinc-150 dark:border-zinc-800 space-y-6 lg:sticky lg:top-24 hidden lg:block">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span className="font-tech text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-zinc-100">
              Filters Panel
            </span>
            <button 
              onClick={resetFilters}
              className="text-[10px] text-zinc-400 hover:text-[#C8A45D] transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Style filters checklist */}
          <div className="space-y-2.5">
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#C8A45D] block">
              Furniture Style
            </span>
            <div className="space-y-1.5">
              {STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full text-left py-1 text-xs px-2 rounded-md transition-all ${
                    selectedStyle === style 
                      ? "bg-[#C8A45D]/15 text-[#C8A45D] font-medium" 
                      : "text-zinc-600 dark:text-zinc-350 hover:bg-black/2 dark:hover:bg-white/2"
                  }`}
                >
                  {style === "All" ? "All Styles" : style}
                </button>
              ))}
            </div>
          </div>

          {/* Material filters list */}
          <div className="space-y-2.5">
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#C8A45D] block">
              Primary Material
            </span>
            <div className="space-y-1.5">
              {MATERIALS.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left py-1 text-xs px-2 rounded-md transition-all ${
                    selectedMaterial === mat 
                      ? "bg-[#C8A45D]/15 text-[#C8A45D] font-medium" 
                      : "text-zinc-600 dark:text-zinc-350 hover:bg-black/2 dark:hover:bg-white/2"
                  }`}
                >
                  {mat === "All" ? "All Materials" : mat}
                </button>
              ))}
            </div>
          </div>

          {/* Price upper threshold slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] tracking-wider uppercase font-bold text-[#C8A45D] block">
                Budget Ceiling
              </span>
              <span className="font-mono text-zinc-900 dark:text-zinc-50 font-semibold">
                ₹{priceRange.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C8A45D] cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-zinc-400 font-mono">
              <span>₹10,000</span>
              <span>₹1,50,000+</span>
            </div>
          </div>

          {/* Staging Reviews stars filter */}
          <div className="space-y-2.5">
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#C8A45D] block">
              Staging Quality
            </span>
            <div className="flex items-center space-x-1.5">
              {[4, 4.5, 4.8].map((score) => (
                <button
                  key={score}
                  onClick={() => setSelectedRating(selectedRating === score ? 0 : score)}
                  className={`px-3 py-1 bg-zinc-50 hover:border-[#C8A45D] dark:bg-zinc-950 border rounded-lg text-[10px] font-semibold transition-all ${
                    selectedRating === score 
                      ? "text-[#C8A45D] border-[#C8A45D] bg-[#C8A45D]/10" 
                      : "dark:border-zinc-800 border-zinc-200 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  ★ {score}+
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Product Grid Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Quick Counter */}
          <div className="flex justify-between items-center bg-white dark:bg-[#1E1E1E] border dark:border-zinc-800 border-zinc-200/50 p-4 rounded-xl">
            <p className="text-xs text-zinc-500 font-light">
              Presenting <strong className="font-semibold text-zinc-805 dark:text-zinc-50">{filteredProducts.length}</strong> luxurious interior matches.
            </p>
            <span className="text-[10px] text-zinc-400 font-tech">
              MILAN STAGING CERTIFIED
            </span>
          </div>

          {/* Empty Results state */}
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center space-y-4 rounded-2xl border-2 border-dashed dark:border-zinc-800 border-zinc-200 bg-white dark:bg-zinc-[#1E1E1E]">
              <Sparkles className="h-10 w-10 text-[#C8A45D] mx-auto opacity-50" />
              <div>
                <h3 className="font-display italic text-lg text-zinc-900 dark:text-zinc-50">
                  No direct design matches found
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-2 font-light">
                  We suggest relaxing your filters, or asking your personal Interior AI Assistant to curate a custom setup.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-[#C8A45D] text-zinc-950 rounded-full text-xs font-tech tracking-wider uppercase font-semibold"
              >
                Clear Filters Panel
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const inWishlist = wishlistIds.includes(p.id);
              const inCompare = compareIds.includes(p.id);
              
              // Get current selected color hex for product if any, otherwise fallback to index 0
              const currentSelColor = selectedColors[p.id] || p.colors[0];

              return (
                <div 
                  key={p.id}
                  className="flex flex-col rounded-2xl bg-white dark:bg-[#1E1E1E] border border-zinc-200/50 dark:border-zinc-805/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                >
                  
                  {/* Hearts Wishlist Button */}
                  <button
                    onClick={() => onAddToWishlist(p)}
                    className="absolute top-3 left-3 p-2 rounded-full backdrop-blur-md bg-white/75 dark:bg-black/60 shadow hover:scale-110 active:scale-95 transition-transform z-10 cursor-pointer text-zinc-700 dark:text-zinc-200"
                    title={inWishlist ? "Unwishlist item" : "Wishlist item"}
                  >
                    <Heart className={`h-4 w-4 ${inWishlist ? "text-red-500 fill-red-500" : ""}`} />
                  </button>

                  {/* Highlights/New/Trending floating tags */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    {p.isTrending && (
                      <span className="px-2.5 py-1 rounded-md bg-[#C8A45D]/90 text-zinc-950 text-[8px] font-tech font-bold uppercase tracking-widest leading-none shadow">
                        TRENDING
                      </span>
                    )}
                    {p.isNew && (
                      <span className="px-2.5 py-1 rounded-md bg-zinc-900/95 border border-zinc-800 text-white text-[8px] font-tech font-bold uppercase tracking-widest leading-none shadow">
                        NEW LOOK
                      </span>
                    )}
                  </div>

                  {/* Product visual area, with quick inspect tool overlays on hover */}
                  <div className="h-56 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark glassmorphism inspect toolbar */}
                    <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5">
                      <button
                        onClick={() => onQuickView(p)}
                        className="flex items-center space-x-1.5 bg-white text-zinc-950 py-2.5 px-4 rounded-full text-[10px] font-tech uppercase tracking-widest shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer font-semibold hover:bg-[#C8A45D]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata and interactions bottom area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-1.5 text-left">
                      <span className="text-[8px] font-tech uppercase tracking-widest text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 rounded border dark:border-zinc-800 border-zinc-200 inline-block">
                        {p.category}
                      </span>
                      <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                        {p.name}
                      </h3>
                      
                      {/* Price labels with luxury details */}
                      <div className="flex items-center space-x-1.5 font-mono">
                        {p.discountPrice ? (
                          <>
                            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                              ₹{p.discountPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-zinc-400 line-through">
                              ₹{p.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                            ₹{p.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Stars Rating line */}
                      <div className="flex items-center space-x-1 pt-0.5">
                        <Star className="h-3.5 w-3.5 text-[#C8A45D] fill-[#C8A45D]" />
                        <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-300">{p.rating}</span>
                        <span className="text-[10px] text-zinc-400">({p.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    {/* Dynamic color options dots selection slider (Only shown if colors > 1) */}
                    <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800 pt-3">
                      <div className="flex space-x-1.5">
                        {p.colors.map((col, cidx) => {
                          const isSel = currentSelColor.hex === col.hex;
                          return (
                            <button
                              key={cidx}
                              onClick={() => setSelectedColors(prev => ({ ...prev, [p.id]: col }))}
                              className={`w-4.5 h-4.5 rounded-full border transition-all cursor-pointer relative flex items-center justify-center`}
                              style={{ backgroundColor: col.hex, borderColor: isSel ? "#C8A45D" : "transparent" }}
                              title={col.name}
                            >
                              {isSel && <Check className="h-2 w-2 text-white stroke-[3px]" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Compare Checker block */}
                      <button
                        onClick={() => onAddToCompare(p)}
                        className={`flex items-center space-x-1 py-1 px-2.5 rounded-lg text-[9px] font-tech text-zinc-400 hover:text-[#C8A45D] border transition-all cursor-pointer ${
                          inCompare 
                            ? "border-[#C8A45D]/55 text-[#C8A45D] bg-[#C8A45D]/5" 
                            : "dark:border-zinc-805 border-zinc-200"
                        }`}
                      >
                        <SlidersHorizontal className="h-3 w-3" />
                        <span>{inCompare ? "Compared" : "Compare"}</span>
                      </button>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={() => onAddToCart(p, currentSelColor)}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 bg-zinc-950 dark:bg-[#F5F5F5] text-white dark:text-zinc-950 text-[10px] font-tech uppercase tracking-widest rounded-xl hover:bg-[#C8A45D] hover:text-zinc-950 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Buy Look</span>
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
