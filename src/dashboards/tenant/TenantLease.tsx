import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

export default function TenantLease() {
  return (
    <div className="space-y-5">
      <h2 className="font-bold text-[#0F172A] text-xl">Lease &amp; Documents</h2>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-600" /> Lease Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Property", value: "DLF Phase 5, Tower 8" },
            { label: "Lease Start", value: "January 1, 2025" },
            { label: "Lease End", value: "December 31, 2025" },
            { label: "Monthly Rent", value: "₹85,000" },
            { label: "Security Deposit", value: "₹1,70,000" },
            { label: "Notice Period", value: "2 Months" },
          ].map((s) => (
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
          <div
            key={i}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#0F172A] text-sm">{doc.name}</p>
              <p className="text-[#64748B] text-xs mt-0.5">
                {doc.type} · {doc.size} · Added {doc.date}
              </p>
            </div>
            <button
              onClick={() => toast.success(`${doc.name} downloaded!`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
