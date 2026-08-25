import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, LogIn, Copy, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DEMO_CREDENTIALS } from "@/data/mockUsers";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";

import { DemoCaptcha } from "@/components/ui/DemoCaptcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const getDashboardRoute = (role: string) => {
    const routes: Record<string, string> = {
      buyer: "/dashboard/buyer",
      seller: "/dashboard/seller",
      agent: "/dashboard/agent",
      tenant: "/dashboard/tenant",
      admin: "/dashboard/admin"
    };
    return routes[role] || "/";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please complete the CAPTCHA verification to sign in.");
      return;
    }
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      toast.success("Welcome back to eStatery!");
      const storedUser = JSON.parse(localStorage.getItem("estatery_user") || "{}");
      navigate(from || getDashboardRoute(storedUser.role), { replace: true });
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  const fillCredentials = (cred: typeof DEMO_CREDENTIALS[0], idx: number) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setCaptchaVerified(true);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroBg} alt="eStatery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0845]/90 to-[#0d0630]/70" />
        <div className="absolute inset-0 flex flex-col justify-center p-12">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center font-bold text-xl text-white">e</div>
            <span className="text-2xl font-bold text-white">eStatery</span>
          </Link>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            India's Smartest Real Estate Platform
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Access AI-powered property insights, verified listings, and seamless property management — all in one place.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: "Properties Listed", value: "125K+" },
              { label: "Happy Customers", value: "2M+" },
              { label: "Cities Covered", value: "50+" },
              { label: "Deals Closed", value: "15K/mo" }
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 bg-brand-bg overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-indigo flex items-center justify-center font-bold text-lg text-white">e</div>
            <span className="text-xl font-bold text-brand-text">eStatery</span>
          </Link>

          <h2 className="text-2xl font-bold text-brand-text mb-1">Welcome back</h2>
          <p className="text-brand-muted mb-8">Sign in to continue to your eStatery dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-brand-text mb-1.5">Email Address</label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-purple-50 transition-all">
                <Mail className="w-4 h-4 text-brand-muted shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text mb-1.5">Password</label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-purple-50 transition-all">
                <Lock className="w-4 h-4 text-brand-muted shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-brand-muted hover:text-brand-text">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA Verification */}
            <div className="pt-1">
              <DemoCaptcha
                verified={captchaVerified}
                onVerify={(v) => setCaptchaVerified(v)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold hover:shadow-brand hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <><LogIn className="w-4 h-4" /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-brand-muted mb-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand-purple font-semibold hover:underline">Create one free</Link>
          </p>

          {/* Demo Credentials */}
          <div className="bg-white rounded-2xl border border-brand-border p-5">
            <h3 className="text-sm font-bold text-brand-text mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-purple text-white text-xs flex items-center justify-center font-bold">?</span>
              Demo Credentials — Click to Fill
            </h3>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((cred, i) => (
                <button
                  key={i}
                  onClick={() => fillCredentials(cred, i)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-brand-bg hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                      cred.role === "Admin" ? "bg-red-100 text-red-700" :
                      cred.role === "Buyer" ? "bg-blue-100 text-blue-700" :
                      cred.role === "Seller" ? "bg-green-100 text-green-700" :
                      cred.role === "Agent" ? "bg-purple-100 text-purple-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>{cred.role}</span>
                    <span className="text-xs text-brand-muted">{cred.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-brand-muted font-mono">{cred.password}</span>
                    {copiedIdx === i ? (
                      <CheckCircle className="w-3.5 h-3.5 text-brand-emerald" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-brand-muted group-hover:text-brand-purple" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
