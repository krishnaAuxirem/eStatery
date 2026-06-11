import { useState } from "react";
import { Shield, Eye, Lock, Database, UserCheck, HelpCircle, FileText, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("collection");

  const sections = [
    { id: "collection", label: "1. Data Collection", icon: Database },
    { id: "usage", label: "2. Information Usage", icon: Eye },
    { id: "cookies", label: "3. Cookies Policy", icon: FileText },
    { id: "security", label: "4. Security Policy", icon: Lock },
    { id: "thirdparty", label: "5. Third Party Services", icon: Shield },
    { id: "rights", label: "6. User Rights", icon: UserCheck },
    { id: "contact", label: "7. Contact Information", icon: HelpCircle }
  ];

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // offset for navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Privacy Registry
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Platform Privacy Policy</h1>
            <p className="text-white/70 max-w-xl mx-auto text-xs font-semibold">Last updated: June 11, 2026. Review how eStatery gathers, structures, and protects user data.</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigator */}
            <div className="lg:col-span-1 space-y-2.5 self-start sticky top-24">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">Policy Index</span>
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleScrollTo(s.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                        isActive 
                          ? "bg-blue-50 text-[#1D4ED8] border-l-4 border-[#1D4ED8]" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4 shrink-0" /> {s.label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Privacy Reading Pane */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/60 p-8 md:p-10 space-y-10 shadow-sm leading-relaxed text-slate-600 text-sm">
              
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-slate-800">eStatery Legal Information Privacy</h2>
                <p>Welcome to eStatery Technologies. We respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our marketplace (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.</p>
              </div>

              <hr className="border-slate-100" />

              {/* 1. Data Collection */}
              <div id="collection" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#1D4ED8]" /> 1. Data Collection
                </h3>
                <p>We collect personal data that you voluntarily provide to us when you register on our platform, submit property listings, inquire about real estate, sign lease agreements, or schedule site visits.</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Identity Information:</strong> First name, last name, username, KYC documents (Aadhaar/PAN details for verification).</li>
                  <li><strong>Contact Information:</strong> Billing address, delivery address, email address, and phone numbers.</li>
                  <li><strong>Listing Information:</strong> Detailed specs, pricing, and images of properties you submit to eStatery.</li>
                  <li><strong>Agreement Data:</strong> E-Sign drawn signatures and completed PDF lease contracts.</li>
                </ul>
              </div>

              {/* 2. Information Usage */}
              <div id="usage" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#1D4ED8]" /> 2. Information Usage
                </h3>
                <p>We process your personal information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
                <p>Specifically, we use gathered details to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Facilitate direct chat conversations between Buyers, Sellers, and Agents.</li>
                  <li>Generate and deliver printable lease receipts and digital contract packages.</li>
                  <li>Calculate dynamic AI property valuations and investment ROI trend charts.</li>
                  <li>Perform platform verification tasks, including moderating listings and KYC reviews.</li>
                </ul>
              </div>

              {/* 3. Cookies Policy */}
              <div id="cookies" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1D4ED8]" /> 3. Cookies Policy
                </h3>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Cookies help us keep your logged-in session active, store saved properties, and remember search parameters when you switch between Buy/Rent toggles.</p>
                <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of the platform's stateful dashboards.</p>
              </div>

              {/* 4. Security Policy */}
              <div id="security" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#1D4ED8]" /> 4. Security Policy
                </h3>
                <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. All payment distribution operations are handled via Razorpay or Stripe-ready encrypted endpoints.</p>
                <p>However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk. You should only access the services within a secure environment.</p>
              </div>

              {/* 5. Third Party Services */}
              <div id="thirdparty" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#1D4ED8]" /> 5. Third Party Services
                </h3>
                <p>We share information only with third parties that assist eStatery in platform operations. We do not sell your personal data to advertising brokers.</p>
                <p>Third-party service categories include:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Payment processors (Stripe, Razorpay).</li>
                  <li>Map Tile servers (OpenStreetMap, Leaflet maps).</li>
                  <li>Authentication &amp; database sync modules.</li>
                  <li>Verification &amp; government registries (RERA validation).</li>
                </ul>
              </div>

              {/* 6. User Rights */}
              <div id="rights" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#1D4ED8]" /> 6. User Rights
                </h3>
                <p>Depending on your location, you have certain rights regarding your personal information, including the right to request access, rectification, or deletion of your personal data. You can delete your active properties or update your profile data anytime through your account profile pages.</p>
                <p>If you wish to terminate your account and erase all transaction history, contact us directly at support@estatery.com.</p>
              </div>

              {/* 7. Contact Information */}
              <div id="contact" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> 7. Contact Information
                </h3>
                <p>If you have questions or comments about this policy, or wish to file a case in the Admin Dispute Center, please contact our Legal Officer at:</p>
                <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs space-y-2">
                  <div className="font-bold text-slate-800">eStatery Legal Compliance Division</div>
                  <div>Office Address: 101 Tech Tower, BKC, Mumbai 400051, India</div>
                  <div>Email: compliance@estatery.com / privacy@estatery.com</div>
                  <div>Toll Free: +91 1800 ESTATERY</div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
