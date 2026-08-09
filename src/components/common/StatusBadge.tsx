import { FindingStatus } from '../../types';
import { cn } from '../../lib/utils';

export function StatusBadge({ status, className }: { status: FindingStatus | string; className?: string }) {
  const isInvestigating = status === 'Investigating' || status === 'Under Investigation';
  const isNew = status === 'New';
  
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded text-xs font-medium border",
      isInvestigating ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : 
      isNew ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
      "bg-slate-500/20 text-slate-400 border-slate-500/30",
      className
    )}>
      {status}
    </span>
  );
}
