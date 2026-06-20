import { useState, useMemo, FormEvent } from "react";
import { CartItem, Product, Coupon } from "../types";
import { PRODUCTS, COUPONS } from "../data";
import { 
  ShoppingBag, 
  Trash2, 
  Tag, 
  Calendar, 
  Truck, 
  Info, 
  Sparkle, 
  CheckCircle, 
  Eye, 
  Plus, 
  CreditCard,
  MapPin
} from "lucide-react";

interface CartCheckoutProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function CartCheckout({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onQuickView,
  onAddToCart
}: CartCheckoutProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  
  // Checkout flow state
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "confirmed">("cart");

  // Shipping details state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "Jenila Voonna",
    email: "jenilavoonna@gmail.com",
    phone: "+91 9876543210",
    street: "Staging Circle, Luxury St., Suite 4",
    city: "Mumbai",
    postalCode: "400001",
    deliveryDate: "2026-06-18"
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculation sums
  const orderSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const finalPrice = item.product.discountPrice || item.product.price;
      return acc + (finalPrice * item.quantity);
    }, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return (orderSubtotal * appliedCoupon.discountPercent) / 100;
  }, [appliedCoupon, orderSubtotal]);

  const deliveryFee = orderSubtotal > 50000 ? 0 : 2500;
  const orderTotal = orderSubtotal - discountAmount + deliveryFee;

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const matched = COUPONS.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());

    if (!matched) {
      setCouponError("Invalid promo code profile.");
      return;
    }

    if (matched.minSpend && orderSubtotal < matched.minSpend) {
      setCouponError(`This code requires an order spend above ₹${matched.minSpend.toLocaleString()}.`);
      return;
    }

    setAppliedCoupon(matched);
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("confirmed");
    }
  };

  const completeBookingPurchase = () => {
    setStep("confirmed");
    onClearCart();
  };

  // context-aware: "AI complete your room suggestions"
  // Scan which product IDs are currently inside the basket, find their categories.
  // Then suggest items from complementary categories that are NOT in the basket!
  const aiComplementaryAccessories = useMemo(() => {
    const activeCategoriesInCart = cartItems.map(item => item.product.category);
    const activeIdsInCart = cartItems.map(item => item.product.id);

    return PRODUCTS.filter(p => {
      // Recommend products NOT in the cart
      const notInCart = !activeIdsInCart.includes(p.id);
      
      // If we have "Living Room" items in the cart, recommend relevant table or lights!
      let recommendationScore = false;
      if (activeCategoriesInCart.includes("Living Room")) {
        recommendationScore = p.category === "Lighting" || p.category === "Wall Décor";
      } else if (activeCategoriesInCart.includes("Bedroom")) {
        recommendationScore = p.category === "Lighting" || p.category === "Workspace";
      } else {
        // Fallback
        recommendationScore = p.id === "lighting-1" || p.id === "decor-1";
      }

      return notInCart && recommendationScore;
    }).slice(0, 2);
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 transition-colors duration-300">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-tech text-[10px] tracking-widest text-[#C8A45D] bg-[#C8A45D]/10 px-3 py-1 rounded-full uppercase font-bold inline-block">
          SECURE TRANSACTIONS WORKSPACE
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 font-light">
          Your Staging <span className="italic font-medium">Baskets & Booking</span>
        </h2>
      </div>

      {/* Steps ribbon indicators */}
      <div className="flex items-center justify-center space-x-4 max-w-lg mx-auto border-b border-zinc-200 dark:border-zinc-800 pb-4 text-xs font-tech tracking-wider uppercase">
        <span className={`pb-1 ${step === "cart" ? "text-[#C8A45D] font-bold border-b border-[#C8A45D]" : "text-zinc-400"}`}>
          01. Staging Basket
        </span>
        <span className="text-zinc-300">→</span>
        <span className={`pb-1 ${step === "shipping" ? "text-[#C8A45D] font-bold border-b border-[#C8A45D]" : "text-zinc-400"}`}>
          02. Delivery Slots
        </span>
        <span className="text-zinc-300">→</span>
        <span className={`pb-1 ${step === "payment" ? "text-[#C8A45D] font-bold border-b border-[#C8A45D]" : "text-zinc-400"}`}>
          03. Secured Booking
        </span>
      </div>

      {/* Case 1: Empty state */}
      {cartItems.length === 0 && step !== "confirmed" && (
        <div className="py-20 text-center space-y-5 rounded-2xl border bg-white dark:bg-[#1E1E1E] max-w-2xl mx-auto dark:border-zinc-800/80">
          <ShoppingBag className="h-10 w-10 text-zinc-300 mx-auto animate-pulse" />
          <div>
            <h3 className="font-display italic text-lg text-zinc-900 dark:text-zinc-100">
              Your staging basket is currently empty
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-2 font-light leading-relaxed">
              Scan our luxury catalog, customize your material colors, or summon the digital assistant to match setup packages.
            </p>
          </div>
        </div>
      )}

      {/* Case 2: Confirmed Staging Screen */}
      {step === "confirmed" && (
        <div className="py-16 text-center space-y-6 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-green-500/30 max-w-2xl mx-auto shadow-2xl fade-in-section text-left p-6 sm:p-12 relative overflow-hidden">
          {/* Confirmed Background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-3.5 mb-8">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="h-8 w-8 text-[#C8A45D]" />
            </div>
            <h3 className="font-display text-3xl font-medium tracking-wide text-zinc-900 dark:text-zinc-50">
              Staging Booking <span className="italic">Authorized!</span>
            </h3>
            <p className="font-tech text-[10px] tracking-widest text-[#C8A45D] uppercase font-bold">
              CONGRATULATIONS, CLUB MEMBER
            </p>
          </div>

          <div className="border-t border-b border-zinc-100 dark:border-zinc-800 py-6 space-y-4 text-xs font-sans">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-400 block pb-1 font-tech text-[9px] uppercase tracking-widest">Delivery Client</span>
                <strong className="text-zinc-800 dark:text-zinc-200">{shippingAddress.fullName}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block pb-1 font-tech text-[9px] uppercase tracking-widest">Client Contact</span>
                <strong className="text-zinc-800 dark:text-zinc-200">{shippingAddress.email}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-400 block pb-1 font-tech text-[9px] uppercase tracking-widest">Gilded Assembly Slot</span>
                <strong className="text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#C8A45D]" />
                  {shippingAddress.deliveryDate} (Confirmed)
                </strong>
              </div>
              <div>
                <span className="text-zinc-400 block pb-1 font-tech text-[9px] uppercase tracking-widest">Glove Service Status</span>
                <strong className="text-green-500">Scheduled Packing</strong>
              </div>
            </div>

            <div>
              <span className="text-zinc-400 block pb-1 font-tech text-[9px] uppercase tracking-widest">Destination Staging Address</span>
              <p className="text-zinc-700 dark:text-zinc-350 leading-relaxed font-light">
                {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.postalCode}
              </p>
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed text-center pt-2 max-w-sm mx-auto font-light">
            Our interior team has reserved this limited item and will reach out shortly for pre-assembly spacing parameters confirmation.
          </p>

          <div className="pt-6 text-center">
            <button
              onClick={() => setStep("cart")}
              className="px-8 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full font-tech text-xs tracking-wider uppercase font-bold"
            >
              Reopen Staging Lab
            </button>
          </div>
        </div>
      )}

      {/* Case 3: Layout content active Cart */}
      {cartItems.length > 0 && step !== "confirmed" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Items list or fields forms depending on standard Step */}
          <div className="lg:col-span-8 space-y-6">
            
            {step === "cart" && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-[#1E1E1E] border dark:border-zinc-800 border-zinc-200/50 p-4 rounded-xl flex items-center justify-between">
                  <span className="font-tech text-[10px] tracking-widest uppercase font-bold text-zinc-900 dark:text-zinc-50">
                    Staged item outlines ({cartItems.length})
                  </span>
                  <button 
                    onClick={onClearCart}
                    className="text-[10px] text-zinc-400 hover:text-white"
                  >
                    Clear Slate
                  </button>
                </div>

                <div className="space-y-3.5">
                  {cartItems.map((item) => {
                    const price = item.product.discountPrice || item.product.price;
                    return (
                      <div 
                        key={item.product.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-[#1E1E1E] border border-zinc-200/50 dark:border-zinc-805/50 rounded-2xl gap-4 text-left"
                      >
                        <div className="flex items-center space-x-4 min-w-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[8px] font-tech text-[#C8A45D] uppercase tracking-widest block font-bold leading-none mb-1">
                              {item.product.category}
                            </span>
                            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                              {item.product.name}
                            </h4>
                            
                            {/* Selected custom accent color profile */}
                            {item.selectedColor && (
                              <div className="flex items-center space-x-1.5 mt-1">
                                <span className="w-2.5 h-2.5 rounded-full border border-zinc-200" style={{ backgroundColor: item.selectedColor.hex }} />
                                <span className="text-[8px] text-zinc-400 font-tech">{item.selectedColor.name}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0">
                          
                          {/* Increment limits controllers */}
                          <div className="flex items-center space-x-1 border dark:border-zinc-800 border-zinc-200 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 text-zinc-450 hover:text-zinc-900 dark:hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-1 text-zinc-900 dark:text-zinc-50">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-zinc-455 hover:text-zinc-900 dark:hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <p className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-50">
                              ₹{(price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === "shipping" && (
              <form onSubmit={handleCheckoutSubmit} className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border dark:border-zinc-800 border-zinc-200/50 space-y-6 text-left shadow-lg">
                <h4 className="font-display text-lg italic text-zinc-905 dark:text-zinc-50 border-b dark:border-zinc-800 border-zinc-100 pb-3">
                  Gilded Assembly Address & Slot schedule:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  
                  <div className="space-y-1">
                    <label className="text-zinc-400 text-[10px] uppercase font-tech tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-55"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 text-[10px] uppercase font-tech tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-55"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 text-[10px] uppercase font-tech tracking-wider">Street Address</label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-55"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 text-[10px] uppercase font-tech tracking-wider">Postal Pin-Code</label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-55"
                      required
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-zinc-400 text-[10px] uppercase font-tech tracking-wider flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#C8A45D]" />
                      Assemble Date Scheduling Slot
                    </label>
                    <input
                      type="date"
                      value={shippingAddress.deliveryDate}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, deliveryDate: e.target.value })}
                      className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-55 cursor-pointer font-mono"
                      required
                    />
                  </div>

                </div>

                <div className="pt-4 border-t dark:border-zinc-800 border-zinc-100 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setStep("cart")}
                    className="px-6 py-2.5 rounded-lg border text-zinc-500 border-zinc-200 dark:border-zinc-800"
                  >
                    Back to Basket
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-[#C8A45D] hover:text-zinc-950 font-tech uppercase text-xs font-semibold tracking-wider rounded-lg"
                  >
                    Schedule Address
                  </button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border dark:border-zinc-800 border-zinc-200/50 space-y-6 text-left shadow-lg fade-in-section">
                <h4 className="font-display text-lg italic text-zinc-905 dark:text-zinc-50 border-b dark:border-zinc-800 border-zinc-100 pb-3">
                  Secure Gilded Token Gate:
                </h4>

                <div className="space-y-4">
                  <div className="p-4 border dark:border-zinc-805 border-zinc-250/50 rounded-xl flex items-center space-x-3.5 bg-zinc-50 dark:bg-zinc-950">
                    <CreditCard className="h-5 w-5 text-[#C8A45D]" />
                    <div className="flex-1 text-xs">
                      <span className="font-tech text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase block">
                        Credit / Debit Cards Gate
                      </span>
                      <p className="text-[10px] text-zinc-400">Secure end-to-end sandbox. Authorized via AI-Club token.</p>
                    </div>
                    <span className="w-4 h-4 rounded-full border border-[#C8A45D] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />
                    </span>
                  </div>

                  <p className="text-[10px] text-zinc-450 italic leading-relaxed">
                    * Interiors uses sandboxed testing channels. You will not be charged. All bookings bypass mock requirements seamlessly.
                  </p>
                </div>

                <div className="pt-4 border-t dark:border-zinc-800 border-zinc-100 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="px-6 py-2.5 rounded-lg border text-zinc-500 border-zinc-200 dark:border-zinc-805"
                  >
                    Back to Slots
                  </button>
                  <button 
                    onClick={completeBookingPurchase}
                    className="px-8 py-2.5 bg-[#C8A45D] hover:bg-zinc-950 hover:text-white text-zinc-950 font-tech uppercase text-xs font-bold tracking-widest rounded-lg shadow-lg"
                  >
                    Verify & Book Look
                  </button>
                </div>
              </div>
            )}

            {/* AI COMPLETE THE ROOM CONTAINER PANEL (ONLY on Cart step) */}
            {step === "cart" && aiComplementaryAccessories.length > 0 && (
              <div className="p-6 rounded-2xl dark:bg-zinc-950/60 bg-amber-500/5 border border-dashed border-[#C8A45D]/40 space-y-4 text-left">
                <div className="flex items-center space-x-2">
                  <Sparkle className="h-5 w-5 text-[#C8A45D]" />
                  <h4 className="font-display italic text-lg text-zinc-900 dark:text-zinc-50">
                    AI Suggestion: Items that complete your room
                  </h4>
                </div>
                
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  Our spatial compliance algorithm suggests adding these coordinating accessories to elevate your current room set harmony:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiComplementaryAccessories.map((p) => (
                    <div 
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 gap-3"
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <img src={p.image} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <h5 className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {p.name}
                          </h5>
                          <p className="text-[10px] text-[#C8A45D] font-mono mt-0.5">
                            ₹{p.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-1.5 flex-shrink-0">
                        <button
                          onClick={() => onQuickView(p)}
                          className="p-1 px-2 rounded border border-zinc-200 dark:border-zinc-800 text-[9px] hover:text-[#C8A45D] hover:border-[#C8A45D] text-zinc-450"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => {
                            onAddToCart(p);
                            alert(`Brought ${p.name} inside the staging basket.`);
                          }}
                          className="p-1 p-1.5 rounded bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white text-[9px]"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Price summary & Checkout triggers */}
          <div className="lg:col-span-4">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-zinc-200/50 dark:border-zinc-805 space-y-6 text-left shadow-lg">
              <h4 className="font-tech text-xs tracking-widest uppercase font-bold text-zinc-905 dark:text-zinc-100 border-b dark:border-zinc-800 border-zinc-100 pb-3">
                Calculated Staging Fee:
              </h4>

              <div className="space-y-3.5 text-xs font-sans">
                <div className="flex justify-between text-zinc-500">
                  <span>Outlined Subtotal</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">
                    ₹{orderSubtotal.toLocaleString()}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-500">
                    <span>Coupon Save ({appliedCoupon.code} -{appliedCoupon.discountPercent}%)</span>
                    <span className="font-mono">
                      -₹{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-500">
                  <span>Assembly Shipping Glove Fee</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">
                    {deliveryFee === 0 ? "Complimentary" : `₹${deliveryFee.toLocaleString()}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[8px] text-zinc-450 italic">
                    * Tip: Unlock complimentary glove-assembly shipping above spendings of ₹50,000.
                  </p>
                )}

                <div className="flex justify-between text-base font-bold text-zinc-950 dark:text-zinc-50 border-t dark:border-zinc-800 border-zinc-200/70 pt-3.5">
                  <span>Staging Total</span>
                  <span className="font-mono text-[#C8A45D]">
                    ₹{orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Coupon validator Form */}
              {step === "cart" && (
                <div className="pt-2">
                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Club coupon: WELCOME10..."
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 py-2.5 px-3 rounded-lg border outline-none focus:border-[#C8A45D] dark:bg-zinc-950 dark:border-zinc-805 text-zinc-900 dark:text-zinc-105 uppercase"
                      />
                      <button
                        type="submit"
                        className="py-2.5 px-4 bg-zinc-900 text-zinc-50 hover:bg-[#C8A45D] hover:text-zinc-950 uppercase font-tech text-[10px] tracking-wider rounded-lg border dark:border-zinc-850 cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-dashed border-green-500/40 bg-green-500/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-green-500 font-bold block">{appliedCoupon.code}</span>
                        <p className="text-[9px] text-zinc-400 mt-0.5 leading-none">{appliedCoupon.description}</p>
                      </div>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-[10px] text-red-500 underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[9px] text-red-400 mt-1.5 font-sans leading-none">{couponError}</p>
                  )}
                </div>
              )}

              {/* Big primary navigation CTA button depending on standard step */}
              {step === "cart" && (
                <button
                  onClick={() => setStep("shipping")}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-zinc-950 dark:bg-white text-[#FAF8F2] dark:text-zinc-950 hover:bg-[#C8A45D] hover:text-zinc-950 transition-colors uppercase font-tech font-bold text-xs tracking-widest rounded-xl shadow-xl cursor-pointer"
                >
                  <Truck className="h-4.5 w-4.5" />
                  <span>Configure Delivery Slots</span>
                </button>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
