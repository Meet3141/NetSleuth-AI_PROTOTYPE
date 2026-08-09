import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { alertService } from '../services/alertService';
import { Alert } from '../types';
import { Activity, Bell, FolderPlus, Layers, Search, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    alertService.getAlerts().then(setAlerts);
  }, []);

  const handleAction = (id: string, action: string) => {
    // In a real app, this would call an API. For demo, we just update local state.
    setAlerts(prev => prev.map(a => {
      if (a.id === id) {
        if (action === 'ack') return { ...a, status: 'Acknowledged' };
        if (action === 'dismiss') return { ...a, status: 'Dismissed' };
      }
      return a;
    }));
    
    if (action === 'case') {
      navigate(`/investigations/CASE-2026-0017`);
    }
  };

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col max-w-7xl mx-auto">
      <PageHeader 
        title="Real-Time Alerts" 
        subtitle="Monitor high-priority detection events and take immediate action."
      />

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-panel p-5 border-l-4 border-l-transparent transition-colors hover:border-cyan-500/50 group" style={{ borderLeftColor: alert.severity === 'Critical' ? '#ef4444' : alert.severity === 'High' ? '#f97316' : alert.severity === 'Medium' ? '#f59e0b' : '#22c55e' }}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-slate-500">{alert.time}</span>
                  <SeverityBadge severity={alert.severity} />
                  {alert.groupedCount && alert.groupedCount > 1 && (
                    <span className="flex items-center gap-1 text-[10px] bg-cyan-900/30 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded font-medium tracking-wider">
                      <Layers size={12} />
                      {alert.groupedCount} SIMILAR EVENTS GROUPED
                    </span>
                  )}
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded font-medium",
                    alert.status === 'New' ? "bg-purple-900/30 text-purple-400" :
                    alert.status === 'Acknowledged' ? "bg-slate-800 text-slate-300" :
                    alert.status === 'Dismissed' ? "bg-transparent text-slate-500 border border-slate-700" :
                    "bg-cyan-900/30 text-cyan-400"
                  )}>{alert.status}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-200 mb-1">{alert.title}</h3>
                <div className="text-sm text-slate-400 flex items-center gap-4">
                  <span><span className="text-slate-500">Source:</span> <span className="font-mono text-cyan-400">{alert.source}</span></span>
                  <span><span className="text-slate-500">Confidence:</span> {alert.confidence}</span>
                  <span className="text-slate-600 font-mono text-xs">ID: {alert.id}</span>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-col justify-end gap-2 shrink-0">
                <button 
                  onClick={() => navigate(`/detections/${alert.id.replace('ALT', 'DET')}`)}
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded transition-colors"
                >
                  <Search size={14} /> View Evidence
                </button>
                {alert.status === 'New' && (
                  <button 
                    onClick={() => handleAction(alert.id, 'ack')}
                    className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded transition-colors"
                  >
                    <Check size={14} /> Acknowledge
                  </button>
                )}
                {alert.status !== 'Dismissed' && (
                  <button 
                    onClick={() => handleAction(alert.id, 'case')}
                    className="flex items-center gap-2 text-xs font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-3 py-2 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  >
                    <FolderPlus size={14} /> Create Case
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
