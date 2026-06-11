import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Star, MapPin, Phone, MessageCircle, Search, CheckCircle, 
  ShieldCheck, Award, Briefcase, TrendingUp, HelpCircle, 
  UserCheck, Percent, ArrowUpRight, PlusCircle 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AGENTS } from "@/data/agents";
import { toast } from "sonner";

export default function Agents() {
  const [search, setSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Join Agent Form State
  const [joinName, setJoinName] = useState("");
  const [joinCity, setJoinCity] = useState("");
  const [joinSpec, setJoinSpec] = useState("Residential");

  // Leaderboard Sort State
  const [sortKey, setSortKey] = useState<"sales" | "rating" | "experience">("sales");

  const filtered = AGENTS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.location.toLowerCase().includes(search.toLowerCase())
  );

  // Categories
  const categories = [
    { title: "RERA-Certified Advisors", desc: "100% verified agents registered under state regulatory authorities.", count: "120+ active", icon: ShieldCheck, color: "text-[#1D4ED8] bg-blue-50" },
    { title: "Rental Specialists", desc: "Expert agents focused on fast renting and lease agreement executions.", count: "85+ active", icon: UserCheck, color: "text-emerald-600 bg-emerald-50" },
    { title: "Commercial Advisors", desc: "Specialists in retail spaces, offices, warehouse yields, and ROI.", count: "40+ active", icon: Briefcase, color: "text-amber-500 bg-amber-50" },
    { title: "NRI Investment Experts", desc: "Handling legal, taxation, and purchase advisory for non-residents.", count: "25+ active", icon: Award, color: "text-purple-600 bg-purple-50" }
  ];

  // Benefits
  const benefits = [
    { title: "Direct Lead Routing", desc: "Get connected with pre-qualified buyers and tenants searching in your focus zipcodes.", icon: ArrowUpRight },
    { title: "Zero List Commissions", desc: "Keep 100% of your transactional earnings. eStatery is a SaaS-based search index.", icon: Percent },
    { title: "Trust Verified Badge", desc: "Boost conversion rates by displaying government RERA badges on your listings.", icon: CheckCircle },
    { title: "Performance Analytics", desc: "Monitor view counts, message rates, and scheduled site visits from your Dashboard.", icon: TrendingUp }
  ];

  // Statistics
  const stats = [
    { value: "480+", label: "Verified Partner Agents", color: "text-[#1D4ED8]" },
    { value: "₹2,400Cr+", label: "Cumulative Transaction Volume", color: "text-emerald-600" },
    { value: "4.87 / 5.0", label: "Average Customer Rating", color: "text-amber-500" },
    { value: "32 Cities", label: "Pan-India Operational Hubs", color: "text-purple-600" }
  ];

  // Sorted Leaderboard data
  const leaderboardData = [...AGENTS].sort((a, b) => {
    if (sortKey === "sales") return b.totalSales - a.totalSales;
    if (sortKey === "rating") return b.rating - a.rating;
    return b.experience - a.experience;
  });

  const faqs = [
    { q: "How do I get the 'Verified Partner' badge on eStatery?", a: "Agents must submit their active state RERA certification number, government ID, and past transactional proof. Our review panel processes applications within 48 hours." },
    { q: "Does eStatery charge commission on closed sales?", a: "No. eStatery is a SaaS subscription platform for agents. We do not take cuts or brokerages from your deals." },
    { q: "How are client inquiries routed to me?", a: "When a user requests info, schedules a tour, or submits a chat on one of your listings, an instant SMS & dashboard notification is sent directly to you." },
    { q: "Can I upgrade to a premium agent tier?", a: "Yes. Our Elite Tier guarantees top placement in localized search query results, boosting listings visibility by up to 4x." }
  ];

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName || !joinCity) {
      toast.error("Please fill in all registration fields.");
      return;
    }
    toast.success(`Application submitted! Welcome onboard, ${joinName}. Our partner team will reach out shortly.`);
    setJoinName("");
    setJoinCity("");
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
              Agent Directory
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Connect with India's <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Top Advisors</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium mb-8">
              Verified professionals, RERA-certified experts, and hyper-local neighborhood advisors ready to guide your purchase or lease.
            </p>
            <div className="flex items-center gap-3 max-w-md mx-auto bg-white rounded-2xl px-4 py-3.5 shadow-xl">
              <Search className="w-5 h-5 text-brand-muted" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search agents by name or city..."
                className="flex-1 outline-none text-xs text-brand-text placeholder-brand-muted font-medium"
              />
            </div>
          </div>
        </div>

        {/* Agent Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Specializations</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Our Agent Segments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((c, idx) => {
              const IconComp = c.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${c.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-800 text-xs">{c.title}</h4>
                    <p className="text-slate-500 text-[10px] leading-relaxed">{c.desc}</p>
                  </div>
                  <span className="text-[9px] font-bold text-[#1D4ED8] bg-blue-50/50 px-2 py-0.5 rounded-md inline-block">{c.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Agent List */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Available Advisors</span>
                <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Featured Local Experts</h2>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{filtered.length} agent(s) matched</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(agent => (
                <div key={agent.id} className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-brand-purple/5 to-brand-indigo/5 p-6">
                    <div className="flex items-start gap-4">
                      <img src={agent.avatar} alt={agent.name} className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="font-extrabold text-slate-800 text-base truncate">{agent.name}</h3>
                          {agent.verified && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-xs mb-2">
                          <MapPin className="w-3.5 h-3.5 text-brand-purple shrink-0" /> <span className="truncate">{agent.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                          <span className="font-bold text-slate-800 text-xs">{agent.rating}</span>
                          <span className="text-slate-400 text-[10px] font-semibold">({agent.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{agent.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.specialization.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">{s}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-slate-100">
                      <div>
                        <div className="font-extrabold text-slate-800 text-sm">{agent.totalSales}</div>
                        <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Sales</div>
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 text-sm">{agent.totalRentals}</div>
                        <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Rentals</div>
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 text-sm">{agent.experience} Yr</div>
                        <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Exp</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`Calling ${agent.name}...`)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors">
                        <Phone className="w-4 h-4 text-[#1D4ED8]" /> Call
                      </button>
                      <button onClick={() => toast.success(`Chat opened with ${agent.name}.`)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1D4ED8] text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm">
                        <MessageCircle className="w-4 h-4" /> Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white border border-slate-200/60 rounded-3xl space-y-3 max-w-md mx-auto">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-extrabold text-slate-800">No Agents Found</h3>
                <p className="text-slate-400 text-xs">Try searching for other names or regional hubs like Gurgaon, Bangalore.</p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits to Agents */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Agent Growth</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Why Partner With eStatery?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-3 hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{b.title}</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Leaderboard */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Leaderboard</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Top Performing Advisors</h2>
              <p className="text-slate-500 text-xs mt-1.5">Study closing metrics of top active verified platform members.</p>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              {[
                { key: "sales", label: "Total Sales Closed" },
                { key: "rating", label: "Customer Rating" },
                { key: "experience", label: "Years Experience" }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSortKey(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    sortKey === tab.key 
                      ? "bg-[#1D4ED8] text-white shadow-md" 
                      : "bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="max-w-3xl mx-auto bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {leaderboardData.map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                        index === 0 ? "bg-amber-100 text-amber-700" :
                        index === 1 ? "bg-slate-100 text-slate-700" :
                        "bg-orange-50 text-orange-700"
                      }`}>
                        #{index + 1}
                      </span>
                      <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-xs">{agent.name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">{agent.location}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {sortKey === "sales" && (
                        <div>
                          <div className="font-extrabold text-slate-800 text-xs">{agent.totalSales} Units</div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">Volume</span>
                        </div>
                      )}
                      {sortKey === "rating" && (
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-extrabold text-slate-800 text-xs">{agent.rating}</span>
                        </div>
                      )}
                      {sortKey === "experience" && (
                        <div>
                          <div className="font-extrabold text-slate-800 text-xs">{agent.experience} Years</div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">Industry Exp</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
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

        {/* Client Reviews Carousel */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Client Feedback</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">What Clients Say About Advisors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Priya Sharma helped us negotiate a海景 oceanfront suite in Worli. Absolute professional who drafts and signs securely through the client dashboard.", author: "Amit & Shalini Sen", rating: 5 },
                { quote: "Rajan Mehta understands tech corridors perfectly. Found a luxury villa near Sarjapur Road within our exact parameters inside 4 days.", author: "Karthik Subramanian", rating: 5 },
                { quote: "Ananya Kapoor handled all regulatory steps for our Gurgaon plot. Extremely quick with RERA registries, highly recommended.", author: "Dinesh K. (NRI)", rating: 5 }
              ].map((r, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm">
                  <div className="flex gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs italic leading-relaxed">"{r.quote}"</p>
                  <h4 className="font-extrabold text-slate-800 text-[10px]">— {r.author}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> Agent FAQs</h2>
            <p className="text-slate-500 text-xs mt-1.5">Common questions about joining eStatery and handling inquiries.</p>
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

        {/* Join as Agent CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-3xl p-8 md:p-12 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xl">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-md bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider inline-block">Join eStatery Pro</span>
              <h2 className="text-2xl lg:text-3xl font-extrabold leading-tight">Are you a registered Real Estate Broker?</h2>
              <p className="text-white/70 text-xs leading-relaxed">
                Unlock direct client leads, build a digital RERA profile, and index your premium portfolio on India's fastest growing PropTech marketplace.
              </p>
            </div>
            
            <form onSubmit={handleJoin} className="bg-white text-slate-800 p-6 rounded-2xl space-y-4 shadow-lg">
              <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5"><PlusCircle className="w-4 h-4 text-[#1D4ED8]" /> Apply for Partner Account</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Broker Name</label>
                  <input 
                    type="text" 
                    value={joinName} 
                    onChange={e => setJoinName(e.target.value)} 
                    placeholder="Enter full name" 
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Focus City</label>
                  <input 
                    type="text" 
                    value={joinCity} 
                    onChange={e => setJoinCity(e.target.value)} 
                    placeholder="e.g. Bangalore, Mumbai" 
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Specialization</label>
                  <select 
                    value={joinSpec} 
                    onChange={e => setJoinSpec(e.target.value)} 
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="Residential">Residential Sales</option>
                    <option value="Rentals">Rental Specialist</option>
                    <option value="Commercial">Commercial/Retail</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition-all">
                Submit Agent Application
              </button>
            </form>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

