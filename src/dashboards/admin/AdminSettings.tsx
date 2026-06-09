import { Settings as SettingsIcon, Database } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-[#0F172A] text-xl">Platform Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-red-500" /> Platform Controls
          </h3>
          <div className="space-y-3">
            {[
              { label: "Enable new user registrations", enabled: true },
              { label: "Property listing without verification", enabled: false },
              { label: "AI recommendations on homepage", enabled: true },
              { label: "Weekly analytics email reports", enabled: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <span className="text-[#0F172A] text-sm font-medium">{s.label}</span>
                <button
                  onClick={() => toast.success("Setting updated!")}
                  className={`relative w-11 h-6 rounded-full transition-all ${
                    s.enabled ? "bg-[#1D4ED8]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      s.enabled ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <Database className="w-4 h-4 text-red-500" /> System Status
          </h3>
          <div className="space-y-3">
            {[
              { service: "API Server", status: "Online", uptime: "99.98%" },
              { service: "Database Cluster", status: "Online", uptime: "99.99%" },
              { service: "CDN / Storage", status: "Online", uptime: "100%" },
              { service: "Payment Gateway", status: "Online", uptime: "99.95%" },
              { service: "AI Engine", status: "Online", uptime: "99.87%" },
            ].map((s) => (
              <div key={s.service} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[#0F172A] text-sm font-medium">{s.service}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    {s.status}
                  </span>
                  <span className="text-[#64748B] text-xs">{s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
