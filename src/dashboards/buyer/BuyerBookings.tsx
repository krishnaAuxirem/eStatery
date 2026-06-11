import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Edit2, XCircle, ChevronRight, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface BookingItem {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  type: "visit" | "virtual";
  createdAt: string;
  clientName?: string;
}

export default function BuyerBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingItem[]>(() => {
    const all: BookingItem[] = JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
    return all.filter((b: BookingItem) => b.userId === user?.id);
  });

  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00");

  const saveAllBookings = (updatedLocalList: BookingItem[]) => {
    const globalBookings: BookingItem[] = JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
    
    // We want to replace matching items, and keep the rest intact
    const updatedGlobal = globalBookings.map((gb: BookingItem) => {
      const match = updatedLocalList.find((lb) => lb.id === gb.id);
      return match ? match : gb;
    });

    localStorage.setItem("estatery_bookings", JSON.stringify(updatedGlobal));
    setBookings(updatedLocalList);
  };

  const handleCancel = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: "cancelled" as const };
      }
      return b;
    });
    saveAllBookings(updated);
    toast.success("Site visit booking has been cancelled.");
  };

  const startReschedule = (b: BookingItem) => {
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
        return { ...b, date: newDate, time: newTime, status: "pending" };
      }
      return b;
    });
    saveAllBookings(updated);
    setEditingBookingId(null);
    toast.success("Appointment rescheduled successfully (Pending confirmation).");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[#0F172A] text-xl">My Bookings <span className="text-[#64748B] font-normal text-base">({bookings.length})</span></h2>
        <Link to="/properties" className="text-sm font-extrabold text-[#1D4ED8] hover:underline flex items-center gap-0.5">
          Find more properties <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
          <Calendar className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
          <h3 className="font-bold text-[#0F172A] mb-2">No Bookings Yet</h3>
          <p className="text-[#64748B] text-sm mb-6">Book a property visit or virtual tour to inspect homes.</p>
          <Link to="/properties" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-all">Book a Visit</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: BookingItem) => {
            const isEditing = editingBookingId === b.id;
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <img src={b.propertyImage} alt={b.propertyTitle} className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100" />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${b.type === "virtual" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                          {b.type === "virtual" ? "Virtual Tour" : "Site Visit"}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#0F172A] hover:text-[#1D4ED8] transition-colors truncate">
                        <Link to={`/properties/${b.propertyId}`}>{b.propertyTitle}</Link>
                      </h4>
                      <div className="flex items-center gap-2 text-[#64748B] text-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{b.date}</span>
                        <span className="text-slate-300">·</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{b.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col justify-between items-start md:items-end gap-2.5 shrink-0">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold self-start ${
                      b.status === "confirmed" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : b.status === "cancelled" 
                        ? "bg-red-50 text-red-600 border border-red-100" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>

                    {b.status !== "cancelled" && !isEditing && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startReschedule(b)}
                          className="flex items-center gap-1 text-xs font-extrabold text-[#1D4ED8] bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="flex items-center gap-1 text-xs font-extrabold text-red-600 bg-red-50/30 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-all"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-end gap-3.5 bg-slate-50 p-4 rounded-xl">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">New Date</label>
                      <input 
                        type="date" 
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)}
                        className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">New Time Slot</label>
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
                        <Check className="w-3.5 h-3.5" /> Confirm
                      </button>
                      <button
                        onClick={() => setEditingBookingId(null)}
                        className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
