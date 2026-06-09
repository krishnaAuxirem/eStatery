import { Link, useNavigate } from "react-router-dom";
import {
  Building2, TrendingUp, Eye, Users, Plus, DollarSign,
  Star, ArrowUpRight, MapPin, CheckCircle2, Clock, BarChart3, HelpCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { formatPrice } from "@/data/properties";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 420000 }, { month: "Feb", revenue: 380000 }, { month: "Mar", revenue: 650000 },
  { month: "Apr", revenue: 720000 }, { month: "May", revenue: 580000 }, { month: "Jun", revenue: 890000 }
];
const VIEW_TREND = [
  { month: "Jan", views: 320 }, { month: "Feb", views: 480 }, { month: "Mar", views: 390 },
  { month: "Apr", views: 610 }, { month: "May", views: 750 }, { month: "Jun", views: 920 }
];

export default function SellerOverview() {
  const { user } = useAuth();
  const { allProperties } = useProperty();
  const navigate = useNavigate();

  const myProps = allProperties.filter(p => p.ownerId === user?.id || p.ownerName === user?.name);
  const totalViews = myProps.reduce((s: number, p: any) => s + p.views, 0);
  const activeListings = myProps.filter((p: any) => p.status === "active").length;

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Listings", value: activeListings, icon: Building2, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "Live now" },
          { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-sky-500", bg: "bg-sky-50", trend: "+18% this month" },
          { label: "Inquiries Received", value: 47, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50", trend: "+5 this week" },
          { label: "Revenue MTD", value: "₹8.9L", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-50", trend: "+36% vs last month" },
          { label: "Response Rate", value: "98.4%", icon: CheckCircle2, color: "text-indigo-500", bg: "bg-indigo-50", trend: "Top 5% on platform" },
          { label: "Avg. Days on Market", value: "24 days", icon: Clock, color: "text-rose-500", bg: "bg-rose-50", trend: "Industry avg: 30 days" },
          { label: "Featured Listings", value: "2", icon: ZapIcon, color: "text-purple-500", bg: "bg-purple-50", trend: "Boosting visibility" },
          { label: "Reports Ready", value: "3 Ready", icon: BarChart3, color: "text-teal-500", bg: "bg-teal-50", trend: "Updated 1hr ago" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs font-medium mt-1.5 ${s.color}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <h3 className="font-bold text-[#0F172A] text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/post-property" className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-200 hover:border-[#1D4ED8] hover:bg-blue-50/30 transition-all text-center">
            <Plus className="w-6 h-6 text-[#1D4ED8] mb-2" />
            <span className="font-bold text-xs text-slate-800">Add New Listing</span>
          </Link>
          <button onClick={() => navigate("/dashboard/seller/inquiries")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-200 hover:border-[#1D4ED8] hover:bg-blue-50/30 transition-all text-center">
            <Users className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="font-bold text-xs text-slate-800">View Inquiries</span>
          </button>
          <button onClick={() => navigate("/dashboard/seller/analytics")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-200 hover:border-[#1D4ED8] hover:bg-blue-50/30 transition-all text-center">
            <TrendingUp className="w-6 h-6 text-sky-600 mb-2" />
            <span className="font-bold text-xs text-slate-800">Analyze Listings</span>
          </button>
          <button onClick={() => toast.success("Market report downloaded!")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-200 hover:border-[#1D4ED8] hover:bg-blue-50/30 transition-all text-center">
            <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
            <span className="font-bold text-xs text-slate-800">Download Reports</span>
          </button>
        </div>
      </div>

      {/* Revenue and Views charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0F172A]">Monthly Revenue (₹)</h3>
            <span className="text-xs text-[#64748B] bg-[#F5F7FA] px-3 py-1 rounded-full">2025</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
              <Bar dataKey="revenue" fill="#1D4ED8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0F172A]">Listing Views Trend</h3>
            <span className="text-xs text-[#64748B] bg-[#F5F7FA] px-3 py-1 rounded-full">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={VIEW_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="views" stroke="#10B981" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance widgets & listing analytics */}
      {myProps.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0F172A]">Recent Listings</h3>
            <Link to="/dashboard/seller/listings" className="text-sm font-semibold text-[#1D4ED8] flex items-center gap-1 hover:underline">View all <ArrowUpRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-3">
            {myProps.slice(0, 3).map((p: any) => (
              <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F5F7FA] transition-colors">
                <img src={p.images[0]} alt={p.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#0F172A] text-sm truncate">{p.title}</h4>
                  <div className="flex items-center gap-1 text-[#64748B] text-xs mt-0.5"><MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />{p.location.area}, {p.location.city}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-[#1D4ED8] text-sm">{formatPrice(p.price)}</div>
                  <div className="text-xs text-[#64748B] mt-0.5 flex items-center gap-1"><Eye className="w-3 h-3" />{p.views} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Small helper icon component
function ZapIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
