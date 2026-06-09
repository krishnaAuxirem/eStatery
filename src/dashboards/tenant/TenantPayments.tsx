import { CreditCard, Clock, Download } from "lucide-react";
import { toast } from "sonner";

const PAYMENTS = [
  { month: "June 2025", amount: "₹85,000", status: "Due", date: "Jun 1, 2025", receipt: false },
  { month: "May 2025", amount: "₹85,000", status: "Paid", date: "May 1, 2025", receipt: true },
  { month: "April 2025", amount: "₹85,000", status: "Paid", date: "Apr 1, 2025", receipt: true },
  { month: "March 2025", amount: "₹85,000", status: "Paid", date: "Mar 1, 2025", receipt: true },
  { month: "February 2025", amount: "₹85,000", status: "Paid", date: "Feb 2, 2025", receipt: true },
];

export default function TenantPayments() {
  return (
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
                <p className="text-[#64748B] text-sm mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{p.status === "Paid" ? `Paid on ${p.date}` : `Due on ${p.date}`}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-[#0F172A] text-lg">{p.amount}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${p.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.status}</span>
              </div>
              {p.status === "Paid" && p.receipt && (
                <button onClick={() => toast.success("Receipt downloaded!")} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#f59e0b] hover:bg-amber-50 transition-all"><Download className="w-4 h-4" /></button>
              )}
              {p.status === "Due" && (
                <button onClick={() => toast.success("Redirecting to payment...")} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-all">Pay Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
