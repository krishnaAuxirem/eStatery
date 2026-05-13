import { useState } from "react";
import {
  Home, CreditCard, Wrench, User, FileText, CheckCircle2,
  Clock, AlertCircle, Download, Plus, MapPin, Calendar, Shield, Bell
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const PAYMENTS = [
  { month: "June 2025", amount: "₹85,000", status: "Due", date: "Jun 1, 2025", receipt: false },
  { month: "May 2025", amount: "₹85,000", status: "Paid", date: "May 1, 2025", receipt: true },
  { month: "April 2025", amount: "₹85,000", status: "Paid", date: "Apr 1, 2025", receipt: true },
  { month: "March 2025", amount: "₹85,000", status: "Paid", date: "Mar 1, 2025", receipt: true },
  { month: "February 2025", amount: "₹85,000", status: "Paid", date: "Feb 2, 2025", receipt: true },
];

const TABS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "payments", label: "Rent Payments", icon: CreditCard, badge: "1 Due", badgeColor: "bg-amber-100 text-amber-700" },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "lease", label: "Lease & Docs", icon: FileText },
  { id: "profile", label: "My Profile", icon: User },
];

const TenantDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [maintenanceForm, setMaintenanceForm] = useState({ issue: "", description: "", priority: "medium" });
  const [requests, setRequests] = useState<any[]>(
    JSON.parse(localStorage.getItem("estatery_maintenance") || "[]").filter((r: any) => r.tenantId === user?.id)
  );

  const submitMaintenance = () => {
    if (!maintenanceForm.issue) { toast.error("Please enter an issue title"); return; }
    const newReq = {
      id: `maint-${Date.now()}`, tenantId: user?.id, propertyId: "prop-003",
      propertyTitle: "DLF Phase 5 Apartment", ...maintenanceForm, status: "open",
      createdAt: new Date().toISOString().split("T")[0]
    };
    const updated = [...requests, newReq];
    setRequests(updated);
    const all = JSON.parse(localStorage.getItem("estatery_maintenance") || "[]");
    localStorage.setItem("estatery_maintenance", JSON.stringify([...all, newReq]));
    setMaintenanceForm({ issue: "", description: "", priority: "medium" });
    toast.success("Maintenance request submitted! Team responds within 24 hours.");
  };

  return (
    <DashboardLayout
      activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} role="tenant" roleLabel="Tenant"
      headerActions={
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
          <AlertCircle className="w-3.5 h-3.5" /> Rent Due Jun 1
        </div>
      }
    >
      {activeTab === "overview" && (
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
                { label: "Raise Request", icon: Wrench, color: "bg-amber-50 text-amber-700 border border-amber-200", action: () => setActiveTab("maintenance") },
                { label: "Download Receipt", icon: Download, color: "bg-emerald-50 text-emerald-700 border border-emerald-200", action: () => toast.success("Receipt downloaded!") },
                { label: "View Lease", icon: FileText, color: "bg-blue-50 text-blue-700 border border-blue-200", action: () => setActiveTab("lease") },
              ].map((a, i) => (
                <button key={i} onClick={a.action} className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all hover:shadow-md ${a.color}`}>
                  <a.icon className="w-5 h-5" />{a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "payments" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#0F172A] text-xl">Rent Payment History</h2>
            <button onClick={() => toast.success("Statement downloaded!")} className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:underline"><Download className="w-4 h-4" /> Download Statement</button>
          </div>
          <div className="space-y-3">
            {PAYMENTS.map((p, i) => (
              <div key={i} className={`bg-white rounded-2xl border p-5 flex items-center justify-between hover:shadow-md transition-shadow ${p.status === "Due" ? "border-amber-200 bg-amber-50/30" : "border-[#E2E8F0]"}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.status === "Paid" ? "bg-emerald-50" : "bg-amber-50"}`}>
                    <CreditCard className={`w-5 h-5 ${p.status === "Paid" ? "text-emerald-600" : "text-amber-600"}`} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">{p.month}</p>
                    <p className="text-[#64748B] text-sm mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{p.status === "Paid" ? `Paid on ${p.date}` : `Due on ${p.date}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-[#0F172A] text-lg">{p.amount}</p>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${p.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.status}</span>
                  </div>
                  {p.status === "Paid" && p.receipt && (
                    <button onClick={() => toast.success("Receipt downloaded!")} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-amber-600 hover:bg-amber-50 transition-all"><Download className="w-4 h-4" /></button>
                  )}
                  {p.status === "Due" && (
                    <button onClick={() => toast.success("Redirecting to payment...")} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-all">Pay Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "maintenance" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h3 className="font-bold text-[#0F172A] text-lg mb-5 flex items-center gap-2"><Wrench className="w-5 h-5 text-amber-500" /> Submit Maintenance Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Issue Title <span className="text-red-500">*</span></label>
                <input type="text" value={maintenanceForm.issue} onChange={e => setMaintenanceForm(p => ({ ...p, issue: e.target.value }))} placeholder="e.g. AC not cooling, Plumbing leak..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Priority Level</label>
                <select value={maintenanceForm.priority} onChange={e => setMaintenanceForm(p => ({ ...p, priority: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-all">
                  <option value="low">Low — Not urgent</option>
                  <option value="medium">Medium — Needs attention</option>
                  <option value="high">High — Urgent fix needed</option>
                  <option value="urgent">Urgent — Emergency</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Description</label>
                <textarea value={maintenanceForm.description} onChange={e => setMaintenanceForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Describe the issue in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 resize-none transition-all" />
              </div>
            </div>
            <button onClick={submitMaintenance} className="mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Submit Request
            </button>
          </div>

          <div>
            <h3 className="font-bold text-[#0F172A] text-lg mb-4">My Requests <span className="text-[#64748B] font-normal text-base">({requests.length})</span></h3>
            {requests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E2E8F0]">
                <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                <p className="text-[#64748B]">No maintenance requests yet. All good!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((r: any) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${r.priority === "urgent" ? "bg-red-50" : r.priority === "high" ? "bg-amber-50" : "bg-blue-50"}`}>
                          <Wrench className={`w-4 h-4 ${r.priority === "urgent" ? "text-red-500" : r.priority === "high" ? "text-amber-600" : "text-blue-500"}`} />
                        </div>
                        <div>
                          <p className="font-bold text-[#0F172A]">{r.issue}</p>
                          {r.description && <p className="text-[#64748B] text-sm mt-0.5">{r.description}</p>}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${r.priority === "urgent" ? "bg-red-50 text-red-600" : r.priority === "high" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>{r.priority}</span>
                            <span className="text-[#64748B] text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{r.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${r.status === "resolved" ? "bg-emerald-50 text-emerald-700" : r.status === "in-progress" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1).replace("-", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "lease" && (
        <div className="space-y-5">
          <h2 className="font-bold text-[#0F172A] text-xl">Lease & Documents</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-600" /> Lease Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Property", value: "DLF Phase 5, Tower 8" }, { label: "Lease Start", value: "January 1, 2025" },
                { label: "Lease End", value: "December 31, 2025" }, { label: "Monthly Rent", value: "₹85,000" },
                { label: "Security Deposit", value: "₹1,70,000" }, { label: "Notice Period", value: "2 Months" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-3">
                  <div className="text-[#64748B] text-xs font-medium">{s.label}</div>
                  <div className="font-bold text-[#0F172A] text-sm mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: "Lease Agreement (Signed)", type: "PDF", size: "2.4 MB", date: "Jan 1, 2025" },
              { name: "Move-in Inspection Report", type: "PDF", size: "1.8 MB", date: "Jan 1, 2025" },
              { name: "May 2025 Rent Receipt", type: "PDF", size: "0.3 MB", date: "May 1, 2025" },
              { name: "Society Rules & Regulations", type: "PDF", size: "0.9 MB", date: "Jan 1, 2025" },
            ].map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-red-500" /></div>
                <div className="flex-1">
                  <p className="font-bold text-[#0F172A] text-sm">{doc.name}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{doc.type} · {doc.size} · Added {doc.date}</p>
                </div>
                <button onClick={() => toast.success(`${doc.name} downloaded!`)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all text-sm font-medium">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Profile</h2>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#f59e0b] to-[#d97706]" />
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-8 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">{user?.name?.charAt(0)}</div>
                <div className="mb-1">
                  <h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3>
                  <p className="text-[#64748B] text-sm">{user?.email}</p>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Verified Tenant</span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Full Name", value: user?.name }, { label: "Email", value: user?.email },
                  { label: "Phone", value: user?.phone || "+91 98765 43210" }, { label: "Current Property", value: "DLF Phase 5, Gurgaon" },
                ].map(f => (
                  <div key={f.label} className="p-3 bg-[#F5F7FA] rounded-xl flex items-center justify-between">
                    <span className="text-[#64748B] text-sm">{f.label}</span>
                    <span className="font-semibold text-[#0F172A] text-sm">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TenantDashboard;
