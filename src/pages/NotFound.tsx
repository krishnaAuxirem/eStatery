import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <div className="text-9xl font-bold text-gradient mb-4">404</div>
          <h1 className="text-3xl font-bold text-brand-text mb-3">Page Not Found</h1>
          <p className="text-brand-muted mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-semibold hover:shadow-brand transition-all">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link to="/properties" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-border text-brand-text font-semibold hover:border-brand-purple hover:text-brand-purple transition-all">
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
