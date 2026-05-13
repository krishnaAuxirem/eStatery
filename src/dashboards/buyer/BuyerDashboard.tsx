import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart, Calendar, User, Search, TrendingUp, Eye, MapPin, Star,
  Home, Bell, ChevronRight, Clock, CheckCircle2, Zap, BarChart2,
  ArrowUpRight, Building2, Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { formatPrice } from "@/data/properties";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const ACTIVITY = [
  { month: "Jan", views: 12 }, { month: "Feb", views: 28 }, { month: "Mar", views: 19 },
  { month: "Apr", views: 35 }, { month: "May", views: 42 }, { month: "Jun", views: 38 }
];

const TABS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "saved", label: "Saved Properties", icon: Heart },
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 2 },
  { id: "profile", label: "My Profile", icon: User },
];

const BuyerDashboard = () => {
  const { user, updateProfile } = useAuth();
  const { allProperties } = useProperty();
  const [activeTab, setActiveTab] = useState("overview");

  const bookings = JSON.parse(localStorage.getItem("estatery_bookings") || "[]").filter((b: any) => b.userId === user?.id);
  const savedProps = allProperties.filter(p => user?.savedProperties?.includes(p.id));

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      role="buyer"
      roleLabel="Buyer"
      headerActions={
        <Link to="/properties" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
          <Search className="w-3.5 h-3.5" /> Search
        </Link>
      }
    >
      {activeTab === "overview" && <OverviewTab user={user} allProperties={allProperties} savedProps={savedProps} bookings={bookings} setActiveTab={setActiveTab} />}
      {activeTab === "saved" && <SavedTab savedProps={savedProps} />}
      {activeTab === "bookings" && <BookingsTab bookings={bookings} />}
      {activeTab === "notifications" && <NotificationsTab />}
      {activeTab === "profile" && <ProfileTab user={user} updateProfile={updateProfile} />}
    </DashboardLayout>
  );
};

