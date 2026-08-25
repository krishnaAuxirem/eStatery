import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Brain, TrendingUp, TrendingDown, BarChart3, Map, Zap, 
  ArrowRight, Target, Shield, Compass, Sparkles, Building, Info, Award
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

interface ValuationResult {
  estimatedValue: number;
  ratePerSqft: number;
  infraGrowth: number;
  popGrowth: number;
  investPotential: string;
  details: {
    baseRate: number;
    typeMultiplier: number;
    ageFactor: number;
  };
}

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState<"calculator" | "market">("calculator");
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#predictor") {
      setActiveTab("market");
    } else if (hash === "#guide") {
      setActiveTab("calculator");
    }
  }, [hash]);

  // Valuation calculator states
  const [calcCity, setCalcCity] = useState("Mumbai");
  const [calcArea, setCalcArea] = useState(1200);
  const [calcType, setCalcType] = useState("apartment");
  const [calcAge, setCalcAge] = useState(2);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

  // ROI Predictor states
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
    setPrediction({ 
      appreciation: appreciations[predLocation] || "12-18%", 
      roi: rois[predLocation] || "3.5%", 
      recommendation: recs[predLocation] || "Good investment potential." 
    });
    toast.success("AI Investment analysis complete!");
  };

  const calculateValuation = () => {
    if (calcArea <= 0) {
      toast.error("Please enter a valid area.");
      return;
    }
    setCalcLoading(true);
    
    setTimeout(() => {
      // Base rate estimation per city
      const baseRates: Record<string, number> = {
        Mumbai: 19500,
        Bangalore: 12500,
        Gurgaon: 15500,
        Delhi: 13800,
        Hyderabad: 10200,
        Chennai: 9200,
        Pune: 10500
      };

      // Multipliers based on property type
      const typeMultipliers: Record<string, number> = {
        apartment: 1.0,
        villa: 1.35,
        house: 1.2,
        commercial: 1.45,
        studio: 0.9,
        penthouse: 1.5
      };

      // Age depreciation calculation
      let ageFactor = 1.0;
      if (calcAge > 2 && calcAge <= 5) ageFactor = 0.95;
      else if (calcAge > 5 && calcAge <= 10) ageFactor = 0.88;
      else if (calcAge > 10) ageFactor = 0.78;

      const ratePerSqft = baseRates[calcCity] * typeMultipliers[calcType] * ageFactor;
      const totalEstimatedValue = Math.round(calcArea * ratePerSqft);
      
      // Calculate growth gauges
      const infraGrowth = calcCity === "Hyderabad" ? 94 : calcCity === "Bangalore" ? 88 : calcCity === "Mumbai" ? 85 : 78;
      const popGrowth = calcCity === "Bangalore" ? 92 : calcCity === "Hyderabad" ? 85 : calcCity === "Mumbai" ? 79 : 72;
      const investPotential = ratePerSqft > 18000 ? "Medium-High" : "High";

      setValuationResult({
        estimatedValue: totalEstimatedValue,
        ratePerSqft: Math.round(ratePerSqft),
        infraGrowth,
        popGrowth,
        investPotential,
        details: {
          baseRate: baseRates[calcCity],
          typeMultiplier: typeMultipliers[calcType],
          ageFactor
        }
      });
      setCalcLoading(false);
      toast.success("AI valuation estimate ready!");
    }, 1500);
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-5">
              <Brain className="w-4 h-4 text-purple-300 animate-pulse" /> Powered by eStatery AI Engine
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Real Estate Market Intelligence</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm">Use our advanced evaluation matrices and neural estimation engines to price properties and study ROI forecasts.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          
          {/* Sub Navigation Tabs */}
          <div className="flex bg-[#F5F7FA] p-1.5 rounded-2xl border border-[#E2E8F0] max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "calculator"
                  ? "bg-white text-[#1D4ED8] shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Property Value Calculator
            </button>
            <button
              onClick={() => setActiveTab("market")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "market"
                  ? "bg-white text-[#1D4ED8] shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Market Trends & ROI
            </button>
          </div>

          {activeTab === "calculator" ? (
            // Valuation Calculator & Gauges Panel
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Parameter Inputs Panel */}
              <div id="guide" className="lg:col-span-1 bg-white rounded-3xl border border-[#E2E8F0] p-6 space-y-5 shadow-brand-md">
                <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#1D4ED8]" /> Valuation Inputs
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Select Location (City)</label>
                    <select
                      value={calcCity}
                      onChange={e => setCalcCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
                    >
                      {["Mumbai","Bangalore","Gurgaon","Delhi","Hyderabad","Chennai","Pune"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Carpet Area (sq.ft.)</label>
                    <input
                      type="number"
                      value={calcArea}
                      onChange={e => setCalcArea(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Property Category</label>
                    <select
                      value={calcType}
                      onChange={e => setCalcType(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
                    >
                      {[
                        { id: "apartment", label: "Apartment" },
                        { id: "villa", label: "Luxury Villa" },
                        { id: "house", label: "Independent House" },
                        { id: "commercial", label: "Commercial Space" },
                        { id: "studio", label: "Studio Flat" },
                        { id: "penthouse", label: "Penthouse Suit" }
                      ].map(t => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Property Age (Years)</label>
                    <input
                      type="number"
                      value={calcAge}
                      onChange={e => setCalcAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
                      min="0"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateValuation}
                  disabled={calcLoading}
                  className="w-full py-3.5 bg-[#1D4ED8] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Brain className="w-4 h-4" /> 
                  {calcLoading ? "Analyzing Registry Records..." : "Estimate Market Value"}
                </button>
              </div>

              {/* Estimation Results and Gauges Panel */}
              <div className="lg:col-span-2 space-y-6">
                {valuationResult ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    
                    {/* Valuation Result Box */}
                    <div className="bg-white rounded-3xl border border-blue-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-brand-md bg-gradient-to-br from-white to-blue-50/20">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
                          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">AI Estimate</span>
                        </div>
                        <h4 className="text-3xl font-extrabold text-[#0F172A]">{formatCurrency(valuationResult.estimatedValue)}</h4>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Average Rate: ₹{valuationResult.ratePerSqft.toLocaleString("en-IN")}/sq.ft.</p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-slate-400 text-xs block">Location Confidence</span>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-extrabold mt-1 inline-block">94.8% (Accurate)</span>
                      </div>
                    </div>

                    {/* Gauges indicators */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {/* Gauge 1 */}
                      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Infrastructure Index</span>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-50">
                                Excellent
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-blue-700">
                                {valuationResult.infraGrowth}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-slate-100">
                            <div style={{ width: `${valuationResult.infraGrowth}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1D4ED8] rounded transition-all duration-500" />
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400">Calculates metro connectivity, highways, and public parks expansion.</p>
                      </div>

                      {/* Gauge 2 */}
                      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Population Density Index</span>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-50">
                                High Demand
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-emerald-700">
                                {valuationResult.popGrowth}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-slate-100">
                            <div style={{ width: `${valuationResult.popGrowth}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 rounded transition-all duration-500" />
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400">Assesses job creation, IT corridor relocation, and urban influx.</p>
                      </div>

                      {/* Gauge 3 */}
                      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Investment Potential</span>
                        <div className="flex items-center gap-2 mt-2">
                          <Award className="w-6 h-6 text-amber-500" />
                          <div>
                            <div className="font-extrabold text-slate-800 text-sm">{valuationResult.investPotential}</div>
                            <div className="text-[9px] text-slate-400">ROI Potential Index</div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">Calculates investment viability score based on price vs yield.</p>
                      </div>
                    </div>

                    {/* Breakdown Parameters */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-3">
                      <h5 className="font-bold text-slate-800 text-xs">AI Estimation Breakdown</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Stated Base Price</span>
                          <span className="font-bold text-slate-800">₹{valuationResult.details.baseRate}/sqft</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Category Factor</span>
                          <span className="font-bold text-slate-800">x{valuationResult.details.typeMultiplier}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Depreciation Factor</span>
                          <span className="font-bold text-slate-800">x{valuationResult.details.ageFactor}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Confidence Score</span>
                          <span className="font-bold text-slate-800">98% Grade A</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
                    <Brain className="w-16 h-16 text-slate-200 mb-3" />
                    <h3 className="font-extrabold text-slate-700">Estimate Market Valuation</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">Enter property variables on the left pane and click Calculate to compute property registry forecasts.</p>
                  </div>
                )}
              </div>
              
            </div>
          ) : (
            // Market Trends and Investment Forecaster tabbed panel
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Market Insights cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {MARKET_INSIGHTS.map(m => (
                  <div key={m.city} className="bg-white rounded-2xl border border-brand-border p-5 hover:shadow-card-hover transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-brand-text">{m.city}</h3>
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${m.color}`}>{m.trend}</span>
                    </div>
                    <div className={`text-xs font-medium mb-2 ${m.color.split(" ")[0]}`}>{m.type} Market</div>
                    <p className="text-brand-muted text-xs">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Recharts chart plots */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Price Trends */}
                <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
                  <h2 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#1D4ED8]" /> Price Trends (₹/sq.ft)
                  </h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={PRICE_TREND}>
                      <defs>
                        {["Mumbai", "Bangalore", "Gurgaon", "Hyderabad"].map((city, i) => (
                          <linearGradient key={city} id={`color${city}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={["#1D4ED8","#10B981","#2563EB","#F59E0B"][i]} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={["#1D4ED8","#10B981","#2563EB","#F59E0B"][i]} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${v}/sqft`} />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      {[["Mumbai","#1D4ED8"],["Bangalore","#10B981"],["Gurgaon","#2563EB"],["Hyderabad","#F59E0B"]].map(([city, color]) => (
                        <Area key={city} type="monotone" dataKey={city} stroke={color as string} fill={`url(#color${city})`} strokeWidth={2} />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Demand vs Supply */}
                <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
                  <h2 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#1D4ED8]" /> Demand vs Supply Index
                  </h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={DEMAND_SUPPLY} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="demand" name="Demand Index" fill="#1D4ED8" radius={[4,4,0,0]} />
                      <Bar dataKey="supply" name="Supply Index" fill="#10B981" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </div>

              {/* AI Budget ROI Predictor Form */}
              <div id="predictor" className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">AI Investment Predictor</h2>
                    <p className="text-white/60 text-xs">Calculate gross ROI and rental yield percentages for your target budget.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-white/70 text-xs font-bold mb-2 uppercase tracking-wide">Target City</label>
                    <select 
                      value={predLocation} 
                      onChange={e => setPredLocation(e.target.value)} 
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-purple-400 text-xs font-semibold"
                    >
                      {["Mumbai","Bangalore","Gurgaon","Hyderabad","Chennai","Pune"].map(c => (
                        <option key={c} value={c} className="text-slate-800 font-semibold">{c}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-xs font-bold mb-2 uppercase tracking-wide">Budget (₹ Lakhs)</label>
                    <input 
                      type="number" 
                      value={predBudget} 
                      onChange={e => setPredBudget(e.target.value)} 
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-purple-400 placeholder-white/30 text-xs font-semibold" 
                      placeholder="50" 
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button 
                      onClick={getPrediction} 
                      className="w-full py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 border border-blue-600"
                    >
                      <Brain className="w-4 h-4" /> Analyze Target Market
                    </button>
                  </div>
                </div>
                
                {prediction && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 animate-in fade-in duration-200">
                    <div className="text-center p-4 bg-white/10 rounded-xl">
                      <div className="text-2xl font-bold text-white">{prediction.appreciation}</div>
                      <div className="text-white/60 text-xs mt-1 uppercase font-bold">Annual Capital Gain</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-400">{prediction.roi}</div>
                      <div className="text-white/60 text-xs mt-1 uppercase font-bold">Gross Rental Yield</div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-xl sm:col-span-1">
                      <div className="text-[10px] text-white/60 font-bold uppercase mb-2">AI Recommendation</div>
                      <p className="text-white/85 text-xs leading-relaxed font-semibold">{prediction.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
