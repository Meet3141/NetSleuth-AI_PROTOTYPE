import { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DataTable } from '../components/common/DataTable';
import { threatIntelService } from '../services/threatIntelService';
import { ThreatIntelRecord } from '../types';
import { cn } from '../lib/utils';
import { Globe } from 'lucide-react';

export function ThreatIntelligence() {
  const [intel, setIntel] = useState<ThreatIntelRecord[]>([]);

  useEffect(() => {
    threatIntelService.getThreatIntel().then(setIntel);
  }, []);

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col">
      <PageHeader 
        title="Threat Intelligence" 
        subtitle="Enrichment data from integrated demo threat feeds."
      />

      <div className="flex-1 overflow-hidden flex flex-col glass-panel relative">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Globe className="text-purple-400" size={16} />
            Demo Enriched Indicators
          </h3>
          <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Demo Threat Intelligence</span>
        </div>
        
        <DataTable<ThreatIntelRecord>
          data={intel}
          keyExtractor={i => i.indicator}
          className="flex-1 border-0"
          columns={[
            { key: 'indicator', header: 'Indicator', className: 'font-mono text-cyan-400 font-medium' },
            { key: 'type', header: 'Type', className: 'text-slate-400 text-xs uppercase' },
            { key: 'reputation', header: 'Reputation', render: (val) => (
              <span className={cn(
                "px-2 py-1 rounded text-xs font-medium border",
                val === 'Malicious' ? "bg-red-900/30 text-red-400 border-red-800/50" : 
                val === 'Suspicious' ? "bg-amber-900/30 text-amber-400 border-amber-800/50" :
                "bg-slate-800 text-slate-400 border-slate-700"
              )}>
                {val}
              </span>
            )},
            { key: 'source', header: 'Source', className: 'text-slate-300' },
            { key: 'firstSeen', header: 'First Seen', className: 'font-mono text-xs text-slate-500' },
            { key: 'lastSeen', header: 'Last Seen', className: 'font-mono text-xs text-slate-500' },
            { key: 'relatedSessions', header: 'Related Sessions', className: 'text-center' },
          ]}
        />
      </div>
    </div>
  );
}
