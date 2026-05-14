import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, ChevronDown, Home, Search, Building2, Users, Brain,
  BookOpen, Phone, LogIn, UserPlus, LayoutDashboard, LogOut,
  Bell, Heart, User, Briefcase, TrendingUp, MapPin, Star,
  Landmark, BarChart2, FileText, Calculator, Zap, ArrowRight,
  Shield, HelpCircle, MessageSquare, CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

/* ─── Mega Menu Data ──────────────────────────────────────────── */
const FOR_BUYERS = {
  sections: [
    {
      title: "Search Properties",
      items: [
        { label: "Buy Apartments", href: "/properties?type=buy&category=apartment", icon: Building2, desc: "Flats & apartments for sale" },
        { label: "Buy Villas", href: "/properties?type=buy&category=villa", icon: Home, desc: "Independent villas & houses" },
        { label: "Luxury Homes", href: "/properties?type=buy&category=penthouse", icon: Star, desc: "Penthouses & premium homes" },
        { label: "Commercial Spaces", href: "/properties?category=commercial", icon: Briefcase, desc: "Offices, shops & warehouses" },
      ],
    },
    {
      title: "Tools & Insights",
      items: [
        { label: "Price Trends", href: "/ai-insights", icon: TrendingUp, desc: "Market analysis & forecasts" },
        { label: "AI Recommendations", href: "/ai-insights", icon: Brain, desc: "Personalised property picks" },
        { label: "Investment Guide", href: "/ai-insights#guide", icon: BarChart2, desc: "ROI & yield calculator" },
        { label: "Area Reports", href: "/ai-insights", icon: MapPin, desc: "Locality insights & ratings" },
      ],
    },
  ],
  cta: { label: "Explore All Properties →", href: "/properties" },
};

const FOR_TENANTS = {
  sections: [
    {
      title: "Find Rentals",
      items: [
        { label: "Rent Apartments", href: "/properties?type=rent&category=apartment", icon: Building2, desc: "1, 2 & 3 BHK flats for rent" },
        { label: "Studio Apartments", href: "/properties?type=rent&category=studio", icon: Home, desc: "Compact studios for singles" },
        { label: "PG / Co-living", href: "/properties?type=rent", icon: Users, desc: "Fully managed shared spaces" },
        { label: "Office Rentals", href: "/properties?type=rent&category=commercial", icon: Briefcase, desc: "Managed office spaces" },
      ],
    },
    {
      title: "Tenant Services",
      items: [
        { label: "Rent Agreement", href: "/contact", icon: FileText, desc: "Digital lease & e-stamp" },
        { label: "Maintenance Hub", href: "/dashboard/tenant", icon: CheckCircle2, desc: "Raise & track requests" },
        { label: "Rent Receipts", href: "/dashboard/tenant", icon: Landmark, desc: "Instant rent receipts" },
        { label: "Renter's Guide", href: "/blog", icon: BookOpen, desc: "Tips for first-time renters" },
      ],
    },
  ],
  cta: { label: "Browse Rental Listings →", href: "/properties?type=rent" },
};

const FOR_SELLERS = {
  sections: [
    {
      title: "List & Sell",
      items: [
        { label: "Post Free Property", href: "/post-property", icon: Zap, desc: "List in under 5 minutes" },
        { label: "Seller Dashboard", href: "/dashboard/seller", icon: LayoutDashboard, desc: "Manage your listings" },
        { label: "Pricing Insights", href: "/ai-insights", icon: TrendingUp, desc: "Get the best price for your home" },
        { label: "Find an Agent", href: "/agents", icon: Users, desc: "Verified agents near you" },
      ],
    },
    {
      title: "Seller Resources",
      items: [
        { label: "Legal Guidance", href: "/contact", icon: Shield, desc: "Documents, RERA & more" },
        { label: "Market Reports", href: "/ai-insights", icon: BarChart2, desc: "City-wise trend reports" },
        { label: "Seller FAQs", href: "/contact", icon: HelpCircle, desc: "Common seller questions" },
        { label: "Success Stories", href: "/blog", icon: Star, desc: "Hear from top sellers" },
      ],
    },
  ],
  cta: { label: "Post Property FREE →", href: "/post-property" },
};

const SERVICES_MENU = [
  { label: "Home Loans", icon: Landmark, desc: "Compare rates & apply", href: "/ai-insights" },
  { label: "Legal Services", icon: Shield, desc: "Title check, drafting", href: "/contact" },
  { label: "Virtual Tours", icon: Brain, desc: "3D walkthroughs", href: "/properties" },
  { label: "AI Valuation", icon: Calculator, desc: "Instant price estimate", href: "/ai-insights" },
  { label: "Moving Help", icon: Home, desc: "Packing & shifting", href: "/contact" },
  { label: "Property Mgmt", icon: Briefcase, desc: "End-to-end solutions", href: "/dashboard/seller" },
];

const NEWS_MENU = [
  { label: "Market Insights", href: "/ai-insights", icon: TrendingUp },
  { label: "Property News", href: "/blog", icon: BookOpen },
  { label: "Guides & Tips", href: "/blog", icon: HelpCircle },
  { label: "Video Tours", href: "/properties", icon: Brain },
];

