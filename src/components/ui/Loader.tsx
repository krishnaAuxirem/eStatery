import { cn } from "@/lib/utils";

interface LoaderProps {
  fullScreen?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({ fullScreen = false, className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className="relative flex items-center justify-center">
        {/* Inner core spinner */}
        <div
          className={cn(
            "rounded-full border-t-[#1D4ED8] border-r-transparent border-b-transparent border-l-transparent animate-spin",
            sizeClasses[size]
          )}
        />
        {/* Outer glowing halo */}
        <div
          className={cn(
            "absolute rounded-full border border-slate-100 opacity-20",
            size === "sm" ? "w-7 h-7" : size === "md" ? "w-14 h-14" : "w-22 h-22"
          )}
        />
      </div>
      {fullScreen && (
        <div className="flex flex-col items-center">
          <span className="text-slate-800 font-bold text-base tracking-wide animate-pulse mt-2">eStatery</span>
          <span className="text-slate-400 text-xs tracking-wider uppercase">Loading intelligence...</span>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-50/70 backdrop-blur-md z-[9999] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
