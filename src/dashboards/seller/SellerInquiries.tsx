import { useState } from "react";
import { Users, Calendar, Clock, MessageSquare, Check, XCircle } from "lucide-react";
import { toast } from "sonner";

interface SellerBookingItem {
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

export default function SellerInquiries() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "visits">("inquiries");

  // Load bookings from LocalStorage for Seller's listings (since we mock, let's display all platform bookings as requests they can manage)
  const [bookings, setBookings] = useState<SellerBookingItem[]>(() => {
    return JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
  });

  const saveAllBookings = (updatedList: SellerBookingItem[]) => {
    localStorage.setItem("estatery_bookings", JSON.stringify(updatedList));
    setBookings(updatedList);
  };

  const handleApprove = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: "confirmed" as const };
      }
      return b;
    });
    saveAllBookings(updated);
    toast.success("Visit request approved and client notified!");
  };

  const handleDecline = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: "cancelled" as const };
      }
      return b;
    });
    saveAllBookings(updated);
    toast.success("Visit request declined.");
  };

  const mockInquiries = [
    { name: "Arjun Mehta", property: "Sky Residences Penthouse", message: "Interested in site visit this weekend", time: "1 hr ago", status: "New" },
    { name: "Priya Singh", property: "Serene Villa, Bangalore", message: "Can we negotiate the price?", time: "3 hr ago", status: "Replied" },
    { name: "Rohan Kumar", property: "DLF Apartment, Gurgaon", message: "Is the property available from July?", time: "Yesterday", status: "New" },
    { name: "Ananya Rao", property: "Modern Townhouse, Delhi", message: "Requesting documentation list", time: "2 days ago", status: "Closed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Leads & Appointments</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Manage buyer inquiries and schedule site inspection requests.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-[#F5F7FA] p-1.5 rounded-xl border border-slate-100 shrink-0">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "inquiries"
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Buyer Inquiries
          </button>
          <button
            onClick={() => setActiveTab("visits")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "visits"
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Visit Requests ({bookings.filter(b => b.status === "pending").length})
          </button>
        </div>
      </div>

      {activeTab === "inquiries" ? (
        <div className="space-y-3">
          {mockInquiries.map((inq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {inq.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-[#0F172A] text-sm">{inq.name}</h4>
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 ${
                    inq.status === "New" 
                      ? "bg-blue-50 text-[#1D4ED8] border border-blue-100" 
                      : inq.status === "Replied" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-[#64748B] text-xs mt-0.5">{inq.property}</p>
                <p className="text-[#0F172A] text-sm mt-1.5 italic">"{inq.message}"</p>
                <p className="text-[#64748B] text-xs mt-1">{inq.time}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
              <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <h3 className="font-bold text-[#0F172A]">No Visit Requests</h3>
              <p className="text-slate-400 text-xs mt-1">Visit scheduling records will appear here.</p>
            </div>
          ) : (
            bookings.map((b: SellerBookingItem) => (
              <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col md:flex-row justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <img src={b.propertyImage} alt={b.propertyTitle} className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0" />
                  <div className="space-y-1">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${b.type === "virtual" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                      {b.type === "virtual" ? "Virtual Tour" : "Site Visit"}
                    </span>
                    <h4 className="font-bold text-[#0F172A] text-sm">{b.propertyTitle}</h4>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{b.date} at {b.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 ml-auto md:ml-0 shrink-0">
                  {b.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(b.id)}
                        className="flex items-center gap-1 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleDecline(b.id)}
                        className="flex items-center gap-1 px-3.5 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Decline
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      b.status === "confirmed" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
