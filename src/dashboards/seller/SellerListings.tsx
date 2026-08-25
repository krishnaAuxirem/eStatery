import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building2, Plus, MapPin, Eye, Star, Edit, Trash2, Search, 
  Filter, CheckCircle, Clock, XCircle, ExternalLink, X, Save,
  TrendingUp, Layers, Home
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { formatPrice } from "@/data/properties";
import { toast } from "sonner";
import type { Property } from "@/types";

export default function SellerListings() {
  const { user } = useAuth();
  const { allProperties, updateProperty, deleteProperty } = useProperty();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "sold">("all");

  // Selected Property for Editing in Modal
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [editForm, setEditForm] = useState<{
    title: string;
    price: number;
    status: "active" | "pending" | "sold";
    city: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    areaSize: number;
    description: string;
  }>({
    title: "",
    price: 0,
    status: "active",
    city: "",
    area: "",
    bedrooms: 2,
    bathrooms: 2,
    areaSize: 1000,
    description: ""
  });

  // Filter properties belonging to seller
  const myProps = allProperties.filter(
    p => p.ownerId === user?.id || p.ownerName === user?.name || p.ownerId === "user-seller"
  );

  const filteredProps = myProps.filter(p => {
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Statistics calculation
  const totalListings = myProps.length;
  const activeCount = myProps.filter(p => p.status === "active").length;
  const pendingCount = myProps.filter(p => p.status === "pending").length;
  const totalViews = myProps.reduce((acc, p) => acc + (p.views || 0), 0);

  // Status toggle handler
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "pending" : currentStatus === "pending" ? "sold" : "active";
    updateProperty(id, { status: nextStatus });
    toast.success(`Property status updated to ${nextStatus.toUpperCase()}`);
  };

  // Delete handler
  const handleDelete = (id: string, title: string) => {
    deleteProperty(id);
    toast.success(`Listing "${title}" removed successfully.`);
  };

  // Open Edit Modal
  const handleOpenEdit = (p: Property) => {
    setEditingProp(p);
    setEditForm({
      title: p.title,
      price: p.price,
      status: (p.status as "active" | "pending" | "sold") || "active",
      city: p.location.city,
      area: p.location.area,
      bedrooms: p.specs.bedrooms,
      bathrooms: p.specs.bathrooms,
      areaSize: p.specs.area,
      description: p.description || ""
    });
  };

  // Save Edit submit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProp) return;

    updateProperty(editingProp.id, {
      title: editForm.title,
      price: Number(editForm.price),
      status: editForm.status,
      location: {
        ...editingProp.location,
        city: editForm.city,
        area: editForm.area
      },
      specs: {
        ...editingProp.specs,
        bedrooms: Number(editForm.bedrooms),
        bathrooms: Number(editForm.bathrooms),
        area: Number(editForm.areaSize)
      },
      description: editForm.description
    });

    toast.success(`Listing "${editForm.title}" updated successfully!`);
    setEditingProp(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">
            My Listings <span className="text-[#64748B] font-normal text-base">({totalListings})</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your real estate portfolio, update pricing, and track views & inquiries.
          </p>
        </div>

        <Link
          to="/post-property"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold text-sm hover:shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Post Property
        </Link>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Total Listings</div>
          <div className="text-xl font-extrabold text-[#0F172A] mt-1">{totalListings}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Active Properties</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">{activeCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Pending Review</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">{pendingCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Total Page Views</div>
          <div className="text-xl font-extrabold text-[#1D4ED8] mt-1">{totalViews.toLocaleString()}</div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search listings by title, city or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D4ED8] text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {(["all", "active", "pending", "sold"] as const).map((st) => {
            const count = st === "all" ? myProps.length : myProps.filter(p => p.status === st).length;
            const isActive = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#1D4ED8] text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                <span className="capitalize">{st}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Listings List */}
      {filteredProps.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
          <Building2 className="w-14 h-14 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-[#0F172A] mb-1">No Listings Found</h3>
          <p className="text-slate-400 text-xs mb-4">Try clearing filters or post a new property.</p>
          <Link
            to="/post-property"
            className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-xs font-bold inline-block hover:bg-blue-800 transition-all shadow"
          >
            Post Property FREE
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProps.map((p: Property) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col md:flex-row gap-4 hover:shadow-md transition-all group"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full md:w-28 h-28 rounded-xl object-cover shrink-0 border border-slate-100"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-[#0F172A] text-base group-hover:text-[#1D4ED8] transition-colors">
                    {p.title}
                  </h4>

                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleToggleStatus(p.id, p.status)}
                    title="Click to toggle status (Active -> Pending -> Sold)"
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all border ${
                      p.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                        : p.status === "pending"
                        ? "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[#64748B] text-xs mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                  <span>{p.location.area}, {p.location.city}</span>
                </div>

                <div className="flex items-center gap-4 mt-3 flex-wrap text-xs">
                  <span className="font-extrabold text-[#1D4ED8] text-sm">
                    {formatPrice(p.price)}
                    {p.listingType === "rent" ? "/mo" : ""}
                  </span>

                  <span className="text-slate-500 font-medium">
                    {p.specs.bedrooms} BHK • {p.specs.bathrooms} Bath • {p.specs.area} sq.ft
                  </span>

                  <span className="text-[#64748B] flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    {p.views.toLocaleString()} views
                  </span>

                  {p.rating > 0 && (
                    <span className="text-[#64748B] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {p.rating}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                {/* View Public Listing */}
                <button
                  onClick={() => navigate(`/properties/${p.id}`)}
                  className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#1D4ED8] hover:bg-blue-50 transition-all flex items-center gap-1 text-xs font-bold"
                  title="View Public Page"
                >
                  <ExternalLink className="w-4 h-4" /> View
                </button>

                {/* Edit Property */}
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#1D4ED8] hover:bg-blue-50 transition-all flex items-center gap-1 text-xs font-bold"
                  title="Edit Listing"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>

                {/* Delete Property */}
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Delete Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT PROPERTY MODAL */}
      {editingProp && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Edit className="w-4 h-4 text-[#1D4ED8]" /> Edit Property Listing
              </h3>
              <button
                onClick={() => setEditingProp(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Listing Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as "active" | "pending" | "sold" })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8] bg-white font-semibold"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending Review</option>
                    <option value="sold">Sold / Off Market</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={editForm.city}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Area / Locality</label>
                  <input
                    type="text"
                    required
                    value={editForm.area}
                    onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={editForm.bedrooms}
                    onChange={(e) => setEditForm({ ...editForm, bedrooms: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={editForm.bathrooms}
                    onChange={(e) => setEditForm({ ...editForm, bathrooms: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Area (sq.ft)</label>
                  <input
                    type="number"
                    value={editForm.areaSize}
                    onChange={(e) => setEditForm({ ...editForm, areaSize: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProp(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold rounded-xl hover:shadow-md"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
