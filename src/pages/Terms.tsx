import { useState } from "react";
import { CheckSquare, Info, ShieldCheck, DollarSign, Ban, ShieldAlert, XOctagon, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms", icon: ShieldCheck },
    { id: "responsibilities", label: "2. User Responsibilities", icon: CheckSquare },
    { id: "listings", label: "3. Property Listings", icon: Info },
    { id: "payments", label: "4. Payment Terms", icon: DollarSign },
    { id: "prohibited", label: "5. Prohibited Activities", icon: Ban },
    { id: "liability", label: "6. Liability Disclaimer", icon: ShieldAlert },
    { id: "termination", label: "7. Termination Policy", icon: XOctagon }
  ];

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
              Terms &amp; Agreements
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-white/70 max-w-xl mx-auto text-xs font-semibold">Last updated: June 11, 2026. Please read the marketplace agreement terms carefully before using eStatery.</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigator */}
            <div className="lg:col-span-1 space-y-2.5 self-start sticky top-24">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">Terms Index</span>
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

            {/* Terms Content Pane */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/60 p-8 md:p-10 space-y-10 shadow-sm leading-relaxed text-slate-600 text-sm">
              
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-slate-800">eStatery Terms of Service Agreement</h2>
                <p>These Terms of Service outline the rules and regulations for the usage of eStatery's platform and service modules. By accessing this website and operating our tools, we assume you accept these terms and conditions in full. Do not continue to use eStatery if you do not agree to all of the terms and conditions stated on this page.</p>
              </div>

              <hr className="border-slate-100" />

              {/* 1. Acceptance of Terms */}
              <div id="acceptance" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1D4ED8]" /> 1. Acceptance of Terms
                </h3>
                <p>By registering an account, listing properties, scheduling site visits, or signing digital agreements, you agree to become bound by these Terms of Service. These terms constitute a legally binding agreement between you (the user) and eStatery Technologies Pvt. Ltd.</p>
                <p>We reserve the right to revise or update these terms at our discretion. If changes are material, we will post alerts in your buyer, seller, agent, or tenant dashboards, or notify you via email.</p>
              </div>

              {/* 2. User Responsibilities */}
              <div id="responsibilities" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#1D4ED8]" /> 2. User Responsibilities
                </h3>
                <p>To access certain features of eStatery, including direct chat, scheduling site visits, and electronic signing, you must provide accurate profile details. You are responsible for keeping your login credentials confidential and auditing activities that occur under your user ID.</p>
                <p>You agree to cooperate with our Admin Moderator queues by providing accurate verification details (KYC documentation, ownership papers, or broker licenses) as requested.</p>
              </div>

              {/* 3. Property Listings */}
              <div id="listings" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#1D4ED8]" /> 3. Property Listings
                </h3>
                <p>Sellers, owners, and agents represent that all listing data (amenities, carpet size, price, location, description, and images) submitted to eStatery is accurate and complies with local RERA guidelines.</p>
                <p>We do not verify the physical structure of properties, but we run listings through our moderator queues to flag illegal items, duplicate postings, or fraudulent pricing. eStatery reserves the right to delete, edit, or reject listings without warning.</p>
              </div>

              {/* 4. Payment Terms */}
              <div id="payments" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#1D4ED8]" /> 4. Payment Terms
                </h3>
                <p>All rent distributions, platform subscription fees, or listing promotions made through the platform are processed using Stripe or Razorpay mock payment layers. eStatery is not a bank or depository institution.</p>
                <p>By scheduling site visits or initiating rent transactions, you agree to settle platform fees where indicated. Late rent payments past lease agreement deadlines may trigger overdue alerts and receipt flags as agreed in your signed contract.</p>
              </div>

              {/* 5. Prohibited Activities */}
              <div id="prohibited" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Ban className="w-5 h-5 text-[#1D4ED8]" /> 5. Prohibited Activities
                </h3>
                <p>You are prohibited from performing the following activities while operating eStatery:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Listing properties you do not own or are not authorized to market.</li>
                  <li>Spamming or sending unsolicited files/images through the Direct Chat system.</li>
                  <li>Tampering with the E-Sign digital signature pad canvas or forging signatures.</li>
                  <li>Extracting or scraping listing parameters or valuation rates from our AI insights section.</li>
                </ul>
              </div>

              {/* 6. Liability Disclaimer */}
              <div id="liability" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#1D4ED8]" /> 6. Liability Disclaimer
                </h3>
                <p>eStatery provides the platform, Leaflet maps, direct chat systems, and AI valuation calculators on an "as is" and "as available" basis. We do not guarantee that the services will always be uninterrupted, timely, or error-free.</p>
                <p>We are not liable for disagreements, transaction disputes, or damages arising between buyers, sellers, landlords, tenants, or agents. You utilize our peer-to-peer digital templates at your own risk. Legal matters should be raised through the Admin Dispute Management module or appropriate legal courts.</p>
              </div>

              {/* 7. Termination Policy */}
              <div id="termination" className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <XOctagon className="w-5 h-5 text-[#1D4ED8]" /> 7. Termination Policy
                </h3>
                <p>We may terminate or suspend your access to eStatery immediately, without prior notice or liability, for any reason whatsoever, including breach of these Terms of Service. Upon termination, your right to list properties, sign agreements, or use messaging tools ceases immediately.</p>
                <p>If you wish to terminate your account, you can do so by deleting your listed properties and contacting customer support at support@estatery.com.</p>
              </div>

            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
