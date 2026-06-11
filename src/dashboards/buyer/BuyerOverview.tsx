import { Link, useNavigate } from "react-router-dom";
import {
  Heart, Calendar, Eye, Zap, Search, BarChart2, ChevronRight, ArrowUpRight, MapPin, Star, BellRing
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { formatPrice } from "@/data/properties";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Booking, Property } from "@/types";

const ACTIVITY = [
  { month: "Jan", views: 12 }, { month: "Feb", views: 28 }, { month: "Mar", views: 19 },
  { month: "Apr", views: 35 }, { month: "May", views: 42 }, { month: "Jun", views: 38 }
];

export default function BuyerOverview() {
  const { user } = useAuth();
  const { allProperties } = useProperty();
  const navigate = useNavigate();

  const bookings = JSON.parse(localStorage.getItem("estatery_bookings") || "[]").filter((b: Booking) => b.userId === user?.id);
  const savedProps = allProperties.filter(p => user?.savedProperties?.includes(p.id));
  const recentlyViewed = allProperties.slice(2, 5); // Simulated recently viewed

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Saved Properties", value: savedProps.length, icon: Heart, color: "text-rose-500", bg: "bg-rose-50", trend: "+2 this week" },
          { label: "Scheduled Visits", value: bookings.filter((b: Booking) => b.type === "visit").length, icon: Calendar, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "Upcoming" },
          { label: "Virtual Tours", value: bookings.filter((b: Booking) => b.type === "virtual").length, icon: Eye, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "Booked" },
          { label: "Active Property Alerts", value: 3, icon: BellRing, color: "text-emerald-500", bg: "bg-emerald-50", trend: "Instant Alerts" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs font-medium mt-1.5 ${s.color}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Analytics Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0F172A] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#1D4ED8]" /> Search Analytics
            </h3>
            <span className="text-xs text-[#64748B] bg-[#F5F7FA] px-3 py-1 rounded-full">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ACTIVITY}>
              <defs>
                <linearGradient id="buyerActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
              <Area type="monotone" dataKey="views" stroke="#1D4ED8" fill="url(#buyerActivity)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-bold text-[#0F172A] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Explore Properties", icon: Search, href: "/properties", color: "text-[#1D4ED8] bg-blue-50" },
              { label: "View Saved Homes", icon: Heart, href: "/dashboard/buyer/saved", color: "text-rose-500 bg-rose-50" },
              { label: "Check Bookings", icon: Calendar, href: "/dashboard/buyer/bookings", color: "text-[#1D4ED8] bg-blue-50" },
              { label: "AI Insights", icon: Zap, href: "/ai-insights", color: "text-emerald-500 bg-emerald-50" },
            ].map((a, i) => (
              <Link key={i} to={a.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F7FA] transition-colors group">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center`}><a.icon className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-[#0F172A] group-hover:text-[#1D4ED8] flex-1">{a.label}</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[#0F172A] flex items-center gap-2"><Zap className="w-4 h-4 text-[#1D4ED8]" /> AI Recommendations</h3>
          <Link to="/properties" className="text-xs font-semibold text-[#1D4ED8] flex items-center gap-1 hover:underline">View all <ArrowUpRight className="w-3 h-3" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allProperties.slice(0, 3).map((p: Property) => (
            <Link key={p.id} to={`/properties/${p.id}`} className="flex gap-3 p-3 rounded-xl border border-[#E2E8F0] hover:border-[#1D4ED8]/30 hover:bg-blue-50/40 transition-all group">
              <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#0F172A] text-xs truncate group-hover:text-[#1D4ED8]">{p.title}</h4>
                <div className="flex items-center gap-1 text-[#64748B] text-xs mt-0.5"><MapPin className="w-3 h-3 text-[#1D4ED8]" />{p.location.city}</div>
                <div className="font-bold text-[#1D4ED8] text-sm mt-1">{formatPrice(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] flex items-center gap-2 mb-4"><Eye className="w-4 h-4 text-sky-500" /> Recently Viewed</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentlyViewed.map((p: Property) => (
            <Link key={p.id} to={`/properties/${p.id}`} className="flex gap-3 p-3 rounded-xl border border-[#E2E8F0] hover:border-sky-300/30 hover:bg-sky-50/20 transition-all group">
              <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#0F172A] text-xs truncate group-hover:text-sky-600">{p.title}</h4>
                <div className="flex items-center gap-1 text-[#64748B] text-xs mt-0.5"><MapPin className="w-3 h-3 text-[#1D4ED8]" />{p.location.city}</div>
                <div className="font-bold text-[#1D4ED8] text-sm mt-1">{formatPrice(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
