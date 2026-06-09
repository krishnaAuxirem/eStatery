import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, CheckCircle, Home, Building2, UserCheck, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import { cn } from "@/lib/utils";

const ROLES: { value: UserRole; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "buyer", label: "Buyer / Investor", desc: "Looking to buy or invest in properties", icon: Home },
  { value: "seller", label: "Property Owner", desc: "List and manage your properties", icon: Building2 },
  { value: "agent", label: "Real Estate Agent", desc: "Manage clients and multiple listings", icon: UserCheck },
  { value: "tenant", label: "Tenant", desc: "Find and manage rental properties", icon: Key }
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setIsLoading(true);
    const result = await register({ name, email, password, role, phone });
    setIsLoading(false);
    if (result.success) {
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <img src={heroBg} alt="eStatery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0845]/90 to-[#0d0630]/70" />
        <div className="absolute inset-0 flex flex-col justify-center p-10">
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center font-bold text-xl text-white">e</div>
            <span className="text-2xl font-bold text-white">eStatery</span>
          </Link>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">Start Your Real Estate Journey</h1>
          <p className="text-white/70 leading-relaxed mb-8">
            Join 2 million+ users on India's most intelligent property platform. Free to join, powerful to use.
          </p>
          <div className="space-y-3">
            {["AI-powered property recommendations", "Verified listings across 50+ cities", "Secure booking & payment system", "Real-time market analytics & insights"].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-brand-emerald shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center p-6 sm:p-10 bg-brand-bg overflow-y-auto">
        <div className="max-w-lg mx-auto w-full">
          <Link to="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-indigo flex items-center justify-center font-bold text-lg text-white">e</div>
            <span className="text-xl font-bold text-brand-text">eStatery</span>
          </Link>

          <h2 className="text-2xl font-bold text-brand-text mb-1">Create your account</h2>
          <p className="text-brand-muted mb-6">Join eStatery — it's free and takes 60 seconds.</p>

          {/* Step Indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex-1">
                <div className={cn("h-1.5 rounded-full transition-all", s <= step ? "bg-brand-purple" : "bg-brand-border")} />
                <div className="text-xs text-brand-muted mt-1">{s === 1 ? "Your Role" : "Account Details"}</div>
              </div>
            ))}
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-brand-text mb-3">I am a...</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map(r => {
                  const IconComponent = r.icon;
                  return (
                    <button
                      key={r.value}
                      onClick={() => setRole(r.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5",
                        role === r.value
                          ? "border-brand-purple bg-purple-50"
                          : "border-brand-border bg-white hover:border-purple-200"
                      )}
                    >
                      <div className="text-xl mb-2 text-[#1D4ED8]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className={cn("font-semibold text-sm", role === r.value ? "text-brand-purple" : "text-brand-text")}>{r.label}</div>
                      <div className="text-xs text-brand-muted mt-0.5">{r.desc}</div>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold hover:shadow-brand transition-all"
              >
                Continue as {ROLES.find(r => r.value === role)?.label}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">Full Name</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple transition-all">
                    <User className="w-4 h-4 text-brand-muted shrink-0" />
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Arjun Sharma" className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">Phone Number</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple transition-all">
                    <Phone className="w-4 h-4 text-brand-muted shrink-0" />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 99887 76655" className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text mb-1.5">Email Address</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple transition-all">
                  <Mail className="w-4 h-4 text-brand-muted shrink-0" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">Password</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple transition-all">
                    <Lock className="w-4 h-4 text-brand-muted shrink-0" />
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 6 characters" className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-brand-muted"><EyeOff className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">Confirm Password</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-border bg-white focus-within:border-brand-purple transition-all">
                    <Lock className="w-4 h-4 text-brand-muted shrink-0" />
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Repeat password" className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted bg-transparent" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl border border-brand-border text-brand-text font-semibold hover:bg-gray-50 transition-all">
                  Back
                </button>
                <button type="submit" disabled={isLoading} className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold hover:shadow-brand transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                  {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</> : <><UserPlus className="w-4 h-4" /> Create Account</>}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-brand-muted mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-purple font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
