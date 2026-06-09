import * as React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onActionClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-[#E2E8F0] max-w-xl mx-auto my-4",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 text-[#64748B]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-sm">{description}</p>
      
      {actionLabel && (
        <>
          {actionHref ? (
            <Button asChild className="rounded-xl px-6 py-2 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-sm shadow transition-all">
              <Link to={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button
              onClick={onActionClick}
              className="rounded-xl px-6 py-2 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-sm shadow transition-all"
            >
              {actionLabel}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
