import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown, Building2, Map } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/features/PropertyCard";
import SearchBar from "@/components/features/SearchBar";
import EmptyState from "@/components/ui/EmptyState";
import { useProperty } from "@/context/PropertyContext";
import { cn } from "@/lib/utils";
import PropertyMap from "@/components/features/PropertyMap";

const CITIES = ["all", "Mumbai", "Bangalore", "Gurgaon", "Delhi", "Hyderabad", "Chennai", "Pune"];
const TYPES = ["all", "apartment", "villa", "house", "commercial", "studio", "penthouse"];
const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Viewed", value: "views" },
  { label: "Top Rated", value: "rating" }
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const { properties, allProperties, filters, setFilters } = useProperty();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    const type = searchParams.get("type");
    const city = searchParams.get("city");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    setFilters({
      listingType: (type as "buy" | "rent" | "all") || "all",
      city: city || "all",
      type: category || "all",
      search: search || ""
    });
  }, [searchParams, setFilters]);

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sort) {
      case "price_asc": return a.price - b.price;
      case "price_desc": return b.price - a.price;
      case "views": return b.views - a.views;
      case "rating": return b.rating - a.rating;
      default: return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        {/* Search Header */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl font-bold text-white mb-6">
              {filters.listingType === "buy" ? "Properties for Sale" :
               filters.listingType === "rent" ? "Properties for Rent" :
               "All Properties"}
              <span className="text-white/60 text-lg font-normal ml-3">({sortedProperties.length} results)</span>
            </h1>
            <SearchBar variant="page" initialType={filters.listingType === "all" ? "buy" : filters.listingType} />
          </div>
        </div>

        <div className={cn(
          "mx-auto px-4 sm:px-6 py-8 transition-all duration-300",
          showMap ? "max-w-[1500px]" : "max-w-7xl"
        )}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={cn(
              "lg:w-72 shrink-0",
              showFilters ? "block" : "hidden lg:block"
            )}>
              <div className="bg-white rounded-2xl border border-brand-border p-5 sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-brand-text flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-brand-purple" /> Filters
                  </h3>
                  <button onClick={() => setFilters({ listingType: "all", type: "all", city: "all", minPrice: 0, maxPrice: 999999999, bedrooms: 0, minArea: 0, search: "" })} className="text-xs text-brand-purple hover:underline">Reset All</button>
                </div>

                {/* Listing Type */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-3">Listing Type</label>
                  <div className="flex gap-2">
                    {(["all", "buy", "rent"] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setFilters({ listingType: t })}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-sm font-medium capitalize border transition-all",
                          filters.listingType === t
                            ? "bg-brand-purple text-white border-brand-purple"
                            : "bg-white text-brand-muted border-brand-border hover:border-brand-purple hover:text-brand-purple"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-3">Property Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => setFilters({ type: t })}
                        className={cn(
                          "py-2 px-3 rounded-xl text-xs font-medium capitalize border transition-all",
                          filters.type === t
                            ? "bg-brand-purple text-white border-brand-purple"
                            : "bg-white text-brand-muted border-brand-border hover:border-brand-purple hover:text-brand-purple"
                        )}
                      >
                        {t === "all" ? "All Types" : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-3">City</label>
                  <select
                    value={filters.city}
                    onChange={e => setFilters({ city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c === "all" ? "All Cities" : c}</option>)}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-3">Min Bedrooms</label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setFilters({ bedrooms: n })}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-sm font-medium border transition-all",
                          filters.bedrooms === n
                            ? "bg-brand-purple text-white border-brand-purple"
                            : "bg-white text-brand-muted border-brand-border hover:border-brand-purple"
                        )}
                      >
                        {n === 0 ? "Any" : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Listings */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border text-sm font-medium text-brand-text hover:border-brand-purple"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <div className="flex items-center gap-3 ml-auto">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <div className="flex border border-brand-border rounded-xl overflow-hidden">
                    <button onClick={() => setView("grid")} className={cn("p-2", view === "grid" ? "bg-brand-purple text-white" : "bg-white text-brand-muted hover:bg-gray-50")}>
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setView("list")} className={cn("p-2", view === "list" ? "bg-brand-purple text-white" : "bg-white text-brand-muted hover:bg-gray-50")}>
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border text-sm font-medium transition-all hover:border-brand-purple hover:text-brand-purple",
                      showMap ? "bg-brand-purple text-white border-brand-purple hover:text-white" : "bg-white text-brand-muted"
                    )}
                  >
                    <Map className="w-4 h-4" />
                    <span className="hidden md:inline">{showMap ? "Hide Map" : "Show Map"}</span>
                  </button>
                </div>
              </div>

              {sortedProperties.length === 0 ? (
                <EmptyState
                  icon={Building2}
                  title="No Properties Found"
                  description="We couldn't find any properties matching your current filter selections. Try clearing your filters or adjusting your search queries."
                  actionLabel="Reset Filters"
                  onActionClick={() => setFilters({ listingType: "all", type: "all", city: "all", minPrice: 0, maxPrice: 999999999, bedrooms: 0, minArea: 0, search: "" })}
                />
              ) : (
                <div className={cn(
                  "grid gap-5",
                  view === "grid" 
                    ? (showMap ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3") 
                    : "grid-cols-1"
                )}>
                  {sortedProperties.map(p => (
                    <PropertyCard key={p.id} property={p} variant={view === "list" ? "featured" : "default"} />
                  ))}
                </div>
              )}
            </main>

            {showMap && sortedProperties.length > 0 && (
              <aside className="w-full lg:w-[450px] xl:w-[520px] shrink-0 lg:sticky lg:top-24 h-[550px] z-10">
                <PropertyMap properties={sortedProperties} />
              </aside>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
