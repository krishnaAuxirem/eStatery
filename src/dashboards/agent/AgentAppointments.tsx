import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, Clock, Edit2, XCircle, Check, MapPin, Search, 
  Filter, Plus, Phone, Mail, MessageSquare, Building2, User, X, CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";

export interface AgentBookingItem {
  id: string;
  propertyTitle: string;
  propertyImage: string;
  date: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "cancelled";
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  userId?: string;
  propertyId?: string;
  createdAt?: string;
}

const DEFAULT_MOCK_BOOKINGS: AgentBookingItem[] = [
  { 
    id: "mock-1", 
    propertyTitle: "Sky Residences Penthouse", 
    propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400", 
    date: "2026-06-15", 
    time: "10:30", 
    type: "Site Visit", 
    status: "confirmed", 
    clientName: "Rahul Gupta",
    clientEmail: "rahul.gupta@example.com",
    clientPhone: "+91 98765 12345" 
  },
  { 
    id: "mock-2", 
    propertyTitle: "DLF Apartment, Gurgaon", 
    propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400", 
    date: "2026-06-18", 
    time: "15:00", 
    type: "Virtual Tour", 
    status: "pending", 
    clientName: "Sneha Patel",
    clientEmail: "sneha.patel@example.com",
    clientPhone: "+91 98111 22233" 
  },
];

export default function AgentAppointments() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<AgentBookingItem[]>(() => {
    const local: AgentBookingItem[] = JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
    return local.length > 0 ? [...local, ...DEFAULT_MOCK_BOOKINGS] : DEFAULT_MOCK_BOOKINGS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">("all");

  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00");

  // New Appointment Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApptForm, setNewApptForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    propertyTitle: "Sky Residences Penthouse",
    date: new Date().toISOString().split("T")[0],
    time: "11:00",
    type: "Site Visit"
  });

  const saveAllBookings = (updatedList: AgentBookingItem[]) => {
    const realBookingsOnly = updatedList.filter(b => !b.id.startsWith("mock-"));
    localStorage.setItem("estatery_bookings", JSON.stringify(realBookingsOnly));
    setBookings(updatedList);
  };

  const handleConfirm = (bookingId: string) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: "confirmed" as const } : b
    );
    saveAllBookings(updated);
    toast.success("Appointment confirmed and client notified via SMS!");
  };

  const handleCancel = (bookingId: string) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    );
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
        return { ...b, date: newDate, time: newTime, status: "confirmed" as const };
      }
      return b;
    });
    saveAllBookings(updated);
    setEditingBookingId(null);
    toast.success("Appointment rescheduled successfully.");
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptForm.clientName) {
      toast.error("Please enter client name.");
      return;
    }

    const created: AgentBookingItem = {
      id: `booking-agent-${Date.now()}`,
      propertyTitle: newApptForm.propertyTitle,
      propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      date: newApptForm.date,
      time: newApptForm.time,
      type: newApptForm.type,
      status: "confirmed",
      clientName: newApptForm.clientName,
      clientEmail: newApptForm.clientEmail || "client@example.com",
      clientPhone: newApptForm.clientPhone || "+91 98000 00000",
      createdAt: new Date().toISOString()
    };

    const updated = [created, ...bookings];
    saveAllBookings(updated);
    setShowAddModal(false);
    setNewApptForm({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      propertyTitle: "Sky Residences Penthouse",
      date: new Date().toISOString().split("T")[0],
      time: "11:00",
      type: "Site Visit"
    });
    toast.success("New client appointment scheduled!");
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesSearch = 
      (b.clientName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAppts = bookings.length;
  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const pendingCount = bookings.filter(b => b.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Scheduled Client Visits</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Manage inspections, property orientations, and virtual calls with buyers.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-sm hover:shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Schedule Visit
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Total Scheduled</div>
          <div className="text-xl font-extrabold text-[#0F172A] mt-1">{totalAppts}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Confirmed Visits</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">{confirmedCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Pending Requests</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">{pendingCount}</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#10B981] text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {(["all", "confirmed", "pending", "cancelled"] as const).map((st) => {
            const count = st === "all" ? bookings.length : bookings.filter(b => b.status === st).length;
            const isActive = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                <span className="capitalize">{st}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
          <Calendar className="w-14 h-14 text-slate-200 mx-auto mb-3" />
          <h3 className="font-bold text-[#0F172A]">No Appointments Found</h3>
          <p className="text-slate-400 text-xs mt-1">Scheduled property inspections will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((b) => {
            const isEditing = editingBookingId === b.id;
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-4 items-center min-w-0 flex-1">
                    <img src={b.propertyImage} alt={b.propertyTitle} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="font-bold text-[#0F172A] text-sm truncate">{b.propertyTitle}</h4>
                      <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Client: <strong className="text-slate-800">{b.clientName || "Authenticated Buyer"}</strong></span>
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs mt-1 font-medium">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${b.type?.toLowerCase().includes("virtual") ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                          {b.type || "Site Visit"}
                        </span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {b.date} at {b.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 ml-auto md:ml-0 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                      b.status === "confirmed" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : b.status === "cancelled" 
                        ? "bg-red-50 text-red-600 border-red-100" 
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>

                    {b.status !== "cancelled" && !isEditing && (
                      <div className="flex gap-1.5 items-center">
                        {b.status === "pending" && (
                          <button
                            onClick={() => handleConfirm(b.id)}
                            className="p-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                            title="Confirm Appointment"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => startReschedule(b)}
                          className="p-2 text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                          title="Reschedule Appointment"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                          title="Cancel Appointment"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reschedule Form Box */}
                {isEditing && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-end gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 animate-in fade-in">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Change Date</label>
                      <input 
                        type="date" 
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)}
                        className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#10B981]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Change Time</label>
                      <select 
                        value={newTime} 
                        onChange={(e) => setNewTime(e.target.value)}
                        className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#10B981] font-semibold"
                      >
                        {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map((t) => (
                          <option key={t} value={t}>{t} AM/PM</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 ml-auto">
                      <button
                        onClick={() => handleReschedule(b.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={() => setEditingBookingId(null)}
                        className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all"
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
      )}

      {/* SCHEDULE VISIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#10B981]" /> Schedule Client Visit
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Shah"
                  value={newApptForm.clientName}
                  onChange={(e) => setNewApptForm({ ...newApptForm, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={newApptForm.clientEmail}
                    onChange={(e) => setNewApptForm({ ...newApptForm, clientEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={newApptForm.clientPhone}
                    onChange={(e) => setNewApptForm({ ...newApptForm, clientPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Property Title</label>
                <input
                  type="text"
                  value={newApptForm.propertyTitle}
                  onChange={(e) => setNewApptForm({ ...newApptForm, propertyTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newApptForm.date}
                    onChange={(e) => setNewApptForm({ ...newApptForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time *</label>
                  <select
                    value={newApptForm.time}
                    onChange={(e) => setNewApptForm({ ...newApptForm, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981] bg-white font-semibold"
                  >
                    {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map((t) => (
                      <option key={t} value={t}>{t} AM/PM</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Visit Type</label>
                <select
                  value={newApptForm.type}
                  onChange={(e) => setNewApptForm({ ...newApptForm, type: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10B981] bg-white font-semibold"
                >
                  <option value="Site Visit">Site Visit (In Person)</option>
                  <option value="Virtual Tour">Virtual Tour (360 Video Call)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold rounded-xl hover:shadow-md"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
