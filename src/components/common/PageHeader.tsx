import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  demoBadge?: boolean;
}

export function PageHeader({ title, subtitle, action, demoBadge = true }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">{title}</h1>
          {demoBadge && (
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Demo Environment
            </span>
          )}
        </div>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
  );
}
