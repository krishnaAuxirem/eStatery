import { Link } from "react-router-dom";
import { Heart, Search, MapPin, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { formatPrice } from "@/data/properties";
import type { Property } from "@/types";

export default function BuyerSaved() {
  const { user } = useAuth();
  const { allProperties } = useProperty();

  const savedProps = allProperties.filter(p => user?.savedProperties?.includes(p.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[#0F172A] text-xl">Saved Properties <span className="text-[#64748B] font-normal text-base">({savedProps.length})</span></h2>
        <Link to="/properties" className="flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:underline"><Search className="w-4 h-4" /> Find More</Link>
      </div>
      {savedProps.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
          <Heart className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
          <h3 className="font-bold text-[#0F172A] mb-2">No Saved Properties</h3>
          <p className="text-[#64748B] text-sm mb-6">Browse and save your favourites.</p>
          <Link to="/properties" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold">Explore Properties</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {savedProps.map((p: Property) => (
            <Link key={p.id} to={`/properties/${p.id}`} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#1D4ED8]/20 transition-all group">
              <div className="relative h-40 overflow-hidden">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${p.listingType === "buy" ? "bg-[#1D4ED8] text-white" : "bg-[#10B981] text-white"}`}>
                  {p.listingType === "buy" ? "For Sale" : "For Rent"}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-[#0F172A] text-sm truncate">{p.title}</h4>
                <div className="flex items-center gap-1 text-[#64748B] text-xs mt-1"><MapPin className="w-3 h-3 text-[#1D4ED8]" />{p.location.area}, {p.location.city}</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-[#1D4ED8]">{formatPrice(p.price)}</span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs"><Star className="w-3 h-3 fill-current" />{p.rating}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
