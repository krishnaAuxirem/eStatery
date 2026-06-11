import { useState } from "react";
import { 
  BookOpen, Search, Compass, ShieldCheck, Heart, Sparkles, 
  ArrowRight, Landmark, FileText, HelpCircle, Users, Mail, TrendingUp 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function NewsGuide() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const stats = [
    { value: "150+", label: "Expert Guides & Market Reports", color: "text-[#1D4ED8]" },
    { value: "250K+", label: "Monthly Active Readers", color: "text-emerald-600" },
    { value: "4.8/5", label: "Guide Download rating", color: "text-sky-500" },
    { value: "12+", label: "RERA Legal Experts Contributing", color: "text-amber-500" }
  ];

  const tags = ["All", "Market Reports", "Buying Guide", "Selling Guide", "Tenancy Advice", "AI Valuation"];

  const articles = [
    { title: "RERA Act Guidelines 2026: What Buyers Need to Know", desc: "A comprehensive analysis of developer compliance registries and how to avoid fake properties.", category: "Buying Guide", date: "June 1, 2026", img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500" },
    { title: "Maximizing ROI: Top 5 Bangalore Suburbs to Invest In", desc: "Our AI valuation analysis projects double-digit price appreciation in North Bangalore corridors.", category: "Market Reports", date: "May 28, 2026", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500" },
    { title: "How to Digitally Sign Leases Without Broker Interference", desc: "A step-by-step renter tutorial on using HTML5 signature pads and exporting certified PDFs.", category: "Tenancy Advice", date: "May 15, 2026", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500" },
    { title: "Seller Marketing: Designing 360 Walkthroughs & Drone Media", desc: "Audit stats show properties with virtual tour tabs convert leads 4x faster.", category: "Selling Guide", date: "May 10, 2026", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500" }
  ];

  const reviews = [
    { quote: "The Bangalore Suburb Market Report was extremely accurate. We bought our flat in Devanahalli and the value appreciated by 8% in 6 months.", author: "Sunil Sen", role: "Real Estate Buyer, Bangalore" },
    { quote: "The Renter digital lease guide resolved all my landlord agreement doubts. Simple, direct information with no broker jargon.", author: "Kriti Sharma", role: "Renter, Gurgaon" }
  ];

  const faqs = [
    { q: "Are eStatery's market guides free to read?", a: "Yes. All guides, RERA compliance lists, and AI pricing indexes are open for our community. Premium PDF reports are free for registered accounts." },
    { q: "How often are city-wise pricing trends updated?", a: "Our database parses historical municipal corporation records and listings monthly to refresh all market charts." },
    { q: "Can I contribute articles as a verified agent?", a: "Yes. Certified eStatery agent profiles can submit articles to enter the Admin moderation pipeline." }
  ];

  const filteredArticles = articles.filter(a => {
    const matchesTag = selectedTag === "All" || a.category === selectedTag;
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* News & Guide Hero */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Guides &amp; News
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              PropTech <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Market intelligence</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Read verified guides on buying, selling, renting, home loans, digital signatures, and AI property valuations.
            </p>
          </div>
        </div>

        {/* Featured Article Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
            <div className="w-full lg:w-1/2 h-72 rounded-2xl overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800" alt="Featured Guide" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 flex-1">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-[10px] font-extrabold uppercase inline-block">Trending Report</span>
              <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">India Real Estate Market Forecast YTD</h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                An extensive, data-driven report explaining how tech corridor expansions, metro extensions, and RERA compliance verifications are impacting residential and commercial listing values.
              </p>
              <div className="pt-2">
                <button onClick={() => toast.success("Download started!")} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md">
                  Download Full Report PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Tag Filters */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
              {/* Search */}
              <div className="relative w-full md:flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search articles and guides..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8] bg-white"
                />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                      selectedTag === t 
                        ? "bg-[#1D4ED8] text-white border-blue-600" 
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredArticles.map((a, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-purple-600 uppercase">{a.category}</span>
                      <h4 className="font-extrabold text-slate-800 text-xs leading-tight line-clamp-2">{a.title}</h4>
                      <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-3">{a.desc}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-[9px] text-slate-400 font-semibold border-t border-slate-50">
                      <span>{a.date}</span>
                      <span className="text-[#1D4ED8] hover:underline cursor-pointer flex items-center">Read &rarr;</span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredArticles.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-600">No guides found</h4>
                  <p className="text-slate-400 text-xs mt-1">Try another search keyword or category tag.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* News Statistics */}
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

        {/* Reader Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-slate-50 border-y border-slate-200/60 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Reader Feedback</h2>
            <p className="text-slate-500 text-xs mt-2">Hear from property buyers and renters who scaled their insight using our guides.</p>
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
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> FAQ Section</h2>
            <p className="text-slate-500 text-xs mt-1.5">Common questions about RERA document verifications and updates.</p>
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

        {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="text-2xl lg:text-3xl font-extrabold">Weekly PropTech Newsletter</h2>
              <p className="text-white/80 text-xs leading-relaxed">Join 250,000+ readers receiving RERA legal compliance guides and direct deal notifications.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed successfully!"); }} className="flex gap-2 w-full md:w-auto shrink-0">
              <input type="email" required placeholder="arjun@email.com" className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/20 text-xs font-semibold w-full md:w-60" />
              <button type="submit" className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs hover:shadow-glow transition-all flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
