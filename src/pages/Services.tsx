import { useState } from "react";
import { 
  Building2, Sparkles, ShieldCheck, Heart, ArrowRight, Landmark, 
  HelpCircle, Users, FileText, Compass, Wrench, Shield, Video 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function Services() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"verification" | "legal" | "loan" | "tours">("verification");

  const stats = [
    { value: "95K+", label: "Service Orders Completed", color: "text-[#1D4ED8]" },
    { value: "480+", label: "Verified Partner Advocates & Banks", color: "text-emerald-600" },
    { value: "100%", label: "Legal Document Clearance Rate", color: "text-sky-500" },
    { value: "24/7", label: "Ticketing & Escalation Support", color: "text-amber-500" }
  ];

  const services = [
    { id: "verification", icon: ShieldCheck, title: "Property Title Verification", desc: "RERA numbers, registry title deeds, and tax clearances verified by expert lawyers." },
    { id: "legal", icon: FileText, title: "Legal Drafting Assistance", desc: "Digital lease agreements, sale deeds, and RERA compliance paperwork." },
    { id: "loan", icon: Landmark, title: "Home Loan Matching", desc: "Direct banker matchmaking to secure discounted pre-approved mortgages." },
    { id: "tours", icon: Video, title: "Virtual Media tours", desc: "3D virtual panoramas and drone elevation capture packages." }
  ];

  const steps = [
    { step: "01", title: "Select Service", desc: "Choose legal checks, home loans, agreement drafting, or property media boosts." },
    { step: "02", title: "Upload Base Papers", desc: "Submit raw specifications, previous ownership deeds, or identity PAN documents." },
    { step: "03", title: "Partner Matchmaking", desc: "eStatery assigns a verified partner lawyer or bank manager under 2 hours." },
    { step: "04", title: "Receive Compliance Pack", desc: "Download signed, certified RERA agreements or loan pre-approval vouchers." }
  ];

  const reviews = [
    { quote: "The Legal drafting team drafted our Bangalore Crest lease agreement within 2 hours. Seamless canvas signature and jspdf compiles.", author: "Sunita Deshmukh", role: "Property Owner, Bangalore" },
    { quote: "The virtual media team recorded premium drone footage of our Gurgaon apartment. Inquiries increased by 400% after posting RERA verified badge.", author: "Arjun Mehta", role: "Seller, Gurgaon" }
  ];

  const faqs = [
    { q: "Who are eStatery's Service Partners?", a: "We partner with RERA-compliant property advocates, certified banking institutions (HDFC, ICICI, SBI), and licensed drone pilots." },
    { q: "How long does document title verification take?", a: "Average legal title checks and PAN/owner validation require 24 to 48 hours for a complete clearance report." },
    { q: "How do I book a 360 Virtual Tour?", a: "Select the virtual media service, input your property address, choose a date slot, and our partner pilot will capture interior layouts." }
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Services Hero */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Our Services
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Enterprise-Grade <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">PropTech Services</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium">
              RERA legal verifications, mortgage assistance, custom drone walkthroughs, Packers &amp; Movers, and complete rental management.
            </p>
          </div>
        </div>

        {/* Services Grid Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Complete Services Portfolio</h2>
            <p className="text-slate-500 text-xs mt-1.5">Verified solutions matching your purchase, lease, or selling needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div 
                  key={s.id} 
                  onClick={() => setActiveTab(s.id as any)}
                  className={`border rounded-3xl p-6 space-y-4 hover:shadow-md cursor-pointer transition-all ${
                    activeTab === s.id 
                      ? "bg-white border-[#1D4ED8] ring-2 ring-[#1D4ED8]/10" 
                      : "bg-white border-slate-200/60"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Icon className="w-5 h-5" /></div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{s.title}</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Services Tab Details */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {activeTab === "verification" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-300">
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#1D4ED8] border border-blue-100 rounded-lg text-[10px] font-extrabold uppercase inline-block">Title Search</span>
                  <h3 className="text-xl font-extrabold text-slate-800">Property Title Clearances &amp; Audits</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Our certified advocates inspect local municipal corporation registers to ensure property tax receipts are up-to-date and that the listing does not have bank hypothecations or dispute cases pending.
                  </p>
                  <button onClick={() => toast.success("Verification request logged.")} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md">
                    Apply for Verification Check <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600" alt="Legal Documents" className="w-full h-72 object-cover rounded-3xl shadow" />
                </div>
              </div>
            )}

            {activeTab === "legal" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-300">
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-[10px] font-extrabold uppercase inline-block">Contracts Drafting</span>
                  <h3 className="text-xl font-extrabold text-slate-800">Legal Agreement Templates</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Generate lease contracts, sale agreements, PAN verifications, and RERA declarations. All templates are customizable and ready for canvas-based E-signatures.
                  </p>
                  <button onClick={() => toast.success("Drafting request logged.")} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md">
                    Start Agreement Draft <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600" alt="Drafting Leases" className="w-full h-72 object-cover rounded-3xl shadow" />
                </div>
              </div>
            )}

            {activeTab === "loan" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-300">
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[10px] font-extrabold uppercase inline-block">Mortgages</span>
                  <h3 className="text-xl font-extrabold text-slate-800">Direct Banking Integrations</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Skip third-party mortgage brokers. eStatery directly matches you with verified loan desk managers at HDFC, ICICI, and SBI for priority pricing.
                  </p>
                  <button onClick={() => toast.success("Loan matching request logged.")} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md">
                    Connect with Bank Desk <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600" alt="Home Loans" className="w-full h-72 object-cover rounded-3xl shadow" />
                </div>
              </div>
            )}

            {activeTab === "tours" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-300">
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-[10px] font-extrabold uppercase inline-block">Media Shoot</span>
                  <h3 className="text-xl font-extrabold text-slate-800">3D Tours &amp; Drone Shoots</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Sellers can hire our certified videographers to capture interior 360 panoramas and exterior elevation drone shots, verified to boost listing views by 4x.
                  </p>
                  <button onClick={() => toast.success("Media shoot requested.")} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md">
                    Schedule Professional Shoot <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600" alt="Drone Videography" className="w-full h-72 object-cover rounded-3xl shadow" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services Statistics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 text-center space-y-2 hover:shadow-sm transition-shadow">
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-slate-800 font-extrabold text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Workflow Timeline */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">How to Book a Service?</h2>
              <p className="text-slate-500 text-xs mt-2">A simplified, four-step digital workflow of how we process service requests.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((s, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 relative space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-extrabold text-purple-200">{s.step}</div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{s.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Reviews */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Client Reviews</h2>
            <p className="text-slate-500 text-xs mt-2">Hear from property owners who used eStatery's verified services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs">{t.author}</h4>
                  <span className="text-[#1D4ED8] font-bold text-[10px] mt-0.5 block">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> Services FAQs</h2>
            <p className="text-slate-500 text-xs mt-1.5">Common questions about legal draftings and virtual shoots.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden">
                  <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full px-5 py-4 text-left font-extrabold text-slate-800 hover:bg-slate-50/50 flex justify-between items-center transition-colors text-xs">
                    <span>{f.q}</span>
                    <span className="text-slate-400 text-sm">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="px-5 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100/50 pt-2 bg-slate-50/10">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="text-2xl lg:text-3xl font-extrabold">Have a specific legal or banking need?</h2>
              <p className="text-white/80 text-xs leading-relaxed">Book a consultation with our verified RERA panel advocates or mortgage advisors.</p>
            </div>
            <div className="flex gap-4 shrink-0 w-full sm:w-auto">
              <button onClick={() => toast.success("Consultation request logged.")} className="px-6 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs hover:bg-slate-50 shadow-md transition-all w-full sm:w-auto text-center">
                Book Consultation Now
              </button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
