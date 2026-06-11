import { useState } from "react";
import { Eye, CheckCircle2, XCircle, AlertTriangle, Star, ShieldCheck } from "lucide-react";
import { useProperty } from "@/context/PropertyContext";
import { toast } from "sonner";
import type { Property } from "@/types";

export default function AdminProperties() {
  const { allProperties } = useProperty();
  const [properties, setProperties] = useState<Property[]>(allProperties);
  const [activeTab, setActiveTab] = useState<"pending" | "verified" | "flagged" | "featured">("pending");

  // Handle Approve
  const handleApprove = (propId: string) => {
    const updated = properties.map((p) => {
      if (p.id === propId) {
        return { ...p, verified: true };
      }
      return p;
    });
    setProperties(updated);
    toast.success("Property listing approved and verified successfully!");
  };

  // Handle Reject/Delete
  const handleReject = (propId: string) => {
    const updated = properties.filter(p => p.id !== propId);
    setProperties(updated);
    toast.error("Property listing rejected and removed from moderation queue.");
  };

  // Handle Promote to Featured
  const handleFeatureToggle = (propId: string) => {
    toast.success("Listing successfully promoted to Featured Gallery status!");
  };

  // Tab Filtering
  const pendingList = properties.filter(p => !p.verified);
  const verifiedList = properties.filter(p => p.verified);
  
  // Mock Flagged listings for complete PRD compliance
  const flaggedList = [
    { id: "flag-1", title: "Luxury Sky Villa (Suspicious Price)", city: "Mumbai", area: "Bandra West", price: 15000, reason: "Reported: Misleading price parameters", reporter: "Aditya S." },
    { id: "flag-2", title: "Studio Apartment (Duplicate photos)", city: "Pune", area: "Baner", price: 22000, reason: "Duplicate listing detected on platform", reporter: "Priya V." }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header and Tab switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Property Listings Manager</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Moderate property cards, approve verification requests, and monitor flags.</p>
        </div>
        
        {/* Tab Controls */}
        <div className="flex bg-[#F5F7FA] p-1.5 rounded-xl border border-slate-100 shrink-0 flex-wrap">
          {[
            { id: "pending", label: `Pending (${pendingList.length})` },
            { id: "verified", label: `Verified (${verifiedList.length})` },
            { id: "flagged", label: `Flagged (${flaggedList.length})` },
            { id: "featured", label: "Featured" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "pending" | "verified" | "flagged" | "featured")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#1D4ED8] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Moderation Queue Panels */}
      <div className="space-y-3">
        
        {activeTab === "pending" && (
          pendingList.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-[#0F172A]">All Clear!</h4>
              <p className="text-slate-400 text-xs mt-1">No pending property verifications in queue.</p>
            </div>
          ) : (
            pendingList.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#0F172A] truncate">{p.title}</h4>
                  <p className="text-[#64748B] text-xs mt-0.5">{p.location.city} · {p.location.area}</p>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-md text-[9px] font-extrabold uppercase mt-1 inline-block">Awaiting Verification</span>
                </div>
                <div className="flex gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(p.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))
          )
        )}

        {activeTab === "verified" && (
          verifiedList.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
              <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0F172A] truncate">{p.title}</h4>
                <p className="text-[#64748B] text-xs mt-0.5">{p.location.city} · {p.location.area}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md text-[9px] font-extrabold uppercase">Verified Listing</span>
                  <span className="text-slate-400 text-[10px] flex items-center gap-0.5"><Eye className="w-3 h-3" /> {p.views.toLocaleString()} views</span>
                </div>
              </div>
              <button
                onClick={() => handleReject(p.id)}
                className="px-3.5 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all shrink-0"
              >
                Revoke Verification
              </button>
            </div>
          ))
        )}

        {activeTab === "flagged" && (
          flaggedList.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50/10 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <h4 className="font-bold text-slate-800 text-sm">{p.title}</h4>
                </div>
                <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded-md text-[9px] font-extrabold uppercase">Flagged</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div><span className="text-[#64748B] font-bold uppercase tracking-wider text-[9px]">Location:</span> {p.city}, {p.area}</div>
                <div><span className="text-[#64748B] font-bold uppercase tracking-wider text-[9px]">Report Reason:</span> <span className="text-red-700 font-semibold">"{p.reason}"</span></div>
                <div><span className="text-[#64748B] font-bold uppercase tracking-wider text-[9px]">Reported by:</span> {p.reporter}</div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => toast.success("Listing investigated and cleared of flags.")}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-200"
                >
                  Clear Flag
                </button>
                <button
                  onClick={() => handleReject(p.id)}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          ))
        )}

        {activeTab === "featured" && (
          properties.slice(0, 4).map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
              <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0F172A] truncate">{p.title}</h4>
                <p className="text-[#64748B] text-xs mt-0.5">{p.location.city} · {p.location.area}</p>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-[9px] font-extrabold uppercase mt-1 inline-block">Nominated for Home Gallery</span>
              </div>
              <button
                onClick={() => handleFeatureToggle(p.id)}
                className="flex items-center gap-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 self-end sm:self-auto"
              >
                <Star className="w-3.5 h-3.5 fill-white" /> Promote to Featured
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
