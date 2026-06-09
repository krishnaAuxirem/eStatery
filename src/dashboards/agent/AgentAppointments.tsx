import { Calendar, Clock } from "lucide-react";

export default function AgentAppointments() {
  return (
    <div>
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">Upcoming Appointments</h2>
      <div className="space-y-3">
        {[
          { client: "Rahul Gupta", property: "Sky Residences, Mumbai", type: "Site Visit", date: "Jun 5, 2025", time: "10:30 AM", status: "Confirmed" },
          { client: "Sneha Patel", property: "DLF Apartment, Gurgaon", type: "Virtual Tour", date: "Jun 7, 2025", time: "3:00 PM", status: "Pending" },
          { client: "Aditya Singh", property: "Commercial Office, HITEC City", type: "Site Visit", date: "Jun 10, 2025", time: "11:00 AM", status: "Confirmed" },
          { client: "Priya Nair", property: "Villa Estate, Bangalore", type: "Document Review", date: "Jun 12, 2025", time: "2:00 PM", status: "Pending" },
        ].map((apt, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shrink-0"><Calendar className="w-5 h-5" /></div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-[#0F172A]">{apt.client}</h4>
                  <p className="text-[#64748B] text-sm mt-0.5">{apt.property}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#64748B]">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">{apt.type}</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />{apt.date} at {apt.time}
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${apt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{apt.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
