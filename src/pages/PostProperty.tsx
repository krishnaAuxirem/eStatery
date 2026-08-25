import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle, Home, MapPin, Layers, Image, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import prop1 from "@/assets/property-1.jpg";

import { DemoCaptcha } from "@/components/ui/DemoCaptcha";

const STEPS = ["Basic Info", "Location", "Details", "Preview"];

const PostProperty = () => {
  const { user } = useAuth();
  const { addProperty } = useProperty();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [form, setForm] = useState({
    title: "", type: "apartment", listingType: "buy", price: "",
    city: "Mumbai", area: "", address: "", bedrooms: "2", bathrooms: "2",
    areaSize: "", parking: "1", description: "", features: ""
  });

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = () => {
    if (!user) { toast.error("Please login to post a property"); return; }
    if (!captchaVerified) { toast.error("Please complete the CAPTCHA verification to submit your listing."); return; }
    const newProp = addProperty({
      title: form.title || "New Property",
      type: form.type as "apartment" | "villa" | "house" | "commercial" | "studio" | "penthouse",
      listingType: form.listingType as "buy" | "rent",
      price: Number(form.price) || 5000000,
      priceUnit: form.listingType === "rent" ? "month" : undefined,
      location: { city: form.city, area: form.area, address: form.address },
      specs: { bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), area: Number(form.areaSize) || 1000, parking: Number(form.parking) },
      features: form.features.split(",").map(f => f.trim()).filter(Boolean),
      images: [prop1],
      description: form.description || "A premium property listing.",
      ownerId: user.id,
      ownerName: user.name,
      status: "pending",
      verified: false,
      featured: false,
      rating: 0,
      reviews: 0,
      virtualTour: false,
      views: 0,
      amenities: []
    });
    toast.success("Property submitted for verification!");
    navigate(`/properties/${newProp.id}`);
  };

  const InputField = ({ label, field, type = "text", placeholder = "", options }: { label: string; field: string; type?: string; placeholder?: string; options?: string[] }) => (
    <div>
      <label className="block text-sm font-semibold text-brand-text mb-1.5">{label}</label>
      {options ? (
        <select value={form[field as keyof typeof form]} onChange={e => update(field, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[field as keyof typeof form]} onChange={e => update(field, e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Post Your Property</h1>
            <p className="text-white/70 text-sm">List your property on eStatery and reach 2M+ buyers and renters.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {/* Steps */}
          <div className="flex items-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all", i < step ? "bg-brand-emerald text-white" : i === step ? "bg-brand-purple text-white" : "bg-brand-border text-brand-muted")}>
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn("text-xs mt-1 whitespace-nowrap", i === step ? "text-brand-purple font-semibold" : "text-brand-muted")}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={cn("flex-1 h-0.5 mx-2 mb-4", i < step ? "bg-brand-emerald" : "bg-brand-border")} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-8">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-bold text-brand-text text-lg mb-5 flex items-center gap-2"><Home className="w-5 h-5 text-brand-purple" /> Basic Information</h2>
                <InputField label="Property Title" field="title" placeholder="e.g. Luxury 3 BHK Apartment with Sea View" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Property Type" field="type" options={["apartment","villa","house","commercial","studio","penthouse"]} />
                  <InputField label="Listing Type" field="listingType" options={["buy","rent"]} />
                </div>
                <InputField label={form.listingType === "rent" ? "Monthly Rent (₹)" : "Asking Price (₹)"} field="price" type="number" placeholder="5000000" />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-bold text-brand-text text-lg mb-5 flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-purple" /> Location Details</h2>
                <InputField label="City" field="city" options={["Mumbai","Bangalore","Gurgaon","Delhi","Hyderabad","Chennai","Pune"]} />
                <InputField label="Area / Locality" field="area" placeholder="e.g. Bandra West" />
                <InputField label="Full Address" field="address" placeholder="Street, landmark, pincode" />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-bold text-brand-text text-lg mb-5 flex items-center gap-2"><Layers className="w-5 h-5 text-brand-purple" /> Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Bedrooms" field="bedrooms" options={["1","2","3","4","5","6+"]} />
                  <InputField label="Bathrooms" field="bathrooms" options={["1","2","3","4","5+"]} />
                  <InputField label="Area (sq.ft)" field="areaSize" type="number" placeholder="1500" />
                  <InputField label="Parking Spaces" field="parking" options={["0","1","2","3","4"]} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">Description</label>
                  <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={4} placeholder="Describe your property..." className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text outline-none focus:border-brand-purple resize-none" />
                </div>
                <InputField label="Key Features (comma-separated)" field="features" placeholder="Swimming Pool, Garden, Smart Home, Sea View" />
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-bold text-brand-text text-lg mb-5 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-brand-purple" /> Review & Submit</h2>
                <div className="bg-brand-bg rounded-2xl p-5 space-y-3 text-sm">
                  {[
                    { label: "Title", value: form.title },
                    { label: "Type", value: `${form.type} · For ${form.listingType}` },
                    { label: "Price", value: `₹${Number(form.price).toLocaleString("en-IN")}${form.listingType === "rent" ? "/mo" : ""}` },
                    { label: "Location", value: `${form.area}, ${form.city}` },
                    { label: "Specs", value: `${form.bedrooms}BHK · ${form.bathrooms}Bath · ${form.areaSize}sqft` }
                  ].map(item => (
                    <div key={item.label} className="flex gap-3">
                      <span className="text-brand-muted w-20 shrink-0">{item.label}:</span>
                      <span className="font-medium text-brand-text">{item.value || "—"}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-sm">
                  Your listing will be reviewed by our team within 24 hours before going live.
                </div>

                <div className="mt-5">
                  <DemoCaptcha
                    verified={captchaVerified}
                    onVerify={(v) => setCaptchaVerified(v)}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-border text-brand-text font-medium disabled:opacity-40 hover:bg-gray-50 transition-all">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < 3 ? (
                <button onClick={() => setStep(s => Math.min(3, s + 1))} className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold hover:shadow-brand transition-all">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-brand-emerald text-white font-bold hover:bg-emerald-600 transition-all">
                  <CheckCircle className="w-4 h-4" /> Submit Listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostProperty;
