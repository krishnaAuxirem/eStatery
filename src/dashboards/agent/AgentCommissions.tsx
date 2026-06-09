import { DollarSign } from "lucide-react";
import { toast } from "sonner";

const COMMISSIONS = [
  { deal: "Sky Residences, Mumbai", date: "May 12, 2025", amount: "₹1,80,000", status: "Paid", type: "Sale" },
  { deal: "Villa Estate, Bangalore", date: "Apr 28, 2025", amount: "₹2,40,000", status: "Pending", type: "Sale" },
  { deal: "DLF Apartment, Gurgaon", date: "Apr 10, 2025", amount: "₹85,000", status: "Paid", type: "Rental" },
  { deal: "Commercial Office, Hyderabad", date: "Mar 22, 2025", amount: "₹3,50,000", status: "Paid", type: "Sale" },
];

export default function AgentCommissions() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[#0F172A] text-xl">Commission Statement</h2>
        <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">YTD Total: ₹7,85,000</div>
      </div>
      <div className="space-y-3">
        {COMMISSIONS.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.type === "Sale" ? "bg-emerald-50" : "bg-blue-50"}`}>
              <DollarSign className={`w-5 h-5 ${item.type === "Sale" ? "text-emerald-600" : "text-blue-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[#0F172A]">{item.deal}</h4>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748B]">
                <span className={`px-2 py-0.5 rounded-full font-medium ${item.type === "Sale" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{item.type}</span>
                {item.date}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-emerald-600 text-lg">{item.amount}</div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${item.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
