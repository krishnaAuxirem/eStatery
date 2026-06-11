import { useState } from "react";
import { 
  Briefcase, Code, Sparkles, Heart, Smile, MapPin, DollarSign, 
  Upload, FileText, ChevronRight, UserCheck, Award, Star, Compass 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  department: "Engineering" | "Product" | "Design" | "Sales" | "Marketing" | "Customer Support";
  location: string;
  type: "Full-time" | "Remote" | "Contract";
  experience: string;
}

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  
  // Application form states
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appResume, setAppResume] = useState<File | null>(null);
  const [appCoverLetter, setAppCoverLetter] = useState("");
  const [appSubmitting, setAppSubmitting] = useState(false);

  const departments = ["All", "Engineering", "Product", "Design", "Sales", "Marketing", "Customer Support"];

  const benefits = [
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive family medical policies, dental cover, and mental health consultations." },
    { icon: Smile, title: "Work-Life Balance", desc: "Flexible remote work policies, annual team retreats, and hybrid office options." },
    { icon: Sparkles, title: "Learning Allowance", desc: "Annual stipend for courses, books, bootcamps, and professional certifications." },
    { icon: DollarSign, title: "Equity Options", desc: "Generous ESOP packages, stock options, and performance bonuses." }
  ];

  const processSteps = [
    { step: "01", title: "Online Application", desc: "Browse open listings and submit your resume along with portfolio links or GitHub profiles." },
    { step: "02", title: "Technical Assignment", desc: "Complete a small take-home challenge focusing on realistic real estate product features (e.g. search filters or agreements)." },
    { step: "03", title: "Panel Interviews", desc: "Speak with engineering, product, or design leaders to review technical decisions and cultural fit." },
    { step: "04", title: "Offer & Onboarding", desc: "Receive your formal contract offer and initiate our automated digital KYC onboarding checklist." }
  ];

  const employeeReviews = [
    { quote: "Scaling our Leaflet spatial queries to handle millions of listings has been the most challenging and rewarding work of my career.", author: "Rohan Sen", role: "Principal Engineer", rating: 5 },
    { quote: "eStatery's emphasis on clean design systems enables us to ship premium SaaS features with incredible speed.", author: "Neha Rao", role: "Lead UI/UX Designer", rating: 5 },
    { quote: "Autonomy is real here. We own product pipelines end-to-end and see direct client impact every day.", author: "Aditya Hegde", role: "Product Manager", rating: 5 }
  ];

  const officePhotos = [
    { title: "Collaborative Open Space", desc: "Where engineers, designers, and marketers align and ideate.", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500" },
    { title: "Focus Pods & Booths", desc: "Quiet zones optimized for deep coding work and VR research.", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500" },
    { title: "Social Cafeteria Hub", desc: "Equipped with direct espresso bars and gaming recreational setups.", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500" }
  ];

  const jobs: Job[] = [
    { id: "job-1", title: "Senior React Engineer", department: "Engineering", location: "Bangalore (Hybrid)", type: "Full-time", experience: "5+ years" },
    { id: "job-2", title: "Frontend Developer (React Native)", department: "Engineering", location: "Remote", type: "Full-time", experience: "3+ years" },
    { id: "job-3", title: "Lead Product Manager", department: "Product", location: "Gurgaon Office", type: "Full-time", experience: "6+ years" },
    { id: "job-4", title: "UI/UX Product Designer", department: "Design", location: "Mumbai Office", type: "Full-time", experience: "3+ years" },
    { id: "job-5", title: "Direct Sales Manager", department: "Sales", location: "Hyderabad Office", type: "Full-time", experience: "4+ years" },
    { id: "job-6", title: "Performance Marketer", department: "Marketing", location: "Remote", type: "Contract", experience: "2+ years" },
    { id: "job-7", title: "Customer Success Associate", department: "Customer Support", location: "Mumbai Office", type: "Full-time", experience: "1+ years" }
  ];

  const filteredJobs = selectedDept === "All" 
    ? jobs 
    : jobs.filter(j => j.department === selectedDept);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !appEmail) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setAppSubmitting(true);
    setTimeout(() => {
      toast.success(`Application for ${applyJob?.title} submitted successfully!`);
      setAppSubmitting(false);
      setAppName("");
      setAppEmail("");
      setAppResume(null);
      setAppCoverLetter("");
      setApplyJob(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        
        {/* Careers Hero */}
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              We are hiring!
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Build the Future of <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Real Estate Tech</span>
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Join eStatery's fast-growing team of product managers, machine learning engineers, designers, and sales innovators. Let's make property transactions direct and transparent.
            </p>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] opacity-15 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" 
                alt="Product Team Collaborating" 
                className="w-full h-96 object-cover rounded-3xl border border-slate-100 shadow-xl relative z-10" 
              />
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">Core Culture</span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight">
                Empowered Teams, Autonomous Execution
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                At eStatery, we don't believe in micromanagement. We hire talented engineers, marketers, and success managers and trust them with complete ownership of their product clusters. 
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you're developing our Leaflet map markers, Razorpay escrow systems, digital signatures, or scaling our RERA compliance pipelines, you'll have the resources and autonomy to build your best work.
              </p>
            </div>
          </div>
        </div>

        {/* Company Benefits */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">Company Benefits &amp; Perks</h2>
              <p className="text-slate-500 text-sm mt-2">Designed to keep you happy, healthy, and consistently growing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1D4ED8] shrink-0"><Icon className="w-6 h-6" /></div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{b.title}</h3>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hiring Process timeline */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Recruiting Steps</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Our Hiring Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((s, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 relative space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-extrabold text-purple-200">{s.step}</div>
                <h4 className="font-extrabold text-slate-800 text-xs">{s.title}</h4>
                <p className="text-slate-500 text-[10px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Environment Photo Grid */}
        <div className="bg-slate-50 border-y border-slate-200/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Life at eStatery</span>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Our Office Spaces</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {officePhotos.map((photo, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5 space-y-1 bg-white">
                    <h4 className="font-extrabold text-slate-800 text-xs">{photo.title}</h4>
                    <p className="text-slate-500 text-[10px] leading-relaxed">{photo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest block">Team Feedback</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">What Our Team Members Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {employeeReviews.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-[10px]">— {t.author}</h4>
                  <span className="text-[#1D4ED8] text-[9px] font-bold block mt-0.5">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions & Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">Explore Open Positions</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Find a role matching your skill set and career aspirations.</p>
          </div>

          {/* Department Filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedDept === d 
                    ? "bg-[#1D4ED8] text-white border-blue-600 shadow animate-pulse" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Jobs Listing */}
          <div className="max-w-4xl mx-auto space-y-3">
            {filteredJobs.map((j) => (
              <div 
                key={j.id} 
                className="bg-white rounded-2xl border border-slate-200/60 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#1D4ED8]" /> {j.title}
                  </h4>
                  <div className="flex items-center gap-3 text-slate-400 text-xs mt-1 font-semibold flex-wrap">
                    <span className="text-blue-700">{j.department}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-[#1D4ED8]" />{j.location}</span>
                    <span>·</span>
                    <span>{j.type}</span>
                    <span>·</span>
                    <span>Experience: {j.experience}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setApplyJob(j)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:shadow-glow text-white text-xs font-bold transition-all shrink-0 w-full sm:w-auto text-center"
                >
                  Apply Now
                </button>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <Code className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                <h4 className="font-bold text-slate-600">No vacancies open right now</h4>
                <p className="text-slate-400 text-xs mt-1">Check back later or send us a resume directly.</p>
              </div>
            )}
          </div>
        </div>

        {/* Apply Now Form Dialog */}
        {applyJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-800">Job Application</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{applyJob.title} · {applyJob.department}</p>
                </div>
                <button 
                  onClick={() => setApplyJob(null)} 
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleApply} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={appName}
                    onChange={e => setAppName(e.target.value)}
                    placeholder="Arjun Mehta"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={appEmail}
                    onChange={e => setAppEmail(e.target.value)}
                    placeholder="arjun@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload CV / Resume *</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 rounded-2xl p-6 text-center cursor-pointer relative">
                    <input 
                      type="file" 
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={e => setAppResume(e.target.files ? e.target.files[0] : null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-600 block">
                      {appResume ? appResume.name : "Choose PDF / Word file"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">Max size: 5MB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cover Letter / Message</label>
                  <textarea
                    value={appCoverLetter}
                    onChange={e => setAppCoverLetter(e.target.value)}
                    placeholder="Explain why you are a good fit for this role..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1D4ED8] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyJob(null)}
                    className="px-4 py-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={appSubmitting}
                    className="flex-1 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md text-center"
                  >
                    {appSubmitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}

