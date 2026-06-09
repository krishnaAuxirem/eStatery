import {
  Users, Building2, DollarSign, Activity, AlertTriangle, TrendingUp
} from "lucide-react";
import { useProperty } from "@/context/PropertyContext";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", revenue: 2400000 },
  { month: "Feb", revenue: 3200000 },
  { month: "Mar", revenue: 2800000 },
  { month: "Apr", revenue: 4100000 },
  { month: "May", revenue: 3800000 },
  { month: "Jun", revenue: 5200000 }
];

const PROPERTY_TYPES_PIE = [
  { name: "Apartments", value: 48 },
  { name: "Villas", value: 18 },
  { name: "Commercial", value: 14 },
  { name: "Studios", value: 12 },
  { name: "Others", value: 8 }
];

const COLORS = ["#1D4ED8", "#10B981", "#2563EB", "#F59E0B", "#64748B"];

export default function AdminOverview() {
  const { allProperties } = useProperty();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Platform Users", value: "2.1M", icon: Users, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "+12.4% this month" },
          { label: "Active Listings", value: allProperties.length.toString(), icon: Building2, color: "text-sky-500", bg: "bg-sky-50", trend: "+8.2% this week" },
          { label: "Monthly Revenue", value: "₹5.2Cr", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50", trend: "+36.8% vs last" },
          { label: "Platform Health", value: "99.9%", icon: Activity, color: "text-amber-500", bg: "bg-amber-50", trend: "All systems normal" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs font-medium mt-1.5 ${s.color}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0F172A]">Platform Revenue (₹)</h3>
            <span className="text-xs bg-[#F5F7FA] text-[#64748B] px-3 py-1 rounded-full">2025 YTD</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="adminRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
              <Area type="monotone" dataKey="revenue" stroke="#ef4444" fill="url(#adminRevenue)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h3 className="font-bold text-[#0F172A] mb-5">Property Mix</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={PROPERTY_TYPES_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                {PROPERTY_TYPES_PIE.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
              <Legend iconSize={8} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Pending Actions
          </h3>
          <div className="space-y-2">
            {[
              { label: "Properties awaiting review", count: 12, color: "bg-amber-50 text-amber-700" },
              { label: "Agent verification requests", count: 5, color: "bg-blue-50 text-[#1D4ED8]" },
              { label: "Dispute center tickets", count: 3, color: "bg-red-50 text-red-700", urgent: true },
              { label: "Reported listings", count: 2, color: "bg-orange-50 text-orange-700", urgent: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  {item.urgent && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  <span className="text-[#64748B] text-sm">{item.label}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500" /> Live Activity
          </h3>
          <div className="space-y-3">
            {[
              { msg: "New property listed: Sky Residences, Mumbai", time: "2 min ago", type: "property" },
              { msg: "User verified: Priya Sharma (Agent #AML-2025)", time: "12 min ago", type: "user" },
              { msg: "Dispute resolved: Ticket #1234", time: "1 hr ago", type: "dispute" },
              { msg: "Blog published: AI Real Estate Trends 2025", time: "3 hr ago", type: "blog" },
              { msg: "Fraud alert: Listing #P-4421 under review", time: "5 hr ago", type: "alert" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    a.type === "alert"
                      ? "bg-red-500"
                      : a.type === "property"
                      ? "bg-[#1D4ED8]"
                      : a.type === "user"
                      ? "bg-emerald-500"
                      : "bg-sky-500"
                  }`}
                />
                <div>
                  <p className="text-[#0F172A] text-xs font-medium">{a.msg}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
