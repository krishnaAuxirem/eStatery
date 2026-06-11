import { useState } from "react";
import { CreditCard, Wallet, Smartphone, ShieldCheck, Loader2, CheckCircle } from "lucide-react";

interface PaymentSuccessDetails {
  gateway: "stripe" | "razorpay";
  transactionId: string;
  date: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number | string;
  itemName: string;
  onSuccess: (paymentDetails: PaymentSuccessDetails) => void;
}

export default function PaymentModal({ isOpen, onClose, amount, itemName, onSuccess }: PaymentModalProps) {
  const [gateway, setGateway] = useState<"stripe" | "razorpay">("stripe");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        onSuccess({
          gateway,
          transactionId: `TXN-${gateway.toUpperCase()}-${Date.now()}`,
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
        });
        onClose();
      }, 1500);

    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Success animation panel */}
        {success && (
          <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 mt-4">Payment Successful!</h3>
            <p className="text-xs text-slate-500 mt-1">Your transaction has been approved. Generating receipt...</p>
          </div>
        )}

        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800">Secure Payment Checkout</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{itemName}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1.5 hover:bg-slate-100 rounded-xl"
            disabled={loading}
          >
            &times;
          </button>
        </div>

        {/* Tab Gateway switcher */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button
              onClick={() => setGateway("stripe")}
              className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                gateway === "stripe" ? "bg-[#1D4ED8] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
              disabled={loading}
            >
              <CreditCard className="w-3.5 h-3.5" /> Stripe Ready
            </button>
            <button
              onClick={() => setGateway("razorpay")}
              className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                gateway === "razorpay" ? "bg-amber-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
              disabled={loading}
            >
              <Wallet className="w-3.5 h-3.5" /> Razorpay
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1">
          {gateway === "stripe" ? (
            // Stripe Interface Form
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Card Holder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arjun Mehta"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
                  disabled={loading}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Card Number</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="4242 4242 4242 4242"
                    pattern="\d{16}"
                    maxLength={16}
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8] text-center"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">CVV / CVC</label>
                  <input
                    type="password"
                    required
                    placeholder="***"
                    maxLength={3}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8] text-center"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Razorpay Interface Form
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Select Payment Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 border border-amber-200 rounded-xl bg-amber-50/20 text-center cursor-pointer hover:bg-amber-50/50 transition-colors">
                    <Smartphone className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                    <span className="text-[9px] font-bold text-slate-600">UPI / QR</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl text-center cursor-pointer hover:bg-slate-50 transition-colors">
                    <CreditCard className="w-5 h-5 mx-auto text-slate-500 mb-1" />
                    <span className="text-[9px] font-bold text-slate-600">Cards</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl text-center cursor-pointer hover:bg-slate-50 transition-colors">
                    <Wallet className="w-5 h-5 mx-auto text-slate-500 mb-1" />
                    <span className="text-[9px] font-bold text-slate-600">Netbanking</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">UPI Virtual Payment Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. arjun@okhdfcbank"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-amber-500"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Secure check */}
          <div className="flex items-center gap-1.5 justify-center py-1 text-slate-400 text-[10px]">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL encrypted secure connection</span>
          </div>

          {/* Payment action button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              gateway === "stripe" 
                ? "bg-[#1D4ED8] hover:bg-blue-700" 
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Transaction...
              </>
            ) : (
              `Pay Now: ${typeof amount === "number" ? `₹${amount.toLocaleString()}` : amount}`
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
