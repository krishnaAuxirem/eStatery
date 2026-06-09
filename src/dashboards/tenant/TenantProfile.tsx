import { useAuth } from "@/context/AuthContext";

export default function TenantProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Profile</h2>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#f59e0b] to-[#d97706]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">
              {user?.name?.charAt(0)}
            </div>
            <div className="mb-1">
              <h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3>
              <p className="text-[#64748B] text-sm">{user?.email}</p>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
                Verified Tenant
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Phone", value: user?.phone || "+91 98765 43210" },
              { label: "Current Property", value: "DLF Phase 5, Gurgaon" },
            ].map((f) => (
              <div key={f.label} className="p-3 bg-[#F5F7FA] rounded-xl flex items-center justify-between">
                <span className="text-[#64748B] text-sm">{f.label}</span>
                <span className="font-semibold text-[#0F172A] text-sm">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
