import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PropertyProvider } from "@/context/PropertyContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Agents from "./pages/Agents";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import AIInsights from "./pages/AIInsights";
import PostProperty from "./pages/PostProperty";
import SavedProperties from "./pages/SavedProperties";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Dashboards
import BuyerDashboard from "./dashboards/buyer/BuyerDashboard";
import SellerDashboard from "./dashboards/seller/SellerDashboard";
import AgentDashboard from "./dashboards/agent/AgentDashboard";
import TenantDashboard from "./dashboards/tenant/TenantDashboard";
import AdminDashboard from "./dashboards/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PropertyProvider>
          <BrowserRouter>
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
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Semi-protected */}
              <Route path="/post-property" element={<PostProperty />} />
              <Route path="/saved-properties" element={
                <ProtectedRoute><SavedProperties /></ProtectedRoute>
              } />

              {/* Role-based Dashboards */}
              <Route path="/dashboard/buyer" element={
                <ProtectedRoute allowedRoles={["buyer"]}><BuyerDashboard /></ProtectedRoute>
              } />
              <Route path="/dashboard/seller" element={
                <ProtectedRoute allowedRoles={["seller"]}><SellerDashboard /></ProtectedRoute>
              } />
              <Route path="/dashboard/agent" element={
                <ProtectedRoute allowedRoles={["agent"]}><AgentDashboard /></ProtectedRoute>
              } />
              <Route path="/dashboard/tenant" element={
                <ProtectedRoute allowedRoles={["tenant"]}><TenantDashboard /></ProtectedRoute>
              } />
              <Route path="/dashboard/admin" element={
                <ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>
              } />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
