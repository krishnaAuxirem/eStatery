import { useEffect, useRef, useState } from "react";
import { Building2, Users, TrendingUp, Award } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const STATS: Stat[] = [
  { value: 125000, suffix: "+", label: "Properties Listed", icon: Building2, color: "text-brand-purple" },
  { value: 2, suffix: "M+", label: "Happy Customers", icon: Users, color: "text-brand-emerald" },
  { value: 15000, suffix: "+", label: "Deals Closed Monthly", icon: TrendingUp, color: "text-brand-indigo" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Award, color: "text-amber-500" }
];

const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, setStarted };
};

const CounterItem = ({ stat }: { stat: Stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { count, setStarted } = useCounter(stat.value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setStarted]);

  const formatCount = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".0", "");
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n.toString();
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-brand-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
        <stat.icon className="w-7 h-7" />
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-brand-text">
          {formatCount(count)}{stat.suffix}
        </div>
        <div className="text-brand-muted text-sm mt-1 font-medium">{stat.label}</div>
      </div>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map(stat => (
            <CounterItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
