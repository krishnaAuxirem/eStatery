import { MapPin, Clock, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const CLIENTS = [
  { name: "Rahul Gupta", type: "Buyer", interest: "3BHK Mumbai", budget: "₹2.5Cr", status: "Active", phone: "+91 9988776655", lastContact: "Today" },
  { name: "Sneha Patel", type: "Renter", interest: "2BHK Bangalore", budget: "₹60K/mo", status: "Negotiating", phone: "+91 8877665544", lastContact: "Yesterday" },
  { name: "Aditya Singh", type: "Investor", interest: "Commercial Hyderabad", budget: "₹8Cr", status: "Viewing", phone: "+91 7766554433", lastContact: "2 days ago" },
  { name: "Priya Nair", type: "Buyer", interest: "Villa Pune", budget: "₹3.2Cr", status: "Closed", phone: "+91 6655443322", lastContact: "Last week" },
];

export default function AgentClients() {
  return (
    <div>
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">Client CRM <span className="text-[#64748B] font-normal text-base">({CLIENTS.length} clients)</span></h2>
      <div className="space-y-3">
        {CLIENTS.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-bold text-lg shrink-0">{c.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-[#0F172A]">{c.name}</h4>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{c.type}</span>
              </div>
              <p className="text-[#64748B] text-sm mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3 text-[#1D4ED8]" />{c.interest} · Budget: <span className="font-semibold text-[#0F172A]">{c.budget}</span></p>
              <p className="text-[#64748B] text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />Last contact: {c.lastContact}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${c.status === "Closed" ? "bg-emerald-50 text-emerald-700" : c.status === "Active" ? "bg-blue-50 text-blue-700" : c.status === "Viewing" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}>{c.status}</span>
              <button onClick={() => toast.success(`Calling ${c.name}...`)} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#10B981] hover:bg-emerald-50 transition-all"><Phone className="w-4 h-4" /></button>
              <button onClick={() => toast.success(`Opening chat with ${c.name}...`)} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#10B981] hover:bg-emerald-50 transition-all"><MessageSquare className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
