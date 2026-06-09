import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Home, CreditCard, Wrench, FileText, User, AlertCircle } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "payments", label: "Rent Payments", icon: CreditCard, badge: "1 Due", badgeColor: "bg-amber-100 text-amber-700" },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "lease", label: "Lease & Docs", icon: FileText },
  { id: "profile", label: "My Profile", icon: User },
];

const TenantDashboard = () => {
  return (
    <DashboardLayout
      tabs={TABS}
      role="tenant"
      roleLabel="Tenant"
      headerActions={
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
          <AlertCircle className="w-3.5 h-3.5" /> Rent Due Jun 1
        </div>
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default TenantDashboard;
