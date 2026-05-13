import { useState } from "react";
import { Brain, TrendingUp, TrendingDown, BarChart3, Map, Zap, ArrowRight, Target, Shield } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/features/SectionHeader";
import { toast } from "sonner";

const PRICE_TREND = [
  { month: "Jan", Mumbai: 18500, Bangalore: 12300, Gurgaon: 15200, Hyderabad: 9800 },
  { month: "Feb", Mumbai: 19200, Bangalore: 12800, Gurgaon: 15800, Hyderabad: 10100 },
  { month: "Mar", Mumbai: 19800, Bangalore: 13100, Gurgaon: 16100, Hyderabad: 10600 },
  { month: "Apr", Mumbai: 20500, Bangalore: 13700, Gurgaon: 16500, Hyderabad: 11200 },
  { month: "May", Mumbai: 21200, Bangalore: 14200, Gurgaon: 17000, Hyderabad: 11800 },
  { month: "Jun", Mumbai: 21800, Bangalore: 14800, Gurgaon: 17400, Hyderabad: 12300 }
];

const DEMAND_SUPPLY = [
  { city: "Mumbai", demand: 85, supply: 62 },
  { city: "Bangalore", demand: 92, supply: 74 },
  { city: "Gurgaon", demand: 78, supply: 65 },
  { city: "Hyderabad", demand: 95, supply: 70 },
  { city: "Chennai", demand: 72, supply: 68 },
  { city: "Pune", demand: 88, supply: 75 }
];

const MARKET_INSIGHTS = [
  { city: "Hyderabad", trend: "+21.3%", type: "Rising", color: "text-emerald-600 bg-emerald-50", desc: "HITEC City expansion driving demand" },
  { city: "Bangalore", trend: "+18.2%", type: "Rising", color: "text-emerald-600 bg-emerald-50", desc: "Tech sector growth fueling residential demand" },
  { city: "Mumbai", trend: "+12.4%", type: "Stable", color: "text-blue-600 bg-blue-50", desc: "Premium segment showing strong interest" },
  { city: "Delhi NCR", trend: "+9.8%", type: "Stable", color: "text-blue-600 bg-blue-50", desc: "Steady growth in suburban corridors" }
];

const AIInsights = () => {
  const [predLocation, setPredLocation] = useState("Mumbai");
  const [predBudget, setPredBudget] = useState("50");
  const [prediction, setPrediction] = useState<null | { appreciation: string; roi: string; recommendation: string }>(null);

  const getPrediction = () => {
    const appreciations: Record<string, string> = { Mumbai: "14-18%", Bangalore: "18-24%", Gurgaon: "10-14%", Hyderabad: "20-26%", Chennai: "12-16%", Pune: "15-19%" };
    const rois: Record<string, string> = { Mumbai: "3.2%", Bangalore: "3.8%", Gurgaon: "3.5%", Hyderabad: "4.1%", Chennai: "3.0%", Pune: "3.6%" };
    const recs: Record<string, string> = {
      Mumbai: "Strong buy for luxury segment. Focus on Bandra West and Worli for sea-facing premium properties.",
      Bangalore: "Excellent opportunity in North Bangalore corridor near Hebbal and Devanahalli for long-term gains.",
      Gurgaon: "Selective buying in DLF Phase 5 and Sector 56 area with good rental yield potential.",
      Hyderabad: "Best growth market. Invest in HITEC City and Financial District corridor for maximum appreciation.",
      Chennai: "Steady market, invest in OMR corridor for IT sector demand-driven appreciation.",
      Pune: "Strong rental demand in Hinjewadi and Baner. Good for rental yield investors."
    };
    setPrediction({ appreciation: appreciations[predLocation] || "12-18%", roi: rois[predLocation] || "3.5%", recommendation: recs[predLocation] || "Good investment potential." });
    toast.success("AI analysis complete!");
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-5">
              <Brain className="w-4 h-4 text-purple-300" /> Powered by eStatery AI Engine
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Real Estate Market Intelligence</h1>
            <p className="text-white/70 max-w-2xl mx-auto">AI-powered market analysis, price forecasting, and investment insights for India's top real estate markets.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {/* Market Insights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKET_INSIGHTS.map(m => (
              <div key={m.city} className="bg-white rounded-2xl border border-brand-border p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-brand-text">{m.city}</h3>
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${m.color}`}>{m.trend}</span>
                </div>
                <div className={`text-xs font-medium mb-2 ${m.color.split(" ")[0]}`}>{m.type} Market</div>
                <p className="text-brand-muted text-xs">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Price Trends */}
          <div className="bg-white rounded-2xl border border-brand-border p-6">
            <h2 className="font-bold text-brand-text text-xl mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-brand-purple" /> Price Trends (₹/sq.ft)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={PRICE_TREND}>
                <defs>
                  {["Mumbai", "Bangalore", "Gurgaon", "Hyderabad"].map((city, i) => (
                    <linearGradient key={city} id={`color${city}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={["#5B21B6","#10B981","#4338CA","#F59E0B"][i]} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={["#5B21B6","#10B981","#4338CA","#F59E0B"][i]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `₹${v}/sqft`} />
                <Legend />
                {[["Mumbai","#5B21B6"],["Bangalore","#10B981"],["Gurgaon","#4338CA"],["Hyderabad","#F59E0B"]].map(([city, color]) => (
                  <Area key={city} type="monotone" dataKey={city} stroke={color as string} fill={`url(#color${city})`} strokeWidth={2} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Demand vs Supply */}
          <div className="bg-white rounded-2xl border border-brand-border p-6">
            <h2 className="font-bold text-brand-text text-xl mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-brand-purple" /> Demand vs Supply Index</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={DEMAND_SUPPLY} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" name="Demand Index" fill="#5B21B6" radius={[4,4,0,0]} />
                <Bar dataKey="supply" name="Supply Index" fill="#10B981" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Price Predictor */}
          <div id="predictor" className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><Brain className="w-5 h-5 text-purple-300" /></div>
              <div>
                <h2 className="font-bold text-xl">AI Investment Predictor</h2>
                <p className="text-white/60 text-sm">Get AI-powered ROI forecast for your target market</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Target City</label>
                <select value={predLocation} onChange={e => setPredLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-purple-400">
                  {["Mumbai","Bangalore","Gurgaon","Hyderabad","Chennai","Pune"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Budget (₹ Lakhs)</label>
                <input type="number" value={predBudget} onChange={e => setPredBudget(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-purple-400 placeholder-white/30" placeholder="50" />
              </div>
              <div className="flex items-end">
                <button onClick={getPrediction} className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo font-bold hover:shadow-glow transition-all flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4" /> Analyze
                </button>
              </div>
            </div>
            {prediction && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-white">{prediction.appreciation}</div>
                  <div className="text-white/60 text-sm mt-1">Annual Appreciation</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-brand-emerald">{prediction.roi}</div>
                  <div className="text-white/60 text-sm mt-1">Gross Rental Yield</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl sm:col-span-1">
                  <div className="text-xs text-white/60 font-semibold uppercase mb-2">AI Recommendation</div>
                  <p className="text-white/85 text-xs leading-relaxed">{prediction.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIInsights;
