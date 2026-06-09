import { Link } from "react-router-dom";
import { Building2, Plus, MapPin, Eye, Star, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { formatPrice } from "@/data/properties";
import { toast } from "sonner";

export default function SellerListings() {
  const { user } = useAuth();
  const { allProperties, deleteProperty } = useProperty();

  const myProps = allProperties.filter(p => p.ownerId === user?.id || p.ownerName === user?.name);

  const handleDelete = (id: string) => {
    deleteProperty(id);
    toast.success("Listing removed successfully.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[#0F172A] text-xl">My Listings <span className="text-[#64748B] font-normal text-base">({myProps.length})</span></h2>
        <Link to="/post-property" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D4ED8] text-white font-bold text-sm hover:bg-blue-800 transition-all shadow">
          <Plus className="w-4 h-4" /> Add New
        </Link>
      </div>
      {myProps.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
          <Building2 className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
          <h3 className="font-bold text-[#0F172A] mb-2">No Listings Yet</h3>
          <Link to="/post-property" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold mt-4 inline-block">Post Property FREE</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myProps.map((p: any) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-all">
              <img src={p.images[0]} alt={p.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0F172A]">{p.title}</h4>
                <div className="flex items-center gap-1 text-[#64748B] text-sm mt-0.5"><MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />{p.location.area}, {p.location.city}</div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="font-bold text-[#1D4ED8]">{formatPrice(p.price)}</span>
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${p.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span>
                  <span className="text-[#64748B] text-xs flex items-center gap-1"><Eye className="w-3 h-3 text-[#1D4ED8]" />{p.views.toLocaleString()}</span>
                  <span className="text-[#64748B] text-xs flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{p.rating}</span>
                </div>
              </div>
              <div className="flex gap-2 self-start shrink-0">
                <Link to={`/properties/${p.id}`} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#1D4ED8] hover:bg-blue-50 transition-all"><Edit className="w-4 h-4" /></Link>
                <button onClick={() => handleDelete(p.id)} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
