import { useAuth } from "@/context/AuthContext";
import { Star } from "lucide-react";

export default function AgentProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">Agent Profile</h2>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#10B981] to-[#059669]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">{user?.name?.charAt(0)}</div>
            <div className="mb-1">
              <h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3>
              <p className="text-[#64748B] text-sm">{user?.email}</p>
              <div className="flex items-center gap-1 text-amber-400 text-sm mt-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                <span className="text-[#64748B] text-xs ml-1">4.8 (127 reviews)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Experience", value: "8 Years" }, { label: "Total Deals", value: "247" }, { label: "Cities Covered", value: "5 Cities" }, { label: "Verified Since", value: "2019" }].map(s => (
              <div key={s.label} className="p-4 bg-[#F5F7FA] rounded-xl">
                <div className="text-xl font-bold text-[#0F172A]">{s.value}</div>
                <div className="text-[#64748B] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
