import { useState, useEffect } from "react";
import { Sparkles, Clock, Copy, Check, Ticket, Flame, Info } from "lucide-react";
import { COUPONS } from "../data";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Dynamic countdown timers states
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 53
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown loop
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const offerCombos = [
    {
      id: "cmbo-1",
      title: "Royal Living Room Set",
      discount: "40% OFF",
      prevPrice: "₹1,20,500",
      currPrice: "₹72,300",
      includes: ["Aurelia Velvet Curve Sofa", "Travertine Arch Coffee Table"],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
      limitBadges: "Only 3 left in stock",
      isPopular: true
    },
    {
      id: "cmbo-2",
      title: "Executive Sovereign Workspace Set",
      discount: "25% OFF",
      prevPrice: "₹60,000",
      currPrice: "₹45,000",
      includes: ["Walnut Executive Cantilever Desk", "Asymmetrical Floating Bookshelf"],
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600",
      limitBadges: "Limited to 5 packages",
      isPopular: false
    },
    {
      id: "cmbo-3",
      title: "Aristocratic Master Sleep Set",
      discount: "30% OFF",
      prevPrice: "₹1,40,000",
      currPrice: "₹98,000",
      includes: ["Sovereign Tufted Velvet Bed", "Eclipse Brass Pendant Arch (x2)"],
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600",
      limitBadges: "Only 2 custom tuft setups left",
      isPopular: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 transition-colors duration-300 bg-[#FAF8F2] dark:bg-[#121212]">
      
      {/* Upper countdown timer hero banner */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-950 dark:bg-zinc-900 text-[#FAF8F2] border border-amber-900/10 dark:border-zinc-800 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Soft decorative background lights */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-[#C8A45D]/10 pointer-events-none" />

        <div className="space-y-4 relative z-10 text-left max-w-lg">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#C8A45D]/30 bg-[#C8A45D]/10 text-[#C8A45D]">
            <Flame className="h-4.5 w-4.5" />
            <span className="font-tech text-[9px] tracking-widest uppercase font-bold">Limited Festival Offers Session</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            Interiors <span className="italic font-medium">Design Club Sale</span>
          </h2>
          <p className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed">
            Acquire master-crafted Italian velvet couches, solid oak workspaces, and travertine coffee arches at absolute lowest price points.
          </p>
        </div>

        {/* Timers clock visual box */}
        <div className="relative z-10 flex flex-col items-center sm:items-end space-y-3.5 shrink-0">
          <span className="font-tech text-[9px] tracking-widest text-[#C8A45D] uppercase font-bold flex items-center gap-1.5">
            <Clock className="h-4 w-4 animate-spin-slow" />
            RESERVATIONS LOCK TIMER:
          </span>

          <div className="flex items-center space-x-2 text-center font-mono">
            <div className="bg-zinc-900 border border-zinc-800 p-3 px-4 rounded-xl">
              <span className="text-2xl sm:text-4xl font-bold block">{timeLeft.hours.toString().padStart(2, "0")}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Hrs</span>
            </div>
            <span className="text-2xl text-[#C8A45D]">:</span>
            <div className="bg-zinc-900 border border-zinc-800 p-3 px-4 rounded-xl">
              <span className="text-2xl sm:text-4xl font-bold block">{timeLeft.minutes.toString().padStart(2, "0")}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Mins</span>
            </div>
            <span className="text-2xl text-[#C8A45D]">:</span>
            <div className="bg-zinc-900 border border-zinc-800 p-3 px-4 rounded-xl">
              <span className="text-2xl sm:text-4xl font-bold block text-red-500">{timeLeft.seconds.toString().padStart(2, "0")}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest text-red-500">Secs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Room Combo Deals */}
      <div className="space-y-6 text-left">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="h-5 w-5 text-[#C8A45D]" />
          <h3 className="font-display text-2xl font-light text-zinc-905 dark:text-zinc-100">
            Smart Room <span className="italic font-medium">Combo Packages</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerCombos.map((cmbo) => (
            <div 
              key={cmbo.id}
              className="flex flex-col bg-white dark:bg-[#1E1E1E] rounded-2xl border dark:border-zinc-800 border-zinc-200/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
            >
              
              {/* Image banner look */}
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={cmbo.image} 
                  alt={cmbo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Left floating discount badge */}
                <span className="absolute top-4 left-4 bg-red-500 text-white font-tech text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg shadow">
                  {cmbo.discount}
                </span>

                {/* Popular Badge */}
                {cmbo.isPopular && (
                  <span className="absolute top-4 right-4 bg-[#C8A45D] text-zinc-950 font-tech text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg border border-yellow-300 shadow">
                    D CLUB HOT MATCH
                  </span>
                )}
              </div>

              {/* Text specifics details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <span className="block text-[8px] mt-1 text-red-500 font-tech tracking-widest uppercase font-bold">
                    🔥 {cmbo.limitBadges}
                  </span>
                  <h4 className="font-display text-lg text-zinc-900 dark:text-zinc-50 font-semibold line-clamp-1">
                    {cmbo.title}
                  </h4>
                  
                  {/* Combos list elements included */}
                  <div className="space-y-1 py-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                    <p className="font-semibold uppercase tracking-wider text-[8px] text-zinc-400">Includes:</p>
                    {cmbo.includes.map((inc, iIdx) => (
                      <p key={iIdx}>• {inc}</p>
                    ))}
                  </div>
                </div>

                {/* Price block */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="font-mono text-left">
                    <span className="text-[9px] text-zinc-400 line-through block">
                      {cmbo.prevPrice}
                    </span>
                    <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                      {cmbo.currPrice}
                    </span>
                  </div>

                  <span className="p-2 py-1 bg-[#C8A45D]/10 text-[#C8A45D] border border-[#C8A45D]/20 text-[9px] font-tech uppercase tracking-widest rounded">
                    Save Bundles
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Gilded Coupons Code copier row banner */}
      <div className="space-y-6 text-left pt-4">
        <h3 className="font-display text-2xl font-light text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Ticket className="h-5 w-5 text-[#C8A45D]" />
          Verified <span className="italic font-medium">Design Club Coupons</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div 
                key={coupon.code}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs font-sans relative"
              >
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center space-x-1.5">
                    <Ticket className="h-4 w-4 text-[#C8A45D]" />
                    <span className="font-mono font-bold tracking-widest text-[#C8A45D] text-sm">{coupon.code}</span>
                  </div>
                  <p className="text-[10px] text-zinc-650 dark:text-zinc-450 leading-relaxed max-w-[180px]">
                    {coupon.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className={`px-4 py-2 rounded-xl text-[9px] font-tech uppercase tracking-wider font-bold transition-all flex items-center space-x-1 cursor-pointer flex-shrink-0 ${
                    isCopied 
                      ? "bg-green-500 text-white" 
                      : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-[#C8A45D] hover:text-zinc-950"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
