import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  demo?: boolean;
}

export function ChartCard({ title, children, className, demo = true }: ChartCardProps) {
  return (
    <div className={cn("glass-panel p-5 relative flex flex-col h-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="flex-1 w-full relative">
        {children}
      </div>
      {demo && (
        <span className="absolute top-5 right-5 text-[10px] text-slate-600 font-medium tracking-widest uppercase">
          Demo Data
        </span>
      )}
    </div>
  );
}
