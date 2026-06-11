import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, Sparkles, ShieldCheck, Heart, ArrowRight, Calculator, 
  Landmark, TrendingUp, Users, HelpCircle, Eye, Zap, MessageSquare 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function Sellers() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Valuation estimate state simulator
  const [valCity, setValCity] = useState("Mumbai");
  const [valSize, setValSize] = useState(1200);
  const [valCategory, setValCategory] = useState("apartment");
  const [valAge, setValAge] = useState(2);
  const [valResult, setValResult] = useState<number | null>(null);
  const [valCalculating, setValCalculating] = useState(false);

  const stats = [
    { value: "24 Days", label: "Average Time-to-Sell Listing", color: "text-[#1D4ED8]" },
    { value: "₹85,000", label: "Average Brokerage Saved per Sale", color: "text-emerald-600" },
    { value: "18K+", label: "Verified Active Sellers Registered", color: "text-sky-500" },
    { value: "₹1,200 Cr+", label: "Total Asset Value Listed on Platform", color: "text-amber-500" }
  ];

  const benefits = [
    { icon: ShieldCheck, title: "0% Brokerage Policy", desc: "List and close sales completely free. Keep 100% of your equity." },
    { icon: Sparkles, title: "AI Pricing Valuation", desc: "Get real-time index estimates based on suburb historical registry databases." },
    { icon: Eye, title: "Virtual Media Boost", desc: "Access verified drone coverage and 360 tour packages to attract high-intent leads." },
    { icon: Users, title: "Qualified Buyer Network", desc: "Direct matching algorithms that link your posting with pre-approved buyers." }
  ];

  const steps = [
    { step: "01", title: "List Your Property", desc: "Enter specs, carpets, and upload initial images. Submission takes under 5 minutes." },
    { step: "02", title: "Pass Moderation Queue", desc: "eStatery administrators verify PAN and title deeds to assign the Verified badge." },
    { step: "03", title: "Exempt Broker Chats", desc: "Respond directly to buyer leads and coordinate calendar tours in your inbox." },
    { step: "04", title: "Apply E-Sign & Close", desc: "Sign digital sales deeds and draft escrow transfers with secure E-signing." }
  ];

  const reviews = [
    { quote: "Listing our villa in Whitefield Bangalore took 4 minutes. We received 12 buyer inquiries, scheduled 3 visits, and closed the sale in 18 days at zero brokerage.", author: "Rajesh & Meera Kumar", role: "Seller, Bangalore" },
    { quote: "The AI valuation index predicted ₹1.45Cr, which was exactly the closing offer. Highly recommended for avoiding broker undercutting.", author: "Harish Rao", role: "Property Owner, Hyderabad" }
  ];

  const faqs = [
    { q: "How much does it cost to list on eStatery?", a: "Listing a property is 100% free. eStatery operates on a zero-brokerage direct model. Premium features (like map highlighting or custom drone footage packages) are optional." },
    { q: "How are buyer leads verified?", a: "Every buyer must verify their phone number via OTP and submit basic bank eligibility details before initiating chats or visit requests." },
    { q: "What documents are required to post?", a: "While posting requires basic specs, receiving the 'Verified Badge' requires uploading a RERA code, PAN card, or property tax certificate." }
  ];

  const estimateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    if (valSize <= 0) {
      toast.error("Please enter a valid area size.");
      return;
    }
    setValCalculating(true);
    setTimeout(() => {
      const baseRates: Record<string, number> = { Mumbai: 19500, Bangalore: 12500, Gurgaon: 15500, Hyderabad: 10200 };
      const multipliers: Record<string, number> = { apartment: 1.0, villa: 1.35, penthouse: 1.5 };
      const ageFactors = valAge > 5 ? 0.88 : 1.0;
      
      const rate = (baseRates[valCity] || 10000) * (multipliers[valCategory] || 1.0) * ageFactors;
      setValResult(Math.round(valSize * rate));
      setValCalculating(false);
      toast.success("AI Valuation Estimate generated!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Sellers Hero */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              For Sellers
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Sell Your Home Faster with <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Zero Brokerage</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium">
              List your property, calculate direct AI valuations, receive pre-approved buyer inquiries, and coordinate secure visits directly.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/post-property" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo font-bold text-white text-xs hover:shadow-glow transition-all">
                Post Property FREE
              </Link>
            </div>
          </div>
        </div>

        {/* Lead Generation Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
            <div className="space-y-3 flex-1">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-[10px] font-extrabold uppercase inline-block">High Exposure</span>
              <h3 className="text-xl font-extrabold text-slate-800">Reach 2 Million+ Active Buyers Monthly</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                eStatery lists your properties on Leaflet interactive maps and routes them to buyers using ROI matching matrices, ensuring maximum visibility and lead conversion.
              </p>
              <div className="flex gap-6 pt-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><Eye className="w-4 h-4 text-[#1D4ED8]" /> 120+ Avg. Views / Property</div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><MessageSquare className="w-4 h-4 text-[#1D4ED8]" /> 15+ Direct Buyer Queries</div>
              </div>
            </div>
            <div className="w-full md:w-80 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500" 
                alt="Seller Metrics" 
                className="w-full h-44 object-cover rounded-2xl shadow-md border border-slate-100" 
              />
            </div>
          </div>
        </div>

        {/* Seller Benefits */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Sellers Advantages</h2>
              <p className="text-slate-500 text-xs mt-2">Simplify selling without brokers taking commissions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 hover:shadow-md transition-shadow shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Icon className="w-5 h-5" /></div>
                    <h4 className="font-extrabold text-slate-800 text-xs">{b.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sellers Statistics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 text-center space-y-2 hover:shadow-sm transition-shadow">
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-slate-800 font-extrabold text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Valuation Form Simulator */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block flex items-center gap-1"><Calculator className="w-3.5 h-3.5" /> AI Price Index</span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight">Property Valuation Estimate</h2>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Enter your property variables below to generate an instant neural price valuation.
                </p>
                
                <form onSubmit={estimateValuation} className="space-y-4 pt-4 border-t border-slate-100 bg-white p-6 rounded-3xl border border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Target City</label>
                      <select value={valCity} onChange={e => setValCity(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]">
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Hyderabad">Hyderabad</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Property Type</label>
                      <select value={valCategory} onChange={e => setValCategory(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]">
                        <option value="apartment">Apartment</option>
                        <option value="villa">Independent Villa</option>
                        <option value="penthouse">Luxury Penthouse</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Carpet Area (sqft)</label>
                      <input type="number" value={valSize} onChange={e => setValSize(Number(e.target.value))} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]" />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Building Age (Years)</label>
                      <input type="number" value={valAge} onChange={e => setValAge(Number(e.target.value))} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]" />
                    </div>
                  </div>

                  <button type="submit" disabled={valCalculating} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all w-full shadow-md">
                    {valCalculating ? "Processing valuation indexes..." : "Run Valuation Check"}
                  </button>
                </form>
              </div>

              <div className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center space-y-4 shadow-xl min-h-[300px]">
                <Calculator className="w-12 h-12 text-purple-300" />
                {valResult ? (
                  <div className="space-y-2">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider block">Estimated valuation price</span>
                    <h3 className="text-3xl font-extrabold text-white">₹{(valResult / 10000000).toFixed(2)} Cr</h3>
                    <p className="text-purple-300 text-[10px] font-semibold">Calculated for {valSize} sq.ft. in {valCity}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <h4 className="font-bold">AI Valuation Estimate</h4>
                    <p className="text-white/60 text-xs max-w-xs leading-relaxed">Adjust listing values on the left and click calculate to estimate direct selling rates.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selling Process Steps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Selling Workflow Timeline</h2>
            <p className="text-slate-500 text-xs mt-2">A visual step guide to post, moderate, negotiate, and close your transaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 relative space-y-3">
                <div className="text-2xl font-extrabold text-purple-200">{s.step}</div>
                <h4 className="font-extrabold text-slate-800 text-xs">{s.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-slate-50 border-y border-slate-200/60 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Sellers Success Stories</h2>
            <p className="text-slate-500 text-xs mt-2">Hear from happy property owners who saved brokerage using eStatery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{t.author}</h4>
                  <span className="text-[#1D4ED8] font-bold text-[10px] mt-0.5 block">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> Sellers FAQs</h2>
            <p className="text-slate-500 text-xs mt-1.5">Common questions about RERA codes and moderation rules.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden">
                  <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full px-5 py-4 text-left font-extrabold text-slate-800 hover:bg-slate-50/50 flex justify-between items-center transition-colors text-xs">
                    <span>{f.q}</span>
                    <span className="text-slate-400 text-sm">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="px-5 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100/50 pt-2 bg-slate-50/10">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="text-2xl lg:text-3xl font-extrabold">Ready to post your listing FREE?</h2>
              <p className="text-white/80 text-xs leading-relaxed">Join millions of direct sellers on India's most advanced AI-powered PropTech marketplace.</p>
            </div>
            <div className="flex gap-4 shrink-0 w-full sm:w-auto">
              <Link to="/post-property" className="px-6 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs hover:bg-slate-50 shadow-md transition-all w-full sm:w-auto text-center">
                Post Property FREE
              </Link>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
