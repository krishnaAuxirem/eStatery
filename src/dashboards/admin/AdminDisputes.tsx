import { useState } from "react";
import { AlertOctagon, Scale, ShieldAlert, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface DisputeCase {
  id: string;
  parties: string;
  issue: string;
  date: string;
  status: "open" | "escalated" | "resolved";
  details: string;
}

export default function AdminDisputes() {
  const [cases, setCases] = useState<DisputeCase[]>(() => {
    const defaults: DisputeCase[] = [
      { id: "case-101", parties: "Arjun Mehta (Tenant) ↔ Rajesh Kumar (Owner)", issue: "Security deposit refund dispute", date: "Jun 8, 2026", status: "open", details: "Tenant requests ₹1.7L deposit refund. Owner claims ₹30k damage deductions for wall repainting without prior written consent." },
      { id: "case-102", parties: "Sneha Patel (Buyer) ↔ Harish Rao (Seller)", issue: "Property booking fee cancellation refund", date: "Jun 10, 2026", status: "escalated", details: "Buyer cancelled booking within 48 hours. Seller refuses refund citing non-refundable clause in token draft." },
      { id: "case-103", parties: "Rohan Kumar (Tenant) ↔ Priya Singh (Agent)", issue: "Brokerage payment discrepancies", date: "May 25, 2026", status: "resolved", details: "Discrepancy in GST invoice details. Corrected invoice issued by Priya Singh." }
    ];
    const local = localStorage.getItem("estatery_disputes");
    if (local) return JSON.parse(local);
    localStorage.setItem("estatery_disputes", JSON.stringify(defaults));
    return defaults;
  });

  const saveCases = (updated: DisputeCase[]) => {
    localStorage.setItem("estatery_disputes", JSON.stringify(updated));
    setCases(updated);
  };

  const handleResolve = (caseId: string) => {
    const updated = cases.map(c => c.id === caseId ? { ...c, status: "resolved" as const } : c);
    saveCases(updated);
    toast.success(`Dispute ${caseId} marked as RESOLVED.`);
  };

  const handleEscalate = (caseId: string) => {
    const updated = cases.map(c => c.id === caseId ? { ...c, status: "escalated" as const } : c);
    saveCases(updated);
    toast.success(`Dispute ${caseId} status updated to: ESCALATED.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-[#0F172A] text-xl">Dispute Resolution Center</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Mediate tenancy disputes, security deposit complaints, and escrow releases.</p>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <div key={c.id} className="bg-white rounded-3xl border border-[#E2E8F0] p-6 hover:shadow-md transition-shadow space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <AlertOctagon className={`w-5 h-5 ${
                  c.status === "resolved" ? "text-emerald-500" : c.status === "escalated" ? "text-red-500" : "text-amber-500"
                }`} />
                <span className="font-extrabold text-slate-800 text-sm">{c.id}: {c.issue}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                c.status === "resolved" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                  : c.status === "escalated" 
                  ? "bg-red-50 text-red-600 border border-red-100" 
                  : "bg-amber-50 text-amber-700 border border-amber-100"
              }`}>
                {c.status.toUpperCase()}
              </span>
            </div>

            <div className="text-xs space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div><span className="text-[#64748B] font-bold uppercase tracking-wide">Involved Parties:</span> <span className="font-semibold text-slate-800">{c.parties}</span></div>
              <div><span className="text-[#64748B] font-bold uppercase tracking-wide">Filing Date:</span> <span className="font-semibold text-slate-700">{c.date}</span></div>
              <p className="text-slate-600 mt-2 leading-relaxed"><span className="font-extrabold text-slate-800">Case details: </span>"{c.details}"</p>
            </div>

            {c.status !== "resolved" && (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleResolve(c.id)}
                  className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Resolve Dispute
                </button>
                {c.status === "open" && (
                  <button
                    onClick={() => handleEscalate(c.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" /> Escalate Case
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
