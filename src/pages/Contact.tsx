import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, HelpCircle, 
  ChevronRight, Compass, Search, Facebook, Twitter, Linkedin, Instagram, Youtube 
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

// Dynamic leaflet stylesheet loader helper
function LeafletLoader() {
  useEffect(() => {
    const id = "leaflet-css-link";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);
  return null;
}

const OFFICES = [
  { city: "Mumbai (HQ)", address: "101 Tech Tower, BKC, Mumbai 400051", phone: "+91 22 4567 8900", email: "mumbai@estatery.com", coords: [19.0760, 72.8777] as [number, number] },
  { city: "Bangalore", address: "Level 5, UB City, Vittal Mallya Road, Bangalore 560001", phone: "+91 80 4567 8901", email: "bangalore@estatery.com", coords: [12.9716, 77.5946] as [number, number] },
  { city: "Delhi NCR", address: "Floor 12, DLF Cyber Hub, Gurgaon 122002", phone: "+91 124 456 7890", email: "delhi@estatery.com", coords: [28.4595, 77.0266] as [number, number] }
];

const FAQS_LIST = [
  { q: "How do I list my property on eStatery?", a: "Click the 'Post Property' button in the navbar, select your property type, fill out basic details, and submit for moderator verification." },
  { q: "How do I sign the digital lease agreement?", a: "Tenants can access the E-Sign vault under their dashboard lease tab, draw their digital signature on the canvas pad, and compile the contract." },
  { q: "Are there any brokerage fees on eStatery?", a: "eStatery operates on a zero-brokerage direct model. Listing is free; premium promotion and KYC certifications incur small platform fee packages." },
  { q: "How can I contact a listed agent directly?", a: "Navigate to the Agents directory, select the advisor you want to contact, and click 'Call' or 'Message' to connect via internal chat or phone." },
  { q: "What is the RERA validation process?", a: "Our support team checks developer and broker registration numbers on respective state regulatory databases before allowing listings to display a 'Verified RERA' badge." }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setSubmitted(true);
  };

  // Filter FAQs
  const filteredFaqs = FAQS_LIST.filter(f => 
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  // Custom marker pin for offices
  const officeIcon = typeof window !== "undefined" ? L.divIcon({
    className: "office-marker-pin",
    html: `<div class="w-5 h-5 rounded-full bg-[#1D4ED8] border-2 border-white shadow-lg flex items-center justify-center"><div class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  }) : undefined;

  return (
    <div className="min-h-screen bg-brand-bg">
      <LeafletLoader />
      <Navbar />
      <div className="pt-16">
        
        {/* Contact Hero */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Support Center
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Get in Touch with Our <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Real Estate Experts</span>
            </h1>
            <p className="text-white/75 max-w-xl mx-auto text-sm md:text-base font-medium">
              Have questions about direct chat, KYC verifications, online payments, or digital signatures? We are here to help.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Office Locations & Support Information */}
            <div className="space-y-6">
              
              {/* Support Info Card */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base mb-4">Support Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#1D4ED8]" /></div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">Toll Free Phone</div>
                        <div className="text-slate-500 text-xs mt-0.5">1800 ESTATERY (Mon–Sat, 9AM–8PM)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-[#1D4ED8]" /></div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">Email Support</div>
                        <div className="text-slate-500 text-xs mt-0.5">hello@estatery.com / disputes@estatery.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-[#1D4ED8]" /></div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">Average Turnaround</div>
                        <div className="text-slate-500 text-xs mt-0.5">Ticketing resolution under 4 hours</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links Grid */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Connect With Us</h4>
                  <div className="flex gap-2">
                    {[
                      { icon: Facebook, link: "https://facebook.com/estatery" },
                      { icon: Twitter, link: "https://twitter.com/estatery" },
                      { icon: Linkedin, link: "https://linkedin.com/company/estatery" },
                      { icon: Instagram, link: "https://instagram.com/estatery" },
                      { icon: Youtube, link: "https://youtube.com/estatery" }
                    ].map((soc, idx) => {
                      const IconComp = soc.icon;
                      return (
                        <a 
                          key={idx}
                          href={soc.link}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#1D4ED8] text-slate-500 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <IconComp className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
                  <Clock className="w-5 h-5 text-[#1D4ED8]" /> Business Hours
                </h3>
                <div className="divide-y divide-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between py-2">
                    <span className="font-bold">Sales Desk</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-bold">Customer Care</span>
                    <span>8:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-bold">Legal Verifications</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 text-slate-400">
                    <span className="font-bold">Sunday Support</span>
                    <span>Emergency Ticketing Only</span>
                  </div>
                </div>
              </div>

              {/* Office List */}
              <div className="space-y-3">
                {OFFICES.map(o => (
                  <div key={o.city} className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-sm transition-shadow">
                    <h4 className="font-bold text-slate-800 mb-2.5 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-[#1D4ED8]" /> {o.city}
                    </h4>
                    <p className="text-slate-600 text-xs">{o.address}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-semibold">
                      <span>Phone: {o.phone}</span>
                      <span>·</span>
                      <span>Email: {o.email}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"><CheckCircle className="w-10 h-10" /></div>
                    <h3 className="text-xl font-bold text-slate-800">Message Delivered</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto">Thank you for contacting eStatery. An insights representative will contact you via email or phone shortly.</p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="px-6 py-2.5 rounded-xl bg-[#1D4ED8] text-white font-bold text-xs"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-extrabold text-slate-800 text-lg mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Arjun Mehta"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="arjun@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+91 99887 76655"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Subject *</label>
                          <input
                            type="text"
                            required
                            value={formData.subject}
                            onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            placeholder="Dispute or payment issue..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Detailed Message *</label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Please provide details about your property, listing, or account query..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8] resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-3.5 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:shadow-glow text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-4 h-4" /> Deliver Message
                      </button>

                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Google Maps Embed / Interactive Leaflet Branch Locations Map */}
          <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#1D4ED8]" />
              <span className="font-extrabold text-slate-800 text-sm">eStatery Branch Directory Map</span>
            </div>
            <div className="w-full h-80 relative z-0">
              <MapContainer 
                center={[20.5937, 78.9629]} // India center
                zoom={5} 
                className="w-full h-full"
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {OFFICES.map((o, idx) => (
                  <Marker key={idx} position={o.coords} icon={officeIcon}>
                    <Popup>
                      <div className="p-1 font-sans">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">{o.city} Branch</span>
                        <h4 className="font-bold text-[#1D4ED8] text-xs">{o.city}</h4>
                        <p className="text-slate-600 text-[10px] leading-relaxed mt-1">{o.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* FAQ Preview Accordion with Search */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#1D4ED8]" /> Support FAQs Index
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Need immediate answers? Search or select our quick FAQ guide below.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs w-full md:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    value={faqSearch} 
                    onChange={e => setFaqSearch(e.target.value)} 
                    placeholder="Search support FAQs..." 
                    className="outline-none w-full font-medium"
                  />
                </div>
                <Link to="/faq" className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-0.5 shrink-0">
                  FAQ Portal <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((f, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left font-bold text-slate-800 hover:bg-slate-50/50 flex justify-between items-center transition-colors text-xs"
                    >
                      <span>{f.q}</span>
                      <span className="text-slate-400 font-extrabold text-sm">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100/50 pt-2 bg-slate-50/20">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No matching support FAQs found. Try searching for "RERA", "brokerage", or "lease".
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
