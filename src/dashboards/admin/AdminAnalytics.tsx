import { TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const USER_GROWTH = [
  { month: "Jan", users: 12000 },
  { month: "Feb", users: 19000 },
  { month: "Mar", users: 15000 },
  { month: "Apr", users: 28000 },
  { month: "May", users: 35000 },
  { month: "Jun", users: 42000 }
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-[#0F172A] text-xl">Platform Analytics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Page Views / Day", value: "842K", trend: "+14%", color: "text-red-500 bg-red-50" },
          { label: "New Registrations / Day", value: "1,234", trend: "+8%", color: "text-[#1D4ED8] bg-blue-50" },
          { label: "Searches / Hour", value: "28,400", trend: "+22%", color: "text-emerald-500 bg-emerald-50" },
          { label: "Bookings / Day", value: "347", trend: "+18%", color: "text-amber-500 bg-amber-50" },
          { label: "Avg. Session Time", value: "8m 24s", trend: "+2m", color: "text-red-500 bg-red-50" },
          { label: "Conversion Rate", value: "3.8%", trend: "+0.4%", color: "text-emerald-500 bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${s.color.split(" ")[1]}`}>
              <TrendingUp className={`w-5 h-5 ${s.color.split(" ")[0]}`} />
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs font-bold mt-1.5 ${s.color.split(" ")[0]}`}>{s.trend} this week</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[#0F172A]">Monthly User Growth</h3>
          <span className="text-xs bg-[#F5F7FA] text-[#64748B] px-3 py-1 rounded-full">2025</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={USER_GROWTH}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `${(v / 1000).toFixed(0)}K users`} />
            <Bar dataKey="users" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
