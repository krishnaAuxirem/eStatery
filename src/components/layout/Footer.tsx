import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Home, Building2, Search, Brain, BookOpen, Users, ArrowRight, Send
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You've been subscribed to eStatery insights!");
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-[#0f0c29] via-[#1a1040] to-[#0d0a23] text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Get AI Property Insights Weekly</h3>
              <p className="text-white/60 text-sm mt-1">Market trends, investment tips, and curated properties — delivered to your inbox.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
              />
              <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo font-semibold hover:shadow-glow transition-all hover:scale-[1.02] flex items-center gap-2">
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-indigo flex items-center justify-center font-bold text-xl text-white">e</div>
              <span className="text-2xl font-bold text-white">eStatery</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              India's most advanced AI-powered real estate marketplace. Buy, sell, rent, and manage premium properties with intelligent insights and seamless workflows.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>101 Tech Tower, BKC, Mumbai 400051, India</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>+91 1800 ESTATERY (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>hello@estatery.com</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-purple-600 border border-white/10 flex items-center justify-center transition-all duration-200 hover:border-purple-500 hover:shadow-glow-sm"
                >
                  <Icon className="w-4 h-4 text-white/70 hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Home className="w-4 h-4 text-purple-400" /> Properties
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Buy Property", to: "/properties?type=buy" },
                { label: "Rent Property", to: "/properties?type=rent" },
                { label: "Commercial", to: "/properties?category=commercial" },
                { label: "Luxury Homes", to: "/properties?category=penthouse" },
                { label: "New Projects", to: "/properties?tag=new" },
                { label: "Post Property", to: "/post-property" }
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-white/60 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" /> Platform
            </h4>
            <ul className="space-y-3">
              {[
                { label: "AI Insights", to: "/ai-insights" },
                { label: "Virtual Tours", to: "/properties" },
                { label: "Our Agents", to: "/agents" },
                { label: "Market Reports", to: "/ai-insights" },
                { label: "Price Predictor", to: "/ai-insights#predictor" },
                { label: "Investment Tools", to: "/ai-insights#guide" }
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-white/60 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" /> Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Blog & News", to: "/blog" },
                { label: "Careers", to: "/careers" },
                { label: "Contact Us", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
                { label: "FAQs", to: "/faq" },
                { label: "Support", to: "/contact" }
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-white/60 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 eStatery Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy</Link>
            <Link to="/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms</Link>
            <Link to="/contact" className="text-white/40 hover:text-white/70 text-xs transition-colors">Support</Link>
            <span className="text-white/20 text-xs">RERA Reg: P05000009483</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
