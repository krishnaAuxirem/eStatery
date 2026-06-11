import { useState } from "react";
import { Users, Eye, XCircle, CheckCircle, ShieldAlert, Award, FileText } from "lucide-react";
import { toast } from "sonner";

interface UserItem {
  id: string;
  name: string;
  role: "buyer" | "seller" | "agent" | "tenant";
  email: string;
  status: "active" | "verified" | "suspended";
  joined: string;
}

interface KYCRequest {
  id: string;
  userName: string;
  userRole: string;
  docType: string;
  docNumber: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
}

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState<"users" | "kyc">("users");

  const [users, setUsers] = useState<UserItem[]>([
    { id: "u-1", name: "Arjun Verma", role: "buyer", email: "arjun@example.com", status: "active", joined: "2026-01-12" },
    { id: "u-2", name: "Priya Sharma", role: "seller", email: "priya@example.com", status: "active", joined: "2026-02-08" },
    { id: "u-3", name: "Rajan Mehta", role: "agent", email: "rajan@example.com", status: "verified", joined: "2026-01-25" },
    { id: "u-4", name: "Kavya Nair", role: "tenant", email: "kavya@example.com", status: "active", joined: "2026-03-15" },
    { id: "u-5", name: "Rohit Gupta", role: "buyer", email: "rohit@example.com", status: "suspended", joined: "2026-04-01" },
  ]);

  const [kycQueue, setKycQueue] = useState<KYCRequest[]>(() => {
    const defaults: KYCRequest[] = [
      { id: "kyc-1", userName: "Priya Sharma", userRole: "Owner / Seller", docType: "Aadhaar Card & Property Deed", docNumber: "XXXX-XXXX-8291", status: "pending", submittedDate: "Jun 8, 2026" },
      { id: "kyc-2", userName: "Rajan Mehta", userRole: "Certified Agent", docType: "RERA Agent License", docNumber: "RERA-GGN-2026-889", status: "approved", submittedDate: "Jun 5, 2026" },
      { id: "kyc-3", userName: "Devendra Singh", userRole: "Broker Agent", docType: "PAN & RERA License", docNumber: "RERA-MUM-2026-092", status: "pending", submittedDate: "Jun 10, 2026" }
    ];
    const local = localStorage.getItem("estatery_kyc_requests");
    if (local) return JSON.parse(local);
    localStorage.setItem("estatery_kyc_requests", JSON.stringify(defaults));
    return defaults;
  });

  const saveKyc = (updated: KYCRequest[]) => {
    localStorage.setItem("estatery_kyc_requests", JSON.stringify(updated));
    setKycQueue(updated);
  };

  const handleKycApprove = (kycId: string, name: string) => {
    const updated = kycQueue.map(k => k.id === kycId ? { ...k, status: "approved" as const } : k);
    saveKyc(updated);
    
    // Auto verify user in users list if present
    const updatedUsers = users.map(u => u.name === name ? { ...u, status: "verified" as const } : u);
    setUsers(updatedUsers);
    
    toast.success(`KYC approved for ${name}. User verified!`);
  };

  const handleKycReject = (kycId: string, name: string) => {
    const updated = kycQueue.map(k => k.id === kycId ? { ...k, status: "rejected" as const } : k);
    saveKyc(updated);
    toast.error(`KYC request declined for ${name}.`);
  };

  const toggleUserStatus = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "suspended" ? "active" : "suspended";
        toast.success(`User status updated to: ${nextStatus}`);
        return { ...u, status: nextStatus as "active" | "verified" | "suspended" };
      }
      return u;
    });
    setUsers(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">User &amp; Verifications</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Manage user credentials and approve agent RERA licenses.</p>
        </div>
        
        <div className="flex bg-[#F5F7FA] p-1.5 rounded-xl border border-slate-100 shrink-0">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "users"
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> All Users
          </button>
          <button
            onClick={() => setActiveTab("kyc")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "kyc"
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Award className="w-3.5 h-3.5" /> KYC Queue ({kycQueue.filter(k => k.status === "pending").length})
          </button>
        </div>
      </div>

      {activeTab === "users" ? (
        // Users Management table view
        <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-brand-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F5F7FA] border-b border-[#E2E8F0]">
                  {["User Details", "Role", "Email Address", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 font-extrabold text-[#64748B] text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F5F7FA]/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-bold text-[#0F172A]">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                        u.role === "agent" ? "bg-blue-50 text-[#1D4ED8] border border-blue-100" :
                        u.role === "seller" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                        u.role === "tenant" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        "bg-sky-50 text-sky-700 border border-sky-100"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#64748B] font-semibold text-xs">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                        u.status === "verified" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        u.status === "suspended" ? "bg-red-50 text-red-700 border border-red-100" :
                        "bg-blue-50 text-[#1D4ED8] border border-blue-100"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => toast.success(`Viewing Profile: ${u.name}`)}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-slate-500 hover:text-[#1D4ED8] hover:bg-blue-50 hover:border-blue-100 transition-all"
                          title="View user"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
                          title={u.status === "suspended" ? "Activate User" : "Suspend User"}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // KYC Document Verification Queue view
        <div className="space-y-4">
          {kycQueue.map((k) => (
            <div key={k.id} className="bg-white rounded-3xl border border-[#E2E8F0] p-5 flex flex-col md:flex-row justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <FileText className="w-6 h-6 text-[#1D4ED8]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#0F172A] text-sm">{k.userName}</h4>
                  <p className="text-xs text-slate-500 font-semibold">{k.userRole} · ID: {k.id}</p>
                  <p className="text-slate-600 text-xs mt-1.5"><span className="font-bold text-slate-800">Doc Type:</span> {k.docType} ({k.docNumber})</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 ml-auto md:ml-0 shrink-0">
                {k.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleKycApprove(k.id, k.userName)}
                      className="flex items-center gap-1 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve KYC
                    </button>
                    <button
                      onClick={() => handleKycReject(k.id, k.userName)}
                      className="flex items-center gap-1 px-3.5 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    k.status === "approved" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : "bg-red-50 text-red-600 border border-red-100"
                  }`}>
                    {k.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
