import { Severity } from '../../types';
import { cn } from '../../lib/utils';

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const colorMap: Record<Severity, string> = {
    Critical: 'bg-severity-critical/20 text-severity-critical border-severity-critical/30',
    High: 'bg-severity-high/20 text-severity-high border-severity-high/30',
    Medium: 'bg-severity-medium/20 text-severity-medium border-severity-medium/30',
    Low: 'bg-severity-low/20 text-severity-low border-severity-low/30',
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded text-xs font-medium border", colorMap[severity], className)}>
      {severity}
    </span>
  );
}
