import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const CITIES = ["Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad", "Chennai", "Pune"];
const PROPERTY_TYPES = ["Apartment", "Villa", "House", "Studio", "Commercial", "Penthouse"];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== "buy") params.set("type", activeTab);
    if (city !== "all") params.set("city", city);
    if (propertyType !== "all") params.set("category", propertyType.toLowerCase());
    if (search) params.set("search", search);
    navigate(`/properties?${params.toString()}`);
  };

  if (variant === "page") {
    return (
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-2xl border border-brand-border shadow-card">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-brand-border">
          <Search className="w-4 h-4 text-brand-muted shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="flex-1 text-sm outline-none text-brand-text placeholder-brand-muted"
          />
        </div>
        <select value={city} onChange={e => setCity(e.target.value)} className="px-3 py-2 rounded-xl border border-brand-border text-sm text-brand-text outline-none">
          <option value="all">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-semibold text-sm hover:shadow-brand transition-all">
          Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-white/10 backdrop-blur-sm p-1 rounded-2xl w-fit">
        {(["buy", "rent"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all duration-200",
              activeTab === tab
                ? "bg-white text-brand-purple shadow-md"
                : "text-white/80 hover:text-white"
            )}
          >
            {tab === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-brand-lg flex flex-col sm:flex-row gap-2">
        {/* Location */}
        <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl border border-brand-border hover:border-purple-300 transition-colors">
          <MapPin className="w-5 h-5 text-brand-purple shrink-0" />
          <select
            value={city}
            onChange={e => setCity(e.target.value)}
            className="flex-1 text-sm text-brand-text outline-none bg-transparent"
          >
            <option value="all">All Cities</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-2 sm:w-48 px-4 py-3 rounded-xl border border-brand-border hover:border-purple-300 transition-colors">
          <Home className="w-5 h-5 text-brand-purple shrink-0" />
          <select
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className="flex-1 text-sm text-brand-text outline-none bg-transparent"
          >
            <option value="all">Property Type</option>
            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Keyword */}
        <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl border border-brand-border hover:border-purple-300 transition-colors">
          <Search className="w-5 h-5 text-brand-purple shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Keyword, area, project..."
            className="flex-1 text-sm text-brand-text placeholder-brand-muted outline-none bg-transparent"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold text-sm hover:shadow-brand hover:scale-[1.02] transition-all duration-200 whitespace-nowrap flex items-center gap-2"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-white/60 text-xs">Popular:</span>
        {["Mumbai BKC", "Bangalore Whitefield", "Gurgaon DLF Phase 5", "Hyderabad HITEC"].map(s => (
          <button
            key={s}
            onClick={() => { setSearch(s); }}
            className="text-xs text-white/70 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
