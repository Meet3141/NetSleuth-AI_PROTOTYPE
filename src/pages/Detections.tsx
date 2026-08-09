import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { DataTable } from '../components/common/DataTable';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { analysisService } from '../services/analysisService';
import { Finding } from '../types';
import { ArrowRight, Shield, Activity, BarChart2, Globe, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

export function Detections() {
  const navigate = useNavigate();
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    analysisService.getFindings().then(setFindings);
  }, []);

  const analysisMethods = [
    { id: 'sig', title: 'Signature Analysis', status: 'Active', desc: 'Matches known suspicious network patterns and indicators.', icon: <Shield className="text-cyan-400" size={20} /> },
    { id: 'beh', title: 'Behavioral Analysis', status: 'Active', desc: 'Identifies unusual communication and traffic behavior.', icon: <Activity className="text-cyan-400" size={20} /> },
    { id: 'stat', title: 'Statistical Analysis', status: 'Active', desc: 'Detects abnormal traffic volumes, frequencies and distributions.', icon: <BarChart2 className="text-cyan-400" size={20} /> },
    { id: 'ti', title: 'Threat Intelligence', status: 'Demo Mode', desc: 'Enriches observed IPs, domains and other indicators.', icon: <Globe className="text-purple-400" size={20} /> },
    { id: 'ai', title: 'AI / ML Analysis', status: 'Prototype', desc: 'Scores anomalous network behavior using simulated ML analysis.', icon: <Cpu className="text-purple-400" size={20} /> },
  ];

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col">
      <PageHeader 
        title="Analysis & Detection" 
        subtitle="Analyze packet intelligence using multiple detection signals."
      />

      {/* Visual Pipeline */}
      <div className="glass-panel p-4 overflow-x-auto flex items-center justify-between gap-2 text-[10px] sm:text-xs font-medium tracking-wider whitespace-nowrap">
        <div className="text-slate-500 px-3 py-1 bg-slate-800/50 rounded border border-slate-700">PACKET INTELLIGENCE</div>
        <ArrowRight size={14} className="text-slate-600" />
        <div className="text-cyan-400 px-3 py-1 bg-cyan-900/30 rounded border border-cyan-800">SIGNATURE</div>
        <ArrowRight size={14} className="text-slate-600" />
        <div className="text-cyan-400 px-3 py-1 bg-cyan-900/30 rounded border border-cyan-800">BEHAVIOR</div>
        <ArrowRight size={14} className="text-slate-600" />
        <div className="text-cyan-400 px-3 py-1 bg-cyan-900/30 rounded border border-cyan-800">STATISTICAL</div>
        <ArrowRight size={14} className="text-slate-600" />
        <div className="text-purple-400 px-3 py-1 bg-purple-900/30 rounded border border-purple-800">THREAT INTELLIGENCE</div>
        <ArrowRight size={14} className="text-slate-600" />
        <div className="text-purple-400 px-3 py-1 bg-purple-900/30 rounded border border-purple-800">AI/ML</div>
        <ArrowRight size={14} className="text-slate-600" />
        <div className="text-red-400 px-3 py-1 bg-red-900/30 rounded border border-red-800 glow shadow-red-500/20">FINDING</div>
      </div>

      {/* Detection Methods Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {analysisMethods.map(method => (
          <div key={method.id} className="glass-panel p-4 relative overflow-hidden flex flex-col group">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded bg-navy-900 border border-slate-700 group-hover:border-cyan-700 transition-colors">
                {method.icon}
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border",
                method.status === 'Active' ? "bg-cyan-900/30 text-cyan-400 border-cyan-800" :
                "bg-purple-900/30 text-purple-400 border-purple-800"
              )}>
                {method.status}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">{method.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{method.desc}</p>
          </div>
        ))}
      </div>

      {/* Findings Table */}
      <div className="flex-1 overflow-hidden flex flex-col glass-panel relative">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">Detection Findings</h3>
          <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase border border-slate-700 px-2 py-0.5 rounded">Demo Findings</span>
        </div>
        
        <DataTable<Finding>
          data={findings}
          keyExtractor={f => f.id}
          className="flex-1 border-0"
          columns={[
            { key: 'id', header: 'ID', render: (val, row) => (
              <button 
                onClick={() => navigate(`/detections/${row.id}`)}
                className="font-mono text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer text-xs"
              >
                {val}
              </button>
            )},
            { key: 'time', header: 'Time', className: 'font-mono text-slate-500 text-xs' },
            { key: 'finding', header: 'Finding', className: 'font-medium text-slate-200' },
            { key: 'category', header: 'Category', className: 'text-slate-400' },
            { key: 'source', header: 'Source', className: 'font-mono text-xs text-slate-300' },
            { key: 'destination', header: 'Destination', className: 'font-mono text-xs text-slate-300 truncate max-w-[150px]' },
            { key: 'severity', header: 'Severity', render: (val) => <SeverityBadge severity={val} /> },
            { key: 'riskScore', header: 'Risk', render: (val) => (
              <div className="flex items-center gap-2">
                <span className={cn("font-mono font-medium", val > 80 ? "text-red-400" : val > 60 ? "text-amber-400" : "text-green-400")}>{val}</span>
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={cn("h-full", val > 80 ? "bg-red-500" : val > 60 ? "bg-amber-500" : "bg-green-500")} style={{ width: `${val}%` }}></div>
                </div>
              </div>
            )},
            { key: 'confidence', header: 'Confidence' },
            { key: 'status', header: 'Status', render: (val) => <StatusBadge status={val} /> },
          ]}
        />
      </div>
    </div>
  );
}
