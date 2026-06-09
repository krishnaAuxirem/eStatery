import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BuyerBookings() {
  const { user } = useAuth();
  const bookings = JSON.parse(localStorage.getItem("estatery_bookings") || "[]").filter((b: any) => b.userId === user?.id);

  return (
    <div>
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Bookings <span className="text-[#64748B] font-normal text-base">({bookings.length})</span></h2>
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
          <Calendar className="w-14 h-14 text-[#E2E8F0] mx-auto mb-4" />
          <h3 className="font-bold text-[#0F172A] mb-2">No Bookings Yet</h3>
          <p className="text-[#64748B] text-sm mb-6">Book a property visit to get started.</p>
          <Link to="/properties" className="px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold">Book a Visit</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: any) => (
            <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-shadow">
              <img src={b.propertyImage} alt={b.propertyTitle} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0F172A]">{b.propertyTitle}</h4>
                <div className="flex items-center gap-2 mt-1 text-[#64748B] text-sm"><Clock className="w-3.5 h-3.5" />{b.date} at {b.time} · {b.type === "virtual" ? "Virtual Tour" : "Site Visit"}</div>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-xs font-bold self-start shrink-0 ${b.status === "confirmed" ? "bg-emerald-50 text-emerald-700" : b.status === "cancelled" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>
                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
