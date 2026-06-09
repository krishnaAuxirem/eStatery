import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load the requested details. Please check your connection or try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-red-50/40 rounded-2xl border border-red-100 max-w-xl mx-auto my-4",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 text-red-600">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-sm">{description}</p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          className="rounded-xl px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </Button>
      )}
    </div>
  );
}
