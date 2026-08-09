import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { DataTable } from '../components/common/DataTable';
import { mitreService } from '../services/mitreService';
import type { MitreMapping } from '../types';
import { Shield, ArrowDown, ExternalLink } from 'lucide-react';

export function Mitre() {
  const navigate = useNavigate();
  const [mappings, setMappings] = useState<MitreMapping[]>([]);

  useEffect(() => {
    mitreService.getMappings().then(setMappings);
  }, []);

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col max-w-7xl mx-auto">
      <PageHeader 
        title="MITRE ATT&CK" 
        subtitle="Map observed detection findings and reconstructed activity to ATT&CK tactics and techniques."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-8 flex items-center gap-2 self-start">
          <Shield size={16} className="text-purple-500" /> Tactic Progression
        </h3>
        
        <div className="flex flex-col items-center gap-2">
          <div className="bg-navy-900 border border-slate-700 rounded px-6 py-3 text-center min-w-[250px]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Command and Control</div>
            <div className="text-sm text-cyan-400 font-medium">DNS-based communication</div>
          </div>
          
          <ArrowDown size={24} className="text-slate-600 my-2" />
          
          <div className="bg-navy-900 border border-slate-700 rounded px-6 py-3 text-center min-w-[250px] shadow-[0_0_15px_rgba(220,38,38,0.15)] border-red-900/50">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Exfiltration</div>
            <div className="text-sm text-red-400 font-medium">Data transfer / exfiltration behavior</div>
          </div>
        </div>
      </div>

      {/* Technique Table */}
      <div className="flex-1 overflow-hidden flex flex-col glass-panel relative">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">Technique Mappings</h3>
          <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Demo Mapping</span>
        </div>
        
        <DataTable<MitreMapping>
          data={mappings}
          keyExtractor={m => m.id}
          className="flex-1 border-0"
          columns={[
            { key: 'tactic', header: 'Tactic', className: 'font-medium text-slate-300' },
            { key: 'technique', header: 'Technique', className: 'text-slate-200' },
            { key: 'techniqueId', header: 'ID', render: (val) => (
              <span className="font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900">{val}</span>
            )},
            { key: 'relatedFindingId', header: 'Related Finding', render: (val) => (
              <button 
                onClick={() => navigate(`/detections/${val}`)}
                className="flex items-center gap-1 font-mono text-cyan-500 hover:text-cyan-400 hover:underline cursor-pointer text-xs"
              >
                {val} <ExternalLink size={10} />
              </button>
            )},
            { key: 'timelineEventTime', header: 'Timeline Event', className: 'font-mono text-xs text-slate-400' },
            { key: 'confidence', header: 'Confidence', render: (val) => (
              <span className={`text-xs font-medium ${val === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{val}</span>
            )},
          ]}
        />
      </div>
    </div>
  );
}
