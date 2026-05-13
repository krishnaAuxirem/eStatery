import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/features/PropertyCard";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";

const SavedProperties = () => {
  const { user } = useAuth();
  const { allProperties } = useProperty();
  const saved = allProperties.filter(p => user?.savedProperties?.includes(p.id));

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link to="/properties" className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Properties
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" /> Saved Properties ({saved.length})
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {saved.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-brand-border">
              <Heart className="w-16 h-16 text-brand-muted mx-auto mb-4" />
              <h2 className="text-xl font-bold text-brand-text mb-2">No saved properties yet</h2>
              <p className="text-brand-muted mb-6">Start saving properties you love to compare them later.</p>
              <Link to="/properties" className="px-6 py-3 rounded-xl bg-brand-purple text-white font-semibold hover:shadow-brand transition-all">
                Explore Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {saved.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavedProperties;
