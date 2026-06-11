import { useState } from "react";
import { Search, HelpCircle, ChevronDown, MessageSquare, PhoneCall, Mail, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
  category: "Buyers" | "Sellers" | "Agents" | "Tenants" | "Payments" | "AI Features" | "Account Management";
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ["All", "Buyers", "Sellers", "Agents", "Tenants", "Payments", "AI Features", "Account Management"];

  const faqs: FAQItem[] = [
    // Buyers
    {
      question: "How do I contact a seller or agent about a listing?",
      answer: "When viewing any property details page, you will see a 'Direct Chat' widget. You can type a message, upload images/documents, and chat directly. If you want to schedule a visit, use the 'Book Site Visit' date & time picker below the chat panel.",
      category: "Buyers"
    },
    {
      question: "Are property prices on eStatery negotiable?",
      answer: "Yes, you can initiate a direct discussion via chat with the property owner or representative. eStatery is a direct-connection marketplace, meaning you bargain directly with no middleman agent fees.",
      category: "Buyers"
    },
    // Sellers
    {
      question: "How long does it take for a property listing to go live?",
      answer: "Once submitted, your listing enters the Admin Property Moderation Queue. Our moderators verify ownership documents, PAN details, and listing compliance. Verification typically completes within 2 to 4 hours.",
      category: "Sellers"
    },
    {
      question: "How can I feature or boost my property listing?",
      answer: "Sellers can navigate to their listings dashboard and select 'Premium Boost'. Once approved by an Admin in the featured queue, your property will be prioritized at the top of search indexes and on Leaflet maps with custom badges.",
      category: "Sellers"
    },
    // Agents
    {
      question: "How do I verify my agent profile and get a verified badge?",
      answer: "Go to your Agent profile setting and upload your RERA registration number and agency license. Your request will enter the Admin User Verification Queue for KYC approval. Once approved, you will receive a verified badge.",
      category: "Agents"
    },
    {
      question: "How is agent commission managed on eStatery?",
      answer: "Agents can record transactions and commissions directly under the 'Commissions' tab in the Agent Dashboard. You can issue digital statements and invoices to clients directly.",
      category: "Agents"
    },
    // Tenants
    {
      question: "Where can I view my signed lease agreement?",
      answer: "All signed leases are stored in the E-Sign vault. Go to Tenant Dashboard > Lease Documents. You can view the document details or download the certified PDF directly to your device.",
      category: "Tenants"
    },
    {
      question: "How do I file a property maintenance request?",
      answer: "Landlords and tenants can log maintenance requests under the 'Maintenance' tab in the Tenant Dashboard. Enter the issue (plumbing, electrical, etc.), description, priority level, and submit for updates.",
      category: "Tenants"
    },
    // Payments
    {
      question: "What payment options are supported for rent distributions?",
      answer: "We support Stripe-ready card checkouts and Razorpay mock UPI/Netbanking portals. Tenants can view upcoming and overdue payments under Tenant Dashboard > Rent Payments and click 'Pay Rent' to trigger the checkout wizard.",
      category: "Payments"
    },
    {
      question: "Can I download payment tax receipts?",
      answer: "Yes. Once a transaction succeeds in the checkout modal, it is added to the tenant's payment history. Click 'Download Receipt' to generate a printable transaction receipt containing reference IDs.",
      category: "Payments"
    },
    // AI Features
    {
      question: "How accurate is the AI Property Valuation calculator?",
      answer: "Our valuation calculator has a confidence level of ~95% in metropolitan hubs. The estimation algorithm parses carpet size, property category, city boundaries, infrastructure indices, and building age depreciation factors.",
      category: "AI Features"
    },
    {
      question: "Where does the market trend data come from?",
      answer: "Market price trends, demand indices, and heat index analytics are aggregated from historical public registry archives and transaction data across eStatery's platform.",
      category: "AI Features"
    },
    // Account Management
    {
      question: "How do I update my KYC verification status?",
      answer: "Go to Dashboard > Profile, click 'Verify Identity', and upload a clear photo of your Aadhaar card or PAN card. An administrator will verify the files and upgrade your registration grade to verified.",
      category: "Account Management"
    },
    {
      question: "What should I do if a seller or buyer defrauds me?",
      answer: "You can raise a complaint in the Admin Dispute Center. Navigate to support or the dispute tab, log your case history, upload screenshots, and our administration team will mediate, escalate, or suspend the offending party.",
      category: "Account Management"
    }
  ];

  const popularQuestions = [
    { title: "RERA verification rules", query: "RERA", cat: "Agents" },
    { title: "Digital lease signing guide", query: "lease", cat: "Tenants" },
    { title: "Valuation accuracy calculations", query: "valuation", cat: "AI Features" },
    { title: "KYC validation details", query: "KYC", cat: "Account Management" }
  ];

  // Filter FAQs based on category filter and search query
  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    const matchesQuery = 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handlePopularClick = (item: { title: string; query: string; cat: string }) => {
    setSelectedCategory(item.cat);
    setSearchQuery(item.query);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Help Desk
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              eStatery <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">FAQ Hub</span>
            </h1>
            <p className="text-white/75 max-w-xl mx-auto text-sm md:text-base font-medium">
              Search our self-service directory to learn about chat logs, maps, virtual tours, E-Sign contracts, and admin tools.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-8 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <input
                type="text"
                placeholder="Type your question (e.g. 'verification', 'rent', 'AI')..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-4 border-2 border-white/10 bg-white/10 focus:bg-white text-white focus:text-slate-800 placeholder-white/50 focus:placeholder-slate-400 rounded-2xl outline-none focus:border-[#1D4ED8] focus:shadow-lg transition-all font-semibold text-sm"
              />
            </div>
          </div>
        </div>

        {/* Popular Questions Quicklinks */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Trending Queries</span>
            <h2 className="text-xl font-extrabold text-slate-800 mt-1">Popular Help Indexes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {popularQuestions.map((q, idx) => (
              <button 
                key={idx}
                onClick={() => handlePopularClick(q)}
                className="bg-white border border-slate-200/60 p-4 rounded-2xl text-left hover:shadow-md hover:border-[#1D4ED8] transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{q.cat}</span>
                  <span className="font-extrabold text-slate-800 text-xs mt-0.5 block">{q.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1D4ED8] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters & FAQ Accordion */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedCategory(c);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === c 
                    ? "bg-[#1D4ED8] text-white border-blue-600 shadow-sm" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((f, idx) => {
              const isOpen = openIndex === idx;
              
              // Category tag colors
              const tagColors: Record<string, string> = {
                Buyers: "bg-blue-50 text-blue-700 border border-blue-100",
                Sellers: "bg-indigo-50 text-indigo-700 border border-indigo-100",
                Agents: "bg-rose-50 text-rose-700 border border-rose-100",
                Tenants: "bg-purple-50 text-purple-700 border border-purple-100",
                Payments: "bg-emerald-50 text-emerald-700 border border-emerald-100",
                "AI Features": "bg-violet-50 text-violet-700 border border-violet-100",
                "Account Management": "bg-slate-50 text-slate-600 border border-slate-200"
              };

              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-sm transition-shadow">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-extrabold text-slate-800 hover:bg-slate-50/50 flex justify-between items-center transition-colors text-xs md:text-sm"
                  >
                    <span className="flex items-center gap-3 pr-4">
                      <HelpCircle className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                      <span>{f.question}</span>
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 border-t border-slate-100/50 bg-slate-50/20 text-slate-600 text-xs md:text-sm leading-relaxed space-y-3">
                      <p>{f.answer}</p>
                      <div className="pt-1">
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase", tagColors[f.category])}>
                          {f.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <HelpCircle className="w-16 h-16 text-slate-200 mx-auto mb-3" />
                <h4 className="font-extrabold text-slate-600">No results found for your search</h4>
                <p className="text-slate-400 text-xs mt-1">Try modifying your query or selecting a different category filter.</p>
              </div>
            )}
          </div>

        </div>

        {/* Contact Support CTA Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-[#1A0845] to-[#0D0630] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="px-3 py-1 rounded-md bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider inline-block">Still Need Assistance?</span>
              <h2 className="text-2xl lg:text-3xl font-extrabold leading-tight">Connect with eStatery Helpdesk</h2>
              <p className="text-white/70 text-xs leading-relaxed">
                If you have an urgent dispute, payment discrepancy, or custom API integration query, talk directly to our engineering and legal support staff.
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0 w-full sm:w-auto">
              <Link to="/contact" className="px-6 py-3.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs hover:bg-slate-50 shadow-md transition-all w-full sm:w-auto text-center">
                Contact Support Center
              </Link>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