/* ── Overview ───────────────────────────────────────── */
const OverviewTab = ({ user, allProperties, savedProps, bookings, setActiveTab }: any) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Saved Properties", value: savedProps.length, icon: Heart, color: "text-rose-500", bg: "bg-rose-50", trend: "+2 this week" },
        { label: "Scheduled Visits", value: bookings.filter((b: any) => b.type === "visit").length, icon: Calendar, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "Upcoming" },
        { label: "Virtual Tours", value: bookings.filter((b: any) => b.type === "virtual").length, icon: Eye, color: "text-[#1D4ED8]", bg: "bg-blue-50", trend: "Booked" },
        { label: "AI Matches", value: 14, icon: Zap, color: "text-emerald-500", bg: "bg-emerald-50", trend: "+3 new today" },
      ].map(s => (
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
          <h3 className="font-bold text-[#0F172A] flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#1D4ED8]" /> Search Activity
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

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <h3 className="font-bold text-[#0F172A] mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {[
            { label: "Explore Properties", icon: Search, href: "/properties", color: "text-[#1D4ED8] bg-blue-50" },
            { label: "View Saved Homes", icon: Heart, tab: "saved", color: "text-rose-500 bg-rose-50" },
            { label: "Check Bookings", icon: Calendar, tab: "bookings", color: "text-[#1D4ED8] bg-blue-50" },
            { label: "AI Insights", icon: Zap, href: "/ai-insights", color: "text-emerald-500 bg-emerald-50" },
          ].map((a, i) =>
            a.href ? (
              <Link key={i} to={a.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F7FA] transition-colors group">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center`}><a.icon className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-[#0F172A] group-hover:text-[#1D4ED8] flex-1">{a.label}</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
            ) : (
              <button key={i} onClick={() => setActiveTab(a.tab!)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F7FA] transition-colors w-full group text-left">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center`}><a.icon className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-[#0F172A] group-hover:text-[#1D4ED8] flex-1">{a.label}</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </button>
            )
          )}
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[#0F172A] flex items-center gap-2"><Zap className="w-4 h-4 text-[#1D4ED8]" /> AI Recommendations</h3>
        <Link to="/properties" className="text-xs font-semibold text-[#1D4ED8] flex items-center gap-1 hover:underline">View all <ArrowUpRight className="w-3 h-3" /></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allProperties.slice(0, 3).map((p: any) => (
          <Link key={p.id} to={`/properties/${p.id}`} className="flex gap-3 p-3 rounded-xl border border-[#E2E8F0] hover:border-[#1D4ED8]/30 hover:bg-blue-50/40 transition-all group">
            <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#0F172A] text-xs truncate group-hover:text-[#1D4ED8]">{p.title}</h4>
              <div className="flex items-center gap-1 text-[#64748B] text-xs mt-0.5"><MapPin className="w-3 h-3" />{p.location.city}</div>
              <div className="font-bold text-[#1D4ED8] text-sm mt-1">{formatPrice(p.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

/* ── Saved ───────────────────────────────────────────── */
const SavedTab = ({ savedProps }: any) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-bold text-[#0F172A] text-xl">Saved Properties <span className="text-[#64748B] font-normal text-base">({savedProps.length})</span></h2>
      <Link to="/properties" className="flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:underline"><Search className="w-4 h-4" /> Find More</Link>
    </div>
    {savedProps.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
        <Heart className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
        <h3 className="font-bold text-[#0F172A] mb-2">No Saved Properties</h3>
        <p className="text-[#64748B] text-sm mb-6">Browse and save your favourites.</p>
        <Link to="/properties" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold">Explore Properties</Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {savedProps.map((p: any) => (
          <Link key={p.id} to={`/properties/${p.id}`} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#1D4ED8]/20 transition-all group">
            <div className="relative h-40 overflow-hidden">
              <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${p.listingType === "buy" ? "bg-[#1D4ED8] text-white" : "bg-[#10B981] text-white"}`}>
                {p.listingType === "buy" ? "For Sale" : "For Rent"}
              </span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#0F172A] text-sm truncate">{p.title}</h4>
              <div className="flex items-center gap-1 text-[#64748B] text-xs mt-1"><MapPin className="w-3 h-3" />{p.location.area}, {p.location.city}</div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-[#1D4ED8]">{formatPrice(p.price)}</span>
                <div className="flex items-center gap-1 text-amber-500 text-xs"><Star className="w-3 h-3 fill-current" />{p.rating}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);

/* ── Bookings ────────────────────────────────────────── */
const BookingsTab = ({ bookings }: any) => (
  <div>
    <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Bookings <span className="text-[#64748B] font-normal text-base">({bookings.length})</span></h2>
    {bookings.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
        <Calendar className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
        <h3 className="font-bold text-[#0F172A] mb-2">No Bookings Yet</h3>
        <p className="text-[#64748B] text-sm mb-6">Book a property visit to get started.</p>
        <Link to="/properties" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold">Book a Visit</Link>
      </div>
    ) : (
      <div className="space-y-4">
        {bookings.map((b: any) => (
          <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-shadow">
            <img src={b.propertyImage} alt={b.propertyTitle} className="w-20 h-20 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[#0F172A]">{b.propertyTitle}</h4>
              <div className="flex items-center gap-2 mt-1 text-[#64748B] text-sm"><Clock className="w-3.5 h-3.5" />{b.date} at {b.time} · {b.type === "virtual" ? "Virtual Tour" : "Site Visit"}</div>
            </div>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold self-start shrink-0 ${b.status === "confirmed" ? "bg-emerald-50 text-emerald-700" : b.status === "cancelled" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>
              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ── Notifications ───────────────────────────────────── */
const NotificationsTab = () => (
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

/* ── Profile ─────────────────────────────────────────── */
const ProfileTab = ({ user, updateProfile }: any) => {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const handleSave = () => { updateProfile({ name, phone, bio }); toast.success("Profile updated!"); };
  return (
    <div className="max-w-2xl">
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Profile</h2>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">{user?.name?.charAt(0)}</div>
            <div className="mb-1">
              <h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3>
              <p className="text-[#64748B] text-sm capitalize">{user?.role} · eStatery Member</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: name, setter: setName, type: "text", disabled: false },
              { label: "Email Address", value: user?.email || "", setter: () => {}, type: "email", disabled: true },
              { label: "Phone Number", value: phone, setter: setPhone, type: "tel", disabled: false },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">{f.label}</label>
                <input type={f.type} value={f.value} onChange={e => !f.disabled && f.setter(e.target.value)} disabled={f.disabled}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 disabled:bg-[#F5F7FA] disabled:cursor-not-allowed transition-all" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 resize-none transition-all" />
            </div>
            <button onClick={handleSave} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold text-sm hover:shadow-lg transition-all">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
