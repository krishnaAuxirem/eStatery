import { useState } from "react";
import {
  Users, Building2, TrendingUp, ShieldCheck, AlertTriangle, BarChart3,
  Settings, FileText, Activity, DollarSign, Eye, CheckCircle2, XCircle,
  Clock, Plus, Zap, Database
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { BLOGS } from "@/data/blogs";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import { toast } from "sonner";

const REVENUE_DATA = [
  { month: "Jan", revenue: 2400000 }, { month: "Feb", revenue: 3200000 }, { month: "Mar", revenue: 2800000 },
  { month: "Apr", revenue: 4100000 }, { month: "May", revenue: 3800000 }, { month: "Jun", revenue: 5200000 }
];
const PROPERTY_TYPES_PIE = [
  { name: "Apartments", value: 48 }, { name: "Villas", value: 18 }, { name: "Commercial", value: 14 },
  { name: "Studios", value: 12 }, { name: "Others", value: 8 }
];
const USER_GROWTH = [
  { month: "Jan", users: 12000 }, { month: "Feb", users: 19000 }, { month: "Mar", users: 15000 },
  { month: "Apr", users: 28000 }, { month: "May", users: 35000 }, { month: "Jun", users: 42000 }
];
const COLORS = ["#1D4ED8", "#10B981", "#2563EB", "#F59E0B", "#64748B"];

const MOCK_USERS = [
  { name: "Arjun Verma", role: "buyer", email: "arjun@example.com", status: "active", joined: "2025-01-12", properties: 0 },
  { name: "Priya Sharma", role: "seller", email: "priya@example.com", status: "active", joined: "2025-02-08", properties: 3 },
  { name: "Rajan Mehta", role: "agent", email: "rajan@example.com", status: "verified", joined: "2025-01-25", properties: 12 },
  { name: "Kavya Nair", role: "tenant", email: "kavya@example.com", status: "active", joined: "2025-03-15", properties: 0 },
  { name: "Rohit Gupta", role: "buyer", email: "rohit@example.com", status: "suspended", joined: "2025-04-01", properties: 0 },
];

const TABS = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users, badge: "2.1M" },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "blogs", label: "Blog Manager", icon: FileText },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { allProperties } = useProperty();
  const [activeTab, setActiveTab] = useState("overview");
  const [blogs, setBlogs] = useState(BLOGS);
  const [blogForm, setBlogForm] = useState({ title: "", category: "Investment Guide", excerpt: "" });

  const togglePublish = (id: string) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, published: !b.published } : b));
    toast.success("Blog status updated!");
  };

  return (
    <DashboardLayout
      activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} role="admin" roleLabel="Super Admin"
      headerActions={
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          System Online
        </div>
      }
    >
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Platform Users", value: "2.1M", icon: Users, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "+12.4% this month" },
              { label: "Active Listings", value: allProperties.length.toString(), icon: Building2, color: "text-sky-500", bg: "bg-sky-50", trend: "+8.2% this week" },
              { label: "Monthly Revenue", value: "₹5.2Cr", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50", trend: "+36.8% vs last" },
              { label: "Platform Health", value: "99.9%", icon: Activity, color: "text-amber-500", bg: "bg-amber-50", trend: "All systems normal" },
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
                    {PROPERTY_TYPES_PIE.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                  <Legend iconSize={8} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Pending Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Properties awaiting review", count: 12, color: "bg-amber-50 text-amber-700" },
                  { label: "Agent verification requests", count: 5, color: "bg-blue-50 text-[#1D4ED8]" },
                  { label: "Dispute center tickets", count: 3, color: "bg-red-50 text-red-700", urgent: true },
                  { label: "Reported listings", count: 2, color: "bg-orange-50 text-orange-700", urgent: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
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
              <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-red-500" /> Live Activity</h3>
              <div className="space-y-3">
                {[
                  { msg: "New property listed: Sky Residences, Mumbai", time: "2 min ago", type: "property" },
                  { msg: "User verified: Priya Sharma (Agent #AML-2025)", time: "12 min ago", type: "user" },
                  { msg: "Dispute resolved: Ticket #1234", time: "1 hr ago", type: "dispute" },
                  { msg: "Blog published: AI Real Estate Trends 2025", time: "3 hr ago", type: "blog" },
                  { msg: "Fraud alert: Listing #P-4421 under review", time: "5 hr ago", type: "alert" },
                ].map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${a.type === "alert" ? "bg-red-500" : a.type === "property" ? "bg-[#1D4ED8]" : a.type === "user" ? "bg-emerald-500" : "bg-sky-500"}`} />
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
      )}

      {activeTab === "users" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#0F172A] text-xl">User Management <span className="text-[#64748B] font-normal text-base">({MOCK_USERS.length} shown)</span></h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#64748B]"><Users className="w-4 h-4" /> Total: 2.1M users</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-[#F5F7FA] border-b border-[#E2E8F0]">
                    {["User", "Role", "Email", "Status", "Joined", "Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 font-bold text-[#64748B] text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((u, i) => (
                    <tr key={i} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F5F7FA] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{u.name.charAt(0)}</div>
                          <span className="font-semibold text-[#0F172A]">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize ${u.role === "agent" ? "bg-blue-50 text-[#1D4ED8]" : u.role === "seller" ? "bg-amber-50 text-amber-700" : u.role === "tenant" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#64748B]">{u.email}</td>
                      <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${u.status === "verified" ? "bg-emerald-50 text-emerald-700" : u.status === "suspended" ? "bg-red-50 text-red-700" : "bg-blue-50 text-[#1D4ED8]"}`}>{u.status}</span></td>
                      <td className="px-5 py-4 text-[#64748B] text-xs">{u.joined}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => toast.success(`Viewing ${u.name}`)} className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                          <button onClick={() => toast.success(`${u.name} status toggled`)} className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"><XCircle className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "properties" && (
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl mb-6">Property Moderation <span className="text-[#64748B] font-normal text-base">({allProperties.length} total)</span></h2>
          <div className="space-y-3">
            {allProperties.slice(0, 8).map((p: any) => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#0F172A] truncate">{p.title}</h4>
                  <p className="text-[#64748B] text-sm mt-0.5">{p.location.city} · {p.location.area}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.listingType === "buy" ? "bg-blue-50 text-[#1D4ED8]" : "bg-emerald-50 text-emerald-700"}`}>{p.listingType === "buy" ? "For Sale" : "For Rent"}</span>
                    <span className="text-[#64748B] text-xs flex items-center gap-1"><Eye className="w-3 h-3" />{p.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${p.verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.verified ? "Verified" : "Pending"}</span>
                  <button onClick={() => toast.success("Property approved!")} className="p-2.5 rounded-xl border border-[#E2E8F0] text-emerald-600 hover:bg-emerald-50 transition-all"><CheckCircle2 className="w-4 h-4" /></button>
                  <button onClick={() => toast.error("Property rejected.")} className="p-2.5 rounded-xl border border-[#E2E8F0] text-red-500 hover:bg-red-50 transition-all"><XCircle className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "blogs" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h3 className="font-bold text-[#0F172A] text-lg mb-5 flex items-center gap-2"><Plus className="w-5 h-5 text-red-500" /> Create New Blog Post</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Blog Title</label>
                <input type="text" value={blogForm.title} onChange={e => setBlogForm(p => ({ ...p, title: e.target.value }))} placeholder="Enter a compelling title..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Category</label>
                <select value={blogForm.category} onChange={e => setBlogForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-all">
                  {["AI & Technology", "Investment Guide", "Smart Living", "Buyer's Guide", "Commercial", "Rental Market"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Excerpt</label>
                <textarea value={blogForm.excerpt} onChange={e => setBlogForm(p => ({ ...p, excerpt: e.target.value }))} rows={3} placeholder="Write a brief summary..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 resize-none transition-all" />
              </div>
            </div>
            <button onClick={() => { if (blogForm.title) { toast.success("Blog draft created!"); setBlogForm({ title: "", category: "Investment Guide", excerpt: "" }); } else toast.error("Please enter a title"); }}
              className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm hover:shadow-lg transition-all">Create Draft</button>
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] text-lg mb-4">All Blog Posts <span className="text-[#64748B] font-normal text-base">({blogs.length})</span></h3>
            <div className="space-y-3">
              {blogs.map(b => (
                <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img src={b.image} alt={b.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#0F172A] truncate">{b.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">{b.category}</span>
                      <span className="text-[#64748B] text-xs">{b.author}</span>
                      <span className="text-[#64748B] text-xs flex items-center gap-1"><Eye className="w-3 h-3" />{b.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => togglePublish(b.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${b.published ? "bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-700" : "bg-amber-50 text-amber-700 hover:bg-emerald-50 hover:text-emerald-700"}`}>
                    {b.published ? "Published" : "Draft"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
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
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${s.color.split(" ")[1]}`}><TrendingUp className={`w-5 h-5 ${s.color.split(" ")[0]}`} /></div>
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
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <h2 className="font-bold text-[#0F172A] text-xl">Platform Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-red-500" /> Platform Controls</h3>
              <div className="space-y-3">
                {[
                  { label: "Enable new user registrations", enabled: true },
                  { label: "Property listing without verification", enabled: false },
                  { label: "AI recommendations on homepage", enabled: true },
                  { label: "Weekly analytics email reports", enabled: true },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                    <span className="text-[#0F172A] text-sm font-medium">{s.label}</span>
                    <button onClick={() => toast.success("Setting updated!")} className={`relative w-11 h-6 rounded-full transition-all ${s.enabled ? "bg-[#1D4ED8]" : "bg-slate-200"}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${s.enabled ? "right-1" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2"><Database className="w-4 h-4 text-red-500" /> System Status</h3>
              <div className="space-y-3">
                {[
                  { service: "API Server", status: "Online", uptime: "99.98%" },
                  { service: "Database Cluster", status: "Online", uptime: "99.99%" },
                  { service: "CDN / Storage", status: "Online", uptime: "100%" },
                  { service: "Payment Gateway", status: "Online", uptime: "99.95%" },
                  { service: "AI Engine", status: "Online", uptime: "99.87%" },
                ].map(s => (
                  <div key={s.service} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-[#0F172A] text-sm font-medium">{s.service}</span></div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">{s.status}</span>
                      <span className="text-[#64748B] text-xs">{s.uptime}</span>
                    </div>
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

export default AdminDashboard;
