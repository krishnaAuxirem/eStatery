import { useState } from "react";
import { CreditCard, Clock, Download, AlertCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import PaymentModal from "@/components/ui/PaymentModal";

interface RentPayment {
  id: string;
  month: string;
  amount: number;
  status: "Due" | "Paid" | "Overdue";
  date: string;
  dueDate: string;
  receipt: boolean;
  transactionId?: string;
}

interface PaymentSuccessDetails {
  gateway: "stripe" | "razorpay";
  transactionId: string;
  date: string;
}

export default function TenantPayments() {
  const [payments, setPayments] = useState<RentPayment[]>(() => {
    const local = localStorage.getItem("estatery_rent_payments");
    if (local) {
      return JSON.parse(local);
    } else {
      // Default dataset matching June 2026 current calendar
      const defaults: RentPayment[] = [
        { id: "p-1", month: "June 2026", amount: 85000, status: "Due", date: "Jun 1, 2026", dueDate: "Jun 10, 2026", receipt: false },
        { id: "p-2", month: "May 2026", amount: 85000, status: "Paid", date: "May 1, 2026", dueDate: "May 10, 2026", receipt: true, transactionId: "TXN-STRIPE-1780029" },
        { id: "p-3", month: "April 2026", amount: 85000, status: "Paid", date: "Apr 1, 2026", dueDate: "Apr 10, 2026", receipt: true, transactionId: "TXN-RAZORPAY-1729091" },
        { id: "p-4", month: "March 2026", amount: 85000, status: "Paid", date: "Mar 1, 2026", dueDate: "Mar 10, 2026", receipt: true, transactionId: "TXN-STRIPE-1698202" },
        { id: "p-5", month: "February 2026", amount: 85000, status: "Paid", date: "Feb 2, 2026", dueDate: "Feb 10, 2026", receipt: true, transactionId: "TXN-STRIPE-1658291" },
      ];
      localStorage.setItem("estatery_rent_payments", JSON.stringify(defaults));
      return defaults;
    }
  });

  const [activePayment, setActivePayment] = useState<RentPayment | null>(null);

  const savePayments = (updated: RentPayment[]) => {
    localStorage.setItem("estatery_rent_payments", JSON.stringify(updated));
    setPayments(updated);
  };

  const handlePaymentSuccess = (details: PaymentSuccessDetails) => {
    if (!activePayment) return;
    
    const updated = payments.map((p) => {
      if (p.id === activePayment.id) {
        return {
          ...p,
          status: "Paid" as const,
          date: details.date,
          transactionId: details.transactionId,
          receipt: true
        };
      }
      return p;
    });

    savePayments(updated);
    toast.success(`Rent for ${activePayment.month} paid successfully!`);
    
    // Automatically trigger receipt download
    const paidMatch = updated.find(x => x.id === activePayment.id);
    if (paidMatch) {
      setTimeout(() => generateReceipt(paidMatch), 600);
    }
  };

  const generateReceipt = (payment: RentPayment) => {
    try {
      const doc = new jsPDF();
      
      // Document Brand Header
      doc.setFillColor(29, 78, 216); // Brand Blue
      doc.rect(0, 0, 210, 35, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("eStatery Rent Receipt", 20, 24);
      
      // Receipt Body Metadata
      doc.setTextColor(100, 116, 139); // Slate Grey
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Receipt Reference: ${payment.transactionId || `TXN-REF-${Date.now()}`}`, 20, 48);
      doc.text(`Transaction Status: SUCCESSFUL`, 20, 54);
      doc.text(`Receipt Printed: ${new Date().toLocaleDateString("en-IN")}`, 20, 60);

      // Section divider
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(20, 66, 190, 66);
      
      // Billing Entity Info
      doc.setTextColor(15, 23, 42); // Slate 900
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("TENANT DETAILS", 20, 76);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text("Arjun Mehta", 20, 83);
      doc.text("The Crest, DLF Phase 5, Sector 54", 20, 89);
      doc.text("Gurgaon, Haryana, India", 20, 95);
      
      doc.setFont("helvetica", "bold");
      doc.text("PROPERTY OWNER", 110, 76);
      doc.setFont("helvetica", "normal");
      doc.text("Rajesh Kumar", 110, 83);
      doc.text("Gurgaon Realty Ventures", 110, 89);
      doc.text("Verifications Compliant LLC", 110, 95);

      doc.line(20, 105, 190, 105);

      // Description Header Table
      doc.setFont("helvetica", "bold");
      doc.text("Rent Month", 20, 114);
      doc.text("Payment Date", 80, 114);
      doc.text("Amount Paid", 145, 114);

      doc.line(20, 118, 190, 118);

      // Description Row Table
      doc.setFont("helvetica", "normal");
      doc.text(`Monthly Rent - ${payment.month}`, 20, 127);
      doc.text(`${payment.date}`, 80, 127);
      doc.setFont("helvetica", "bold");
      doc.text(`INR ${payment.amount.toLocaleString("en-IN")}.00`, 145, 127);

      doc.line(20, 134, 190, 134);

      // Total Summarizer
      doc.setFontSize(12);
      doc.text("TOTAL AMOUNT RECEIVED:", 85, 147);
      doc.text(`₹${payment.amount.toLocaleString("en-IN")}.00`, 145, 147);

      // Footer disclaimer
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.text("Note: This is a system-generated transaction confirmation lease document representing rent payment status.", 20, 180);
      doc.text("No manual signatures are required. For disputes, contact billing@estatery.com.", 20, 185);

      doc.save(`eStatery_Receipt_${payment.month.replace(" ", "_")}.pdf`);
      toast.success("Rent Receipt PDF generated and downloaded.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF. Download file again.");
    }
  };

  const handleDownloadStatement = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(15, 23, 42); // Dark Charcoal header
      doc.rect(0, 0, 210, 30, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("eStatery Rental Account Statement", 20, 20);

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Account Tenant: Arjun Mehta", 20, 42);
      doc.text("Premises: DLF Crest Towers, Gurgaon", 20, 48);
      doc.text(`Statement Period: YTD 2026`, 20, 54);

      doc.line(20, 60, 190, 60);

      // Table Header
      doc.setFont("helvetica", "bold");
      doc.text("Month", 20, 68);
      doc.text("Due Date", 65, 68);
      doc.text("Paid Date", 110, 68);
      doc.text("Amount", 160, 68);

      doc.line(20, 72, 190, 72);

      doc.setFont("helvetica", "normal");
      let currentY = 81;
      payments.forEach((p) => {
        doc.text(p.month, 20, currentY);
        doc.text(p.dueDate, 65, currentY);
        doc.text(p.status === "Paid" ? p.date : "UNPAID", 110, currentY);
        doc.text(`INR ${p.amount.toLocaleString("en-IN")}`, 160, currentY);
        currentY += 10;
      });

      doc.line(20, currentY + 2, 190, currentY + 2);
      doc.save("eStatery_Account_Statement.pdf");
      toast.success("Statement downloaded successfully!");
    } catch (e) {
      toast.error("Error generating account statement.");
    }
  };

  const activeDue = payments.find(p => p.status === "Due");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Rental Payments</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Track rent schedules, log details, and access printable invoices.</p>
        </div>
        <button 
          onClick={handleDownloadStatement} 
          className="flex items-center gap-1.5 text-xs font-bold bg-[#1D4ED8] hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <Download className="w-4 h-4" /> Download Statement
        </button>
      </div>

      {/* Due / Overdue Notifications */}
      {activeDue && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900 text-sm">Upcoming Payment Alert</h4>
            <p className="text-amber-800 text-xs font-medium">Your monthly lease rent for <span className="font-bold">{activeDue.month}</span> is due soon. Please clear payments by {activeDue.dueDate} to prevent late penalties.</p>
            <div className="pt-1.5">
              <button 
                onClick={() => setActivePayment(activeDue)}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Clear Rent Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rent Payment History */}
      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p.id} className={`bg-white rounded-2xl border p-5 flex items-center justify-between hover:shadow-md transition-shadow ${p.status === "Due" ? "border-amber-200 bg-amber-50/10" : "border-[#E2E8F0]"}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.status === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">{p.month}</p>
                <p className="text-[#64748B] text-xs mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {p.status === "Paid" ? `Settled on ${p.date}` : `Due on ${p.dueDate}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right space-y-0.5">
                <p className="font-extrabold text-[#0F172A] text-base">₹{p.amount.toLocaleString("en-IN")}</p>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                  p.status === "Paid" 
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}>
                  {p.status}
                </span>
              </div>
              {p.status === "Paid" && p.receipt && (
                <button 
                  onClick={() => generateReceipt(p)} 
                  className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#1D4ED8] hover:bg-blue-50/50 hover:border-blue-100 transition-all"
                  title="Download Receipt"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              {p.status === "Due" && (
                <button 
                  onClick={() => setActivePayment(p)} 
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {activePayment && (
        <PaymentModal
          isOpen={!!activePayment}
          onClose={() => setActivePayment(null)}
          amount={activePayment.amount}
          itemName={`Lease Rent: ${activePayment.month}`}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
