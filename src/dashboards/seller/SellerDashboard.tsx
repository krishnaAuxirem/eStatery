import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2, TrendingUp, Eye, Users, Plus, Edit, Trash2, User,
  BarChart3, DollarSign, Star, ArrowUpRight, MapPin, CheckCircle2,
  Clock, Zap, MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
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

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "listings", label: "My Listings", icon: Building2 },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "inquiries", label: "Inquiries", icon: Users, badge: 4 },
  { id: "profile", label: "My Profile", icon: User },
];

const SellerDashboard = () => {
  const { user } = useAuth();
  const { allProperties, deleteProperty } = useProperty();
  const [activeTab, setActiveTab] = useState("overview");

  const myProps = allProperties.filter(p => p.ownerId === user?.id || p.ownerName === user?.name);
  const totalViews = myProps.reduce((s: number, p: any) => s + p.views, 0);
  const activeListings = myProps.filter((p: any) => p.status === "active").length;

  const handleDelete = (id: string) => { deleteProperty(id); toast.success("Listing removed."); };

  return (
    <DashboardLayout
      activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} role="seller" roleLabel="Seller"
      headerActions={
        <Link to="/post-property" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
          <Plus className="w-3.5 h-3.5" /> Post Property
        </Link>
      }
    >
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Listings", value: activeListings, icon: Building2, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "Live now" },
              { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-sky-500", bg: "bg-sky-50", trend: "+18% this month" },
              { label: "Inquiries Received", value: 47, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50", trend: "+5 this week" },
              { label: "Revenue (Jun)", value: "₹8.9L", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-50", trend: "+36% vs last" },
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
          {myProps.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F172A]">Recent Listings</h3>
                <button onClick={() => setActiveTab("listings")} className="text-sm font-semibold text-[#1D4ED8] flex items-center gap-1 hover:underline">View all <ArrowUpRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {myProps.slice(0, 3).map((p: any) => (
                  <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F5F7FA] transition-colors">
                    <img src={p.images[0]} alt={p.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#0F172A] text-sm truncate">{p.title}</h4>
                      <div className="flex items-center gap-1 text-[#64748B] text-xs mt-0.5"><MapPin className="w-3 h-3" />{p.location.area}, {p.location.city}</div>
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
      )}

      {activeTab === "listings" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#0F172A] text-xl">My Listings <span className="text-[#64748B] font-normal text-base">({myProps.length})</span></h2>
            <Link to="/post-property" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D4ED8] text-white font-bold text-sm hover:bg-blue-800 transition-all shadow">
              <Plus className="w-4 h-4" /> Add New
            </Link>
          </div>
          {myProps.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
              <Building2 className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
              <h3 className="font-bold text-[#0F172A] mb-2">No Listings Yet</h3>
              <Link to="/post-property" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold mt-4 inline-block">Post Property FREE</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myProps.map((p: any) => (
                <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-all">
                  <img src={p.images[0]} alt={p.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#0F172A]">{p.title}</h4>
                    <div className="flex items-center gap-1 text-[#64748B] text-sm mt-0.5"><MapPin className="w-3.5 h-3.5" />{p.location.area}, {p.location.city}</div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="font-bold text-[#1D4ED8]">{formatPrice(p.price)}</span>
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${p.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span>
                      <span className="text-[#64748B] text-xs flex items-center gap-1"><Eye className="w-3 h-3" />{p.views.toLocaleString()}</span>
                      <span className="text-[#64748B] text-xs flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{p.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start shrink-0">
                    <Link to={`/properties/${p.id}`} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#1D4ED8] hover:bg-blue-50 transition-all"><Edit className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(p.id)} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "analytics" && (
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
      )}

      {activeTab === "inquiries" && (
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
      )}

      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Profile</h2>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB]" />
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-8 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">{user?.name?.charAt(0)}</div>
                <div className="mb-1"><h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3><p className="text-[#64748B] text-sm">{user?.email}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Listings", value: myProps.length }, { label: "Active Listings", value: activeListings },
                  { label: "Total Views", value: totalViews.toLocaleString() }, { label: "Member Since", value: "Jan 2025" },
                ].map(s => (
                  <div key={s.label} className="p-4 bg-[#F5F7FA] rounded-xl">
                    <div className="text-xl font-bold text-[#0F172A]">{s.value}</div>
                    <div className="text-[#64748B] text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SellerDashboard;
