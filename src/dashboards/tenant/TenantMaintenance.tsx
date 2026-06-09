import { useState } from "react";
import { Wrench, Plus, CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import type { MaintenanceRequest } from "@/types";

export default function TenantMaintenance() {
  const { user } = useAuth();
  const [maintenanceForm, setMaintenanceForm] = useState<{
    issue: string;
    description: string;
    priority: "low" | "medium" | "high" | "urgent";
  }>({ issue: "", description: "", priority: "medium" });
  const [requests, setRequests] = useState<MaintenanceRequest[]>(
    JSON.parse(localStorage.getItem("estatery_maintenance") || "[]").filter((r: MaintenanceRequest) => r.tenantId === user?.id)
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
            <CheckCircle2 className="w-12 h-12 text-[#E2E8F0] mx-auto mb-3" />
            <p className="text-[#64748B]">No maintenance requests yet. All good!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
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
                        <span className="text-[#64748B] text-xs flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{r.createdAt}</span>
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

      {/* Support tickets block */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] text-lg mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-indigo-500" /> Help &amp; Support Tickets</h3>
        <div className="p-5 border border-dashed border-slate-200 rounded-xl text-center">
          <p className="text-sm text-slate-500 mb-4">Have questions about RERA, rental policies, or your agreement? Open a support ticket.</p>
          <button onClick={() => toast.success("Opening support portal...")} className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-900 transition-all">Create Ticket</button>
        </div>
      </div>
    </div>
  );
}
