import { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { evidenceService } from '../services/evidenceService';
import { EvidenceItem } from '../types';
import { Archive, ShieldCheck, Download, Link as LinkIcon, Database, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function Evidence() {
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['EVD-001', 'EVD-003']));
  const [showPackagePreview, setShowPackagePreview] = useState(false);

  useEffect(() => {
    evidenceService.getEvidence().then(items => setEvidenceItems(items));
  }, []);

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleGenerateHash = (id: string) => {
    setEvidenceItems(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, hash: `DEMO-SHA256-${Math.random().toString(36).substring(2, 10)}` };
      }
      return e;
    }));
  };

  const handleVerify = (id: string) => {
    setEvidenceItems(prev => prev.map(e => {
      if (e.id === id) {
        return { 
          ...e, 
          verificationStatus: 'Verified',
          chainOfCustody: [
            ...e.chainOfCustody, 
            { id: `coc-${Date.now()}`, timestamp: new Date().toISOString().substring(11,19), action: 'Evidence Verified', evidenceId: id, user: 'Analyst', status: 'Recorded' }
          ]
        };
      }
      return e;
    }));
  };

  const handleDownload = () => {
    const pkg = {
      packageId: 'PKG-2026-0017',
      caseId: 'CASE-2026-0017',
      timestamp: new Date().toISOString(),
      items: evidenceItems.filter(e => selectedIds.has(e.id))
    };
    const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evidence_package_CASE-2026-0017.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowPackagePreview(false);
  };

  const selectedEvidence = evidenceItems.filter(e => selectedIds.has(e.id));
  const latestCoC = selectedEvidence.flatMap(e => e.chainOfCustody).sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)).slice(0, 10);

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col max-w-[1600px] mx-auto">
      <div className="flex justify-between items-start">
        <PageHeader 
          title="Evidence Management" 
          subtitle="Select, verify and package investigation evidence. Prototype functionality."
        />
        <button 
          onClick={() => setShowPackagePreview(true)}
          disabled={selectedIds.size === 0}
          className="flex items-center gap-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-2"
        >
          <Archive size={16} /> Create Evidence Package
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* LEFT/CENTER: Evidence Selection & Detail */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
          <div className="glass-panel flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Database size={16} className="text-cyan-500" /> Evidence Items
              </h3>
              <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Select for Packaging</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {evidenceItems.map(item => (
                <div key={item.id} className={cn(
                  "p-4 rounded border transition-colors relative",
                  selectedIds.has(item.id) ? "bg-cyan-950/20 border-cyan-800/50" : "bg-navy-900/50 border-slate-800 hover:border-slate-600"
                )}>
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleToggleSelect(item.id)}
                      className={cn(
                        "text-xs px-3 py-1 rounded font-medium border transition-colors",
                        selectedIds.has(item.id) ? "bg-cyan-500 text-cyan-950 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-navy-800 text-slate-400 border-slate-700 hover:text-slate-200"
                      )}
                    >
                      {selectedIds.has(item.id) ? "Selected" : "Select"}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-slate-200">{item.id}</span>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{item.type}</span>
                    {item.verificationStatus === 'Verified' ? (
                      <span className="flex items-center gap-1 text-[10px] text-green-400 border border-green-900/50 bg-green-950/30 px-2 py-0.5 rounded font-medium uppercase tracking-wider">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-amber-400 border border-amber-900/50 bg-amber-950/30 px-2 py-0.5 rounded font-medium uppercase tracking-wider">
                        <Clock size={12} /> Pending Verification
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Source</div>
                      <div className="text-sm font-mono text-cyan-400">{item.source}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Related Case</div>
                      <div className="text-sm font-mono text-slate-300">{item.relatedCaseId}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-slate-500 mb-1">Description</div>
                      <div className="text-sm text-slate-300">{item.description}</div>
                    </div>
                  </div>

                  <div className="bg-navy-950 p-3 rounded border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <ShieldCheck size={12} /> Hash (Prototype)
                      </div>
                      <div className="font-mono text-xs text-slate-300 break-all">{item.hash}</div>
                    </div>
                    <div className="flex gap-2">
                      {item.hash === 'pending...' && (
                        <button onClick={() => handleGenerateHash(item.id)} className="text-xs bg-navy-800 hover:bg-navy-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700">
                          Generate Hash
                        </button>
                      )}
                      {item.verificationStatus !== 'Verified' && (
                        <button onClick={() => handleVerify(item.id)} className="text-xs bg-green-900/30 hover:bg-green-800/50 border border-green-900/50 text-green-400 px-3 py-1.5 rounded transition-colors">
                          Verify Evidence
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Chain of Custody */}
        <div className="glass-panel flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-navy-900/50 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <LinkIcon size={16} className="text-cyan-500" /> Demo Chain of Custody
            </h3>
          </div>
          
          <div className="p-4 bg-navy-950/30 border-b border-slate-800 text-xs text-slate-400">
            Showing latest actions for selected evidence items.
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <div className="relative border-l border-slate-700 ml-3 space-y-6 pb-2">
              {latestCoC.map(event => (
                <div key={event.id} className="relative pl-6">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-navy-950 border-2 border-cyan-500"></div>
                  <div className="bg-navy-900/50 border border-slate-800 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs font-bold text-slate-200">{event.action}</div>
                      <div className="font-mono text-[10px] text-cyan-400">{event.timestamp}</div>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span className="font-mono bg-slate-800 px-1.5 rounded text-slate-300">{event.evidenceId}</span>
                      <span>By: <span className="text-slate-300">{event.user}</span></span>
                    </div>
                  </div>
                </div>
              ))}
              {latestCoC.length === 0 && (
                <div className="text-sm text-slate-500 italic pl-4">Select evidence to view chain of custody.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPackagePreview && (
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-cyan-900 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-950">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Archive size={16} className="text-cyan-400" /> Evidence Package Preview
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6 bg-navy-950 p-4 rounded border border-slate-800">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Package ID</div>
                  <div className="font-mono text-cyan-400 text-lg">PKG-2026-0017</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Related Case</div>
                  <div className="font-mono text-slate-300 text-lg">CASE-2026-0017</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Included Items ({selectedEvidence.length})</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500" /> Evidence Metadata & Hashes</div>
                  <div className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500" /> Original PCAP References</div>
                  <div className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500" /> Extracted Artifacts</div>
                  <div className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500" /> Chain of Custody Log</div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-900/50 p-3 rounded flex items-start gap-3 text-amber-200/80 text-xs leading-relaxed">
                <ShieldCheck size={16} className="shrink-0 text-amber-500 mt-0.5" />
                <p>This is a DEMO PROTOTYPE. Downloading this package will generate a mock JSON file representing the structured metadata of the selected evidence. It does not produce a cryptographically signed, legally admissible zip archive.</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-navy-950 flex justify-end gap-3">
              <button onClick={() => setShowPackagePreview(false)} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <Download size={16} /> Download Demo Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
