import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CITIES = ["Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad", "Chennai", "Pune"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Plot", "Commercial", "Office", "Shop"];

interface SearchBarProps {
  variant?: "hero" | "page";
  initialType?: "buy" | "rent";
}

const SearchBar: React.FC<SearchBarProps> = ({ variant = "hero", initialType = "buy" }) => {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">(initialType);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const navigate = useNavigate();

  // Sync state if initialType changes (e.g., when route parameters change in marketplace)
  useEffect(() => {
    setActiveTab(initialType);
  }, [initialType]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", activeTab);
    if (city !== "all") params.set("city", city);
    if (propertyType !== "all") params.set("category", propertyType.toLowerCase());
    if (search) params.set("search", search);
    navigate(`/properties?${params.toString()}`);
  };

  const handleTabChange = (tab: "buy" | "rent") => {
    setActiveTab(tab);
    // If we are on the search page (variant === "page"), update the results immediately!
    if (variant === "page") {
      const params = new URLSearchParams();
      params.set("type", tab);
      if (city !== "all") params.set("city", city);
      if (propertyType !== "all") params.set("category", propertyType.toLowerCase());
      if (search) params.set("search", search);
      navigate(`/properties?${params.toString()}`);
    }
  };

  const placeholderText = activeTab === "buy" 
    ? "Search apartments, villas, plots for sale..." 
    : "Search apartments, PGs, rental homes...";

  return (
    <div className="w-full max-w-4xl flex flex-col">
      {/* Buy / Rent Mode Toggle - aligned directly above the search bar card */}
      <div className="flex gap-1.5 mb-1.5 ml-1">
        {(["buy", "rent"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={cn(
              "px-6 py-2.5 rounded-t-2xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border-b-2",
              activeTab === tab
                ? "bg-white text-[#1D4ED8] border-[#1D4ED8] shadow-sm relative z-10"
                : "bg-white/10 text-white border-transparent hover:bg-white/20 hover:text-white"
            )}
          >
            {tab === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Unified Search Card */}
      <div className={cn(
        "bg-white rounded-3xl rounded-tl-none p-5 border border-[#E2E8F0] shadow-brand-lg w-full transition-all duration-300",
        variant === "page" && "shadow-card rounded-2xl rounded-tl-none p-4"
      )}>
        {/* Unified Responsive Search Form Row */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* City Selection */}
          <div className="flex flex-col px-4 py-2 rounded-xl border border-[#E2E8F0] hover:border-slate-300 focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/10 transition-all bg-white col-span-1 lg:col-span-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" /> Location
            </label>
            <div className="relative flex items-center mt-0.5">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="text-sm font-semibold text-slate-800 outline-none bg-transparent h-7 cursor-pointer w-full pr-6 appearance-none"
              >
                <option value="all">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Property Type Selection */}
          <div className="flex flex-col px-4 py-2 rounded-xl border border-[#E2E8F0] hover:border-slate-300 focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/10 transition-all bg-white col-span-1 lg:col-span-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#1D4ED8]" /> Property Type
            </label>
            <div className="relative flex items-center mt-0.5">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="text-sm font-semibold text-slate-800 outline-none bg-transparent h-7 cursor-pointer w-full pr-6 appearance-none"
              >
                <option value="all">Any Type</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Keyword Search Input */}
          <div className="flex flex-col px-4 py-2 rounded-xl border border-[#E2E8F0] hover:border-slate-300 focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/10 transition-all bg-white col-span-1 md:col-span-1 lg:col-span-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-[#1D4ED8]" /> Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholderText}
              className="text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none bg-transparent h-7 w-full mt-0.5"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="h-12 w-full lg:col-span-2 md:col-span-1 col-span-1 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1e40af] hover:to-[#1D4ED8] text-white font-bold text-sm shadow-md hover:shadow-[0_4px_20px_rgba(29,78,216,0.35)] transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <Search className="w-4 h-4" /> Search
          </button>
        </form>
      </div>

      {/* Popular Suggestions list (Only on Hero variant for cleaner layout) */}
      {variant === "hero" && (
        <div className="flex flex-wrap items-center gap-2 mt-4 px-2">
          <span className="text-white/60 text-xs font-semibold">Popular Searches:</span>
          {["Mumbai BKC", "Bangalore Whitefield", "Gurgaon DLF Phase 5", "Hyderabad HITEC"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSearch(s);
              }}
              className="text-xs text-white/70 hover:text-white px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 hover:border-white/30"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
