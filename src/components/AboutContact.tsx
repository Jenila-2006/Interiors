import { useState, FormEvent } from "react";
import { 
  Sparkles, 
  Layers, 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Compass, 
  ShieldAlert 
} from "lucide-react";

export default function AboutContact() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  
  // Form submission state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      setFormSubmitted(true);
      setFormState({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const faqItems = [
    {
      q: "How does the AI Companion score spatial furniture compatibility?",
      a: "Our staging algorithm is powered by Google Gemini AI, analyzing primary styles, geometric contours, dimensions profiles, and hex color values of the selected items. It compiles these attributes alongside master Italian staging theory checklists to yield an objective, compatibility match ratio."
    },
    {
      q: "Do you assemble the furniture inside my home?",
      a: "Indeed. Every purchase includes our complimentary glove-assembly white glove shipping. Our professional staging curators will carry, unbox, and assemble each piece inside your designated room, ensuring pristine placement without packaging waste."
    },
    {
      q: "What is your warranty and evaluation policy?",
      a: "Interiors stands for legacy quality. We assign a robust 10-Year structural warranty on premium solid ash timber joints, obsidian marble plates, and titanium elements. Additionally, enjoy a 30-Day home evaluation window to verify that your selected furniture fully matches your space's ambiance."
    },
    {
      q: "Can I customized velvet textures or custom dimensions?",
      a: "Yes. Reach out directly to our design concierge team using the form below. We coordinate bespoke colorways and precise dimension adjustments with our studios in Basque and Milan."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16 transition-colors duration-300 bg-[#FAF8F2] dark:bg-[#121212]">
      
      {/* 1. ABOUT SECTION: Redefining Home Design With Technology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left visuals and metrics card */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=700" 
              alt="Design laboratory blueprint"
              className="w-full h-[380px] object-cover"
            />
            {/* Absolute matrix stats box overlay */}
            <div className="absolute top-6 left-6 p-4 backdrop-blur-md bg-zinc-950/80 border border-zinc-800 rounded-2xl max-w-xs text-left text-white">
              <Compass className="h-6 w-6 text-[#C8A45D] mb-1.5" />
              <span className="font-tech text-[10px] font-bold tracking-widest uppercase text-[#C8A45D] block">
                Sustainable Staging Origin
              </span>
              <p className="text-[10px] text-zinc-350 font-light mt-1">
                100% of our oak and cedar timber is sourced from FSC-certified eco forests in Central Europe.
              </p>
            </div>
          </div>
        </div>

        {/* Right text layout */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-amber-900/10 dark:border-zinc-800 bg-[#C8A45D]/10 text-[#C8A45D] font-tech text-[10px] tracking-widest uppercase">
            <Sparkles className="h-4 w-4" />
            <span>Redefining Space Staging</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
            Redefining Home Design <span className="italic font-semibold">With Technology</span>
          </h2>
          
          <p className="text-xs text-zinc-650 dark:text-zinc-400 font-light leading-relaxed">
            Interiors was established to bring clarity and ease to the furniture shopping process. By combining luxurious European craftsmanship with generative spatial computing algorithms, we eliminate the classical worries of scale miscalculation, texture clashes, and visual fatigue.
          </p>

          <div className="p-5 rounded-2xl dark:bg-zinc-900 bg-amber-500/5 border border-[#C8A45D]/20 space-y-1">
            <span className="font-tech text-[10px] font-bold tracking-widest text-[#C8A45D] uppercase">
              Brand Mission Manifesto
            </span>
            <p className="font-display italic text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
              "Making beautiful and intelligent interiors accessible to everyone."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="font-tech text-[10px] tracking-wider uppercase font-bold text-zinc-900 dark:text-zinc-100 pb-1 block">
                ✓ Curated Material Promise
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Aniline wax saddle leathers, Basque Country Calacatta gold marble plates, and premium Milanese velvets.
              </p>
            </div>
            <div>
              <span className="font-tech text-[10px] tracking-wider uppercase font-bold text-zinc-900 dark:text-zinc-100 pb-1 block">
                ✓ AI Geometric Calibration
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Ensure perfect balance of heights, base surface area bounds, and color spectrum before securing shipping slots.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS Accordion */}
      <div className="space-y-6 max-w-4xl mx-auto text-left">
        <h3 className="font-display text-2xl font-light text-zinc-900 dark:text-zinc-50 text-center">
          Frequently Asked <span className="italic font-medium">Design Questions</span>
        </h3>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpened = activeFaqIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border dark:border-zinc-800 border-zinc-200/60 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaqIdx(isOpened ? null : idx)}
                  className="w-full py-4.5 px-5 flex items-center justify-between text-left font-sans text-xs font-semibold text-zinc-900 dark:text-zinc-200 hover:text-[#C8A45D] dark:hover:text-[#C8A45D] transition-colors cursor-pointer"
                >
                  <span>Q. {item.q}</span>
                  {isOpened ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {isOpened && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed border-t dark:border-zinc-850 border-zinc-50 p-2 text-left bg-zinc-50/50 dark:bg-zinc-950/20">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT FORM & INFO CARDS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info & Simulated map Column */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1E1E] border dark:border-zinc-800 border-zinc-200/50 space-y-6">
            <h4 className="font-tech text-xs tracking-widest font-bold uppercase text-zinc-900 dark:text-zinc-100">
              Technical Studio Info
            </h4>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-4.5 w-4.5 text-[#C8A45D] mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Main Studio HQ</span>
                  <p className="text-zinc-80D dark:text-zinc-200 font-light mt-0.5">
                    Staging Circle, Luxury St., Suite 4, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="h-4.5 w-4.5 text-[#C8A45D] mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Design Concierge email</span>
                  <p className="text-zinc-800 dark:text-zinc-200 font-light mt-0.5">
                    support@interiors.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="h-4.5 w-4.5 text-[#C8A45D] mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Hotline Services</span>
                  <p className="text-zinc-805 dark:text-zinc-210 font-light mt-0.5">
                    +91 9876543210 (Mon - Sat, 10 AM - 7 PM)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Simulated Google Map dark/light vector frame */}
          <div className="rounded-2xl overflow-hidden border border-zinc-205 dark:border-zinc-800 h-52 relative bg-zinc-950 flex items-center justify-center p-4">
            <div className="text-center space-y-2 text-zinc-200 z-10 p-4 bg-zinc-950/85 backdrop-blur rounded-xl shadow">
              <MapPin className="h-6 w-6 text-red-500 mx-auto" />
              <span className="font-tech text-[9px] tracking-widest uppercase block font-bold">HQ Staging Location</span>
              <p className="text-[9px] text-zinc-400 leading-tight">Clicking loads live satellite coordinates.</p>
            </div>
            {/* Visual map texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#C8A45D_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          </div>
        </div>

        {/* Interactive Contacts Inputs form Column */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1E1E1E] border dark:border-zinc-800 border-zinc-200/50 shadow-lg text-left space-y-6">
          <div>
            <h4 className="font-display text-xl text-zinc-900 dark:text-zinc-100 font-medium italic">
              Dispatch Concierge Query:
            </h4>
            <p className="text-xs text-zinc-500 font-light mt-1.5 leading-none">
              Reach back within 3-4 commercial hours. Guaranteed master designer answers.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jenila Voonna"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Email Address</label>
                <input
                  type="email"
                  placeholder="name@address.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  required
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Phone Mobile (Optional)</label>
                <input
                  type="tel"
                  placeholder="Mobile digits"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">Dimensions Outline or Main Message</label>
                <textarea
                  rows={4}
                  placeholder="Provide sizing metrics or questions about our luxury sets..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full p-3 border dark:border-zinc-800 border-zinc-200 rounded-lg outline-none focus:border-[#C8A45D] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-[#C8A45D] hover:text-zinc-950 font-tech text-xs uppercase tracking-widest font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Submit Concierge Query</span>
            </button>

            {formSubmitted && (
              <p className="flex items-center justify-center space-x-1.5 text-green-500 font-semibold pt-1">
                <CheckCircle className="h-4.5 w-4.5 text-green-500" />
                <span>✓ Splendid. Your concierge dispatch was logged successfully.</span>
              </p>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
