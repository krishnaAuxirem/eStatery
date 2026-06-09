import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart3, Users, Calendar, DollarSign, User, Star } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "clients", label: "Client CRM", icon: Users, badge: 4 },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "commissions", label: "Commissions", icon: DollarSign },
  { id: "profile", label: "My Profile", icon: User },
];

const AgentDashboard = () => {
  return (
    <DashboardLayout
      tabs={TABS} role="agent" roleLabel="Agent"
      headerActions={
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> 4.8 · 127 reviews
        </div>
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default AgentDashboard;
