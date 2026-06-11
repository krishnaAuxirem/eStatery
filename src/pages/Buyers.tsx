import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, Search, Compass, ShieldCheck, Heart, Sparkles, 
  ArrowRight, Calculator, Landmark, TrendingUp, Users, HelpCircle 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const MARKET_DATA = [
  { year: "2021", Mumbai: 14500, Bangalore: 8200, Gurgaon: 10200 },
  { year: "2022", Mumbai: 15800, Bangalore: 9500, Gurgaon: 11800 },
  { year: "2023", Mumbai: 17200, Bangalore: 11200, Gurgaon: 13400 },
  { year: "2024", Mumbai: 19500, Bangalore: 12500, Gurgaon: 15500 },
  { year: "2025", Mumbai: 21800, Bangalore: 14200, Gurgaon: 17200 }
];

export default function Buyers() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // EMI Calculator state
  const [loanAmt, setLoanAmt] = useState(5000000); // 50 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenure, setTenure] = useState(20); // 20 Years
  const [emiResult, setEmiResult] = useState<number | null>(null);

  const stats = [
    { value: "12%", label: "Average Year-on-Year Price Appreciation", color: "text-[#1D4ED8]" },
    { value: "98.8%", label: "Buyer Match Satisfaction Rate", color: "text-emerald-600" },
    { value: "100%", label: "Verified RERA Listings Index", color: "text-sky-500" },
    { value: "45K+", label: "Completed Registrations & Title Deeds", color: "text-amber-500" }
  ];

  const categories = [
    { title: "Premium Apartments", count: "12,400+ listings", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500" },
    { title: "Luxury Villas", count: "3,800+ listings", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500" },
    { title: "Penthouse Suites", count: "1,200+ listings", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500" },
    { title: "Commercial Spaces", count: "4,500+ listings", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500" }
  ];

  const steps = [
    { step: "01", title: "Financial Eligibility & Pre-Approval", desc: "Use our home loan advisors to verify your credit score and get mortgage pre-approval drafts." },
    { step: "02", title: "Search via Leaflet Proximity Map", desc: "Filter neighborhoods based on price tag pins and nearby schools, metro stations, or malls." },
    { step: "03", title: "Schedule Verified Site Visits", desc: "Select time slots and schedule tours directly. Approve, reschedule, or cancel from your dashboard." },
    { step: "04", title: "Secure E-Sign Contracting", desc: "Compile RERA compliance leases and title agreements with canvas-based signatures." }
  ];

  const highRoiSuburbs = [
    { city: "Bangalore", suburb: "North Devanahalli", yield: "7.2% Yield", potential: "Highest appreciation potential due to airport corridor expansion." },
    { city: "Hyderabad", suburb: "Financial District", yield: "6.8% Yield", potential: "Commercial hubs growth driving premium rental and buy rates." },
    { city: "Gurgaon", suburb: "Sector 56 Ext.", yield: "6.4% Yield", potential: "Excellent metro extension driving resident demand." }
  ];

  const testimonials = [
    { quote: "eStatery made buying our first penthouse DLF Crest extremely smooth. The Leaflet map price pins allowed us to research pricing without talking to pushy brokers.", author: "Arjun & Priya Mehta", role: "Home Buyers, Gurgaon" },
    { quote: "The loan assistant pre-approval process took under 24 hours. Verified registry listings guaranteed we didn't waste time on fake property tags.", author: "Sneha Patel", role: "Real Estate Investor, Bangalore" }
  ];

  const faqs = [
    { q: "What is RERA compliance and how does eStatery ensure it?", a: "RERA represents the Real Estate Regulation Act. eStatery moderators check developer registration codes on government portals before publishing listings on our interactive search indexes." },
    { q: "How do I secure a Home Loan through eStatery?", a: "Navigate to our AI valuation tool to estimate market value, then click Apply for Loan. Our partner banking network offers discounted interest rates starting at 8.2%." },
    { q: "Can I manage multiple site visits?", a: "Yes. From your Buyer Dashboard under 'Scheduled Visits', you can reschedule slots, coordinate directions, or cancel visits directly without speaking to agents." }
  ];

  const calculateEmi = () => {
    const P = loanAmt;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult(Math.round(emi));
    toast.success("EMI Calculation complete!");
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              For Buyers
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Invest in Verified Properties with <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">AI Insights</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Browse through RERA-compliant residential and commercial listings. Analyze valuations, schedule visits, and finance your future home with ease.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/properties?type=buy" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo font-bold text-white text-xs hover:shadow-glow transition-all">
                Browse properties for sale
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Properties Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">Premium Inventory</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Featured Buy Listings</h2>
            </div>
            <Link to="/properties" className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-0.5">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "DLF Crest Penthouse", price: "₹8.5 Cr", loc: "Sector 54, Gurgaon", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" },
              { title: "Prestige Lakeside Villa", price: "₹4.2 Cr", loc: "Whitefield, Bangalore", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600" },
              { title: "Lodha World View Suite", price: "₹12.0 Cr", loc: "Lower Parel, Mumbai", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" }
            ].map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 overflow-hidden relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase">Verified RERA</span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-sm truncate">{p.title}</h4>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-[#1D4ED8] text-base">{p.price}</span>
                    <span className="text-slate-400 text-xs font-semibold">{p.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Categories */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Browse by Investment Category</h2>
              <p className="text-slate-500 text-xs mt-1.5">Study specific sectors depending on yield requirements.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((c, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-md transition-shadow relative h-40 group cursor-pointer">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent flex flex-col justify-end p-4 text-white">
                    <h4 className="font-bold text-xs">{c.title}</h4>
                    <span className="text-[10px] text-white/75 font-semibold mt-0.5">{c.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buyers Statistics */}
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

        {/* Home Buying Process Guide */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Home Buying Journey</h2>
              <p className="text-slate-500 text-xs mt-2">A simplified, four-step digital overview of how we guide you to registration.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((s, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 relative space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-extrabold text-purple-200">{s.step}</div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{s.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mortgage Assistance & EMI Calculator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block flex items-center gap-1"><Calculator className="w-3.5 h-3.5" /> Mortgage Advisor</span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight">Calculate Your Monthly Home Loan Outlay</h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                eStatery facilitates partnerships with top banks to offer direct pre-approved mortgage drafts. Calculate your estimated EMI using our dynamic slider tool.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Loan Amount</span>
                    <span>₹{(loanAmt / 100000).toFixed(0)} Lakhs</span>
                  </div>
                  <input type="range" min="1000000" max="50000000" step="50000" value={loanAmt} onChange={e => setLoanAmt(Number(e.target.value))} className="w-full cursor-pointer accent-[#1D4ED8]" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Interest Rate</span>
                    <span>{interestRate}%</span>
                  </div>
                  <input type="range" min="6.5" max="15" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full cursor-pointer accent-[#1D4ED8]" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Tenure</span>
                    <span>{tenure} Years</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full cursor-pointer accent-[#1D4ED8]" />
                </div>

                <button onClick={calculateEmi} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all w-full shadow-md">
                  Calculate EMI Payment
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center space-y-4 shadow-xl min-h-[300px]">
              <Landmark className="w-12 h-12 text-purple-300" />
              {emiResult ? (
                <div className="space-y-2">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-wider block">Estimated monthly EMI</span>
                  <h3 className="text-4xl font-extrabold text-white">₹{emiResult.toLocaleString("en-IN")}</h3>
                  <p className="text-purple-300 text-[10px] font-semibold">Calculated for {tenure} Years at {interestRate}% p.a.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h4 className="font-bold">Mortgage Pre-Approval</h4>
                  <p className="text-white/60 text-xs max-w-xs leading-relaxed">Adjust parameters on the left and click calculate to estimate monthly interest repayments.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Property Investment Insights & Suburbs */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Investment Yield Rankings</h2>
              <p className="text-slate-500 text-xs mt-2">Study neighborhood metrics to identify optimal rental and capital appreciation yields.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highRoiSuburbs.map((s, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold text-[10px]">{s.yield}</span>
                    <span className="text-slate-400 text-xs font-bold">{s.city}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{s.suburb}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.potential}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Trends Chart */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><TrendingUp className="w-5 h-5 text-[#1D4ED8]" /> City Appreciation Trends</h2>
            <p className="text-slate-500 text-xs mt-1.5">Yearly price trends per sq.ft. across major Indian residential real estate corridors.</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={MARKET_DATA}>
                <defs>
                  <linearGradient id="mumbaiColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${v}/sqft`} />
                <Area type="monotone" dataKey="Mumbai" stroke="#1D4ED8" fill="url(#mumbaiColor)" strokeWidth={2} />
                <Area type="monotone" dataKey="Bangalore" stroke="#10B981" fillOpacity={0} strokeWidth={2} />
                <Area type="monotone" dataKey="Gurgaon" stroke="#F59E0B" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Success Stories</h2>
              <p className="text-slate-500 text-xs mt-2">Hear from happy families and institutional investors who purchased through eStatery.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-8 relative space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs">{t.author}</h4>
                    <span className="text-[#1D4ED8] font-bold text-[10px] mt-0.5 block">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> Buyers FAQs</h2>
            <p className="text-slate-500 text-xs mt-1.5">Common questions about mortgage financing and property verification.</p>
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
              <h2 className="text-2xl lg:text-3xl font-extrabold">Ready to secure pre-approved loan drafts?</h2>
              <p className="text-white/80 text-xs leading-relaxed">Talk to our direct buying advisors to evaluate title deeds and draft compliance documentation.</p>
            </div>
            <div className="flex gap-4 shrink-0 w-full sm:w-auto">
              <button onClick={() => toast.success("Advisors will contact you shortly.")} className="px-6 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs hover:bg-slate-50 shadow-md transition-all w-full sm:w-auto text-center">
                Talk to Buying Advisor
              </button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
