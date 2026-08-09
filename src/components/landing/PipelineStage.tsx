import { Activity, Network, Cpu, Share2, Search, Database, LucideIcon, CheckCircle2 } from 'lucide-react';

export interface StageData {
  title: string;
  subtext: string;
  icon: LucideIcon;
  step: string;
}

interface PipelineStageProps {
  data: StageData;
  isLast: boolean;
}

export function PipelineStage({ data, isLast }: PipelineStageProps) {
  const Icon = data.icon;

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Step number + vertical connector line */}
      <div className="flex flex-col items-center shrink-0 w-8">
        <span className="text-[10px] font-mono font-bold text-cyan-500 mb-2">{data.step}</span>
        <div className="w-3 h-3 rounded-full border-2 border-cyan-500 bg-navy-950 shadow-[0_0_8px_rgba(6,182,212,0.6)] z-10 group-hover:bg-cyan-500 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-300" />
        {!isLast && (
          <div className="w-px flex-1 min-h-[24px] bg-gradient-to-b from-cyan-500/40 to-slate-700/30 mt-1" />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 bg-navy-950/80 backdrop-blur-sm border border-slate-700/60 rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] group-hover:border-cyan-500/40 group-hover:shadow-[0_8px_24px_rgba(6,182,212,0.1)] transition-all duration-300 relative overflow-hidden"
        style={{
          transform: 'perspective(800px) rotateX(1deg) rotateY(-1deg)',
        }}
      >
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-navy-900 border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:border-cyan-500/40 transition-colors shrink-0">
            <Icon size={14} className="text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest leading-tight">
              {data.title}
            </h3>
            <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
              {data.subtext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
