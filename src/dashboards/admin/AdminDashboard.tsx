import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart3, Users, Building2, FileText, TrendingUp, Settings, AlertTriangle } from "lucide-react";

const TABS = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users, badge: "2.1M" },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "disputes", label: "Disputes", icon: AlertTriangle, badge: "2" },
  { id: "blogs", label: "Blog Manager", icon: FileText },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout
      tabs={TABS}
      role="admin"
      roleLabel="Super Admin"
      headerActions={
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          System Online
        </div>
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
