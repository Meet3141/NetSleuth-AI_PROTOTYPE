import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  demo?: boolean;
}

export function MetricCard({ title, value, icon, trend, className, demo = true }: MetricCardProps) {
  return (
    <div className={cn("glass-panel p-4 md:p-5 relative overflow-hidden flex flex-col justify-between min-h-[7rem]", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</h3>
        {icon && <div className="text-cyan-500">{icon}</div>}
      </div>
      
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-slate-100">{value}</span>
        {trend && (
          <span className={cn(
            "text-xs font-medium",
            trend.isPositive ? "text-severity-low" : "text-severity-high"
          )}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      
      {demo && (
        <span className="absolute bottom-2 right-2 text-[10px] text-slate-600 font-medium tracking-widest uppercase">
          Demo
        </span>
      )}
    </div>
  );
}
