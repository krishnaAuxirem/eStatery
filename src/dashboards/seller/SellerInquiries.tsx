import { Users } from "lucide-react";

export default function SellerInquiries() {
  return (
    <div>
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">Buyer Inquiries</h2>
      <div className="space-y-3">
        {[
          { name: "Arjun Mehta", property: "Sky Residences Penthouse", message: "Interested in site visit this weekend", time: "1 hr ago", status: "New" },
          { name: "Priya Singh", property: "Serene Villa, Bangalore", message: "Can we negotiate the price?", time: "3 hr ago", status: "Replied" },
          { name: "Rohan Kumar", property: "DLF Apartment, Gurgaon", message: "Is the property available from July?", time: "Yesterday", status: "New" },
          { name: "Ananya Rao", property: "Modern Townhouse, Delhi", message: "Requesting documentation list", time: "2 days ago", status: "Closed" },
        ].map((inq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm shrink-0">{inq.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-[#0F172A] text-sm">{inq.name}</h4>
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 ${inq.status === "New" ? "bg-blue-50 text-[#1D4ED8]" : inq.status === "Replied" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{inq.status}</span>
              </div>
              <p className="text-[#64748B] text-xs mt-0.5">{inq.property}</p>
              <p className="text-[#0F172A] text-sm mt-1.5 italic">"{inq.message}"</p>
              <p className="text-[#64748B] text-xs mt-1">{inq.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
