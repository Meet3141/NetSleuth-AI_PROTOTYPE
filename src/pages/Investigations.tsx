import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { DataTable } from '../components/common/DataTable';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { investigationService } from '../services/investigationService';
import { InvestigationCase } from '../types';
import { FolderPlus, Search, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Investigations() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<InvestigationCase[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    investigationService.getCases().then(setCases);
  }, []);

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: InvestigationCase = {
      id: `CASE-2026-00${Math.floor(Math.random() * 100) + 20}`,
      title: 'New Investigation',
      description: 'Newly created investigation.',
      severity: 'Medium',
      status: 'Open',
      created: new Date().toISOString().replace('T', ' ').substring(0, 19),
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19),
      investigator: 'Analyst',
      tags: ['new'],
      relatedFindingsCount: 0,
      relatedSessionsCount: 0,
      relatedArtifactsCount: 0,
      relatedDomainsCount: 0,
      timeRange: 'N/A',
      risk: 'UNKNOWN',
      notes: [],
      assessment: { facts: [], inferences: [], hypotheses: [] }
    };
    
    setCases([newCase, ...cases]);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col max-w-7xl mx-auto relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <PageHeader 
          title="Investigation Cases" 
          subtitle="Investigate correlated network activity and preserve supporting evidence."
        />
        <button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center justify-center gap-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] sm:mt-2 w-full sm:w-auto"
        >
          <FolderPlus size={16} /> Create Investigation
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col glass-panel relative">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Search className="text-cyan-400" size={16} />
            Active Cases
          </h3>
          <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Prototype Data</span>
        </div>
        
        <DataTable<InvestigationCase>
          data={cases}
          keyExtractor={c => c.id}
          className="flex-1 border-0"
          columns={[
            { key: 'id', header: 'Case ID', render: (val, row) => (
              <button 
                onClick={() => navigate(`/investigations/${row.id}`)}
                className="font-mono text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-xs"
              >
                {val}
              </button>
            )},
            { key: 'title', header: 'Title', className: 'font-medium text-slate-200' },
            { key: 'severity', header: 'Severity', render: (val) => <SeverityBadge severity={val} /> },
            { key: 'status', header: 'Status', render: (val) => <StatusBadge status={val} /> },
            { key: 'created', header: 'Created', className: 'font-mono text-xs text-slate-500' },
            { key: 'lastUpdated', header: 'Last Activity', className: 'font-mono text-xs text-slate-500' },
            { key: 'investigator', header: 'Investigator', className: 'text-slate-400 text-sm' },
            { key: 'relatedFindingsCount', header: 'Findings', className: 'text-center text-slate-300 font-mono text-xs' },
            { key: 'relatedArtifactsCount', header: 'Evidence', className: 'text-center text-slate-300 font-mono text-xs' },
          ]}
        />
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-navy-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-950">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Create Investigation Case</h3>
              <button onClick={() => setShowCreateForm(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateCase} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Case Title</label>
                <input type="text" required className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g. Suspicious Outbound Transfer" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea required rows={3} className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Brief description of the activity..."></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Severity</label>
                  <select className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Assigned Investigator</label>
                  <input type="text" defaultValue="Analyst" className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tags (comma separated)</label>
                <input type="text" placeholder="network, malware, exfiltration" className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none" />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowCreateForm(false)} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
