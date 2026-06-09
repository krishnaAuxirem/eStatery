import { Users, Building2, DollarSign, Star, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const COMMISSION_DATA = [
  { month: "Jan", commission: 85000 }, { month: "Feb", commission: 120000 }, { month: "Mar", commission: 95000 },
  { month: "Apr", commission: 145000 }, { month: "May", commission: 180000 }, { month: "Jun", commission: 160000 }
];
const DEAL_DATA = [
  { month: "Jan", deals: 4 }, { month: "Feb", deals: 6 }, { month: "Mar", deals: 5 },
  { month: "Apr", deals: 8 }, { month: "May", deals: 7 }, { month: "Jun", deals: 9 }
];

export default function AgentOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Clients", value: "24", icon: Users, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "+3 this month" },
          { label: "Deals This Month", value: "8", icon: Building2, color: "text-blue-500", bg: "bg-blue-50", trend: "+2 vs last" },
          { label: "Commission (YTD)", value: "₹7.8L", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50", trend: "On track" },
          { label: "Client Rating", value: "4.8★", icon: Star, color: "text-amber-500", bg: "bg-amber-50", trend: "127 reviews" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs font-medium mt-1.5 ${s.color}`}>{s.trend}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0F172A]">Commission Trend (₹)</h3>
            <span className="text-xs bg-[#F5F7FA] text-[#64748B] px-3 py-1 rounded-full">2025</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={COMMISSION_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
              <Line type="monotone" dataKey="commission" stroke="#10B981" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0F172A]">Deals Closed</h3>
            <span className="text-xs bg-[#F5F7FA] text-[#64748B] px-3 py-1 rounded-full">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DEAL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
              <Bar dataKey="deals" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] mb-5 flex items-center gap-2"><Target className="w-4 h-4 text-[#1D4ED8]" /> Deal Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { stage: "Lead", count: 12, color: "bg-blue-50 border-blue-200 text-blue-700" },
            { stage: "Viewing", count: 7, color: "bg-amber-50 border-amber-200 text-amber-700" },
            { stage: "Negotiating", count: 4, color: "bg-purple-50 border-purple-200 text-purple-700" },
            { stage: "Closed", count: 8, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
          ].map(s => (
            <div key={s.stage} className={`rounded-xl border-2 p-4 text-center ${s.color}`}>
              <div className="text-3xl font-extrabold">{s.count}</div>
              <div className="text-sm font-semibold mt-0.5">{s.stage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
