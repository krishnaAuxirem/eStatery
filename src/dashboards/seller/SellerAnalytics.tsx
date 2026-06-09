import { Eye, ArrowUpRight, Clock, CheckCircle2, Building2, Star } from "lucide-react";

export default function SellerAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-[#0F172A] text-xl">Listing Analytics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Impressions", value: "142K", icon: Eye, color: "text-[#1D4ED8] bg-blue-50", trend: "+22% this month" },
          { label: "Click-through Rate", value: "8.4%", icon: ArrowUpRight, color: "text-sky-600 bg-sky-50", trend: "+1.2% vs last month" },
          { label: "Avg. Days on Market", value: "24 days", icon: Clock, color: "text-amber-600 bg-amber-50", trend: "Industry avg: 30d" },
          { label: "Inquiries Converted", value: "32%", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", trend: "+4% improvement" },
          { label: "Properties Sold/Rented", value: "3", icon: Building2, color: "text-[#1D4ED8] bg-blue-50", trend: "This year" },
          { label: "Platform Ranking", value: "Top 12%", icon: Star, color: "text-amber-600 bg-amber-50", trend: "Among sellers" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color.split(" ")[1]} flex items-center justify-center mb-3`}><s.icon className={`w-5 h-5 ${s.color.split(" ")[0]}`} /></div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">{s.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