/* ─── Types ─────────────────────────────────────────────────────── */
type MegaKey = "buyers" | "tenants" | "sellers" | "services" | "news" | null;

/* ─── Sub-components ─────────────────────────────────────────────── */
const MegaMenuWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute top-full left-0 pt-3 z-50 w-[780px] max-w-[calc(100vw-2rem)]">
    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden">
      {children}
    </div>
  </div>
);

interface SectionedMegaProps {
  data: typeof FOR_BUYERS;
  accentColor?: string;
}
const SectionedMega = ({ data, accentColor = "text-[#1D4ED8]" }: SectionedMegaProps) => (
  <div className="p-5">
    <div className="grid grid-cols-2 gap-6">
      {data.sections.map(sec => (
        <div key={sec.title}>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">{sec.title}</p>
          <div className="space-y-1">
            {sec.items.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 group transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                  <item.icon className={cn("w-4 h-4", accentColor)} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-[#1D4ED8] leading-tight transition-colors">{item.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t border-slate-100">
      <Link
        to={data.cta.href}
        className="flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:text-blue-800 transition-colors"
      >
        <ArrowRight className="w-4 h-4" /> {data.cta.label}
      </Link>
    </div>
  </div>
);

/* ─── Main Navbar ─────────────────────────────────────────────────── */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  const openMega = (key: MegaKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(key);
  };
  const closeMega = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 120);
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    const routes: Record<string, string> = {
      buyer: "/dashboard/buyer",
      seller: "/dashboard/seller",
      agent: "/dashboard/agent",
      tenant: "/dashboard/tenant",
      admin: "/dashboard/admin",
    };
    return routes[user.role] || "/dashboard/buyer";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ── Nav item style helpers ── */
  const navItemCls = (key?: MegaKey) =>
    cn(
      "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 select-none cursor-pointer whitespace-nowrap",
      activeMega === key
        ? "text-[#1D4ED8] bg-blue-50"
        : "text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50"
    );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-slate-100"
            : "bg-white border-b border-slate-100"
        )}
      >
        {/* ── Top Bar ──────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[66px] gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center shadow-md group-hover:shadow-[0_4px_20px_rgba(29,78,216,0.4)] transition-shadow">
                <span className="text-white font-extrabold text-lg leading-none">e</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-extrabold text-slate-900 tracking-tight">eStatery</span>
                <span className="text-[9px] font-semibold text-[#1D4ED8] tracking-[0.12em] uppercase -mt-0.5">AI Real Estate</span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {/* For Buyers */}
              <div
                className="relative"
                onMouseEnter={() => openMega("buyers")}
                onMouseLeave={closeMega}
              >
                <button className={navItemCls("buyers")}>
                  For Buyers <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMega === "buyers" && "rotate-180")} />
                </button>
                {activeMega === "buyers" && (
                  <MegaMenuWrapper>
                    <div className="flex items-center gap-2 px-5 pt-4 pb-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <Home className="w-4 h-4 text-[#1D4ED8]" />
                      <span className="text-sm font-bold text-[#1D4ED8]">For Buyers</span>
                      <span className="ml-auto text-xs text-slate-400">Search, discover & invest in properties</span>
                    </div>
                    <SectionedMega data={FOR_BUYERS} />
                  </MegaMenuWrapper>
                )}
              </div>

              {/* For Tenants */}
              <div
                className="relative"
                onMouseEnter={() => openMega("tenants")}
                onMouseLeave={closeMega}
              >
                <button className={navItemCls("tenants")}>
                  For Tenants <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMega === "tenants" && "rotate-180")} />
                </button>
                {activeMega === "tenants" && (
                  <MegaMenuWrapper>
                    <div className="flex items-center gap-2 px-5 pt-4 pb-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700">For Tenants</span>
                      <span className="ml-auto text-xs text-slate-400">Find rentals & manage your lease</span>
                    </div>
                    <SectionedMega data={FOR_TENANTS} accentColor="text-emerald-600" />
                  </MegaMenuWrapper>
                )}
              </div>

              {/* For Sellers */}
              <div
                className="relative"
                onMouseEnter={() => openMega("sellers")}
                onMouseLeave={closeMega}
              >
                <button className={navItemCls("sellers")}>
                  For Sellers <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMega === "sellers" && "rotate-180")} />
                </button>
                {activeMega === "sellers" && (
                  <MegaMenuWrapper>
                    <div className="flex items-center gap-2 px-5 pt-4 pb-3 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50">
                      <Briefcase className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-amber-700">For Sellers</span>
                      <span className="ml-auto text-xs text-slate-400">List, sell & manage your property</span>
                    </div>
                    <SectionedMega data={FOR_SELLERS} accentColor="text-amber-600" />
                  </MegaMenuWrapper>
                )}
              </div>

              {/* Services */}
              <div
                className="relative"
                onMouseEnter={() => openMega("services")}
                onMouseLeave={closeMega}
              >
                <button className={navItemCls("services")}>
                  Services <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMega === "services" && "rotate-180")} />
                </button>
                {activeMega === "services" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-72">
                    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-slate-100 p-3">
                      {SERVICES_MENU.map(s => (
                        <Link
                          key={s.label}
                          to={s.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 group transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                            <s.icon className="w-4 h-4 text-[#1D4ED8]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-[#1D4ED8] leading-tight">{s.label}</p>
                            <p className="text-xs text-slate-400">{s.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* News & Guide */}
              <div
                className="relative"
                onMouseEnter={() => openMega("news")}
                onMouseLeave={closeMega}
              >
                <button className={navItemCls("news")}>
                  News &amp; Guide <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMega === "news" && "rotate-180")} />
                </button>
                {activeMega === "news" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-52">
                    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-slate-100 p-2">
                      {NEWS_MENU.map(n => (
                        <Link
                          key={n.label}
                          to={n.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 group transition-colors text-sm font-medium text-slate-700 hover:text-[#1D4ED8]"
                        >
                          <n.icon className="w-4 h-4 text-[#1D4ED8]" />
                          {n.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/agents" className={navItemCls()}>Agents</Link>
              <Link to="/contact" className={navItemCls()}>Contact</Link>
            </div>

            {/* ── Right Side Actions ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {isAuthenticated && user ? (
                <>
                  {/* Notification bell */}
                  <button className="relative p-2 rounded-lg text-slate-500 hover:text-[#1D4ED8] hover:bg-blue-50 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
                  </button>
                  {/* Dashboard */}
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  {/* Avatar dropdown */}
                  <UserDropdown user={user} getDashboardLink={getDashboardLink} handleLogout={handleLogout} />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-[7px] rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:border-[#1D4ED8] hover:text-[#1D4ED8] hover:bg-blue-50 transition-all"
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-[7px] rounded-xl text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-blue-800 transition-all shadow-sm"
                  >
                    <UserPlus className="w-4 h-4" /> Register
                  </Link>
                </>
              )}

              {/* Post Property CTA - hidden on smaller screens when authenticated */}
              <Link
                to="/post-property"
                className="hidden xl:flex items-center gap-1.5 ml-1 px-4 py-[7px] rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1e40af] hover:to-[#1D4ED8] shadow-md hover:shadow-[0_4px_20px_rgba(29,78,216,0.35)] transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Post Property
                <span className="ml-1 text-[9px] font-extrabold bg-[#10B981] text-white px-1.5 py-0.5 rounded-full tracking-wide leading-tight">FREE</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {[
                { key: "buyers", label: "For Buyers", data: FOR_BUYERS },
                { key: "tenants", label: "For Tenants", data: FOR_TENANTS },
                { key: "sellers", label: "For Sellers", data: FOR_SELLERS },
              ].map(section => (
                <div key={section.key}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === section.key ? null : section.key)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {section.label}
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", mobileExpanded === section.key && "rotate-180")} />
                  </button>
                  {mobileExpanded === section.key && (
                    <div className="ml-2 mb-2 space-y-1 bg-slate-50 rounded-xl p-2">
                      {section.data.sections.flatMap(s => s.items).map(item => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white text-sm text-slate-700 hover:text-[#1D4ED8] transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {[
                { label: "Services", href: "/contact" },
                { label: "Agents", href: "/agents" },
                { label: "News & Guide", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-slate-100 pt-3 mt-3 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-xl">
                      <div className="w-9 h-9 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm">{user.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <Link to={getDashboardLink()} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-[#1D4ED8] font-semibold text-sm">
                      <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#1D4ED8] text-[#1D4ED8] font-bold text-sm hover:bg-blue-50 transition-colors">
                      <LogIn className="w-4 h-4" /> Login
                    </Link>
                    <Link to="/register" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1D4ED8] text-white font-bold text-sm hover:bg-blue-800 transition-colors">
                      <UserPlus className="w-4 h-4" /> Create Account
                    </Link>
                  </>
                )}
                <Link to="/post-property" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold text-sm">
                  <Zap className="w-4 h-4" /> Post Property FREE
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[66px]" />
    </>
  );
};

/* ─── UserDropdown ──────────────────────────────────────────────── */
interface UserDropdownProps {
  user: any;
  getDashboardLink: () => string;
  handleLogout: () => void;
}

const UserDropdown = ({ user, getDashboardLink, handleLogout }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {user.name.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-slate-700 max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full right-0 pt-2 w-56 z-50">
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize mt-0.5">{user.role} Account</p>
            </div>
            <div className="p-2">
              <Link to={getDashboardLink()} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50 font-medium transition-colors">
                <LayoutDashboard className="w-4 h-4 text-[#1D4ED8]" /> Dashboard
              </Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50 font-medium transition-colors">
                <User className="w-4 h-4 text-[#1D4ED8]" /> My Profile
              </Link>
              <Link to="/saved-properties" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50 font-medium transition-colors">
                <Heart className="w-4 h-4 text-[#1D4ED8]" /> Saved Properties
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50 font-medium transition-colors">
                <MessageSquare className="w-4 h-4 text-[#1D4ED8]" /> Support
              </Link>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button onClick={() => { setOpen(false); handleLogout(); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
