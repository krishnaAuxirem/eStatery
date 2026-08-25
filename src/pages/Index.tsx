import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Shield, Brain, Zap, MapPin, ChevronRight, Building2, Home, Warehouse, Compass, Building, Ruler } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/features/SearchBar";
import StatsCounter from "@/components/features/StatsCounter";
import PropertyCard from "@/components/features/PropertyCard";
import SectionHeader from "@/components/features/SectionHeader";
import { FEATURED_PROPERTIES } from "@/data/properties";
import { AGENTS } from "@/data/agents";
import { BLOGS } from "@/data/blogs";
import heroBg from "@/assets/hero-bg.jpg";
import cityMumbai from "@/assets/city-mumbai.jpg";
import cityBangalore from "@/assets/city-bangalore.jpg";
import cityDelhi from "@/assets/city-delhi.jpg";
import cityHyderabad from "@/assets/city-hyderabad.jpg";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LOCATIONS = [
  { city: "Mumbai", properties: 34218, image: cityMumbai, trend: "+12.4%" },
  { city: "Bangalore", properties: 28942, image: cityBangalore, trend: "+18.2%" },
  { city: "Delhi NCR", properties: 31450, image: cityDelhi, trend: "+9.8%" },
  { city: "Hyderabad", properties: 19320, image: cityHyderabad, trend: "+21.3%" }
];

const FEATURES = [
  { icon: Brain, title: "AI-Powered Matching", desc: "Smart algorithms analyze 200+ data points to find your perfect property match with 96% accuracy." },
  { icon: Shield, title: "Verified Listings", desc: "Every property is verified by our team. RERA registered projects with full legal compliance checks." },
  { icon: Zap, title: "Instant Virtual Tours", desc: "Take immersive 360° virtual tours from anywhere, powered by our proprietary AI rendering engine." },
  { icon: TrendingUp, title: "Investment Analytics", desc: "Real-time price forecasting and ROI calculators to make data-driven investment decisions." }
];

const TESTIMONIALS = [
  {
    name: "Rahul Gupta", role: "Property Investor, Mumbai",
    text: "eStatery's AI recommendations helped me identify an undervalued property in Navi Mumbai that appreciated 28% in 18 months. The analytics are genuinely game-changing.",
    rating: 5, avatar: "R"
  },
  {
    name: "Sneha Krishnamurthy", role: "Home Buyer, Bangalore",
    text: "Found my dream home in just 2 weeks using eStatery. The virtual tours saved so much time, and their agent Rajan was incredibly helpful throughout the entire process.",
    rating: 5, avatar: "S"
  },
  {
    name: "Aditya Bhatia", role: "Property Developer, Gurgaon",
    text: "As a developer, eStatery's seller dashboard and lead management tools have transformed how we sell inventory. Inquiries up 340% since listing here.",
    rating: 5, avatar: "A"
  }
];

const CATEGORIES = [
  { label: "Apartments", count: 48320, icon: Building2, color: "bg-blue-50 border-blue-100 text-[#1D4ED8]", href: "/properties?category=apartment" },
  { label: "Villas", count: 12480, icon: Home, color: "bg-emerald-50 border-emerald-100 text-emerald-600", href: "/properties?category=villa" },
  { label: "Commercial", count: 8940, icon: Warehouse, color: "bg-purple-50 border-purple-100 text-purple-600", href: "/properties?category=commercial" },
  { label: "Penthouses", count: 3210, icon: Compass, color: "bg-amber-50 border-amber-100 text-amber-600", href: "/properties?category=penthouse" },
  { label: "Studios", count: 18720, icon: Building, color: "bg-pink-50 border-pink-100 text-pink-600", href: "/properties?category=studio" },
  { label: "Plots", count: 9840, icon: Ruler, color: "bg-indigo-50 border-indigo-100 text-indigo-600", href: "/properties?category=plot" }
];

