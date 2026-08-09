import { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ProcessingStep } from '../../types';

interface ProcessingTerminalProps {
  steps: ProcessingStep[];
}

export function ProcessingTerminal({ steps }: ProcessingTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [steps]);

  return (
    <div className="glass-panel overflow-hidden flex flex-col h-full border-cyan-500/20">
      <div className="bg-navy-950/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <TerminalIcon size={14} className="text-cyan-500" />
        <span className="text-xs font-mono text-slate-400">netsleuth-engine-v2.1</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 scrollbar-hide"
      >
        {steps.map((step, idx) => {
          if (step.status === 'pending') return null;
          
          return (
            <div key={step.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex gap-3">
                <span className="text-slate-500">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                <span className={cn(
                  "font-medium",
                  step.status === 'completed' ? "text-severity-low" : 
                  step.status === 'active' ? "text-cyan-400" : 
                  "text-severity-critical"
                )}>
                  {step.status === 'active' ? '▶' : step.status === 'completed' ? '✓' : '✗'}
                </span>
                <span className="text-slate-300">
                  {step.status === 'active' ? 'Executing: ' : 'Completed: '}
                  {step.label}
                </span>
              </div>
              
              {step.log && (
                <div className="ml-24 mt-1 text-slate-500 text-[10px]">
                  ↳ {step.log}
                </div>
              )}
            </div>
          );
        })}
        
        {steps.some(s => s.status === 'active') && (
          <div className="flex gap-3 mt-4">
            <span className="text-slate-500">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
            <span className="text-cyan-500 animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
