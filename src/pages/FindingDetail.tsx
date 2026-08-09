import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { analysisService } from '../services/analysisService';
import { Finding } from '../types';
import { ArrowLeft, Target, Shield, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

export function FindingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [finding, setFinding] = useState<Finding | null>(null);

  useEffect(() => {
    if (id) {
      analysisService.getFindingById(id).then(setFinding);
    }
  }, [id]);

  if (!finding) return <div className="p-6 text-slate-400">Loading finding...</div>;

  const evidenceChecks = [
    { label: 'Signature', checked: finding.detectionMethods?.includes('Signature') },
    { label: 'Behavior', checked: finding.detectionMethods?.includes('Behavioral') },
    { label: 'Statistical', checked: finding.detectionMethods?.includes('Statistical') },
    { label: 'Threat Intelligence', checked: finding.detectionMethods?.includes('Threat Intelligence') },
    { label: 'AI/ML', checked: finding.detectionMethods?.includes('AI/ML') },
  ];

  return (
    <div className="space-y-6 pb-6 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate('/detections')}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Detections
      </button>

      <PageHeader 
        title={finding.finding} 
        subtitle={finding.id}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Description</h3>
            <p className="text-slate-300 leading-relaxed mb-6">{finding.description}</p>
            
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Explanation (Prototype Generated)</h3>
            <div className="bg-navy-950 p-4 rounded border border-slate-800 text-slate-300 italic">
              "{finding.explanation}"
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Forensic Traceability</h3>
            <div className="text-sm text-slate-400 mb-4">This finding was correlated from the following extracted network elements:</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 border border-slate-800 rounded p-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Related Sessions</span>
                {finding.relatedSessions?.length ? finding.relatedSessions.map(s => (
                  <div key={s} className="font-mono text-cyan-400 text-sm hover:underline cursor-pointer">{s}</div>
                )) : <div className="text-slate-600 italic">None</div>}
              </div>
              
              <div className="space-y-2 border border-slate-800 rounded p-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Related Flows</span>
                {finding.relatedFlows?.length ? finding.relatedFlows.map(f => (
                  <div key={f} className="font-mono text-cyan-400 text-sm hover:underline cursor-pointer">{f}</div>
                )) : <div className="text-slate-600 italic">None</div>}
              </div>
              
              <div className="space-y-2 border border-slate-800 rounded p-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Related Artifacts</span>
                {finding.relatedArtifacts?.length ? finding.relatedArtifacts.map(a => (
                  <div key={a} className="font-mono text-cyan-400 text-sm hover:underline cursor-pointer">{a}</div>
                )) : <div className="text-slate-600 italic">None</div>}
              </div>
              
              <div className="space-y-2 border border-slate-800 rounded p-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Related IOCs</span>
                {finding.relatedIOCs?.length ? finding.relatedIOCs.map(ioc => (
                  <div key={ioc} className="font-mono text-cyan-400 text-sm hover:underline cursor-pointer">{ioc}</div>
                )) : <div className="text-slate-600 italic">None</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400">Severity</span>
              <SeverityBadge severity={finding.severity} />
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400">Status</span>
              <StatusBadge status={finding.status} />
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Risk Score</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Prototype</span>
              </div>
              <span className={cn("font-bold text-lg", (finding.riskScore || 0) > 80 ? "text-red-400" : "text-amber-400")}>
                {finding.riskScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Confidence</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Prototype</span>
              </div>
              <span className="font-medium text-slate-200">{finding.confidence}</span>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target size={16} className="text-cyan-500" />
              Detection Evidence
            </h3>
            <div className="space-y-3">
              {evidenceChecks.map(check => (
                <div key={check.label} className="flex justify-between items-center text-sm">
                  <span className={check.checked ? "text-slate-200 font-medium" : "text-slate-500"}>{check.label}</span>
                  {check.checked ? (
                    <CheckCircle2 size={16} className="text-cyan-500" />
                  ) : (
                    <Circle size={16} className="text-slate-700" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 border-cyan-500/20">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield size={16} className="text-purple-400" />
              MITRE ATT&CK Mapping
            </h3>
            {finding.mitreTechnique ? (
              <div className="bg-purple-900/20 border border-purple-900/50 p-3 rounded text-sm text-purple-200">
                {finding.mitreTechnique}
              </div>
            ) : (
              <div className="text-sm text-slate-500 italic">No mapping available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
