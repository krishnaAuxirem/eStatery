import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, Bed, Bath, Maximize2, Car, Star, Eye, Heart, Share2,
  Phone, MessageCircle, Calendar, CheckCircle, Video, Shield,
  ArrowLeft, ChevronLeft, ChevronRight, Verified, TrendingUp,
  Home, Building2, Layers, Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useProperty } from "@/context/PropertyContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/data/properties";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById } = useProperty();
  const { user, toggleSaveProperty } = useAuth();
  const [imgIdx, setImgIdx] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<"visit" | "virtual">("visit");

  const property = getPropertyById(id || "");

  if (!property) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🏚️</div>
            <h2 className="text-2xl font-bold text-brand-text mb-2">Property Not Found</h2>
            <Link to="/properties" className="mt-4 inline-flex items-center gap-2 text-brand-purple hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = user?.savedProperties?.includes(property.id);

  const handleSave = () => {
    if (!user) { toast.error("Please login to save properties"); return; }
    toggleSaveProperty(property.id);
    toast.success(isSaved ? "Removed from saved" : "Added to wishlist!");
  };

  const handleBook = () => {
    if (!user) { toast.error("Please login to book a visit"); return; }
    if (!bookingDate) { toast.error("Please select a date"); return; }

    const bookings = JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
    bookings.push({
      id: `booking-${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      userId: user.id,
      date: bookingDate,
      time: bookingTime,
      status: "pending",
      type: bookingType,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("estatery_bookings", JSON.stringify(bookings));
    toast.success(`${bookingType === "visit" ? "Visit" : "Virtual tour"} booked for ${bookingDate} at ${bookingTime}!`);
    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-brand-muted">
            <Link to="/" className="hover:text-brand-purple">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-brand-purple">Properties</Link>
            <span>/</span>
            <span className="text-brand-text truncate max-w-xs">{property.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold uppercase",
                  property.listingType === "buy" ? "bg-brand-purple text-white" : "bg-brand-emerald text-white"
                )}>
                  {property.listingType === "buy" ? "For Sale" : "For Rent"}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 capitalize">{property.type}</span>
                {property.verified && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700">
                    <Verified className="w-3 h-3" /> Verified
                  </span>
                )}
                {property.featured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700">
                    <Zap className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-brand-text">{property.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-brand-muted text-sm">
                <MapPin className="w-4 h-4 text-brand-purple" />
                {property.location.address}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-brand-muted text-sm">
                <Eye className="w-4 h-4" /> {property.views.toLocaleString()}
              </div>
              <button onClick={handleSave} className={cn("p-2.5 rounded-xl border transition-all", isSaved ? "border-red-200 bg-red-50 text-red-500" : "border-brand-border bg-white text-brand-muted hover:text-red-400")}>
                <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }} className="p-2.5 rounded-xl border border-brand-border bg-white text-brand-muted hover:text-brand-purple transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Images + Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-80 lg:h-[450px]">
                <img src={property.images[imgIdx]} alt={property.title} className="w-full h-full object-cover" />
                {property.images.length > 1 && (
                  <>
                    <button onClick={() => setImgIdx((imgIdx - 1 + property.images.length) % property.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all">
                      <ChevronLeft className="w-5 h-5 text-brand-text" />
                    </button>
                    <button onClick={() => setImgIdx((imgIdx + 1) % property.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all">
                      <ChevronRight className="w-5 h-5 text-brand-text" />
                    </button>
                  </>
                )}
                {property.virtualTour && (
                  <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-brand-purple font-semibold text-sm hover:bg-white transition-all shadow-md">
                    <Video className="w-4 h-4" /> Virtual Tour
                  </button>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.images.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className={cn("w-2 h-2 rounded-full transition-all", i === imgIdx ? "bg-white w-6" : "bg-white/60")} />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {property.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={cn("h-16 w-24 rounded-xl overflow-hidden border-2 transition-all", i === imgIdx ? "border-brand-purple" : "border-transparent hover:border-brand-border")}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Key Specs */}
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <h2 className="font-bold text-brand-text text-lg mb-5">Property Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Bed, label: "Bedrooms", value: `${property.specs.bedrooms} BHK` },
                    { icon: Bath, label: "Bathrooms", value: property.specs.bathrooms },
                    { icon: Maximize2, label: "Area", value: `${property.specs.area.toLocaleString()} sq.ft` },
                    { icon: Car, label: "Parking", value: property.specs.parking },
                    ...(property.specs.floor ? [{ icon: Layers, label: "Floor", value: `${property.specs.floor}/${property.specs.totalFloors}` }] : []),
                    { icon: Building2, label: "Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                    { icon: Star, label: "Rating", value: `${property.rating}/5` },
                    { icon: TrendingUp, label: "Views", value: property.views.toLocaleString() }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                        <spec.icon className="w-4 h-4 text-brand-purple" />
                      </div>
                      <div>
                        <div className="text-xs text-brand-muted">{spec.label}</div>
                        <div className="font-semibold text-brand-text text-sm">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <h2 className="font-bold text-brand-text text-lg mb-4">About This Property</h2>
                <p className="text-brand-muted leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <h2 className="font-bold text-brand-text text-lg mb-4">Key Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[...property.features, ...property.amenities].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-brand-text">
                      <CheckCircle className="w-4 h-4 text-brand-emerald shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Price + Contact */}
            <div className="space-y-5">
              {/* Price Card */}
              <div className="bg-white rounded-2xl border border-brand-border p-6 sticky top-24">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-brand-purple">
                    {formatPrice(property.price)}
                  </div>
                  {property.priceUnit && (
                    <span className="text-brand-muted text-sm">per {property.priceUnit}</span>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1,2,3,4,5].map(i => <Star key={i} className={cn("w-3.5 h-3.5", i <= Math.floor(property.rating) ? "fill-current" : "text-gray-200 fill-gray-200")} />)}
                    </div>
                    <span className="text-sm text-brand-muted">{property.rating} ({property.reviews} reviews)</span>
                  </div>
                </div>

                {/* Booking */}
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-1.5">Select Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-1.5">Select Time</label>
                    <select value={bookingTime} onChange={e => setBookingTime(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple">
                      {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    {(["visit", "virtual"] as const).map(t => (
                      <button key={t} onClick={() => setBookingType(t)} className={cn("flex-1 py-2 rounded-xl text-sm font-medium capitalize border transition-all", bookingType === t ? "bg-brand-purple text-white border-brand-purple" : "border-brand-border text-brand-muted hover:border-brand-purple")}>
                        {t === "virtual" ? "Virtual Tour" : "Site Visit"}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold hover:shadow-brand transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book {bookingType === "virtual" ? "Virtual Tour" : "Visit"}
                </button>

                <div className="flex gap-3 mt-3">
                  <button className="flex-1 py-3 rounded-xl border border-brand-border text-brand-text font-medium text-sm hover:border-brand-purple hover:text-brand-purple transition-all flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Call
                  </button>
                  <button className="flex-1 py-3 rounded-xl border border-brand-border text-brand-text font-medium text-sm hover:border-brand-purple hover:text-brand-purple transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Message
                  </button>
                </div>
              </div>

              {/* Owner Card */}
              <div className="bg-white rounded-2xl border border-brand-border p-5">
                <h3 className="font-bold text-brand-text mb-4 text-sm">Listed by</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-indigo flex items-center justify-center text-white font-bold text-lg">
                    {property.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-text">{property.ownerName}</div>
                    <div className="text-brand-muted text-xs">Property Owner · Verified</div>
                  </div>
                </div>
                <div className="text-xs text-brand-muted flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-brand-emerald" />
                  Identity verified by eStatery
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <h3 className="font-bold text-amber-800 text-sm mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Safety Tips
                </h3>
                <ul className="space-y-2 text-xs text-amber-700">
                  <li>• Never pay advance without site visit</li>
                  <li>• Verify all legal documents before paying</li>
                  <li>• Use eStatery's secure payment system</li>
                  <li>• Report suspicious listings immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