const FAQS = [
  { q: "How does eStatery's AI property matching work?", a: "Our AI analyzes your search behavior, preferences, and requirements against 200+ property attributes including location scores, price history, infrastructure proximity, and growth potential to surface the most relevant matches." },
  { q: "Are all properties on eStatery verified?", a: "Yes. Every listing goes through a 3-step verification process: document verification, RERA registration check, and a physical/virtual inspection by our team before being published as 'Verified'." },
  { q: "What are the charges for posting a property?", a: "Basic listings are free for property owners. Our premium listing packages offer featured placement, AI-powered marketing, and analytics dashboards starting at ₹999/month." },
  { q: "How do I schedule a property visit?", a: "You can instantly book a physical visit or virtual tour directly from any property listing page. Select your preferred date and time, and the owner/agent will confirm within 2 hours." },
  { q: "Is eStatery available in Tier-2 cities?", a: "Yes! We're live in 50+ cities across India including emerging markets like Indore, Coimbatore, Lucknow, Jaipur, Vadodara, and Kochi — with 12 new cities launching this quarter." }
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-66px)] flex items-center overflow-hidden pt-16 pb-8 lg:pt-20 lg:pb-12">
        {/* BG */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="eStatery Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a2e]/95 via-[#1a0845]/85 to-[#0d0630]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a2e]/90 via-transparent to-transparent" />
        </div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-10 lg:pt-6 lg:pb-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Content + CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                AI-Powered Real Estate Intelligence Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Discover Smart Real Estate with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300">
                  AI-Powered Property Intelligence
                </span>
              </h1>

              <p className="text-lg text-white/75 leading-relaxed max-w-xl">
                Buy, sell, rent, and manage modern properties through a premium AI-driven real estate ecosystem trusted by 2M+ customers across India.
              </p>

              <div className="w-full pt-2">
                <SearchBar variant="hero" />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/properties"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-semibold hover:shadow-glow hover:scale-[1.02] transition-all duration-200"
                >
                  Explore Properties <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/post-property"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  Post Property
                </Link>
              </div>
            </div>

            {/* Right Column: Analytics Cards & AI Matches */}
            <div className="lg:col-span-5 flex flex-col gap-5 relative">
              {/* AI Matching Simulator Widget */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-brand-lg border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#1D4ED8]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">eStatery AI Matcher</h3>
                    <p className="text-xs text-slate-400">Match Accuracy: 96%</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed italic">
                    "Finding 3 BHK apartments in Bangalore under ₹1.5 Cr with high appreciation potential..."
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#10B981] rounded-full" style={{ width: "96%" }} />
                    </div>
                    <span className="text-xs font-bold text-[#1D4ED8]">96%</span>
                  </div>
                </div>
              </div>

              {/* Stats Appreciation Cards */}
              <div className="flex gap-4">
                <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-brand-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Appreciation</div>
                    <div className="text-lg font-extrabold text-slate-800">+14.2%</div>
                  </div>
                </div>

                <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-brand-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#1D4ED8]" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Verified Ads</div>
                    <div className="text-lg font-extrabold text-slate-800">100%</div>
                  </div>
                </div>
              </div>

              {/* Star Ratings card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-brand-lg border border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-slate-800">4.9 / 5 Rating</div>
                  <div className="text-xs text-slate-400">from 280K+ customer reviews</div>
                </div>
                <div className="flex -space-x-3 overflow-hidden shrink-0">
                  {["A", "R", "S"].map((initial, i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    >
                      {initial}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsCounter />

      {/* FEATURED PROPERTIES */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              badge="Featured Listings"
              title="Premium **Properties** Handpicked by AI"
              subtitle="Our AI curates the most sought-after properties based on value, growth potential, and lifestyle fit."
              centered={false}
            />
            <Link to="/properties" className="hidden sm:flex items-center gap-2 text-[#1D4ED8] font-semibold hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {FEATURED_PROPERTIES.slice(0, 3).map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/properties" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-semibold hover:shadow-brand transition-all">
              Explore All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR LOCATIONS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Top Locations"
            title="Explore Properties Across **India's** Best Cities"
            subtitle="From Mumbai's skyline to Bangalore's tech corridor — find your perfect address."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map(loc => (
              <Link
                key={loc.city}
                to={`/properties?city=${loc.city}`}
                className="group relative overflow-hidden rounded-2xl h-52 cursor-pointer hover-lift"
              >
                <img src={loc.image} alt={loc.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-white/80 text-sm mb-1">
                        <MapPin className="w-3.5 h-3.5" /> {loc.city}
                      </div>
                      <div className="text-white font-bold text-lg">{loc.properties.toLocaleString()}+ Properties</div>
                    </div>
                    <div className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg">
                      {loc.trend}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY CATEGORIES */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Categories"
            title="Find by **Property** Type"
            subtitle="Browse through India's most comprehensive property category database."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => {
              const IconComponent = cat.icon;
              return (
                <Link
                  key={cat.label}
                  to={cat.href}
                  className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-2xl border hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 group",
                    cat.color.split(" ")[0], cat.color.split(" ")[1]
                  )}
                >
                  <IconComponent className={cn("w-10 h-10 mb-1", cat.color.split(" ")[2])} />
                  <div className="text-center">
                    <div className="font-semibold text-brand-text text-sm group-hover:text-[#1D4ED8] transition-colors">{cat.label}</div>
                    <div className="text-brand-muted text-xs mt-0.5">{(cat.count / 1000).toFixed(0)}K+ listings</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY ESTATERY */}
      <section className="py-16 bg-gradient-to-br from-[#1a0845] to-[#0d0630] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Why eStatery"
            title="The **Intelligent** Real Estate Platform"
            subtitle="We combine cutting-edge AI with deep real estate expertise to deliver unparalleled property intelligence."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED AGENTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              badge="Top Agents"
              title="Meet Our **Expert** Real Estate Agents"
              subtitle="Verified professionals with proven track records in India's premium markets."
              centered={false}
            />
            <Link to="/agents" className="hidden sm:flex items-center gap-2 text-[#1D4ED8] font-semibold hover:gap-3 transition-all">
              All Agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGENTS.map(agent => (
              <Link key={agent.id} to={`/agents/${agent.id}`} className="group bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-brand-text group-hover:text-[#1D4ED8] transition-colors">{agent.name}</h3>
                      {agent.verified && <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">✓ Verified</span>}
                    </div>
                    <p className="text-brand-muted text-sm">{agent.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-brand-text">{agent.rating}</span>
                      <span className="text-brand-muted text-xs">({agent.reviews})</span>
                    </div>
                  </div>
                </div>
                <p className="text-brand-muted text-sm line-clamp-2 mb-4">{agent.bio}</p>
                <div className="flex gap-4 text-sm border-t border-brand-border pt-4">
                  <div className="text-center">
                    <div className="font-bold text-brand-text">{agent.totalSales}</div>
                    <div className="text-brand-muted text-xs">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-brand-text">{agent.totalRentals}</div>
                    <div className="text-brand-muted text-xs">Rentals</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-brand-text">{agent.experience}yr</div>
                    <div className="text-brand-muted text-xs">Experience</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Testimonials"
            title="What Our **Customers** Say"
            subtitle="Join 2M+ satisfied customers who've found their perfect property through eStatery."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-brand-muted text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-text text-sm">{t.name}</div>
                    <div className="text-brand-muted text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              badge="Latest Insights"
              title="AI Real Estate **Intelligence** Hub"
              subtitle="Expert analysis, market reports, and data-driven investment insights."
              centered={false}
            />
            <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[#1D4ED8] font-semibold hover:gap-3 transition-all">
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS.filter(b => b.featured).slice(0, 3).map(blog => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="group block bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold">{blog.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-brand-muted text-xs mb-3">
                    <span>{blog.author}</span>
                    <span>·</span>
                    <span>{blog.readTime} min read</span>
                    <span>·</span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                  <h3 className="font-bold text-brand-text leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-brand-muted text-sm mt-2 line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="FAQ"
            title="Frequently Asked **Questions**"
            subtitle="Everything you need to know about buying, selling, and renting on eStatery."
          />
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-brand-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-brand-text text-sm">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-[#1D4ED8] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-brand-muted text-sm leading-relaxed border-t border-brand-border">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join 2 million+ property seekers who trust eStatery's AI-powered platform to discover their ideal home or investment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="px-8 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold hover:shadow-lg hover:scale-[1.02] transition-all">
              Get Started Free
            </Link>
            <Link to="/properties" className="px-8 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white font-bold hover:bg-white/25 transition-all">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
