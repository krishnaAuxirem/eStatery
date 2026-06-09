import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart3, Building2, TrendingUp, Users, User } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "listings", label: "My Listings", icon: Building2 },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "inquiries", label: "Inquiries", icon: Users, badge: 4 },
  { id: "profile", label: "My Profile", icon: User },
];

const SellerDashboard = () => {
  return (
    <DashboardLayout tabs={TABS} role="seller" roleLabel="Seller">
      <Outlet />
    </DashboardLayout>
  );
};

export default SellerDashboard;
