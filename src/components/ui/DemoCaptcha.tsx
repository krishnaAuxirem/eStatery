import { useState } from "react";
import { Check, ShieldCheck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoCaptchaProps {
  onVerify?: (verified: boolean) => void;
  verified?: boolean;
  className?: string;
}

export const DemoCaptcha: React.FC<DemoCaptchaProps> = ({
  onVerify,
  verified = false,
  className
}) => {
  const [loading, setLoading] = useState(false);
  const [isVerifiedState, setIsVerifiedState] = useState(verified);

  const isVerified = verified || isVerifiedState;

  const handleClick = () => {
    if (isVerified || loading) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsVerifiedState(true);
      if (onVerify) onVerify(true);
    }, 600);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVerifiedState(false);
    if (onVerify) onVerify(false);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-2xl border bg-slate-50/80 transition-all select-none cursor-pointer",
        isVerified
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox square */}
        <div
          className={cn(
            "w-7 h-7 rounded-lg border flex items-center justify-center transition-all shrink-0",
            isVerified
              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
              : "bg-white border-slate-300 shadow-inner"
          )}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-slate-400 border-t-[#1D4ED8] rounded-full animate-spin" />
          ) : isVerified ? (
            <Check className="w-4.5 h-4.5 stroke-[3]" />
          ) : null}
        </div>

        {/* Captcha Text */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            {isVerified ? "Human Verification Completed" : "I'm not a robot"}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {isVerified ? "eStatery AI Guard Active" : "Click to verify CAPTCHA"}
          </span>
        </div>
      </div>

      {/* Security Brand Badge */}
      <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
        <div className="flex flex-col items-end leading-none">
          <span className="text-[9px] font-extrabold text-slate-700 tracking-wider">reCAPTCHA</span>
          <span className="text-[8px] text-slate-400">Privacy • Terms</span>
        </div>
        <ShieldCheck className={cn("w-5 h-5 transition-colors", isVerified ? "text-emerald-600" : "text-slate-400")} />
        {isVerified && (
          <button
            type="button"
            onClick={handleReset}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-md hover:bg-slate-200/50"
            title="Reset CAPTCHA"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DemoCaptcha;
