import { useState } from "react";
import { ROOM_IDEAS, PRODUCTS } from "../data";
import { Product, InspirationRoom } from "../types";
import { Sparkles, Heart, Eye, ShoppingCart, CheckCircle, Info, Sparkle, Layers } from "lucide-react";

interface IdeasGalleryProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const VIEW_CATEGORIES = [
  "All Ideas",
  "Modern Apartments",
  "Luxury Homes",
  "Minimal Designs",
  "Office Spaces"
];

export default function IdeasGallery({ onAddToCart, onQuickView }: IdeasGalleryProps) {
  const [selectedSub, setSelectedSub] = useState("All Ideas");
  
  // Staging room detail modal state
  const [stagingRoom, setStagingRoom] = useState<InspirationRoom | null>(null);

  // Wishlisted styles tracker IDs
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);

  const filteredIdeas = ROOM_IDEAS.filter((r) => {
    return selectedSub === "All Ideas" || r.category === selectedSub;
  });

  const toggleSaveIdea = (id: string) => {
    if (savedIdeas.includes(id)) {
      setSavedIdeas(savedIdeas.filter(item => item !== id));
    } else {
      setSavedIdeas([...savedIdeas, id]);
    }
  };

  const openStagingDetail = (room: InspirationRoom) => {
    setStagingRoom(room);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 transition-colors duration-300">
      
      {/* Title Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-tech text-[10px] tracking-widest text-[#C8A45D] bg-[#C8A45D]/10 px-3 py-1 rounded-full uppercase font-bold inline-block">
          MILAN EXHIBITIONS 2026
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 font-light">
          Room Staging <span className="italic font-medium">Inspiration Boards</span>
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
          Explore complete architectural concepts sketched by our award-winning designers. Click "Shop this Room" to inspect or bundle elements.
        </p>
      </div>

      {/* Row tags filters */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {VIEW_CATEGORIES.map((catName) => {
          const isSel = selectedSub === catName;
          return (
            <button
              key={catName}
              onClick={() => setSelectedSub(catName)}
              className={`px-5 py-2 rounded-full text-xs font-tech font-light tracking-wider shrink-0 border transition-all cursor-pointer ${
                isSel 
                  ? "bg-zinc-950 text-white dark:bg-[#FAF8F2] dark:text-zinc-950 border-zinc-950 dark:border-zinc-50"
                  : "bg-white dark:bg-[#1E1E1E] text-zinc-650 dark:text-zinc-350 dark:border-zinc-805 border-zinc-200 hover:border-[#C8A45D]"
              }`}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Grid of Boards cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {filteredIdeas.map((room) => {
          const isSaved = savedIdeas.includes(room.id);
          return (
            <div 
              key={room.id}
              className="flex flex-col rounded-2xl bg-white dark:bg-[#1E1E1E] border dark:border-zinc-800/60 border-zinc-200/50 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              
              {/* Inspiration Image container */}
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={room.image} 
                  alt={room.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Left Category floating tag */}
                <span className="absolute top-4 left-4 bg-zinc-950/80 text-[#C8A45D] font-tech text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg border border-zinc-800/80 backdrop-blur-sm shadow">
                  {room.category}
                </span>

                {/* Save Heart Button */}
                <button
                  onClick={() => toggleSaveIdea(room.id)}
                  className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-white/75 dark:bg-black/60 shadow hover:scale-115 active:scale-95 transition-all text-zinc-950 dark:text-zinc-50 cursor-pointer"
                  title="Save Inspiration board"
                >
                  <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Text, Specs Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-50 font-medium tracking-wide">
                    {room.title}
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Shop look trigger */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-850">
                  <span className="text-[9px] font-tech text-zinc-400 uppercase tracking-widest font-semibold block">
                    ✓ Includes {room.productsInRoom.length} key components
                  </span>
                  
                  <button
                    onClick={() => openStagingDetail(room)}
                    className="flex items-center space-x-1 py-1.5 px-4 bg-[#C8A45D] hover:bg-zinc-950 hover:text-white text-zinc-950 text-xs font-tech font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Shop Look</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Modal: Shop This Room product pop up detailing items */}
      {stagingRoom && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F2] dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 relative text-left">
            
            {/* Header */}
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
              <span className="font-tech text-[9px] text-[#C8A45D] tracking-widest uppercase font-bold block mb-1">
                Aesthetic Package Audit
              </span>
              <h3 className="font-display text-2xl text-zinc-900 dark:text-zinc-50 font-semibold italic">
                {stagingRoom.title}
              </h3>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-450 mt-1.5">
                Each product configured below represents a crucial visual pillar in this home board:
              </p>
            </div>

            {/* Selected Room Items render list */}
            <div className="space-y-4 font-sans max-h-80 overflow-y-auto pr-1">
              {PRODUCTS.filter((prod) => stagingRoom.productsInRoom.includes(prod.id)).map((p) => (
                <div 
                  key={p.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 gap-4"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <img src={p.image} className="w-12 h-12 object-cover rounded-xl" />
                    <div className="min-w-0">
                      <span className="text-[8px] font-tech text-[#C8A45D] uppercase tracking-widest leading-none">
                        {p.category}
                      </span>
                      <h4 className="text-xs font-semibold text-zinc-905 dark:text-zinc-100 truncate">
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        ₹{p.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => onQuickView(p)}
                      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                      title="Inspect Specifications"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(p);
                        alert(`Successfully placed ${p.name} inside basket.`);
                      }}
                      className="p-2 rounded-lg bg-[#C8A45D] hover:bg-zinc-950 hover:text-white text-zinc-900 transition-colors cursor-pointer"
                      title="Add to Shopping Cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* AI accessories matcher suggestions drawer */}
            <div className="mt-6 p-4 rounded-xl dark:bg-zinc-900 bg-amber-500/5 border border-dashed border-[#C8A45D]/40 flex items-start space-x-3">
              <Sparkle className="h-5 w-5 text-[#C8A45D] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-tech text-[9px] font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-widest block">
                  Completing look recommendations:
                </span>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed italic">
                  "For the {stagingRoom.title}, our staging algorithm calculates that adding the matching bronze pendant light would secure an index compatibility score of 95%."
                </p>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setStagingRoom(null)}
                className="px-6 py-2 bg-gradient-to-tr from-zinc-900 to-zinc-950 hover:from-[#C8A45D] text-white text-[10px] font-tech uppercase tracking-widest rounded-xl transition-all cursor-pointer font-bold"
              >
                Close Look
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
