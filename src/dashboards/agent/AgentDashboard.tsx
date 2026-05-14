import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Users, TrendingUp, DollarSign, Calendar, Star, Phone,
  BarChart3, User, Building2, CheckCircle2, Clock, Target,
  ArrowUpRight, MapPin, MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { toast } from "sonner";

const COMMISSION_DATA = [
  { month: "Jan", commission: 85000 }, { month: "Feb", commission: 120000 }, { month: "Mar", commission: 95000 },
  { month: "Apr", commission: 145000 }, { month: "May", commission: 180000 }, { month: "Jun", commission: 160000 }
];
const DEAL_DATA = [
  { month: "Jan", deals: 4 }, { month: "Feb", deals: 6 }, { month: "Mar", deals: 5 },
  { month: "Apr", deals: 8 }, { month: "May", deals: 7 }, { month: "Jun", deals: 9 }
];

const CLIENTS = [
  { name: "Rahul Gupta", type: "Buyer", interest: "3BHK Mumbai", budget: "₹2.5Cr", status: "Active", phone: "+91 9988776655", lastContact: "Today" },
  { name: "Sneha Patel", type: "Renter", interest: "2BHK Bangalore", budget: "₹60K/mo", status: "Negotiating", phone: "+91 8877665544", lastContact: "Yesterday" },
  { name: "Aditya Singh", type: "Investor", interest: "Commercial Hyderabad", budget: "₹8Cr", status: "Viewing", phone: "+91 7766554433", lastContact: "2 days ago" },
  { name: "Priya Nair", type: "Buyer", interest: "Villa Pune", budget: "₹3.2Cr", status: "Closed", phone: "+91 6655443322", lastContact: "Last week" },
];
const COMMISSIONS = [
  { deal: "Sky Residences, Mumbai", date: "May 12, 2025", amount: "₹1,80,000", status: "Paid", type: "Sale" },
  { deal: "Villa Estate, Bangalore", date: "Apr 28, 2025", amount: "₹2,40,000", status: "Pending", type: "Sale" },
  { deal: "DLF Apartment, Gurgaon", date: "Apr 10, 2025", amount: "₹85,000", status: "Paid", type: "Rental" },
  { deal: "Commercial Office, Hyderabad", date: "Mar 22, 2025", amount: "₹3,50,000", status: "Paid", type: "Sale" },
];

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "clients", label: "Client CRM", icon: Users, badge: 4 },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "commissions", label: "Commissions", icon: DollarSign },
  { id: "profile", label: "My Profile", icon: User },
];

const AgentDashboard = () => {
  const { user } = useAuth();
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const activeTab = tab || "overview";
  const setActiveTab = (t: string) => navigate(`/dashboard/agent/${t}`);

  return (
    <DashboardLayout
      activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} role="agent" roleLabel="Agent"
      headerActions={
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> 4.8 · 127 reviews
        </div>
      }
    >
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Clients", value: "24", icon: Users, color: "text-[#5B21B6]", bg: "bg-purple-50", trend: "+3 this month" },
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
            <h3 className="font-bold text-[#0F172A] mb-5 flex items-center gap-2"><Target className="w-4 h-4 text-[#5B21B6]" /> Deal Pipeline</h3>
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
      )}

      {activeTab === "clients" && (
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl mb-6">Client CRM <span className="text-[#64748B] font-normal text-base">({CLIENTS.length} clients)</span></h2>
          <div className="space-y-3">
            {CLIENTS.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-bold text-lg shrink-0">{c.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-[#0F172A]">{c.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{c.type}</span>
                  </div>
                  <p className="text-[#64748B] text-sm mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{c.interest} · Budget: <span className="font-semibold text-[#0F172A]">{c.budget}</span></p>
                  <p className="text-[#64748B] text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />Last contact: {c.lastContact}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${c.status === "Closed" ? "bg-emerald-50 text-emerald-700" : c.status === "Active" ? "bg-blue-50 text-blue-700" : c.status === "Viewing" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}>{c.status}</span>
                  <button onClick={() => toast.success(`Calling ${c.name}...`)} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#10B981] hover:bg-emerald-50 transition-all"><Phone className="w-4 h-4" /></button>
                  <button onClick={() => toast.success(`Opening chat with ${c.name}...`)} className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#10B981] hover:bg-emerald-50 transition-all"><MessageSquare className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "appointments" && (
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl mb-6">Upcoming Appointments</h2>
          <div className="space-y-3">
            {[
              { client: "Rahul Gupta", property: "Sky Residences, Mumbai", type: "Site Visit", date: "Jun 5, 2025", time: "10:30 AM", status: "Confirmed" },
              { client: "Sneha Patel", property: "DLF Apartment, Gurgaon", type: "Virtual Tour", date: "Jun 7, 2025", time: "3:00 PM", status: "Pending" },
              { client: "Aditya Singh", property: "Commercial Office, HITEC City", type: "Site Visit", date: "Jun 10, 2025", time: "11:00 AM", status: "Confirmed" },
              { client: "Priya Nair", property: "Villa Estate, Bangalore", type: "Document Review", date: "Jun 12, 2025", time: "2:00 PM", status: "Pending" },
            ].map((apt, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shrink-0"><Calendar className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{apt.client}</h4>
                      <p className="text-[#64748B] text-sm mt-0.5">{apt.property}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-[#64748B]">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">{apt.type}</span>
                        <Clock className="w-3 h-3" />{apt.date} at {apt.time}
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${apt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{apt.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "commissions" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#0F172A] text-xl">Commission Statement</h2>
            <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">YTD Total: ₹7,85,000</div>
          </div>
          <div className="space-y-3">
            {COMMISSIONS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.type === "Sale" ? "bg-emerald-50" : "bg-blue-50"}`}>
                  <DollarSign className={`w-5 h-5 ${item.type === "Sale" ? "text-emerald-600" : "text-blue-500"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#0F172A]">{item.deal}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748B]">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${item.type === "Sale" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{item.type}</span>
                    {item.date}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-emerald-600 text-lg">{item.amount}</div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${item.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <h2 className="font-bold text-[#0F172A] text-xl mb-6">Agent Profile</h2>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#10B981] to-[#059669]" />
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-8 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">{user?.name?.charAt(0)}</div>
                <div className="mb-1">
                  <h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3>
                  <p className="text-[#64748B] text-sm">{user?.email}</p>
                  <div className="flex items-center gap-1 text-amber-400 text-sm mt-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    <span className="text-[#64748B] text-xs ml-1">4.8 (127 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Experience", value: "8 Years" }, { label: "Total Deals", value: "247" }, { label: "Cities Covered", value: "5 Cities" }, { label: "Verified Since", value: "2019" }].map(s => (
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

export default AgentDashboard;
