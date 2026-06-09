import { Users, Eye, XCircle } from "lucide-react";
import { toast } from "sonner";

const MOCK_USERS = [
  { name: "Arjun Verma", role: "buyer", email: "arjun@example.com", status: "active", joined: "2025-01-12", properties: 0 },
  { name: "Priya Sharma", role: "seller", email: "priya@example.com", status: "active", joined: "2025-02-08", properties: 3 },
  { name: "Rajan Mehta", role: "agent", email: "rajan@example.com", status: "verified", joined: "2025-01-25", properties: 12 },
  { name: "Kavya Nair", role: "tenant", email: "kavya@example.com", status: "active", joined: "2025-03-15", properties: 0 },
  { name: "Rohit Gupta", role: "buyer", email: "rohit@example.com", status: "suspended", joined: "2025-04-01", properties: 0 },
];

export default function AdminUsers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[#0F172A] text-xl">
          User Management <span className="text-[#64748B] font-normal text-base">({MOCK_USERS.length} shown)</span>
        </h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#64748B]">
          <Users className="w-4 h-4" /> Total: 2.1M users
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-[#F5F7FA] border-b border-[#E2E8F0]">
                {["User", "Role", "Email", "Status", "Joined", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 font-bold text-[#64748B] text-xs uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((u, i) => (
                <tr
                  key={i}
                  className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F5F7FA] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#0F172A]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize ${
                        u.role === "agent"
                          ? "bg-blue-50 text-[#1D4ED8]"
                          : u.role === "seller"
                          ? "bg-amber-50 text-amber-700"
                          : u.role === "tenant"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-sky-50 text-sky-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#64748B]">{u.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                        u.status === "verified"
                          ? "bg-emerald-50 text-emerald-700"
                          : u.status === "suspended"
                          ? "bg-red-50 text-red-700"
                          : "bg-blue-50 text-[#1D4ED8]"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#64748B] text-xs">{u.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toast.success(`Viewing ${u.name}`)}
                        className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toast.success(`${u.name} status toggled`)}
                        className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
