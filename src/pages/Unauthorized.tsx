import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Unauthorized = () => (
  <div className="min-h-screen bg-brand-bg">
    <Navbar />
    <div className="pt-16 flex items-center justify-center min-h-screen">
      <div className="text-center px-4">
        <ShieldX className="w-20 h-20 text-brand-purple mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-brand-text mb-3">Access Denied</h1>
        <p className="text-brand-muted mb-8 max-w-sm mx-auto">You don't have permission to access this page.</p>
        <Link to="/" className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-semibold hover:shadow-brand transition-all">
          Go Home
        </Link>
      </div>
    </div>
  </div>
);

export default Unauthorized;
