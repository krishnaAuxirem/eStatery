import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Home, Heart, Calendar, Bell, User, MessageSquare } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "saved", label: "Saved Properties", icon: Heart },
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "chats", label: "Messages", icon: MessageSquare },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 2 },
  { id: "profile", label: "My Profile", icon: User },
];

const BuyerDashboard = () => {
  return (
    <DashboardLayout tabs={TABS} role="buyer" roleLabel="Buyer">
      <Outlet />
    </DashboardLayout>
  );
};

export default BuyerDashboard;
