import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { mitreService } from '../services/mitreService';
import type { MitreMapping } from '../types';
import { Shield, ArrowDown, ExternalLink, Target } from 'lucide-react';
import { cn } from '../lib/utils';

export function Mitre() {
  const navigate = useNavigate();
  const [mappings, setMappings] = useState<MitreMapping[]>([]);

  useEffect(() => {
    mitreService.getMappings().then(setMappings);
  }, []);

  return (
    <div className="space-y-6 pb-8 max-w-7xl mx-auto">
      <PageHeader
        title="MITRE ATT&CK"
        subtitle="Map observed detection findings and reconstructed activity to ATT&CK tactics and techniques."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="glass-panel p-4 text-center border-purple-500/20 relative">
          <div className="absolute top-2 right-2 text-[8px] bg-purple-900/30 text-purple-400 border border-purple-800 px-1 rounded uppercase tracking-widest">Demo</div>
          <div className="text-3xl font-bold text-slate-200 mb-1">2</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tactics Observed</div>
        </div>
        <div className="glass-panel p-4 text-center border-purple-500/20 relative">
          <div className="absolute top-2 right-2 text-[8px] bg-purple-900/30 text-purple-400 border border-purple-800 px-1 rounded uppercase tracking-widest">Demo</div>
          <div className="text-3xl font-bold text-slate-200 mb-1">3</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Techniques Mapped</div>
        </div>
        <div className="glass-panel p-4 text-center border-cyan-500/20">
          <div className="text-3xl font-bold text-slate-200 mb-1">6</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Findings Mapped</div>
        </div>
        <div className="glass-panel p-4 text-center border-cyan-500/20">
          <div className="text-3xl font-bold text-slate-200 mb-1">5</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Attack Chain Steps</div>
        </div>
      </div>

      {/* Tactic Flow */}
      <div className="glass-panel p-6 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2 self-start">
          <Shield size={16} className="text-purple-500" /> Tactic Progression
        </h3>

        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          <div className="bg-navy-900 border border-cyan-800/50 rounded-lg px-6 py-3 text-center w-full shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <div className="text-[10px] font-bold text-cyan-500/60 uppercase tracking-widest mb-1">Command and Control</div>
            <div className="text-sm text-cyan-400 font-medium">DNS-based communication</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">T1071.004</div>
          </div>

          <ArrowDown size={20} className="text-slate-600 my-1" />

          <div className="bg-navy-900 border border-red-900/50 rounded-lg px-6 py-3 text-center w-full shadow-[0_0_15px_rgba(220,38,38,0.15)]">
            <div className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest mb-1">Exfiltration</div>
            <div className="text-sm text-red-400 font-medium">Data transfer / exfiltration behavior</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">T1048</div>
          </div>
        </div>
      </div>

      {/* Technique Mappings Table — full height, always visible */}
      <div className="glass-panel overflow-hidden">
        {/* Table header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Target size={15} className="text-purple-400" />
            Technique Mappings
          </h3>
          <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Demo Mapping</span>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          {mappings.length === 0 ? (
            <div className="p-10 text-center text-slate-500 text-sm">Loading technique mappings...</div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-navy-900/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Tactic</th>
                  <th className="px-4 py-3 font-medium">Technique</th>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Related Finding</th>
                  <th className="px-4 py-3 font-medium">Timeline Event</th>
                  <th className="px-4 py-3 font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {mappings.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-300">{m.tactic}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-200">{m.technique}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900 text-xs">
                        {m.techniqueId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/detections/${m.relatedFindingId}`)}
                        className="flex items-center gap-1 font-mono text-cyan-500 hover:text-cyan-300 hover:underline cursor-pointer text-xs transition-colors"
                      >
                        {m.relatedFindingId} <ExternalLink size={10} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-400">{m.timelineEventTime}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded border",
                        m.confidence === 'High'
                          ? "text-red-400 bg-red-950/30 border-red-900/50"
                          : "text-amber-400 bg-amber-950/30 border-amber-900/50"
                      )}>
                        {m.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
