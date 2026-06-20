import { useState, FormEvent } from "react";
import { 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300 dark:bg-[#121212] bg-[#FAF8F2]">
      {/* Upper Value-prop badges */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-start space-x-3.5 p-4 rounded-xl hover:bg-black/2 dark:hover:bg-white/2 transition-all">
          <Truck className="h-6 w-6 text-[#C8A45D] stroke-[1.5]" />
          <div>
            <span className="font-tech text-xs tracking-wider uppercase font-semibold text-zinc-900 dark:text-zinc-100">
              Premium Assembly
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Complimentary room assembly by our gilded glove experts.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3.5 p-4 rounded-xl hover:bg-black/2 dark:hover:bg-white/2 transition-all">
          <ShieldCheck className="h-6 w-6 text-[#C8A45D] stroke-[1.5]" />
          <div>
            <span className="font-tech text-xs tracking-wider uppercase font-semibold text-zinc-900 dark:text-zinc-100">
              10-Year Warranty
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Crafted with sustainably-sourced premium minerals and solid woods.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3.5 p-4 rounded-xl hover:bg-black/2 dark:hover:bg-white/2 transition-all">
          <RotateCcw className="h-6 w-6 text-[#C8A45D] stroke-[1.5]" />
          <div>
            <span className="font-tech text-xs tracking-wider uppercase font-semibold text-zinc-900 dark:text-zinc-100">
              30-Day Evaluation
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Enjoy your furniture stress-free. Easy returns if it misses your vibe.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3.5 p-4 rounded-xl hover:bg-black/2 dark:hover:bg-white/2 transition-all">
          <Sparkles className="h-6 w-6 text-[#C8A45D] stroke-[1.5]" />
          <div>
            <span className="font-tech text-xs tracking-wider uppercase font-semibold text-zinc-900 dark:text-zinc-100">
              AI Space Audit
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Review and score room compatibility before finalizing shipments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="font-display text-2xl tracking-[0.2em] font-medium text-zinc-900 dark:text-zinc-50">
              INTERIORS
            </span>
          </div>
          <p className="font-display italic text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            "Create Spaces That Speak Your Style."
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
            We fuse master Italian craftsmanship with local material sustainability and helpful, real-time generative AI context to eliminate furniture purchase guesswork.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] hover:border-[#C8A45D] transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] hover:border-[#C8A45D] transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] hover:border-[#C8A45D] transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Links: Shop & AI */}
        <div>
          <span className="font-tech text-xs tracking-[0.2em] uppercase font-bold text-zinc-950 dark:text-zinc-50">
            Navigation
          </span>
          <ul className="mt-6 space-y-3">
            <li>
              <button onClick={() => handleLinkClick("home")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Studio Home
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("shop")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Premium Catalog
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("room-ideas")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Inspiration Rooms
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("compare")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Smart Compare Table
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("ai-assistant")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                AI Space Designer
              </button>
            </li>
          </ul>
        </div>

        {/* Links: Offers & Support */}
        <div>
          <span className="font-tech text-xs tracking-[0.2em] uppercase font-bold text-zinc-950 dark:text-zinc-50">
            About & Club
          </span>
          <ul className="mt-6 space-y-3">
            <li>
              <button onClick={() => handleLinkClick("offers")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Curated Deals
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("about")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Technological Story
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("contact")} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8A45D] transition-colors">
                Connect Studio
              </button>
            </li>
            <li>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block cursor-default">
                Custom AR Portals (Soon)
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <span className="font-tech text-xs tracking-[0.2em] uppercase font-bold text-zinc-950 dark:text-zinc-50">
            Design Newsletter
          </span>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Register to join our private Design Circle and read exclusive space-planning journals.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 relative">
            <input
              type="email"
              placeholder="name@address.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs py-3 pl-4 pr-10 rounded-lg outline-none border focus:border-[#C8A45D] transition-colors dark:bg-[#1E1E1E] bg-[#FAF8F2] dark:border-zinc-800 border-zinc-200 text-zinc-900 dark:text-zinc-100"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-1 text-[#C8A45D] hover:text-zinc-900 dark:hover:text-amber-100 transition-colors cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-[10px] text-green-500 mt-2 font-medium">
              ✓ Splendid! Check your inbox for your 10% coupon: WELCOME10.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-zinc-500">
          &copy; 2026 Interiors Inc. All styling, dimensions, and descriptions are protected legally.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-[10px] text-zinc-400 hover:text-[#C8A45D] transition-colors">Shipping & Returns</a>
          <a href="#" className="text-[10px] text-zinc-400 hover:text-[#C8A45D] transition-colors">Privacy Charter</a>
          <a href="#" className="text-[10px] text-zinc-400 hover:text-[#C8A45D] transition-colors">Lifetime Warranty Spec</a>
        </div>
      </div>
    </footer>
  );
}
