import { useState } from "react";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  Layers
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  theme: "light" | "dark";
  toggleTheme: () => void;
  onCartToggle: () => void;
  onWishlistToggle: () => void;
  onSearchToggle: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  theme,
  toggleTheme,
  onCartToggle,
  onWishlistToggle,
  onSearchToggle
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "room-ideas", label: "Room Ideas" },
    { id: "ai-assistant", label: "AI Assistant" },
    { id: "compare", label: "Compare" },
    { id: "offers", label: "Offers" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-opacity-80 transition-colors border-b duration-300 dark:bg-[#121212]/90 dark:border-zinc-800 bg-[#FAF8F2]/90 border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8A45D] to-[#E9DDC7] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 duration-300">
              <Layers className="h-5 w-5 text-[#222222] stroke-[1.5]" />
            </div>
            <div>
              <span className="font-display text-2xl tracking-[0.15em] font-medium text-zinc-900 dark:text-zinc-50">
                INTERIORS
              </span>
              <p className="font-tech text-[8px] tracking-[0.25em] text-[#C8A45D] -mt-1 uppercase">
                Smart Space Studio
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`px-4 py-2 text-sm tracking-wide font-sans cursor-pointer transition-all duration-300 relative group ${
                    isActive 
                      ? "text-[#C8A45D] font-medium" 
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                  {/* Underline indicator */}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#C8A45D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    isActive ? "scale-x-100" : ""
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Right Area Tools */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Button */}
            <button 
              onClick={onSearchToggle}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#C8A45D] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              title="Search Products"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#C8A45D] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-zinc-700" />
              ) : (
                <Sun className="h-5 w-5 text-zinc-200" />
              )}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={onWishlistToggle}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#C8A45D] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5 relative"
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={onCartToggle}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#C8A45D] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5 relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8A45D] text-black rounded-full text-[9px] flex items-center justify-center font-extrabold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Design My Space Button */}
            <button
              onClick={() => handleNavClick("ai-assistant")}
              className="ml-2 flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-tech tracking-[0.1em] uppercase text-zinc-900 bg-gradient-to-r from-[#E9DDC7] to-[#C8A45D] hover:from-[#C8A45D] hover:to-[#E9DDC7] shadow-md hover:shadow-lg transition-all duration-500 scale-95 hover:scale-100 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Design My Space</span>
            </button>
          </div>

          {/* Mobile Tool and Menu triggers */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Quick Cart */}
            <button 
              onClick={onCartToggle}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#C8A45D] relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8A45D] text-black rounded-full text-[9px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Toggle Theme on Mobile */}
            <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-300">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Quick Toggle Mobile Burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#C8A45D]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 border-t dark:border-zinc-800 border-amber-900/10 bg-[#FAF8F2] dark:bg-[#121212] py-4 px-6 shadow-2xl space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-4 rounded-lg text-sm tracking-wide transition-all ${
                    isActive 
                      ? "bg-[#C8A45D]/10 text-[#C8A45D] font-medium" 
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t dark:border-zinc-800 border-amber-900/10 flex flex-col space-y-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); onSearchToggle(); }}
              className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400 py-2 px-4"
            >
              <Search className="h-5 w-5" />
              <span className="text-sm">Search Catalog</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onWishlistToggle(); }}
              className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400 py-2 px-4"
            >
              <Heart className="h-5 w-5" />
              <span className="text-sm">Wishlist ({wishlistCount})</span>
            </button>
            
            <button
              onClick={() => handleNavClick("ai-assistant")}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full text-xs font-tech tracking-[0.15em] uppercase text-zinc-900 bg-gradient-to-r from-[#E9DDC7] to-[#C8A45D] shadow-md"
            >
              <Sparkles className="h-4 w-4" />
              <span>Design My Space</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
