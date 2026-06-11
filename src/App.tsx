import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PropertyProvider } from "@/context/PropertyContext";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Loader from "@/components/ui/Loader";

// Lazy Pages
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Agents = lazy(() => import("./pages/Agents"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const AIInsights = lazy(() => import("./pages/AIInsights"));
const PostProperty = lazy(() => import("./pages/PostProperty"));
const SavedProperties = lazy(() => import("./pages/SavedProperties"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Buyers = lazy(() => import("./pages/Buyers"));
const Tenants = lazy(() => import("./pages/Tenants"));
const Sellers = lazy(() => import("./pages/Sellers"));
const Services = lazy(() => import("./pages/Services"));
const NewsGuide = lazy(() => import("./pages/NewsGuide"));

// Lazy Dashboards Shells
const BuyerDashboard = lazy(() => import("./dashboards/buyer/BuyerDashboard"));
const SellerDashboard = lazy(() => import("./dashboards/seller/SellerDashboard"));
const AgentDashboard = lazy(() => import("./dashboards/agent/AgentDashboard"));
const TenantDashboard = lazy(() => import("./dashboards/tenant/TenantDashboard"));
const AdminDashboard = lazy(() => import("./dashboards/admin/AdminDashboard"));

// Lazy Buyer Subpages
const BuyerOverview = lazy(() => import("./dashboards/buyer/BuyerOverview"));
const BuyerSaved = lazy(() => import("./dashboards/buyer/BuyerSaved"));
const BuyerBookings = lazy(() => import("./dashboards/buyer/BuyerBookings"));
const BuyerChats = lazy(() => import("./dashboards/buyer/BuyerChats"));
const BuyerNotifications = lazy(() => import("./dashboards/buyer/BuyerNotifications"));
const BuyerProfile = lazy(() => import("./dashboards/buyer/BuyerProfile"));

// Lazy Seller Subpages
const SellerOverview = lazy(() => import("./dashboards/seller/SellerOverview"));
const SellerListings = lazy(() => import("./dashboards/seller/SellerListings"));
const SellerAnalytics = lazy(() => import("./dashboards/seller/SellerAnalytics"));
const SellerInquiries = lazy(() => import("./dashboards/seller/SellerInquiries"));
const SellerChats = lazy(() => import("./dashboards/seller/SellerChats"));
const SellerProfile = lazy(() => import("./dashboards/seller/SellerProfile"));

// Lazy Agent Subpages
const AgentOverview = lazy(() => import("./dashboards/agent/AgentOverview"));
const AgentClients = lazy(() => import("./dashboards/agent/AgentClients"));
const AgentAppointments = lazy(() => import("./dashboards/agent/AgentAppointments"));
const AgentCommissions = lazy(() => import("./dashboards/agent/AgentCommissions"));
const AgentChats = lazy(() => import("./dashboards/agent/AgentChats"));
const AgentProfile = lazy(() => import("./dashboards/agent/AgentProfile"));

// Lazy Tenant Subpages
const TenantOverview = lazy(() => import("./dashboards/tenant/TenantOverview"));
const TenantPayments = lazy(() => import("./dashboards/tenant/TenantPayments"));
const TenantMaintenance = lazy(() => import("./dashboards/tenant/TenantMaintenance"));
const TenantLease = lazy(() => import("./dashboards/tenant/TenantLease"));
const TenantProfile = lazy(() => import("./dashboards/tenant/TenantProfile"));

// Lazy Admin Subpages
const AdminOverview = lazy(() => import("./dashboards/admin/AdminOverview"));
const AdminUsers = lazy(() => import("./dashboards/admin/AdminUsers"));
const AdminProperties = lazy(() => import("./dashboards/admin/AdminProperties"));
const AdminDisputes = lazy(() => import("./dashboards/admin/AdminDisputes"));
const AdminBlogs = lazy(() => import("./dashboards/admin/AdminBlogs"));
const AdminAnalytics = lazy(() => import("./dashboards/admin/AdminAnalytics"));
const AdminSettings = lazy(() => import("./dashboards/admin/AdminSettings"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PropertyProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<Loader fullScreen />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agents/:id" element={<Agents />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/buyers" element={<Buyers />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/sellers" element={<Sellers />} />
                <Route path="/services" element={<Services />} />
                <Route path="/news-guide" element={<NewsGuide />} />
                <Route path="/ai-insights" element={<AIInsights />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Semi-protected */}
                <Route path="/post-property" element={<PostProperty />} />
                <Route path="/saved-properties" element={
                  <ProtectedRoute><SavedProperties /></ProtectedRoute>
                } />

                {/* Role-based Dashboards — nested subroutes */}
                <Route path="/dashboard/buyer" element={<ProtectedRoute allowedRoles={["buyer"]}><BuyerDashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<BuyerOverview />} />
                  <Route path="saved" element={<BuyerSaved />} />
                  <Route path="bookings" element={<BuyerBookings />} />
                  <Route path="chats" element={<BuyerChats />} />
                  <Route path="notifications" element={<BuyerNotifications />} />
                  <Route path="profile" element={<BuyerProfile />} />
                  <Route path="*" element={<Navigate to="overview" replace />} />
                </Route>

                <Route path="/dashboard/seller" element={<ProtectedRoute allowedRoles={["seller"]}><SellerDashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<SellerOverview />} />
                  <Route path="listings" element={<SellerListings />} />
                  <Route path="analytics" element={<SellerAnalytics />} />
                  <Route path="inquiries" element={<SellerInquiries />} />
                  <Route path="chats" element={<SellerChats />} />
                  <Route path="profile" element={<SellerProfile />} />
                  <Route path="*" element={<Navigate to="overview" replace />} />
                </Route>

                <Route path="/dashboard/agent" element={<ProtectedRoute allowedRoles={["agent"]}><AgentDashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<AgentOverview />} />
                  <Route path="clients" element={<AgentClients />} />
                  <Route path="appointments" element={<AgentAppointments />} />
                  <Route path="commissions" element={<AgentCommissions />} />
                  <Route path="chats" element={<AgentChats />} />
                  <Route path="profile" element={<AgentProfile />} />
                  <Route path="*" element={<Navigate to="overview" replace />} />
                </Route>

                <Route path="/dashboard/tenant" element={<ProtectedRoute allowedRoles={["tenant"]}><TenantDashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<TenantOverview />} />
                  <Route path="payments" element={<TenantPayments />} />
                  <Route path="maintenance" element={<TenantMaintenance />} />
                  <Route path="lease" element={<TenantLease />} />
                  <Route path="profile" element={<TenantProfile />} />
                  <Route path="*" element={<Navigate to="overview" replace />} />
                </Route>

                <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<AdminOverview />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="properties" element={<AdminProperties />} />
                  <Route path="disputes" element={<AdminDisputes />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="*" element={<Navigate to="overview" replace />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
