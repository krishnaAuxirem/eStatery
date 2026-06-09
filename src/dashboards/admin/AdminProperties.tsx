import { Eye, CheckCircle2, XCircle } from "lucide-react";
import { useProperty } from "@/context/PropertyContext";
import { toast } from "sonner";
import type { Property } from "@/types";

export default function AdminProperties() {
  const { allProperties } = useProperty();

  return (
    <div>
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">
        Property Moderation <span className="text-[#64748B] font-normal text-base">({allProperties.length} total)</span>
      </h2>
      <div className="space-y-3">
        {allProperties.slice(0, 8).map((p: Property) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[#0F172A] truncate">{p.title}</h4>
              <p className="text-[#64748B] text-sm mt-0.5">
                {p.location.city} · {p.location.area}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    p.listingType === "buy" ? "bg-blue-50 text-[#1D4ED8]" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {p.listingType === "buy" ? "For Sale" : "For Rent"}
                </span>
                <span className="text-[#64748B] text-xs flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {p.views.toLocaleString()} views
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  p.verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}
              >
                {p.verified ? "Verified" : "Pending"}
              </span>
              <button
                onClick={() => toast.success("Property approved!")}
                className="p-2.5 rounded-xl border border-[#E2E8F0] text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toast.error("Property rejected.")}
                className="p-2.5 rounded-xl border border-[#E2E8F0] text-red-500 hover:bg-red-50 transition-all"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
