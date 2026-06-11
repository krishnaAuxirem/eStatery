import { useState } from "react";
import { Bell, Zap, TrendingUp, Calendar, Mail, Smartphone, Volume2, Check } from "lucide-react";
import { toast } from "sonner";

interface AlertItem {
  id: string;
  title: string;
  msg: string;
  time: string;
  type: "match" | "price" | "booking" | "rent" | "info";
  read: boolean;
}

export default function BuyerNotifications() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: "a-1", title: "New Match Alert", msg: "3 new villas matching your ROI preferences added in North Bangalore.", time: "2 min ago", type: "match", read: false },
    { id: "a-2", title: "Price Drop Alert", msg: "Worli Premium Flat pricing reduced by ₹35L (Owner relocating).", time: "1 hr ago", type: "price", read: false },
    { id: "a-3", title: "Site Inspection Scheduled", msg: "Your scheduled tour at Gurgaon Crest is confirmed by the owner.", time: "3 hr ago", type: "booking", read: true },
    { id: "a-4", title: "Rent Due Reminder", msg: "Upcoming rent payment of ₹85k is due on June 10, 2026.", time: "Yesterday", type: "rent", read: true },
    { id: "a-5", title: "Lead Inquiry Update", msg: "Agent Alok Sharma replied to your query for DLF Towers.", time: "2 days ago", type: "info", read: true },
  ]);

  // Email and Push preferences toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);

  const markAllRead = () => {
    const updated = alerts.map(a => ({ ...a, read: true }));
    setAlerts(updated);
    toast.success("All notifications marked as read.");
  };

  const handleTogglePreference = (type: "email" | "push" | "sound") => {
    if (type === "email") {
      setEmailAlerts(!emailAlerts);
      toast.success(`Email alerts ${!emailAlerts ? "ENABLED" : "DISABLED"}`);
    } else if (type === "push") {
      setPushAlerts(!pushAlerts);
      toast.success(`Push notifications ${!pushAlerts ? "ENABLED" : "DISABLED"}`);
    } else {
      setSoundAlerts(!soundAlerts);
      toast.success(`In-App sound cues ${!soundAlerts ? "ENABLED" : "DISABLED"}`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Notification Center</h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">Keep track of price changes, matches, and scheduling reminders.</p>
        </div>
        {alerts.some(a => !a.read) && (
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-[#1D4ED8] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Preferences Panel (Email Ready / Push Ready) */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 space-y-4">
        <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-[#1D4ED8]" /> Notification Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Email preferences */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Mail className="w-4 h-4" /></div>
              <div>
                <span className="font-bold text-[#0F172A] text-xs block">Email Notifications</span>
                <span className="text-[9px] text-slate-400">Lease receipts &amp; visit summaries</span>
              </div>
            </div>
            <button
              onClick={() => handleTogglePreference("email")}
              className={`w-9 h-5 rounded-full relative transition-all ${emailAlerts ? "bg-[#1D4ED8]" : "bg-slate-200"}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-all ${emailAlerts ? "right-1" : "left-1"}`} />
            </button>
          </div>

          {/* Push preferences */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Smartphone className="w-4 h-4" /></div>
              <div>
                <span className="font-bold text-[#0F172A] text-xs block">Push Notifications</span>
                <span className="text-[9px] text-slate-400">Instant browser alerts</span>
              </div>
            </div>
            <button
              onClick={() => handleTogglePreference("push")}
              className={`w-9 h-5 rounded-full relative transition-all ${pushAlerts ? "bg-[#1D4ED8]" : "bg-slate-200"}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-all ${pushAlerts ? "right-1" : "left-1"}`} />
            </button>
          </div>

          {/* Sound Alert preferences */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]"><Volume2 className="w-4 h-4" /></div>
              <div>
                <span className="font-bold text-[#0F172A] text-xs block">In-App Audio Cue</span>
                <span className="text-[9px] text-slate-400">Notification audio ticks</span>
              </div>
            </div>
            <button
              onClick={() => handleTogglePreference("sound")}
              className={`w-9 h-5 rounded-full relative transition-all ${soundAlerts ? "bg-[#1D4ED8]" : "bg-slate-200"}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-all ${soundAlerts ? "right-1" : "left-1"}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Alerts log */}
      <div className="space-y-3">
        {alerts.map((n) => (
          <div 
            key={n.id} 
            className={`bg-white rounded-2xl border p-5 flex gap-4 transition-all duration-200 ${
              !n.read ? "border-[#1D4ED8]/25 bg-blue-50/20 shadow-sm" : "border-[#E2E8F0]"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              n.type === "match" ? "bg-purple-50 text-purple-700 border border-purple-100" : 
              n.type === "price" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : 
              n.type === "booking" ? "bg-blue-50 text-[#1D4ED8] border border-blue-100" : 
              n.type === "rent" ? "bg-amber-50 text-amber-700 border border-amber-100" : 
              "bg-slate-50 text-slate-500 border border-slate-200"
            }`}>
              {n.type === "match" ? <Zap className="w-4 h-4" /> : 
               n.type === "price" ? <TrendingUp className="w-4 h-4" /> : 
               n.type === "booking" ? <Calendar className="w-4 h-4" /> : 
               n.type === "rent" ? <TrendingUp className="w-4 h-4" /> : 
               <Bell className="w-4 h-4" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#0F172A] text-sm">{n.title}</h4>
                {!n.read && <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse" />}
              </div>
              <p className="text-[#64748B] text-xs mt-0.5 leading-relaxed">{n.msg}</p>
              <span className="text-[10px] font-bold text-slate-400 mt-2 block">{n.time}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
