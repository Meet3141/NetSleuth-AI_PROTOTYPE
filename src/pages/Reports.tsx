import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '../components/common/PageHeader';
import { DataTable } from '../components/common/DataTable';
import { reportService } from '../services/reportService';
import type { ForensicReport } from '../types';
import { FileText, Download, X, Eye, FilePlus, ShieldCheck } from 'lucide-react';

export function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ForensicReport[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    reportService.getReports().then(setReports);
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGenerator(false);
    setShowPreview(true);
  };

  const handleDownload = () => {
    // Generate a simple JSON download
    const demoReport = {
      reportId: 'RPT-2026-0017',
      title: 'Potential Data Exfiltration',
      classification: 'DEMO / PROTOTYPE',
      executiveSummary: 'This prototype investigation identified correlated network activity involving host 10.0.2.15 and an external destination. The observed sequence includes DNS activity, external communication and a large outbound transfer. The activity is consistent with potential data exfiltration and requires further validation.',
      sectionsIncluded: ['Executive Summary', 'Timeline', 'Findings', 'MITRE Mapping', 'Evidence', 'Chain of Custody']
    };
    
    const blob = new Blob([JSON.stringify(demoReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NETSLEUTH_REPORT_RPT-2026-0017.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col max-w-7xl mx-auto relative">
      <div className="flex justify-between items-start">
        <PageHeader 
          title="Forensic Reports" 
          subtitle="Generate structured investigation reports from correlated network evidence."
        />
        <button 
          onClick={() => setShowGenerator(true)}
          className="flex items-center gap-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-2"
        >
          <FilePlus size={16} /> Generate Investigation Report
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col glass-panel relative">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <FileText className="text-cyan-400" size={16} />
            Generated Reports
          </h3>
          <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Demo Report</span>
        </div>
        
        <DataTable<ForensicReport>
          data={reports}
          keyExtractor={r => r.id}
          className="flex-1 border-0"
          columns={[
            { key: 'id', header: 'Report ID', render: (val) => (
              <span className="font-mono text-cyan-400 text-xs">{val}</span>
            )},
            { key: 'caseId', header: 'Case', render: (val) => (
              <button 
                onClick={() => navigate(`/investigations/${val}`)}
                className="font-mono text-slate-300 hover:text-cyan-400 hover:underline cursor-pointer text-xs"
              >
                {val}
              </button>
            )},
            { key: 'title', header: 'Title', className: 'font-medium text-slate-200' },
            { key: 'created', header: 'Created', className: 'font-mono text-xs text-slate-500' },
            { key: 'status', header: 'Status', render: (val) => (
              <span className={`text-xs font-medium px-2 py-1 rounded ${val === 'Ready' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>{val}</span>
            )},
            { key: 'format', header: 'Format', className: 'text-xs text-slate-400' },
            { key: 'id', header: 'Actions', render: () => (
              <div className="flex gap-2">
                <button onClick={() => setShowPreview(true)} className="text-slate-400 hover:text-cyan-400 p-1"><Eye size={14} /></button>
                <button onClick={handleDownload} className="text-slate-400 hover:text-cyan-400 p-1"><Download size={14} /></button>
              </div>
            )},
          ]}
        />
      </div>

      {/* Generator Modal */}
      {showGenerator && (
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-950">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Configure Report</h3>
              <button onClick={() => setShowGenerator(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleGenerate} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Case</label>
                <select className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none">
                  <option>CASE-2026-0017 - Potential Data Exfiltration</option>
                  <option>CASE-2026-0018 - Possible DNS Tunneling</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Sections to Include</label>
                <div className="space-y-2 bg-navy-950 p-3 rounded border border-slate-800 text-sm text-slate-300">
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Executive Summary</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Investigation Timeline</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Detection Findings</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Attack Reconstruction</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> MITRE Mapping</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Related Sessions & Artifacts</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Evidence References</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-cyan-500" /> Chain of Custody</label>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Language</label>
                <select className="w-full bg-navy-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none">
                  <option>English</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowGenerator(false)} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-950">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Eye size={16} className="text-cyan-400" /> Report Preview
              </h3>
              <button onClick={() => setShowPreview(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-slate-100 text-slate-900 font-sans">
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Report Header */}
                <div className="text-center border-b-2 border-slate-300 pb-6">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">NETSLEUTH AI</h1>
                  <h2 className="text-xl font-medium text-slate-700 mb-6">NETWORK FORENSIC INVESTIGATION REPORT</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm text-left bg-slate-200 p-4 rounded">
                    <div><span className="font-bold">Case:</span> CASE-2026-0017</div>
                    <div><span className="font-bold">Investigation:</span> Potential Data Exfiltration</div>
                    <div><span className="font-bold">Date Generated:</span> 2026-08-09</div>
                    <div>
                      <span className="font-bold">Classification:</span> 
                      <span className="text-red-600 font-bold ml-1">DEMO / PROTOTYPE</span>
                    </div>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3 text-slate-800">1. Executive Summary</h3>
                    <p className="text-sm leading-relaxed text-slate-700">
                      This prototype investigation identified correlated network activity involving host 10.0.2.15 and an external destination. The observed sequence includes DNS activity, external communication and a large outbound transfer. The activity is consistent with potential data exfiltration and requires further validation.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3 text-slate-800">2. Reconstructed Activity Sequence</h3>
                    <div className="flex items-center gap-2 text-xs font-mono bg-slate-800 text-slate-200 p-3 rounded overflow-x-auto">
                      Initial Network Activity → Suspicious Web Interaction → File Transfer → External Communication → Large Outbound Transfer → Potential Data Exfiltration
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3 text-slate-800">3. Investigation Timeline</h3>
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-200">
                        <tr><th className="p-2">Time</th><th className="p-2">Event</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr><td className="p-2 font-mono text-xs">09:01:12</td><td className="p-2">DNS Query</td></tr>
                        <tr><td className="p-2 font-mono text-xs">09:03:18</td><td className="p-2">HTTP Request</td></tr>
                        <tr><td className="p-2 font-mono text-xs">09:05:41</td><td className="p-2">File Transfer (Artifact)</td></tr>
                        <tr><td className="p-2 font-mono text-xs">10:10:34</td><td className="p-2 text-red-600 font-medium">Large Outbound Transfer</td></tr>
                        <tr><td className="p-2 font-mono text-xs">10:12:43</td><td className="p-2">Detection Finding (DET-001)</td></tr>
                      </tbody>
                    </table>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3 text-slate-800">4. MITRE ATT&CK Mapping</h3>
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-200">
                        <tr><th className="p-2">Tactic</th><th className="p-2">Technique</th><th className="p-2">ID</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr><td className="p-2">Command and Control</td><td className="p-2">Application Layer Protocol: DNS</td><td className="p-2 font-mono">T1071.004</td></tr>
                        <tr><td className="p-2">Exfiltration</td><td className="p-2">Exfiltration Over Alternative Protocol</td><td className="p-2 font-mono">T1048</td></tr>
                      </tbody>
                    </table>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3 text-slate-800">5. Prototype Chain of Custody</h3>
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-200">
                        <tr><th className="p-2">Time</th><th className="p-2">Action</th><th className="p-2">Evidence</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr><td className="p-2 font-mono text-xs">10:15:02</td><td className="p-2">Evidence Selected</td><td className="p-2 font-mono">EVD-001</td></tr>
                        <tr><td className="p-2 font-mono text-xs">10:16:20</td><td className="p-2">Hash Generated</td><td className="p-2 font-mono">EVD-001</td></tr>
                        <tr><td className="p-2 font-mono text-xs">10:17:04</td><td className="p-2 text-green-600 font-medium flex items-center gap-1"><ShieldCheck size={14}/> Evidence Verified</td><td className="p-2 font-mono">EVD-001</td></tr>
                      </tbody>
                    </table>
                  </section>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-navy-950 flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
                Close Preview
              </button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <Download size={16} /> Download JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
