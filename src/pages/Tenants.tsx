import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, Search, MapPin, ShieldCheck, Heart, Sparkles, 
  ArrowRight, Landmark, FileText, Wrench, HelpCircle, Users, CheckCircle 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function Tenants() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Maintenance state simulator
  const [maintenanceIssue, setMaintenanceIssue] = useState("plumbing");
  const [maintenanceDesc, setMaintenanceDesc] = useState("");
  const [maintenancePriority, setMaintenancePriority] = useState("medium");
  const [maintenanceSubmitting, setMaintenanceSubmitting] = useState(false);

  const stats = [
    { value: "48K+", label: "Verified Tenants Served", color: "text-[#1D4ED8]" },
    { value: "24 Hours", label: "Average Move-In Turnaround", color: "text-emerald-600" },
    { value: "12K+", label: "Active Signed Lease Deeds", color: "text-sky-500" },
    { value: "₹45 Cr+", label: "Total Rental Distributions Processed", color: "text-amber-500" }
  ];

  const rentalCategories = [
    { title: "BHK Apartments", count: "8,500+ listings", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500" },
    { title: "PG / Co-living Rooms", count: "2,400+ listings", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500" },
    { title: "Studio Flats", count: "1,800+ listings", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
    { title: "Office Spaces", count: "3,200+ listings", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500" }
  ];

  const benefits = [
    { icon: ShieldCheck, title: "Zero Brokerage Listings", desc: "Connect directly with property owners and avoid expensive middleman fees." },
    { icon: FileText, title: "HTML5 E-Sign Agreements", desc: "Draft and sign certified leases on our secure digital drawing canvas." },
    { icon: Landmark, title: "UPI & Card Rent Gateways", desc: "Automate your monthly rents via Stripe/Razorpay secure distributions." },
    { icon: Wrench, title: "Instant Maintenance Hub", desc: "Raise tickets and track plumbing or repair statuses directly from your dashboard." }
  ];

  const steps = [
    { step: "01", title: "Select Rental Category", desc: "Browse flats, studio spaces, or co-living setups matching your budget." },
    { step: "02", title: "Virtual Tour & Map Inspect", desc: "Inspect interior 360 walkthroughs and study nearby bus stops, metro, or colleges." },
    { step: "03", title: "E-Sign Lease Draft", desc: "Draw your digital signature in the agreement box to generate certified lease PDFs." },
    { step: "04", title: "Automate Rents", desc: "Complete security deposit checkouts and automate monthly rent distributions." }
  ];

  const reviews = [
    { quote: "The E-Sign agreement saved us three trips to the registration office. Rents are charged directly to my card, and I receive tax-friendly rent receipts instantly.", author: "Sunil Sharma", role: "Tenant, DLF Cyber Hub Gurgaon" },
    { quote: "We raised a plumbing issue at 9 AM through the Tenant Maintenance Hub and the landlord's verified vendor resolved it by noon. Highly efficient!", author: "Kriti Deshmukh", role: "Tenant, Koramangala Bangalore" }
  ];

  const faqs = [
    { q: "How do I sign my lease agreement digitally?", a: "Navigate to Tenant Dashboard > Lease. Select the pending document, review terms, and draw your signature on the interactive canvas pad to apply." },
    { q: "Is the security deposit processed securely?", a: "Yes. All deposits are held under Stripe-ready escrow integrations or direct Razorpay channels, ensuring transparent refunds upon lease completion." },
    { q: "How do I raise a maintenance request?", a: "Renter dashboards have a 'Maintenance' tab where you can specify category, priority, and attach issue descriptions to notify the owner." }
  ];

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintenanceDesc) {
      toast.error("Please describe the maintenance issue.");
      return;
    }
    setMaintenanceSubmitting(true);
    setTimeout(() => {
      toast.success("Maintenance request raised successfully!");
      setMaintenanceSubmitting(false);
      setMaintenanceDesc("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Tenants Hero */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              For Tenants
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Rent Smart with <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Direct Landlord Deals</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Zero brokerage listings, instant digital agreements, automated payments, and direct maintenance ticketing. All in one place.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/properties?type=rent" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo font-bold text-white text-xs hover:shadow-glow transition-all">
                Browse properties for rent
              </Link>
            </div>
          </div>
        </div>

        {/* Verified Rentals Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">Premium Rents</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Verified Rented Properties</h2>
            </div>
            <Link to="/properties?type=rent" className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-0.5">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cyber City Studio Flat", price: "₹45,000/mo", loc: "DLF Cybercity, Gurgaon", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" },
              { title: "Koramangala 2BHK Flat", price: "₹35,000/mo", loc: "4th Block, Bangalore", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" },
              { title: "Bandra Sea Facing Flat", price: "₹1,20,000/mo", loc: "Carter Road, Mumbai", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600" }
            ].map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 overflow-hidden relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-4 left-4 bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase">Verified Rented</span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-sm truncate">{p.title}</h4>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-[#1D4ED8] text-base">{p.price}</span>
                    <span className="text-slate-400 text-xs font-semibold">{p.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rental Categories */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Explore Rental Categories</h2>
              <p className="text-slate-500 text-xs mt-1.5">Study specific sectors depending on rental requirements.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentalCategories.map((c, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-md transition-shadow relative h-40 group cursor-pointer">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent flex flex-col justify-end p-4 text-white">
                    <h4 className="font-bold text-xs">{c.title}</h4>
                    <span className="text-[10px] text-white/75 font-semibold mt-0.5">{c.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tenants Statistics */}
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

        {/* Tenant Benefits */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-800">Why Rent with eStatery?</h2>
              <p className="text-slate-500 text-xs mt-2">Skip the broker guess-work and enjoy direct digital compliance tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 hover:shadow-md transition-shadow shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Icon className="w-5 h-5" /></div>
                    <h4 className="font-extrabold text-slate-800 text-xs">{b.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rental Process Guide */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Rental Workflow Timeline</h2>
            <p className="text-slate-500 text-xs mt-2">A visual card guide to find, sign, and distribute rent parameters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 relative space-y-3">
                <div className="text-2xl font-extrabold text-purple-200">{s.step}</div>
                <h4 className="font-extrabold text-slate-800 text-xs">{s.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Requests Preview Form */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block flex items-center gap-1"><Wrench className="w-3.5 h-3.5" /> Maintenance Portal</span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight">Simulated Maintenance Ticketing</h2>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Got plumbing, electrical, or appliance issues? Fill out a simulated request below to see how our stateful dashboard notifies landlords.
                </p>
                
                <form onSubmit={handleMaintenanceSubmit} className="space-y-4 pt-4 border-t border-slate-100 bg-white p-6 rounded-3xl border border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Issue Category</label>
                      <select value={maintenanceIssue} onChange={e => setMaintenanceIssue(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]">
                        <option value="plumbing">Plumbing / Water Leak</option>
                        <option value="electrical">Electrical / Power Cut</option>
                        <option value="appliance">Appliance / Geyser Repair</option>
                        <option value="carpentry">Carpentry / Door Lock</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Priority Grade</label>
                      <select value={maintenancePriority} onChange={e => setMaintenancePriority(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]">
                        <option value="low">Low (General)</option>
                        <option value="medium">Medium (Moderate)</option>
                        <option value="high">High (Urgent)</option>
                        <option value="urgent">Critical (Escalated)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Detailed Description *</label>
                    <textarea value={maintenanceDesc} onChange={e => setMaintenanceDesc(e.target.value)} required rows={3} placeholder="Kitchen sink faucet leakage..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8] resize-none" />
                  </div>

                  <button type="submit" disabled={maintenanceSubmitting} className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs transition-all w-full shadow-md">
                    {maintenanceSubmitting ? "Dispatching ticket..." : "Raise Maintenance Ticket"}
                  </button>
                </form>
              </div>

              <div className="bg-gradient-to-br from-[#1a0845] to-[#0d0630] rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center space-y-4 shadow-xl min-h-[300px]">
                <Wrench className="w-12 h-12 text-purple-300" />
                <h4 className="font-bold">Dashboard Ticketing Ledger</h4>
                <p className="text-white/60 text-xs max-w-xs leading-relaxed">Submit the test ticket to verify dashboard RERA compliance channels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tenant Reviews */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-800">Renter Reviews</h2>
            <p className="text-slate-500 text-xs mt-2">Hear from verified tenants using eStatery's dashboard and payment systems.</p>
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
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 justify-center"><HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> Tenants FAQs</h2>
            <p className="text-slate-500 text-xs mt-1.5">Common questions about E-Signatures and rent distributions.</p>
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
              <h2 className="text-2xl lg:text-3xl font-extrabold">Ready to find your next rental?</h2>
              <p className="text-white/80 text-xs leading-relaxed">Search through verified single studio flats, 3BHK premium penthouses, or co-living spaces.</p>
            </div>
            <div className="flex gap-4 shrink-0 w-full sm:w-auto">
              <Link to="/properties?type=rent" className="px-6 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs hover:bg-slate-50 shadow-md transition-all w-full sm:w-auto text-center">
                Search Rental Listings
              </Link>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
