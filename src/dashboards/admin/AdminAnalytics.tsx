import { useState } from "react";
import { TrendingUp, BarChart3, DollarSign, Activity, Sparkles, Layers, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Legend
} from "recharts";

const USER_GROWTH = [
  { month: "Jan", users: 12000 },
  { month: "Feb", users: 19000 },
  { month: "Mar", users: 15000 },
  { month: "Apr", users: 28000 },
  { month: "May", users: 35000 },
  { month: "Jun", users: 42000 }
];

const REVENUE_SOURCES = [
  { month: "Jan", subscription: 800000, commission: 1600000 },
  { month: "Feb", subscription: 1000000, commission: 2200000 },
  { month: "Mar", subscription: 900000, commission: 1900000 },
  { month: "Apr", subscription: 1200000, commission: 2900000 },
  { month: "May", subscription: 1100000, commission: 2700000 },
  { month: "Jun", subscription: 1400000, commission: 3800000 }
];

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState<"traffic" | "revenue">("traffic");

  const totalRevenueGGN = REVENUE_SOURCES.reduce((sum, item) => sum + item.subscription + item.commission, 0);
  const totalSub = REVENUE_SOURCES.reduce((sum, item) => sum + item.subscription, 0);
  const totalComm = REVENUE_SOURCES.reduce((sum, item) => sum + item.commission, 0);

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Platform Intelligence</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Audit user engagement, conversion metrics, and revenue streams.</p>
        </div>
        
        <div className="flex bg-[#F5F7FA] p-1.5 rounded-xl border border-slate-100 shrink-0">
          <button
            onClick={() => setActiveTab("traffic")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "traffic"
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Traffic &amp; Growth
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "revenue"
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Revenue Analytics
          </button>
        </div>
      </div>

      {activeTab === "traffic" ? (
        // Platform Traffic Stats
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Page Views / Day", value: "842K", trend: "+14%", color: "text-red-500 bg-red-50" },
              { label: "New Registrations / Day", value: "1,234", trend: "+8%", color: "text-[#1D4ED8] bg-blue-50" },
              { label: "Searches / Hour", value: "28,400", trend: "+22%", color: "text-emerald-500 bg-emerald-50" },
              { label: "Bookings / Day", value: "347", trend: "+18%", color: "text-amber-500 bg-amber-50" },
              { label: "Avg. Session Time", value: "8m 24s", trend: "+2m", color: "text-red-500 bg-red-50" },
              { label: "Conversion Rate", value: "3.8%", trend: "+0.4%", color: "text-emerald-500 bg-emerald-50" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${s.color.split(" ")[1]}`}>
                  <TrendingUp className={`w-5 h-5 ${s.color.split(" ")[0]}`} />
                </div>
                <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
                <div className="text-[#64748B] text-xs mt-0.5">{s.label}</div>
                <div className={`text-[10px] font-bold mt-1.5 ${s.color.split(" ")[0]}`}>{s.trend} this week</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#0F172A] text-sm">Monthly User Growth</h3>
              <span className="text-xs bg-[#F5F7FA] text-[#64748B] px-3 py-1 rounded-full font-bold">2026 YTD</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={USER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `${(v / 1000).toFixed(0)}K Users`} />
                <Bar dataKey="users" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        // Advanced Revenue Analytics
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Platform Revenue", value: `₹${(totalRevenueGGN / 10000000).toFixed(2)}Cr`, icon: DollarSign, color: "text-[#1D4ED8] bg-blue-50 border-blue-100" },
              { label: "Subscription Revenue", value: `₹${(totalSub / 10000000).toFixed(2)}Cr`, icon: Layers, color: "text-purple-600 bg-purple-50 border-purple-100" },
              { label: "Commission Revenue", value: `₹${(totalComm / 10000000).toFixed(2)}Cr`, icon: Sparkles, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
              { label: "YTD Sales Growth", value: "+28.4%", icon: TrendingUp, color: "text-amber-600 bg-amber-50 border-amber-100" }
            ].map((r, i) => (
              <div key={i} className={`bg-white rounded-2xl border ${r.color.split(" ")[2]} p-5 hover:shadow-md transition-shadow`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${r.color.split(" ")[1]}`}>
                  <r.icon className={`w-5 h-5 ${r.color.split(" ")[0]}`} />
                </div>
                <div className="text-2xl font-extrabold text-[#0F172A]">{r.value}</div>
                <p className="text-[#64748B] text-xs mt-0.5 font-semibold">{r.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Revenue Trend Area Chart */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-xs mb-5 uppercase tracking-wider">Cumulative Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={REVENUE_SOURCES}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Area type="monotone" name="Total Month Sales" dataKey={(d) => d.subscription + d.commission} stroke="#1D4ED8" fill="url(#trendGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Subscription vs Commission Stacked Bar Chart */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-xs mb-5 uppercase tracking-wider">Revenue Sources Breakdown</h3>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={REVENUE_SOURCES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="subscription" name="Subscription Plans" stackId="a" fill="#7C3AED" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="commission" name="Property Commissions" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
