import { useState } from "react";
import { Product } from "../types";
import { 
  Heart, 
  ShoppingBag, 
  Sliders, 
  ExternalLink,
  QrCode,
  Smartphone,
  Star,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Play,
  RotateCw
} from "lucide-react";
import { PRODUCTS } from "../data";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, color?: { name: string; hex: string }) => void;
  onAddToWishlist: (product: Product) => void;
  onClose: () => void;
  onAskAi: (promptText: string) => void;
  wishlistIds: string[];
}

export default function ProductDetails({
  product,
  onAddToCart,
  onAddToWishlist,
  onClose,
  onAskAi,
  wishlistIds
}: ProductDetailsProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "manifesto">("specs");
  
  // Interactive 360° View simulation state
  const [degreeView, setDegreeView] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  // AR overlay state
  const [arOpen, setArOpen] = useState(false);

  const inWishlist = wishlistIds.includes(product.id);
  const currentSelColor = product.colors[0];

  const handleRotation = () => {
    setRotationDegree((prev) => (prev + 90) % 360);
  };

  const arInstructionQuestions = [
    `Will this ${product.name} suit a small 12x10ft contemporary lounge?`,
    `What curtain colors go best with this ${product.colors[0].name} texture?`,
    `Provide a matching bedroom layout featuring this item under ₹1,20,000.`
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F2] dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden transition-colors max-h-[90vh] flex flex-col">
        
        {/* Main Header navigation */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-805 flex items-center justify-between text-zinc-900 dark:text-zinc-100 flex-shrink-0">
          <span className="font-tech text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
            Catalog ID: {product.id}
          </span>
          <button 
            onClick={onClose}
            className="p-2 text-xs font-semibold uppercase tracking-wider hover:text-[#C8A45D] cursor-pointer"
          >
            ← Close Spec Sheet
          </button>
        </div>

        {/* Scrollable details view */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Photo & 360 & AR Column */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Photo container */}
              <div 
                className="rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 border-zinc-200 h-96 relative flex items-center justify-center"
              >
                {!degreeView ? (
                  <img
                    src={product.images[activeImgIdx] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="text-center space-y-4 relative w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-900 text-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ transform: `rotate(${rotationDegree}deg)` }}
                      className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-xl transition-transform duration-500 brightness-110"
                    />
                    <div className="space-y-1 z-10 bg-zinc-950/70 p-3 rounded-xl backdrop-blur-md">
                      <span className="font-tech text-[10px] tracking-widest uppercase text-[#C8A45D] block">
                        Interactive 360° Orbit Simulation
                      </span>
                      <p className="text-[10px] text-zinc-400 font-light">
                        Rotating angle: <strong>{rotationDegree}°</strong>
                      </p>
                    </div>
                    <button
                      onClick={handleRotation}
                      className="absolute right-4 bottom-4 p-2.5 rounded-full bg-[#C8A45D] text-zinc-950 shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center space-x-1 cursor-pointer"
                    >
                      <RotateCw className="h-4 w-4" />
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider pr-1">Rotate</span>
                    </button>
                  </div>
                )}

                {/* Badge layout */}
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded bg-black/75 backdrop-blur-sm text-[9px] font-tech text-[#C8A45D] uppercase tracking-widest">
                  {product.style} / {product.material}
                </span>

                {/* Live AR overlay activator */}
                <button
                  onClick={() => setArOpen(true)}
                  className="absolute bottom-4 right-4 bg-zinc-950/80 hover:bg-[#C8A45D] text-white hover:text-zinc-950 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors text-[9px] font-tech uppercase tracking-widest border border-zinc-800 shadow"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>AR Room Preview</span>
                </button>
              </div>

              {/* Sub Thumbnail indicators list */}
              <div className="flex items-center space-x-2">
                {product.images.map((img, idx) => {
                  const isSel = idx === activeImgIdx && !degreeView;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImgIdx(idx);
                        setDegreeView(false);
                      }}
                      className={`w-16 h-16 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        isSel ? "border-[#C8A45D] ring-2 ring-[#C8A45D]/20" : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  );
                })}

                {/* 360 Toggle Thumbnail */}
                <button
                  onClick={() => setDegreeView(!degreeView)}
                  className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center transition-all bg-zinc-950 text-[#C8A45D] cursor-pointer ${
                    degreeView ? "border-[#C8A45D] ring-2 ring-[#C8A45D]/20" : "border-zinc-805"
                  }`}
                >
                  <RotateCw className="h-5 w-5" />
                  <span className="text-[8px] uppercase tracking-wider font-tech mt-1">360° Orbit</span>
                </button>
              </div>

            </div>

            {/* Right Specifications & Actions Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="h-4.5 w-4.5 fill-[#C8A45D] text-[#C8A45D]" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{product.rating}</span>
                  <span className="text-zinc-400 text-xs">({product.reviewsCount} staging audits)</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 font-medium">
                  {product.name}
                </h1>
                
                {/* Product spec price and dimensions */}
                <div className="flex items-center space-x-2 font-mono text-lg pt-1">
                  {product.discountPrice ? (
                    <>
                      <span className="text-zinc-900 dark:text-zinc-50 font-bold">
                        ₹{product.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-zinc-400 line-through">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-500 font-semibold">
                        ({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% Match discount)
                      </span>
                    </>
                  ) : (
                    <span className="text-zinc-900 dark:text-zinc-50 font-bold">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Description text */}
              <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Action Buttons to Cart & Wishlist */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(product, currentSelColor)}
                  className="flex-1 flex items-center justify-center space-x-2.5 py-4 px-6 rounded-xl font-tech text-xs uppercase tracking-widest text-white bg-zinc-950 dark:bg-[#FAF8F2] dark:text-zinc-950 hover:bg-[#C8A45D] hover:text-zinc-950 transition-colors shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Secure Booking Look</span>
                </button>

                <button
                  onClick={() => onAddToWishlist(product)}
                  className={`py-4 px-6 rounded-xl border flex items-center justify-center font-tech text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    inWishlist 
                      ? "border-red-400 text-red-500 bg-red-500/5 hover:bg-transparent hover:text-zinc-550" 
                      : "border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#C8A45D]"
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`h-4.5 w-4.5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Informative Specs Tables Tabs */}
              <div className="space-y-3 pt-2">
                <div className="flex space-x-4 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
                  {(["specs", "manifesto"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs tracking-wider uppercase font-tech cursor-pointer transition-colors ${
                        activeTab === tab 
                          ? "text-[#C8A45D] font-bold" 
                          : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      }`}
                    >
                      {tab === "specs" ? "Material Specs" : "Creator Story"}
                    </button>
                  ))}
                </div>

                {activeTab === "specs" && (
                  <div className="space-y-2 text-xs py-1.5">
                    <div className="flex justify-between pb-1.5 border-b dark:border-zinc-900 border-zinc-200/40">
                      <span className="text-zinc-405">Staging Style Profile</span>
                      <strong className="text-zinc-800 dark:text-zinc-300 font-semibold">{product.style} Design</strong>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b dark:border-zinc-900 border-zinc-200/40">
                      <span className="text-zinc-405">Base Core Structure</span>
                      <strong className="text-zinc-800 dark:text-zinc-300 font-semibold">{product.material}</strong>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b dark:border-zinc-900 border-zinc-200/40">
                      <span className="text-zinc-405">Spatial Outline Boundaries</span>
                      <strong className="text-zinc-800 dark:text-zinc-300 font-semibold">
                        {product.dimensions.width}W x {product.dimensions.height}H x {product.dimensions.depth}D {product.dimensions.unit}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-405">Current Availability</span>
                      <strong className="text-green-500 font-semibold">{product.availability}</strong>
                    </div>
                  </div>
                )}

                {activeTab === "manifesto" && (
                  <p className="text-[11px] text-zinc-550 dark:text-zinc-400 leading-relaxed font-light italic">
                    {product.story || "Each item in our catalog represents a profound dialogue of mid-century geometry and sustainable resource cycles. Individually certified by our Milanese master staging craftspeople."}
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* AI-Assistant Compliance Audit Container Block */}
          {/* Will this match my room? questions triggers */}
          <div className="p-6 rounded-2xl dark:bg-zinc-950 bg-white border border-dashed border-[#C8A45D]/40 space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4.5 w-4.5 text-[#C8A45D]" />
              <h3 className="font-display italic text-lg text-zinc-900 dark:text-zinc-50">
                Will this match my room? — ask Interiors AI
              </h3>
            </div>
            
            <p className="text-[11px] text-zinc-500 font-light">
              Click a design compliance prompt below to feed it directly to our live AI space analyzer, rendering a custom matching response!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {arInstructionQuestions.map((q, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => onAskAi(q)}
                  className="p-3 bg-[#FAF8F2] dark:bg-zinc-900 border hover:border-[#C8A45D] dark:border-zinc-805 rounded-xl text-[10px] text-zinc-700 dark:text-zinc-300 hover:bg-[#C8A45D]/10 hover:text-[#C8A45D] transition-all text-left truncate cursor-pointer"
                  title="Ask assistant this question"
                >
                  📄 {q}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Live AR Scanning Camera Sandbox Simulation Overlay Modal */}
        {arOpen && (
          <div className="fixed inset-0 z-55 overflow-y-auto bg-black/90 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-sm flex flex-col overflow-hidden relative">
              
              {/* Smartphone mock camera area */}
              <div className="h-[480px] bg-zinc-950 relative flex flex-col items-center justify-center text-zinc-200">
                
                {/* Pulsing overlay circle scanned boundary */}
                <div className="absolute inset-8 rounded-2xl border-2 border-dashed border-[#C8A45D]/50 animate-pulse flex items-center justify-center">
                  <div className="text-center p-4 space-y-3.5 z-10 bg-zinc-950/80 rounded-2xl backdrop-blur">
                    <QrCode className="h-10 w-10 text-[#C8A45D] mx-auto opacity-75" />
                    <div>
                      <span className="font-tech text-xs tracking-wider uppercase text-[#C8A45D] block">
                        AR Scanning Active
                      </span>
                      <p className="text-[10px] text-zinc-400 font-light mt-1 max-w-[180px] mx-auto">
                        Stage <strong>{product.name}</strong> on your home's real layout floor instantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Backing image of product in room floated */}
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover opacity-35" 
                />

                {/* Simulated AR scanner progress line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#C8A45D] shadow-[0_0_15px_#C8A45D] animate-bounce" />

              </div>

              {/* Control bottom area */}
              <div className="p-5 bg-zinc-900 text-center space-y-3 border-t border-zinc-800">
                <span className="font-tech text-[9px] tracking-widest text-[#C8A45D] uppercase block">
                  📷 CAMERA PORTAL CONNECTED
                </span>
                <button
                  onClick={() => setArOpen(false)}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] uppercase font-tech tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Disconnect Lens Camera
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
