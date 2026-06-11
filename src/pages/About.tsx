import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Target, Eye, Brain, ShieldCheck, Heart, Sparkles, Building, 
  ChevronRight, Calendar, Landmark, MapPin, Star, HelpCircle 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function About() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { value: "125K+", label: "Properties Listed", desc: "Across India's top metropolitan cities" },
    { value: "2M+", label: "Active Users", desc: "Buyers, sellers, agents, and tenants" },
    { value: "15K+", label: "Deals Closed", desc: "Seamless residential & commercial sales" },
    { value: "98%", label: "Satisfaction Rate", desc: "Highly rated customer support and trust" }
  ];

  const values = [
    { icon: ShieldCheck, title: "Trust & Transparency", desc: "RERA-verified listings and clear communication channels." },
    { icon: Brain, title: "AI-Powered Decisions", desc: "Utilizing advanced analytics for pricing, valuation, and ROI trends." },
    { icon: Heart, title: "Customer Centricity", desc: "Designing simple workflows for every stage of your real estate journey." },
    { icon: Sparkles, title: "Continuous Innovation", desc: "Consistently updating tools like digital signing, Leaflet maps, and chat." }
  ];

  const timeline = [
    { year: "2024", title: "Platform Launch", desc: "eStatery goes live in Mumbai & Bangalore with verified listings and direct broker-free chat integrations." },
    { year: "2024", title: "National RERA Partnership", desc: "Collaborated with state registries to automatically cross-verify broker licenses and property approvals." },
    { year: "2025", title: "AI Valuation Core", desc: "Launched our proprietary machine learning engine that calculates real-time price trends and suburban yields." },
    { year: "2025", title: "National Footprint", desc: "Expanded operations to 32 major hubs, reaching 2 million active home searchers and landlords." }
  ];

  const roadmap = [
    { phase: "Phase 1: VR Viewings", timeline: "Q3 2026", desc: "Integrating immersive 360-degree VR walkthroughs directly on the Property Detail tabs." },
    { phase: "Phase 2: Escrow Accounts", timeline: "Q1 2027", desc: "Introducing digital escrows to secure rental deposits and earnest buying monies." },
    { phase: "Phase 3: Smart IoT Integrations", timeline: "Q3 2027", desc: "Syncing smart locks and water utility meters to tenant dashboards for automated checks." }
  ];

  const testimonials = [
    { quote: "eStatery solved our biggest worry about fake listings. Having RERA checks validated prior to site visits makes it an indispensable PropTech tool.", author: "Rajesh & Meera Iyer", role: "Property Owners, Mumbai" },
    { quote: "Using the price analytics trends chart, we successfully negotiated a 2BHK flat purchase below market average. Incredible platform transparency.", author: "Vikram Malhotra", role: "Tech Lead, Bangalore" },
    { quote: "The canvas-based digital signatures saved us days of courier delays for our tenant lease contracts.", author: "Shalini Kapoor", role: "Landlord, Gurgaon" }
  ];

  const team = [
    { name: "Devendra Verma", role: "CEO & Co-Founder", bio: "Ex-Director of Real Estate Tech, with 15+ years of scaling marketplace startups.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop" },
    { name: "Sunita Deshmukh", role: "Chief Technology Officer", bio: "Leading AI research and engineering. Former Lead Architect at major cloud platforms.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop" },
    { name: "Kunal Singhal", role: "Head of Product", bio: "Dedicated to simplifying landlord-tenant agreements and interactive maps.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop" }
  ];

  const aiFeatures = [
    { title: "AI-Powered Valuation", desc: "Estimate true property values instantly using historical registries and age factors." },
    { title: "ROI Predictive Yields", desc: "Maximize investment margins with dynamic price growth forecasts." },
    { title: "Smart Direct Messaging", desc: "Stateful chat bridging buyers, sellers, tenants, and verified real estate agents." },
    { title: "Leaflet Map Filters", desc: "Browse neighborhoods using custom price labels and nearby facilities toggles." }
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              About eStatery
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Redefining Real Estate with <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Intelligence</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium font-medium">
              We combine RERA compliance, stateful digital workflows, and cutting-edge machine learning algorithms to make property transactions transparent, fast, and secure.
            </p>
          </div>
        </div>

        {/* Company Introduction */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Building className="w-6 h-6" /></div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight">
                India's Most Trusted Digital Real Estate Marketplace
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Founded in 2024, eStatery was created to solve the fundamental lack of transparency and efficiency in traditional real estate. We recognized that searching for a home, booking visits, managing monthly rent payments, and signing leases shouldn't require hundreds of phone calls and complex paperwork.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Today, eStatery serves millions of property owners, buyers, and tenants across metropolitan hubs like Mumbai, Bangalore, Gurgaon, and Hyderabad. Our platform streamlines every transaction from Leaflet map browsing to Razorpay integrations and secure HTML5 E-Signing.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] opacity-20 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop" 
                alt="Modern Architecture Office" 
                className="w-full h-96 object-cover rounded-3xl border border-slate-100 shadow-xl relative z-10" 
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Mission Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500"><Target className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-slate-800">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To democratize property ownership and renting. We empower individuals and companies with instant market intelligence, zero-brokerage direct connections, and certified digital workflows that remove artificial barriers.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] flex items-center justify-center text-[#1D4ED8]"><Eye className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-slate-800">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  To become the standard operating environment for global real estate. We envision a future where property valuation checks, digital lease signings, and rent distributions happen with a single click.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Achievements Timeline */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Milestones</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Our Journey So Far</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-3 relative hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold text-xs"><Calendar className="w-4 h-4" /></div>
                  <span className="font-extrabold text-lg text-slate-800">{item.year}</span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-xs">{item.title}</h4>
                <p className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Future Roadmap</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Product Roadmap Phases</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmap.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-brand-purple border border-purple-100 font-extrabold text-[10px]">{item.timeline}</span>
                    <span className="text-slate-400 text-xs font-semibold">Phase {idx + 1}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{item.phase}</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Statistics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">eStatery in Numbers</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Connecting verified listing inventory with active renters and buyers nationwide.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-3xl border border-slate-200/60 p-6 hover:shadow-md transition-all text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-extrabold text-[#1D4ED8]">{s.value}</div>
                <div className="font-bold text-slate-800 text-sm">{s.label}</div>
                <p className="text-slate-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Powered Real Estate Features */}
        <div className="bg-[#1a0845] py-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-3.5 inline-block">
                AI Core Platform
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold">Next-Gen Real Estate Analytics</h2>
              <p className="text-white/60 text-sm mt-2 font-medium">Skip the broker guess-work. Utilize our proprietary valuation and search models.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiFeatures.map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 text-xs font-bold">{i + 1}</div>
                  <h4 className="font-bold text-sm">{f.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Testimonials */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Testimonials</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-[10px]">— {t.author}</h4>
                    <span className="text-[#1D4ED8] text-[9px] font-bold block mt-0.5">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">Our Core Values</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">The guidelines shaping how we build and support our community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Icon className="w-5 h-5" /></div>
                  <h4 className="font-bold text-slate-800 text-sm">{v.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-slate-50 border-t border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">Leadership Team</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Bringing together technological innovation and deep real estate market expertise.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((t) => (
                <div key={t.name} className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-sm">
                  <img src={t.image} alt={t.name} className="w-24 h-24 rounded-2xl object-cover mb-4 ring-4 ring-slate-50 shadow-md" />
                  <h4 className="font-bold text-slate-800 text-base">{t.name}</h4>
                  <div className="text-[#1D4ED8] font-bold text-xs mt-0.5">{t.role}</div>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed">{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call To Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2.5 max-w-xl text-center md:text-left">
              <h2 className="text-2xl lg:text-3xl font-extrabold">Ready to find your next home?</h2>
              <p className="text-white/80 text-sm">Explore thousands of verified listings on eStatery and leverage our premium valuation tools.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link to="/properties" className="px-6 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs hover:bg-slate-50 shadow-md transition-all flex items-center gap-1.5 font-medium">
                Explore Listings <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
