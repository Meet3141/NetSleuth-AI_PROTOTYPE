import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

export function WorkflowSteps() {
  const steps = [
    { label: 'PCAP', active: true },
    { label: 'PACKET INTELLIGENCE', active: false },
    { label: 'ANALYSIS', active: false },
    { label: 'CORRELATION', active: false },
    { label: 'INVESTIGATION', active: false },
    { label: 'EVIDENCE', active: false },
  ];

  return (
    <div className="flex items-center justify-center gap-2 py-4 px-6 glass-panel text-[10px] sm:text-xs">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex items-center">
          <div className={cn(
            "px-2 py-1 rounded font-medium tracking-wider",
            step.active ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 glow" : "text-slate-500"
          )}>
            {step.label}
          </div>
          {idx < steps.length - 1 && (
            <ArrowRight className="w-3 h-3 mx-2 text-slate-700" />
          )}
        </div>
      ))}
    </div>
  );
}
