import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, LogOut, ChevronRight, Bell, Settings, Home,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface SidebarTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  badgeColor?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: SidebarTab[];
  role: string;
  roleColor?: string;  // e.g. "from-[#5B21B6] to-[#4338CA]"
  roleLabel?: string;
  roleAccent?: string; // Tailwind class for badge bg
  headerActions?: React.ReactNode;
}

const ROLE_THEMES: Record<string, { gradient: string; accent: string; badge: string }> = {
  buyer:  { gradient: "from-[#0f1e3d] via-[#1a3163] to-[#0f1e3d]", accent: "#1D4ED8", badge: "bg-blue-600" },
  seller: { gradient: "from-[#0a1628] via-[#1a2f4a] to-[#0a1628]", accent: "#0ea5e9", badge: "bg-sky-500" },
  agent:  { gradient: "from-[#0f2818] via-[#1a4a2a] to-[#0f2818]", accent: "#10B981", badge: "bg-emerald-500" },
  tenant: { gradient: "from-[#2a1200] via-[#4a2200] to-[#2a1200]", accent: "#f59e0b", badge: "bg-amber-500" },
  admin:  { gradient: "from-[#1a0808] via-[#3a1010] to-[#1a0808]", accent: "#ef4444", badge: "bg-red-500" },
};

const DashboardLayout = ({
  children,
  activeTab,
  onTabChange,
  tabs,
  role,
  roleLabel,
  headerActions,
}: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const theme = ROLE_THEMES[role] || ROLE_THEMES.buyer;

  // Close sidebar on route change (mobile)
  const location = useLocation();
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex" style={{ minHeight: "calc(100vh - 66px)" }}>
        {/* ─── Sidebar ─────────────────────────────────────── */}
        <aside
          className={cn(
            "fixed top-[66px] left-0 h-[calc(100vh-66px)] z-40 flex flex-col transition-all duration-300 ease-in-out",
            "bg-white border-r border-[#E2E8F0] shadow-[2px_0_20px_rgba(0,0,0,0.06)]",
            // Mobile
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            // Desktop
            "lg:translate-x-0 lg:sticky lg:top-[66px] lg:h-[calc(100vh-66px)] lg:shrink-0",
            collapsed ? "lg:w-[72px]" : "lg:w-[260px]",
            "w-[260px]"
          )}
        >
          {/* Sidebar Header */}
          <div
            className={cn(
              "p-4 flex items-center gap-3 border-b border-[#E2E8F0]",
              "bg-gradient-to-r",
              theme.gradient
            )}
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}99)` }}
            >
              {initials}
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{user?.name}</p>
                <p className="text-white/50 text-xs capitalize">{roleLabel || role}</p>
              </div>
            )}

            {/* Collapse toggle (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 items-center justify-center text-white/70 hover:text-white transition-all shrink-0"
            >
              <ChevronRight className={cn("w-4 h-4 transition-transform", !collapsed && "rotate-180")} />
            </button>

            {/* Close (mobile) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { onTabChange(tab.id); setSidebarOpen(false); }}
                  title={collapsed ? tab.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group relative",
                    isActive
                      ? "text-white shadow-md"
                      : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F5F7FA]"
                  )}
                  style={isActive ? { background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)` } : {}}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                      style={{ background: theme.accent }}
                    />
                  )}

                  <Icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-white" : "text-[#94A3B8] group-hover:text-[#5B21B6]")} />

                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{tab.label}</span>
                      {tab.badge !== undefined && (
                        <span
                          className={cn(
                            "text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                            isActive ? "bg-white/25 text-white" : (tab.badgeColor || "bg-[#EDE9FE] text-[#5B21B6]")
                          )}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[#E2E8F0] space-y-1">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F5F7FA] transition-all group",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Back to Home" : undefined}
            >
              <Home className="w-4 h-4 shrink-0 text-[#94A3B8] group-hover:text-[#5B21B6]" />
              {!collapsed && <span>Back to Home</span>}
            </Link>
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-all group",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Sign Out" : undefined}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* ─── Main Content ─────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Page Header Bar */}
          <div
            className={cn("bg-gradient-to-r px-4 sm:px-6 py-4", theme.gradient)}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile sidebar toggle */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-white font-bold text-base sm:text-lg capitalize">
                      {tabs.find(t => t.id === activeTab)?.label || "Dashboard"}
                    </h1>
                    <span
                      className={cn("hidden sm:inline text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide", theme.badge, "text-white")}
                    >
                      {roleLabel || role}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-0.5 hidden sm:block">
                    Welcome back, {user?.name?.split(" ")[0]} · eStatery Platform
                  </p>
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {headerActions}
                <button className="relative w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400 border border-white/30" />
                </button>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shadow-lg shrink-0"
                  style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}99)` }}
                >
                  {initials}
                </div>
              </div>
            </div>
          </div>

          {/* Tab indicator strip */}
          <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 py-2 min-w-max">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                      isActive
                        ? "text-white shadow-sm"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F5F7FA]"
                    )}
                    style={isActive ? { background: theme.accent } : {}}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.badge !== undefined && (
                      <span className={cn(
                        "text-[9px] font-extrabold px-1.5 py-0.5 rounded-full",
                        isActive ? "bg-white/25 text-white" : "bg-[#EDE9FE] text-[#5B21B6]"
                      )}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
