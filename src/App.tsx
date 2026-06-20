import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Chatbot from "./components/Chatbot";
import ProductCatalog from "./components/ProductCatalog";
import ProductDetails from "./components/ProductDetails";
import CompareMatch from "./components/CompareMatch";
import IdeasGallery from "./components/IdeasGallery";
import CartCheckout from "./components/CartCheckout";
import OffersPage from "./components/OffersPage";
import AboutContact from "./components/AboutContact";
import { Product, CartItem } from "./types";
import { Sparkles, MessageCircle, Heart, Flame } from "lucide-react";
import { PRODUCTS } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  // App-level state lists
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // Inspect Quick View product state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Quick prompt injection state for the chatbot
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Initialize theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("interiors-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("interiors-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, color?: { name: string; hex: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color || product.colors[0] }];
    });
  };

  const handleUpdateCartQuantity = (id: string, q: number) => {
    setCart((prev) => prev.map((item) => (item.product.id === id ? { ...item, quantity: q } : item)));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  // Compare operations
  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 4) {
        alert("A standard comparison compares at most 4 items side-by-side.");
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const handleAddCompareId = (id: string) => {
    if (!compareList.includes(id)) {
      setCompareList((prev) => [...prev, id]);
    }
  };

  const handleRemoveCompareId = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  // Handle direct AI Ask from product spec sheet
  const handleAskAiFromDetails = (promptText: string) => {
    setQuickViewProduct(null);
    setChatInitialPrompt(promptText);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] dark:bg-[#121212] font-sans antialiased text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Dynamic Upper header alert ticker */}
      <div className="bg-zinc-950 dark:bg-zinc-900 text-[#FAF8F2] text-[10px] py-2.5 px-4 font-tech uppercase tracking-widest text-center border-b dark:border-zinc-800 border-zinc-900 z-50 flex items-center justify-center space-x-1.5 shrink-0">
        <Flame className="h-3.5 w-3.5 text-[#C8A45D] animate-pulse" />
        <span>Inaugural Offer: Secure up to 40% OFF Room Combo Packages. Valid this week!</span>
      </div>

      {/* Navigation Header Menu */}
      <Navbar 
        activeTab={activeTab === "room-ideas" ? "ideas" : activeTab === "ai-assistant" ? "home" : activeTab} 
        setActiveTab={(tab) => {
          if (tab === "ai-assistant") {
            setIsChatOpen(true);
          } else if (tab === "room-ideas") {
            setActiveTab("ideas");
          } else {
            setActiveTab(tab);
          }
        }}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        wishlistCount={wishlist.length}
        theme={theme}
        toggleTheme={handleToggleTheme}
        onCartToggle={() => setActiveTab("cart")}
        onWishlistToggle={() => setActiveTab("shop")}
        onSearchToggle={() => setActiveTab("shop")}
      />

      {/* Primary Page Canvas Content container */}
      <main className="flex-1 pb-16">
        
        {activeTab === "home" && (
          <div className="space-y-16">
            <Hero 
              onShopClick={() => setActiveTab("shop")}
              onAiClick={() => setIsChatOpen(true)}
            />

            {/* Compact inline preview of Featured catalog */}
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="font-tech text-[10px] tracking-widest text-[#C8A45D] uppercase font-bold">
                    Featured Collection
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-zinc-905 dark:text-zinc-50 font-light">
                    Handcrafted For <span className="italic font-medium">Ultimate Comfort</span>
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab("shop")}
                  className="px-6 py-2.5 rounded-full border dark:border-zinc-805 border-zinc-200 text-xs font-tech uppercase tracking-wider hover:border-[#C8A45D] transition-colors cursor-pointer"
                >
                  View Full Catalog →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div 
                    key={p.id}
                    className="group border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow transition-all duration-300 hover:shadow-xl cursor-pointer"
                    onClick={() => setQuickViewProduct(p)}
                  >
                    <div className="h-52 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform" />
                    </div>
                    <div className="p-5 space-y-2 text-left">
                      <span className="text-[10px] uppercase font-tech text-[#C8A45D]">{p.category}</span>
                      <h3 className="text-xs font-semibold">{p.name}</h3>
                      <p className="text-xs text-zinc-500 font-mono">₹{p.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline highlights banner */}
            <div className="bg-[#E9DDC7] dark:bg-[#222222] py-16 text-center text-zinc-900 dark:text-zinc-55 transition-colors">
              <div className="max-w-3xl mx-auto px-4 space-y-4">
                <Sparkles className="h-8 w-8 text-[#C8A45D] mx-auto animate-pulse" />
                <h3 className="font-display text-3xl font-light">
                  Aesthetically Balanced, <span className="italic">Digitally Verified</span>
                </h3>
                <p className="text-xs text-zinc-650 dark:text-zinc-400 font-light leading-relaxed max-w-lg mx-auto">
                  Take the guessing game out of home staging. Use our Compare & Match Suite to check compliance ratios and coordinate sets before secure checkout.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveTab("compare")}
                    className="px-8 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-955 hover:bg-[#C8A45D] hover:text-zinc-950 rounded-full font-tech text-xs tracking-wider uppercase font-bold shadow-md cursor-pointer"
                  >
                    Spatial Staging Audit
                  </button>
                  <button
                    onClick={() => setActiveTab("ideas")}
                    className="px-6 py-3 rounded-full border border-black/15 dark:border-white/10 text-xs font-tech uppercase font-semibold cursor-pointer"
                  >
                    Browse Inspiration Rooms
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shop" && (
          <ProductCatalog 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            onAddToCompare={handleToggleCompare}
            onQuickView={(p) => setQuickViewProduct(p)}
            compareIds={compareList}
            wishlistIds={wishlist}
          />
        )}

        {activeTab === "compare" && (
          <CompareMatch 
            initialProductIds={compareList}
            onAddToCart={handleAddToCart}
            onRemoveFromCompare={handleRemoveCompareId}
            onAddToCompare={handleAddCompareId}
          />
        )}

        {activeTab === "ideas" && (
          <IdeasGallery 
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activeTab === "offers" && (
          <OffersPage />
        )}

        {activeTab === "about" && (
          <AboutContact />
        )}

        {activeTab === "cart" && (
          <CartCheckout 
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

      </main>

      {/* Multi-screen: Floating Chatbot Companion component active */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-zinc-950 dark:bg-white hover:bg-[#C8A45D] dark:hover:bg-[#C8A45D] text-white dark:text-zinc-950 hover:text-zinc-950 shadow-2xl scale-100 hover:scale-110 active:scale-95 transition-all cursor-pointer group z-40"
          title="Query Room AI Advisor"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#C8A45D] animate-ping" />
          </div>
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Chatbot 
            embeddedMode={false}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
          <button
            onClick={() => setIsChatOpen(false)}
            className="absolute top-4 right-14 text-zinc-400 hover:text-white text-[10px] font-tech uppercase"
          >
            Collapse
          </button>
        </div>
      )}

      {/* Modal Quick View specifications sheet inspector */}
      {quickViewProduct && (
        <ProductDetails 
          product={quickViewProduct}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleToggleWishlist}
          onClose={() => setQuickViewProduct(null)}
          onAskAi={handleAskAiFromDetails}
          wishlistIds={wishlist}
        />
      )}

      {/* Footer block info */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
