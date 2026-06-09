import { Bell, Zap, TrendingUp, Calendar } from "lucide-react";

export default function BuyerNotifications() {
  return (
    <div>
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">Notifications</h2>
      <div className="space-y-3">
        {[
          { title: "New AI Match Found", msg: "3 new properties match your search criteria in Bangalore.", time: "2 min ago", type: "match", read: false },
          { title: "Price Drop Alert", msg: "Sky Residences penthouse price reduced by ₹50L.", time: "1 hr ago", type: "price", read: false },
          { title: "Visit Confirmed", msg: "Your site visit for DLF Apartment on June 5 is confirmed.", time: "3 hr ago", type: "booking", read: true },
          { title: "New Properties in Mumbai", msg: "12 new listings in Bandra West added today.", time: "Yesterday", type: "info", read: true },
        ].map((n, i) => (
          <div key={i} className={`bg-white rounded-2xl border p-5 flex gap-4 ${!n.read ? "border-[#1D4ED8]/20 bg-blue-50/30" : "border-[#E2E8F0]"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === "match" ? "bg-blue-100" : n.type === "price" ? "bg-emerald-100" : n.type === "booking" ? "bg-blue-100" : "bg-slate-100"}`}>
              {n.type === "match" ? <Zap className="w-4 h-4 text-[#1D4ED8]" /> : n.type === "price" ? <TrendingUp className="w-4 h-4 text-emerald-600" /> : n.type === "booking" ? <Calendar className="w-4 h-4 text-[#1D4ED8]" /> : <Bell className="w-4 h-4 text-slate-500" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#0F172A] text-sm">{n.title}</h4>
                {!n.read && <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />}
              </div>
              <p className="text-[#64748B] text-sm mt-0.5">{n.msg}</p>
              <span className="text-xs text-[#64748B] mt-1 block">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
