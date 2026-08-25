import { useState, useEffect } from "react";
import { 
  Users, Calendar, Clock, MessageSquare, Check, XCircle, Send, 
  Search, Filter, Plus, Trash2, Phone, Mail, Building, Eye, X, 
  CheckCircle2, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface InquiryReply {
  id: string;
  text: string;
  time: string;
  sender: string;
}

export interface SellerInquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
  time: string;
  status: "New" | "Replied" | "Closed";
  replies: InquiryReply[];
  createdAt?: string;
}

export interface SellerBookingItem {
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

const DEFAULT_INQUIRIES: SellerInquiryItem[] = [
  {
    id: "inq-1",
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 98765 43210",
    property: "Sky Residences Penthouse",
    message: "Interested in site visit this weekend. Is the price negotiable for immediate registry?",
    time: "1 hr ago",
    status: "New",
    replies: []
  },
  {
    id: "inq-2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 98230 11223",
    property: "Serene Villa, Bangalore",
    message: "Can we negotiate the price? Also requesting floor plans and maintenance cost breakdown.",
    time: "3 hr ago",
    status: "Replied",
    replies: [
      {
        id: "rep-1",
        text: "Hello Priya! Yes, floor plans have been emailed. Let us know a convenient time for a call.",
        time: "2 hr ago",
        sender: "You (Seller)"
      }
    ]
  },
  {
    id: "inq-3",
    name: "Rohan Kumar",
    email: "rohan.k@example.com",
    phone: "+91 97110 55443",
    property: "DLF Apartment, Gurgaon",
    message: "Is the property available from July? Is visitor parking available?",
    time: "Yesterday",
    status: "New",
    replies: []
  },
  {
    id: "inq-4",
    name: "Ananya Rao",
    email: "ananya.rao@example.com",
    phone: "+91 96500 88776",
    property: "Modern Townhouse, Delhi",
    message: "Requesting documentation list and RERA verification certificates.",
    time: "2 days ago",
    status: "Closed",
    replies: [
      {
        id: "rep-2",
        text: "All RERA documents and title deed copies sent to your email address.",
        time: "1 day ago",
        sender: "You (Seller)"
      }
    ]
  }
];

export default function SellerInquiries() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"inquiries" | "visits">("inquiries");
  const [statusFilter, setStatusFilter] = useState<"All" | "New" | "Replied" | "Closed">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Inquiries State
  const [inquiries, setInquiries] = useState<SellerInquiryItem[]>(() => {
    const saved = localStorage.getItem("estatery_inquiries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_INQUIRIES;
      }
    }
    localStorage.setItem("estatery_inquiries", JSON.stringify(DEFAULT_INQUIRIES));
    return DEFAULT_INQUIRIES;
  });

  // Selected Inquiry for Modal View/Reply
  const [selectedInquiry, setSelectedInquiry] = useState<SellerInquiryItem | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // New Inquiry Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInquiryForm, setNewInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    property: "Sky Residences Penthouse",
    message: ""
  });

  // Bookings (Visit Requests) State
  const [bookings, setBookings] = useState<SellerBookingItem[]>(() => {
    return JSON.parse(localStorage.getItem("estatery_bookings") || "[]");
  });

  const saveInquiries = (updatedList: SellerInquiryItem[]) => {
    setInquiries(updatedList);
    localStorage.setItem("estatery_inquiries", JSON.stringify(updatedList));
  };

  const saveBookings = (updatedList: SellerBookingItem[]) => {
    setBookings(updatedList);
    localStorage.setItem("estatery_bookings", JSON.stringify(updatedList));
  };

  // Status Change handler
  const handleUpdateStatus = (id: string, newStatus: "New" | "Replied" | "Closed") => {
    const updated = inquiries.map((inq) => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    saveInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
    }
    toast.success(`Inquiry status updated to ${newStatus}`);
  };

  // Send Reply handler
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyMessage.trim()) return;

    const newReply: InquiryReply = {
      id: `rep-${Date.now()}`,
      text: replyMessage.trim(),
      time: "Just now",
      sender: "You (Seller)"
    };

    const updatedInquiries = inquiries.map((inq) => {
      if (inq.id === selectedInquiry.id) {
        return {
          ...inq,
          status: "Replied" as const,
          replies: [...(inq.replies || []), newReply]
        };
      }
      return inq;
    });

    saveInquiries(updatedInquiries);
    setSelectedInquiry(prev => prev ? {
      ...prev,
      status: "Replied",
      replies: [...(prev.replies || []), newReply]
    } : null);

    setReplyMessage("");
    toast.success(`Reply sent to ${selectedInquiry.name}!`);
  };

  // Delete Inquiry handler
  const handleDeleteInquiry = (id: string, name: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    saveInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
    toast.success(`Inquiry from ${name} deleted.`);
  };

  // Add Lead / Inquiry submit
  const handleAddInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryForm.name || !newInquiryForm.message) {
      toast.error("Please enter candidate name and message.");
      return;
    }

    const createdItem: SellerInquiryItem = {
      id: `inq-${Date.now()}`,
      name: newInquiryForm.name,
      email: newInquiryForm.email || "buyer@example.com",
      phone: newInquiryForm.phone || "+91 99999 00000",
      property: newInquiryForm.property,
      message: newInquiryForm.message,
      time: "Just now",
      status: "New",
      replies: []
    };

    const updated = [createdItem, ...inquiries];
    saveInquiries(updated);
    setShowAddModal(false);
    setNewInquiryForm({ name: "", email: "", phone: "", property: "Sky Residences Penthouse", message: "" });
    toast.success("New buyer inquiry added successfully!");
  };

  // Visit Request handlers
  const handleApproveVisit = (bookingId: string) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: "confirmed" as const } : b
    );
    saveBookings(updated);
    toast.success("Visit request approved and client notified!");
  };

  const handleDeclineVisit = (bookingId: string) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    );
    saveBookings(updated);
    toast.success("Visit request declined.");
  };

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingVisitsCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Leads & Appointments</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Manage buyer inquiries, reply to messages, and schedule site inspections.</p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "inquiries" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white rounded-xl text-xs font-bold hover:shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Lead
            </button>
          )}

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
              <MessageSquare className="w-3.5 h-3.5" /> Buyer Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("visits")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "visits"
                  ? "bg-white text-[#1D4ED8] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Visit Requests ({pendingVisitsCount})
            </button>
          </div>
        </div>
      </div>

      {activeTab === "inquiries" ? (
        <div className="space-y-4">
          {/* Controls Bar: Search & Status Filters */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by buyer name, property, or text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D4ED8] focus:bg-white text-slate-800"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {(["All", "New", "Replied", "Closed"] as const).map((st) => {
                const count = st === "All" ? inquiries.length : inquiries.filter(i => i.status === st).length;
                const isActive = statusFilter === st;
                return (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#1D4ED8] text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <span>{st}</span>
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

          {/* Inquiries List */}
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
              <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <h3 className="font-bold text-[#0F172A]">No Inquiries Found</h3>
              <p className="text-slate-400 text-xs mt-1">Try resetting search query or status filter.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex gap-4 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-sm">
                      {inq.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-[#0F172A] text-sm group-hover:text-[#1D4ED8] transition-colors">
                          {inq.name}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                            inq.status === "New"
                              ? "bg-blue-50 text-[#1D4ED8] border border-blue-100"
                              : inq.status === "Replied"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {inq.status}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          • {inq.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{inq.property}</span>
                      </div>

                      <p className="text-[#0F172A] text-xs mt-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        "{inq.message}"
                      </p>

                      {inq.replies && inq.replies.length > 0 && (
                        <div className="mt-2 text-[11px] text-emerald-700 flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Last replied {inq.replies[inq.replies.length - 1].time} ({inq.replies.length} replies)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] rounded-xl text-xs font-bold transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" /> View & Reply
                    </button>

                    <button
                      onClick={() => navigate("/dashboard/seller/chats")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                      title="Open Direct Chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Chat
                    </button>

                    <button
                      onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Visit Requests Tab */
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
              <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <h3 className="font-bold text-[#0F172A]">No Visit Requests</h3>
              <p className="text-slate-400 text-xs mt-1">Visit scheduling records from potential buyers will appear here.</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <img src={b.propertyImage} alt={b.propertyTitle} className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0" />
                  <div className="space-y-1">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${b.type === "virtual" ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                      {b.type === "virtual" ? "Virtual Tour" : "Site Visit"}
                    </span>
                    <h4 className="font-bold text-[#0F172A] text-sm">{b.propertyTitle}</h4>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.date} at {b.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 ml-auto md:ml-0 shrink-0">
                  {b.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApproveVisit(b.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleDeclineVisit(b.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Decline
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                      b.status === "confirmed" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-red-50 text-red-600 border-red-100"
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

      {/* VIEW & REPLY INQUIRY MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                  {selectedInquiry.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedInquiry.name}</h3>
                  <p className="text-xs text-slate-500">{selectedInquiry.property}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Buyer Contact Details */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-600 truncate">
                <Mail className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <a href={`mailto:${selectedInquiry.email}`} className="hover:underline truncate">{selectedInquiry.email}</a>
              </div>
              <div className="flex items-center gap-2 text-slate-600 truncate">
                <Phone className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <a href={`tel:${selectedInquiry.phone}`} className="hover:underline truncate">{selectedInquiry.phone}</a>
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="flex items-center justify-between text-xs bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
              <span className="font-semibold text-slate-700">Change Status:</span>
              <div className="flex gap-1.5">
                {(["New", "Replied", "Closed"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      selectedInquiry.status === st
                        ? "bg-[#1D4ED8] text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Buyer Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Buyer Message:</label>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-800 leading-relaxed italic">
                "{selectedInquiry.message}"
              </div>
            </div>

            {/* Conversation / Reply History */}
            {selectedInquiry.replies && selectedInquiry.replies.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Previous Replies:</label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedInquiry.replies.map((rep) => (
                    <div key={rep.id} className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-xs space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-emerald-800 font-bold">
                        <span>{rep.sender}</span>
                        <span>{rep.time}</span>
                      </div>
                      <p className="text-slate-700">{rep.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700">Write Your Reply:</label>
              <textarea
                rows={3}
                placeholder="Type your response to the buyer..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full p-3 text-xs rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] text-slate-800"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={!replyMessage.trim()}
                  className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] disabled:opacity-50 hover:shadow-md text-white text-xs font-bold rounded-xl transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW LEAD / INQUIRY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Buyer Lead</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInquiry} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Buyer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Verma"
                  value={newInquiryForm.name}
                  onChange={(e) => setNewInquiryForm({ ...newInquiryForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="sameer@example.com"
                    value={newInquiryForm.email}
                    onChange={(e) => setNewInquiryForm({ ...newInquiryForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={newInquiryForm.phone}
                    onChange={(e) => setNewInquiryForm({ ...newInquiryForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Property</label>
                <input
                  type="text"
                  value={newInquiryForm.property}
                  onChange={(e) => setNewInquiryForm({ ...newInquiryForm, property: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Inquiry / Note *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of inquiry or requirements..."
                  value={newInquiryForm.message}
                  onChange={(e) => setNewInquiryForm({ ...newInquiryForm, message: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D4ED8]"
                />
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
                  className="px-5 py-2 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold rounded-xl hover:shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
