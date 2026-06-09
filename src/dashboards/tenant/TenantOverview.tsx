import { useNavigate } from "react-router-dom";
import { Home, MapPin, CheckCircle2, Wrench, Shield, Calendar, CreditCard, Download, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import type { MaintenanceRequest } from "@/types";

const PAYMENTS = [
  { month: "June 2025", amount: "₹85,000", status: "Due", date: "Jun 1, 2025", receipt: false },
  { month: "May 2025", amount: "₹85,000", status: "Paid", date: "May 1, 2025", receipt: true },
  { month: "April 2025", amount: "₹85,000", status: "Paid", date: "Apr 1, 2025", receipt: true },
];

export default function TenantOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests] = useState<MaintenanceRequest[]>(
    JSON.parse(localStorage.getItem("estatery_maintenance") || "[]").filter((r: MaintenanceRequest) => r.tenantId === user?.id)
  );

  return (
    <div className="space-y-6">
      {/* Current Rental Card */}
      <div className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-1">Current Rental Property</p>
              <h2 className="text-xl font-bold">DLF Phase 5 Apartment</h2>
              <div className="flex items-center gap-1 text-white/70 text-sm mt-1"><MapPin className="w-3.5 h-3.5" /> Tower 8, The Crest, Gurgaon · Floor 15</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><Home className="w-6 h-6 text-white" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-white/20">
            <div><div className="text-2xl font-bold">₹85,000</div><div className="text-white/60 text-xs mt-0.5">Monthly Rent</div></div>
            <div><div className="text-2xl font-bold">Dec 2025</div><div className="text-white/60 text-xs mt-0.5">Lease Expires</div></div>
            <div><div className="text-2xl font-bold text-white">Jun 1</div><div className="text-white/60 text-xs mt-0.5">Next Payment</div></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Months Completed", value: PAYMENTS.filter(p => p.status === "Paid").length, icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50", trend: "On time" },
          { label: "Open Requests", value: requests.filter(r => r.status === "open").length, icon: Wrench, color: "text-amber-500 bg-amber-50", trend: "Pending" },
          { label: "Security Deposit", value: "₹1.7L", icon: Shield, color: "text-blue-500 bg-blue-50", trend: "Held by owner" },
          { label: "Lease Days Left", value: "210", icon: Calendar, color: "text-[#f59e0b] bg-amber-50", trend: "Until Dec 2025" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color.split(" ")[1]}`}><s.icon className={`w-5 h-5 ${s.color.split(" ")[0]}`} /></div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs font-medium mt-1.5 ${s.color.split(" ")[0]}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Pay Rent", icon: CreditCard, color: "bg-amber-500 text-white", action: () => toast.success("Redirecting to payment...") },
            { label: "Raise Request", icon: Wrench, color: "bg-amber-50 text-amber-700 border border-amber-200", action: () => navigate("/dashboard/tenant/maintenance") },
            { label: "Download Receipt", icon: Download, color: "bg-emerald-50 text-emerald-700 border border-emerald-200", action: () => toast.success("Receipt downloaded!") },
            { label: "View Lease", icon: FileText, color: "bg-blue-50 text-blue-700 border border-blue-200", action: () => navigate("/dashboard/tenant/lease") },
          ].map((a, i) => (
            <button key={i} onClick={a.action} className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all hover:shadow-md ${a.color}`}>
              <a.icon className="w-5 h-5" />{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
