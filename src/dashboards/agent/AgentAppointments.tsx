import { useState } from "react";
import { Calendar, Clock, Edit2, XCircle, Check, MapPin } from "lucide-react";
import { toast } from "sonner";

interface AgentBookingItem {
  id: string;
  propertyTitle: string;
  propertyImage: string;
  date: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "cancelled";
  clientName?: string;
  userId?: string;
  propertyId?: string;
  createdAt?: string;
}

export default function AgentAppointments() {
  const [bookings, setBookings] = useState<AgentBookingItem[]>(() => {
    // Sync with estatery_bookings, fallback to mocks if empty
    const local: AgentBookingItem[] = JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
    const mocks: AgentBookingItem[] = [
      { id: "mock-1", propertyTitle: "Sky Residences Penthouse", propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400", date: "2026-06-15", time: "10:30", type: "Site Visit", status: "confirmed", clientName: "Rahul Gupta" },
      { id: "mock-2", propertyTitle: "DLF Apartment, Gurgaon", propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400", date: "2026-06-18", time: "15:00", type: "Virtual Tour", status: "pending", clientName: "Sneha Patel" },
    ];
    return local.length > 0 ? [...local, ...mocks] : mocks;
  });

  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00");

  const saveAllBookings = (updatedList: AgentBookingItem[]) => {
    // Keep local records clean of mock bookings when updating global storage
    const realBookingsOnly = updatedList.filter(b => !b.id.startsWith("mock-"));
    localStorage.setItem("estatery_bookings", JSON.stringify(realBookingsOnly));
    setBookings(updatedList);
  };

  const handleConfirm = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: "confirmed" as const };
      }
      return b;
    });
    saveAllBookings(updated);
    toast.success("Appointment status updated to: Confirmed.");
  };

  const handleCancel = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: "cancelled" as const };
      }
      return b;
    });
    saveAllBookings(updated);
    toast.success("Appointment cancelled.");
  };

  const startReschedule = (b: AgentBookingItem) => {
    setEditingBookingId(b.id);
    setNewDate(b.date);
    setNewTime(b.time);
  };

  const handleReschedule = (bookingId: string) => {
    if (!newDate) {
      toast.error("Please pick a valid date.");
      return;
    }
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, date: newDate, time: newTime, status: "confirmed" };
      }
      return b;
    });
    saveAllBookings(updated);
    setEditingBookingId(null);
    toast.success("Appointment rescheduled successfully.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-[#0F172A] text-xl">Scheduled Client Visits</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Manage inspections, property orientations, and virtual calls.</p>
      </div>

      <div className="space-y-3">
        {bookings.map((b) => {
          const isEditing = editingBookingId === b.id;
          return (
            <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <img src={b.propertyImage} alt={b.propertyTitle} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0F172A] text-sm">{b.propertyTitle}</h4>
                    <p className="text-xs text-slate-500 font-medium">Client: {b.clientName || "Authenticated Buyer"}</p>
                    <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs mt-1">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${b.type?.toLowerCase().includes("virtual") ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                        {b.type || "Site Visit"}
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.date} at {b.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 ml-auto md:ml-0 shrink-0">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    b.status === "confirmed" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : b.status === "cancelled" 
                      ? "bg-red-50 text-red-600 border border-red-100" 
                      : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>

                  {b.status !== "cancelled" && !isEditing && (
                    <div className="flex gap-1.5">
                      {b.status === "pending" && (
                        <button
                          onClick={() => handleConfirm(b.id)}
                          className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Confirm Appointment"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => startReschedule(b)}
                        className="p-1.5 text-[#1D4ED8] bg-blue-50/50 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Reschedule Appointment"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="p-1.5 text-red-600 bg-red-50/50 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel Appointment"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-end gap-3.5 bg-slate-50 p-4 rounded-xl">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Change Date</label>
                    <input 
                      type="date" 
                      value={newDate} 
                      onChange={(e) => setNewDate(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Change Time</label>
                    <select 
                      value={newTime} 
                      onChange={(e) => setNewTime(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#1D4ED8]"
                    >
                      {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map((t) => (
                        <option key={t} value={t}>{t} AM/PM</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => handleReschedule(b.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button
                      onClick={() => setEditingBookingId(null)}
                      className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
