import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
  light = false
}) => {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      {badge && (
        <span className={cn(
          "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4",
          light
            ? "bg-white/15 text-white border border-white/20"
            : "bg-purple-50 text-brand-purple border border-purple-100"
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        "text-3xl lg:text-4xl font-bold leading-tight",
        light ? "text-white" : "text-brand-text"
      )}>
        {title.split("**").map((part, i) =>
          i % 2 === 1
            ? <span key={i} className="text-gradient">{part}</span>
            : <span key={i}>{part}</span>
        )}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-base leading-relaxed mt-4 max-w-2xl",
          centered && "mx-auto",
          light ? "text-white/70" : "text-brand-muted"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
