import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const OFFICES = [
  { city: "Mumbai (HQ)", address: "101 Tech Tower, BKC, Mumbai 400051", phone: "+91 22 4567 8900", email: "mumbai@estatery.com" },
  { city: "Bangalore", address: "Level 5, UB City, Vittal Mallya Road, Bangalore 560001", phone: "+91 80 4567 8901", email: "bangalore@estatery.com" },
  { city: "Delhi NCR", address: "Floor 12, DLF Cyber Hub, Gurgaon 122002", phone: "+91 124 456 7890", email: "delhi@estatery.com" }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Get in Touch</h1>
          <p className="text-white/70 max-w-xl mx-auto">Our team of real estate experts is ready to help. Reach us anytime.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <h3 className="font-bold text-brand-text text-lg mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-brand-purple" /></div>
                    <div><div className="font-semibold text-brand-text text-sm">Toll Free</div><div className="text-brand-muted text-sm">1800 ESTATERY (Mon–Sat, 9AM–8PM)</div></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-brand-purple" /></div>
                    <div><div className="font-semibold text-brand-text text-sm">Email Us</div><div className="text-brand-muted text-sm">hello@estatery.com</div></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-brand-purple" /></div>
                    <div><div className="font-semibold text-brand-text text-sm">Response Time</div><div className="text-brand-muted text-sm">Usually within 2–4 hours</div></div>
                  </div>
                </div>
              </div>

              {OFFICES.map(o => (
                <div key={o.city} className="bg-white rounded-2xl border border-brand-border p-5">
                  <h4 className="font-bold text-brand-text mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-purple" />{o.city}</h4>
                  <p className="text-brand-muted text-sm mb-1">{o.address}</p>
                  <p className="text-brand-muted text-sm">{o.phone}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-brand-border p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-brand-emerald mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brand-text mb-2">Message Sent!</h3>
                    <p className="text-brand-muted">Our team will get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2.5 rounded-xl bg-brand-purple text-white font-semibold text-sm">Send Another</button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-brand-text text-xl mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "Full Name", key: "name", type: "text", placeholder: "Arjun Sharma" },
                          { label: "Email Address", key: "email", type: "email", placeholder: "arjun@email.com" },
                          { label: "Phone", key: "phone", type: "tel", placeholder: "+91 99887 76655" },
                          { label: "Subject", key: "subject", type: "text", placeholder: "Property inquiry..." }
                        ].map(f => (
                          <div key={f.key}>
                            <label className="block text-sm font-semibold text-brand-text mb-1.5">{f.label}</label>
                            <input
                              type={f.type}
                              value={(formData as any)[f.key]}
                              onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                              required={f.key !== "phone"}
                              placeholder={f.placeholder}
                              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text placeholder-brand-muted outline-none focus:border-brand-purple transition-all"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-1.5">Message</label>
                        <textarea
                          value={formData.message}
                          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          required
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text placeholder-brand-muted outline-none focus:border-brand-purple transition-all resize-none"
                        />
                      </div>
                      <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold hover:shadow-brand transition-all flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
