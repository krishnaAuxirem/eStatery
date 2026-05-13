import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart, MapPin, Bed, Bath, Maximize2, Car, Star, Eye,
  Verified, Video, Zap, ArrowRight
} from "lucide-react";
import type { Property } from "@/types";
import { formatPrice } from "@/data/properties";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "compact" | "featured";
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, variant = "default" }) => {
  const { user, toggleSaveProperty } = useAuth();
  const [imgIdx, setImgIdx] = useState(0);
  const isSaved = user?.savedProperties?.includes(property.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to save properties");
      return;
    }
    toggleSaveProperty(property.id);
    toast.success(isSaved ? "Removed from saved" : "Saved to wishlist");
  };

  const typeColors: Record<string, string> = {
    apartment: "bg-blue-100 text-blue-700",
    villa: "bg-emerald-100 text-emerald-700",
    house: "bg-amber-100 text-amber-700",
    commercial: "bg-purple-100 text-purple-700",
    studio: "bg-pink-100 text-pink-700",
    penthouse: "bg-indigo-100 text-indigo-700"
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className={cn(
        "group bg-white rounded-2xl border border-brand-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 block",
        variant === "featured" && "lg:flex"
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative overflow-hidden bg-gray-100",
        variant === "featured" ? "lg:w-2/5 h-56 lg:h-auto" : "h-52"
      )}>
        <img
          src={property.images[imgIdx]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize backdrop-blur-sm",
            typeColors[property.type] || "bg-gray-100 text-gray-700"
          )}>
            {property.type}
          </span>
          <span className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm",
            property.listingType === "buy" ? "bg-brand-purple text-white" : "bg-brand-emerald text-white"
          )}>
            {property.listingType === "buy" ? "For Sale" : "For Rent"}
          </span>
        </div>

        {/* Actions top right */}
        <div className="absolute top-3 right-3 flex gap-2">
          {property.virtualTour && (
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
              <Video className="w-4 h-4 text-brand-purple" />
            </div>
          )}
          <button
            onClick={handleSave}
            className={cn(
              "w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all",
              isSaved ? "text-red-500" : "text-gray-400 hover:text-red-400"
            )}
          >
            <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
          </button>
        </div>

        {/* Image nav dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.preventDefault(); setImgIdx(i); }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  i === imgIdx ? "bg-white w-4" : "bg-white/60"
                )}
              />
            ))}
          </div>
        )}

        {property.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/90 backdrop-blur-sm text-amber-900 text-xs font-bold">
              <Zap className="w-3 h-3" /> Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-4", variant === "featured" && "lg:flex-1 lg:p-6")}>
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-2xl font-bold text-brand-purple">
              {formatPrice(property.price)}
            </span>
            {property.priceUnit && (
              <span className="text-sm text-brand-muted">/{property.priceUnit}</span>
            )}
          </div>
          {property.verified && (
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <Verified className="w-4 h-4" />
              Verified
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-brand-text text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-purple transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-brand-muted text-sm mb-4">
          <MapPin className="w-4 h-4 shrink-0 text-brand-purple" />
          <span className="truncate">{property.location.area}, {property.location.city}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-brand-muted border-t border-brand-border pt-3">
          {property.specs.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-brand-purple" />
              <span>{property.specs.bedrooms} Bed</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-brand-purple" />
            <span>{property.specs.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-brand-purple" />
            <span>{property.specs.area.toLocaleString()} sq.ft</span>
          </div>
          {property.specs.parking > 0 && (
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-brand-purple" />
              <span>{property.specs.parking}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-border">
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-medium text-brand-text">{property.rating}</span>
            </div>
            <span>({property.reviews})</span>
            <span className="flex items-center gap-1 ml-2">
              <Eye className="w-3.5 h-3.5" /> {property.views.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-brand-purple text-sm font-medium group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
