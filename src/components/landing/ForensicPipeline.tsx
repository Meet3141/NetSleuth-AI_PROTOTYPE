import { useMemo } from 'react';
import { Activity, Network, Cpu, Share2, Search, Database } from 'lucide-react';
import { PipelineStage, StageData } from './PipelineStage';

const WORKFLOW_STAGES: StageData[] = [
  { step: '01', title: 'Network Traffic', subtext: 'Live & Historical PCAP', icon: Activity },
  { step: '02', title: 'Packet Intelligence', subtext: 'Flows • Sessions • Protocols', icon: Network },
  { step: '03', title: 'Analysis', subtext: 'Detection & AI-Assisted Analysis', icon: Cpu },
  { step: '04', title: 'Correlation', subtext: 'Relationships & Attack Context', icon: Share2 },
  { step: '05', title: 'Investigation', subtext: 'Reconstruct • Pivot • Understand', icon: Search },
  { step: '06', title: 'Evidence & Report', subtext: 'Preserve • Verify • Report', icon: Database },
];

// Generate stable random positions for particles
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  left: `${8 + ((i * 37) % 84)}%`,
  top: `${5 + ((i * 53) % 90)}%`,
  opacity: 0.08 + ((i * 17) % 20) / 100,
  size: i % 3 === 0 ? 2 : 1,
}));

export function ForensicPipeline() {
  return (
    <div className="relative w-full border border-slate-700/50 bg-gradient-to-b from-navy-900/40 to-navy-950/60 rounded-2xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Data particles (decorative, absolute-positioned) */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-500 pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            width: p.size,
            height: p.size,
            boxShadow: p.size > 1 ? '0 0 6px rgba(6,182,212,0.5)' : 'none',
          }}
        />
      ))}

      {/* Pipeline cards — clean vertical flow */}
      <div className="relative z-10 flex flex-col gap-1.5 p-4 lg:p-6">
        {WORKFLOW_STAGES.map((stage, index) => (
          <PipelineStage
            key={index}
            data={stage}
            isLast={index === WORKFLOW_STAGES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
