import { useNavigate } from "react-router-dom";
import { Home, MapPin, CheckCircle2, Wrench, Shield, Calendar, CreditCard, Download, FileText, AlertCircle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import type { MaintenanceRequest } from "@/types";
import { jsPDF } from "jspdf";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

interface RentPayment {
  id: string;
  month: string;
  amount: number;
  status: "Due" | "Paid" | "Overdue";
  date: string;
  dueDate: string;
  receipt: boolean;
  transactionId?: string;
}

const ANALYTICS_DATA = [
  { month: "Jan", rent: 85000, utilities: 4100 },
  { month: "Feb", rent: 85000, utilities: 3800 },
  { month: "Mar", rent: 85000, utilities: 5200 },
  { month: "Apr", rent: 85000, utilities: 4900 },
  { month: "May", rent: 85000, utilities: 5500 },
  { month: "Jun", rent: 85000, utilities: 6100 },
];

export default function TenantOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests] = useState<MaintenanceRequest[]>(
    JSON.parse(localStorage.getItem("estatery_maintenance") || "[]").filter((r: MaintenanceRequest) => r.tenantId === user?.id)
  );

  const [payments, setPayments] = useState<RentPayment[]>([]);

  useEffect(() => {
    const local = localStorage.getItem("estatery_rent_payments");
    if (local) {
      setPayments(JSON.parse(local));
    } else {
      const defaults: RentPayment[] = [
        { id: "p-1", month: "June 2026", amount: 85000, status: "Due", date: "Jun 1, 2026", dueDate: "Jun 10, 2026", receipt: false },
        { id: "p-2", month: "May 2026", amount: 85000, status: "Paid", date: "May 1, 2026", dueDate: "May 10, 2026", receipt: true, transactionId: "TXN-STRIPE-1780029" },
        { id: "p-3", month: "April 2026", amount: 85000, status: "Paid", date: "Apr 1, 2026", dueDate: "Apr 10, 2026", receipt: true, transactionId: "TXN-RAZORPAY-1729091" },
        { id: "p-4", month: "March 2026", amount: 85000, status: "Paid", date: "Mar 1, 2026", dueDate: "Mar 10, 2026", receipt: true, transactionId: "TXN-STRIPE-1698202" },
        { id: "p-5", month: "February 2026", amount: 85000, status: "Paid", date: "Feb 2, 2026", dueDate: "Feb 10, 2026", receipt: true, transactionId: "TXN-STRIPE-1658291" },
      ];
      localStorage.setItem("estatery_rent_payments", JSON.stringify(defaults));
      setPayments(defaults);
    }
  }, []);

  const handleDownloadLatestReceipt = () => {
    const latestPaid = payments.find(p => p.status === "Paid");
    if (!latestPaid) {
      toast.error("No paid rent payments found to download receipts.");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFillColor(29, 78, 216); // Brand Blue
      doc.rect(0, 0, 210, 35, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("eStatery Rent Receipt", 20, 24);

      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Receipt Reference: ${latestPaid.transactionId || `TXN-REF-${Date.now()}`}`, 20, 48);
      doc.text(`Receipt Date: ${latestPaid.date}`, 20, 54);

      doc.setDrawColor(226, 232, 240);
      doc.line(20, 60, 190, 60);

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("TENANT DETAILS", 20, 70);
      doc.setFont("helvetica", "normal");
      doc.text("Arjun Mehta (Tenant)", 20, 77);

      doc.setFont("helvetica", "bold");
      doc.text("PROPERTY OWNER", 110, 70);
      doc.setFont("helvetica", "normal");
      doc.text("Rajesh Kumar (Owner)", 110, 77);

      doc.line(20, 90, 190, 90);
      doc.text(`Lease Rent payment settled for ${latestPaid.month}.`, 20, 100);
      doc.text(`Amount Received: INR ${latestPaid.amount.toLocaleString("en-IN")}.00`, 20, 106);

      doc.save(`Receipt_${latestPaid.month.replace(" ", "_")}.pdf`);
      toast.success("Receipt downloaded!");
    } catch (e) {
      toast.error("Failed to generate latest receipt.");
    }
  };

  const paidMonthsCount = payments.filter(p => p.status === "Paid").length;
  const nextPaymentDue = payments.find(p => p.status === "Due");

  return (
    <div className="space-y-6">
      
      {/* Current Rental Card */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-brand-md">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-[10px] font-extrabold uppercase tracking-widest mb-1">Current Rental Property</p>
              <h2 className="text-xl font-extrabold">DLF Phase 5 Apartment</h2>
              <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                <MapPin className="w-3.5 h-3.5 text-white" /> Tower 8, The Crest, Gurgaon · Floor 15
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-white/20">
            <div>
              <div className="text-xl font-bold">₹85,000</div>
              <div className="text-white/60 text-[10px] mt-0.5 font-bold uppercase">Monthly Rent</div>
            </div>
            <div>
              <div className="text-xl font-bold">Dec 2026</div>
              <div className="text-white/60 text-[10px] mt-0.5 font-bold uppercase">Lease Expires</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{nextPaymentDue ? nextPaymentDue.dueDate.split(",")[0] : "Paid YTD"}</div>
              <div className="text-white/60 text-[10px] mt-0.5 font-bold uppercase">Next Payment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Months Completed", value: paidMonthsCount, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-100", trend: "Settled YTD" },
          { label: "Open Requests", value: requests.filter(r => r.status === "open").length, icon: Wrench, color: "text-amber-500 bg-amber-50 border-amber-100", trend: "Pending Action" },
          { label: "Security Deposit", value: "₹1.7L", icon: Shield, color: "text-[#1D4ED8] bg-blue-50 border-blue-100", trend: "Held by Owner" },
          { label: "Lease Days Left", value: "210", icon: Calendar, color: "text-amber-500 bg-amber-50 border-amber-100", trend: "Valid Lease" },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-2xl border ${s.color.split(" ")[2]} p-5 hover:shadow-md transition-shadow`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color.split(" ")[1]}`}>
              <s.icon className={`w-5 h-5 ${s.color.split(" ")[0]}`} />
            </div>
            <div className="text-2xl font-bold text-[#0F172A]">{s.value}</div>
            <div className="text-[#64748B] text-xs mt-0.5">{s.label}</div>
            <div className={`text-[10px] font-bold mt-1.5 ${s.color.split(" ")[0]}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Pay Rent", icon: CreditCard, color: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm", action: () => navigate("/dashboard/tenant/payments") },
            { label: "Raise Request", icon: Wrench, color: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/50", action: () => navigate("/dashboard/tenant/maintenance") },
            { label: "Download Receipt", icon: Download, color: "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/50", action: handleDownloadLatestReceipt },
            { label: "View Lease", icon: FileText, color: "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100/50", action: () => navigate("/dashboard/tenant/lease") },
          ].map((a, i) => (
            <button key={i} onClick={a.action} className={`flex flex-col items-center gap-2 p-4 rounded-xl font-extrabold text-xs transition-all hover:shadow-md ${a.color}`}>
              <a.icon className="w-5 h-5" />{a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rent Payment Analytics Graph */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-[#0F172A] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1D4ED8]" /> Rent & Utility Expenses Analytics
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">Visualize monthly rent payment trends along with dynamic utility bills.</p>
          </div>
          <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full border border-slate-100 font-bold">Past 6 Months</span>
        </div>
        
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
            <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            <Line type="monotone" name="Base Rent" dataKey="rent" stroke="#f59e0b" strokeWidth={3} dot={{ stroke: "#f59e0b", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" name="Utility Bills (Electricity, Water)" dataKey="utilities" stroke="#1D4ED8" strokeWidth={2} dot={{ stroke: "#1D4ED8", strokeWidth: 1.5, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
