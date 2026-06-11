import { useState, useRef, useEffect } from "react";
import { FileText, Download, CheckCircle, PenTool, X, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

interface LeaseDoc {
  id: string;
  name: string;
  status: "awaiting_sign" | "signed" | "approved";
  size: string;
  date: string;
  signatureData?: string;
}

export default function TenantLease() {
  const [docs, setDocs] = useState<LeaseDoc[]>([]);
  const [activeSignDoc, setActiveSignDoc] = useState<LeaseDoc | null>(null);
  
  // HTML5 signature pad canvas refs and states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("estatery_tenant_docs");
    if (local) {
      setDocs(JSON.parse(local));
    } else {
      const defaults: LeaseDoc[] = [
        { id: "doc-1", name: "Lease Agreement (Gurgaon Crest)", status: "awaiting_sign", size: "1.4 MB", date: "Jun 1, 2026" },
        { id: "doc-2", name: "Move-in Inventory Inspection", status: "approved", size: "2.8 MB", date: "Jan 1, 2026" },
        { id: "doc-3", name: "Society Code of Conduct", status: "approved", size: "0.9 MB", date: "Jan 1, 2026" }
      ];
      localStorage.setItem("estatery_tenant_docs", JSON.stringify(defaults));
      setDocs(defaults);
    }
  }, []);

  const saveDocs = (updated: LeaseDoc[]) => {
    localStorage.setItem("estatery_tenant_docs", JSON.stringify(updated));
    setDocs(updated);
  };

  // Canvas Drawing Handlers (Mouse)
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1D4ED8"; // Blue signature ink
    
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Canvas Drawing Handlers (Touch for Mobiles)
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1D4ED8";

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    setIsDrawing(true);
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Finalize E-Sign process
  const handleCompleteSign = () => {
    const canvas = canvasRef.current;
    if (!canvas || !activeSignDoc) return;
    
    const sigImage = canvas.toDataURL("image/png");
    
    const updated = docs.map((d) => {
      if (d.id === activeSignDoc.id) {
        return {
          ...d,
          status: "signed" as const,
          signatureData: sigImage,
          date: new Date().toLocaleDateString("en-IN")
        };
      }
      return d;
    });

    saveDocs(updated);
    setActiveSignDoc(null);
    toast.success("Lease agreement electronically signed successfully!");
  };

  const handleDownloadDoc = (docItem: LeaseDoc) => {
    if (docItem.status === "awaiting_sign") {
      toast.warning("Please sign the agreement draft before downloading.");
      return;
    }

    try {
      const doc = new jsPDF();
      
      // Setup contract design
      doc.setFont("times", "bold");
      doc.setFontSize(18);
      doc.text("RESIDENTIAL LEASE AGREEMENT", 50, 25);
      
      doc.setFontSize(10);
      doc.setFont("times", "normal");
      doc.text("This Agreement is entered into on 1st of January, 2026 by and between:", 20, 40);
      
      doc.setFont("times", "bold");
      doc.text("LANDLORD: Rajesh Kumar", 20, 50);
      doc.text("TENANT: Arjun Mehta", 20, 56);
      
      doc.setFont("times", "normal");
      doc.text("PREMISES: Apartment 1502, Tower 8, The Crest, DLF Phase 5, Gurgaon, HR.", 20, 66);
      doc.text("TERM: 12 months commencing January 1, 2026.", 20, 72);
      doc.text("RENTAL RATE: INR 85,000 per month payable on or before the 10th day.", 20, 78);
      
      doc.setFont("times", "bold");
      doc.text("TERMS AND CONDITIONS:", 20, 90);
      doc.setFont("times", "normal");
      doc.text("1. Tenant shall maintain the premises in a clean, hygienic, and tenantable state.", 20, 98);
      doc.text("2. Commercial usage of the residential apartment is strictly prohibited.", 20, 104);
      doc.text("3. Notice period of 2 months must be served prior to lease termination.", 20, 110);
      
      doc.line(20, 130, 190, 130);

      // Render Signatures
      doc.setFont("times", "bold");
      doc.text("Landlord Signature:", 20, 145);
      doc.setFont("times", "italic");
      doc.text("Rajesh Kumar (E-Signed)", 20, 155);

      doc.setFont("times", "bold");
      doc.text("Tenant Signature:", 110, 145);
      
      if (docItem.signatureData) {
        // Embed tenant's custom drawn signature
        doc.addImage(docItem.signatureData, "PNG", 110, 148, 50, 20);
      } else {
        doc.text("N/A", 110, 155);
      }

      doc.setFont("times", "normal");
      doc.setFontSize(8.5);
      doc.text("Document certified & stored securely by eStatery Enterprise E-Signer.", 20, 195);
      doc.text(`Digital Sign Timestamp: ${docItem.date}`, 20, 200);

      doc.save(`${docItem.name.replace(/\s+/g, "_")}.pdf`);
      toast.success("Document downloaded!");
    } catch (e) {
      toast.error("Error generating printable document file.");
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[#0F172A] text-xl">Document Center</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Access leases, inspections, verification paperwork, and e-signatures.</p>
        </div>
      </div>

      {/* Lease Summary Cards */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2 text-sm">
          <FileText className="w-5 h-5 text-amber-600" /> Active Lease parameters
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Rented Property", value: "DLF Crest Towers, GGN" },
            { label: "Lease Commencement", value: "January 1, 2026" },
            { label: "Lease Termination", value: "December 31, 2026" },
            { label: "Monthly Rent Rate", value: "₹85,000" },
            { label: "Security Deposit Held", value: "₹1,70,000" },
            { label: "Contract Period Notice", value: "2 Months served" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-100">
              <div className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">{s.label}</div>
              <div className="font-bold text-[#0F172A] text-sm mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lease Files list */}
      <div className="space-y-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                doc.status === "awaiting_sign" ? "bg-amber-50 text-amber-500" : "bg-red-50 text-red-500"
              }`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">{doc.name}</p>
                <p className="text-[#64748B] text-xs mt-0.5">
                  PDF · {doc.size} · Date: {doc.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 ml-auto sm:ml-0 shrink-0">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
                doc.status === "signed" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                  : doc.status === "approved" 
                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                  : "bg-amber-50 text-amber-600 border border-amber-100"
              }`}>
                {doc.status === "signed" ? "Signed" : doc.status === "approved" ? "Verified" : "Awaiting E-Sign"}
              </span>

              {doc.status === "awaiting_sign" ? (
                <button
                  onClick={() => setActiveSignDoc(doc)}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <PenTool className="w-3.5 h-3.5" /> Sign Document
                </button>
              ) : (
                <button
                  onClick={() => handleDownloadDoc(doc)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-700 hover:bg-blue-50/50 hover:border-blue-100 transition-all text-xs font-bold"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Signature Canvas Pad Modal Dialog */}
      {activeSignDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800">Verify &amp; E-Sign Document</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{activeSignDoc.name}</p>
              </div>
              <button 
                onClick={() => setActiveSignDoc(null)} 
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Draft Preview Body */}
            <div className="p-6 overflow-y-auto max-h-56 bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-600 leading-relaxed font-sans space-y-2.5">
              <h4 className="font-extrabold text-xs text-slate-800">SECTION 1: CORE LEASE PARTICULARS</h4>
              <p>Tenant agrees to rent the premises located at Tower 8, The Crest, Gurgaon for a term of 12 months. Base rent is fixed at INR 85,000 per month, subject to standard taxation and utilities. Late payments past the 10th of each calendar month will accrue interest penalty.</p>
              <h4 className="font-extrabold text-xs text-slate-800">SECTION 2: DIGITAL INTEGRITY STATEMENTS</h4>
              <p>By drawing your signature in the signature area below, you consent to compile a legally-binding residential lease agreement contract certified under IT Act Electronic Sign regulations.</p>
            </div>

            {/* Signature Drawpad Canvas */}
            <div className="p-6 space-y-3.5">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Draw Signature in Box Below</label>
                <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 rounded-2xl overflow-hidden cursor-crosshair">
                  <canvas
                    ref={canvasRef}
                    width={460}
                    height={150}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawingTouch}
                    onTouchMove={drawTouch}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[150px] bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Certified encrypted secure E-Sign ledger registry.</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={clearSignature}
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                >
                  Clear Pad
                </button>
                <button
                  onClick={handleCompleteSign}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md text-center"
                >
                  Apply Signature &amp; E-Sign
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
