import { PageHeader } from '../components/common/PageHeader';
import { Settings as SettingsIcon, AlertTriangle, RotateCcw } from 'lucide-react';

export function Settings() {
  const handleReset = () => {
    if (confirm("Reset Demo Data? This will restore all prototype states to their original configuration.")) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto">
      <PageHeader 
        title="System Settings" 
        subtitle="Manage prototype configuration and data states."
      />

      <div className="glass-panel p-6 space-y-8">
        
        <div className="bg-amber-900/10 border border-amber-900/50 rounded-lg p-5 flex gap-4">
          <AlertTriangle size={24} className="text-amber-500 shrink-0" />
          <div className="text-sm">
            <h4 className="text-amber-500 font-bold mb-2">PROTOTYPE LIMITATIONS</h4>
            <p className="text-amber-200/80 leading-relaxed">
              This prototype demonstrates the intended forensic workflow using simulated network intelligence, detections, threat intelligence, AI assistance and evidence workflows. 
              Production deployment will connect these interfaces to live packet acquisition, protocol analysis, ML inference, threat-intelligence services and persistent forensic storage.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <SettingsIcon size={16} className="text-cyan-500" /> Demo Management
          </h3>
          <div className="bg-navy-900/50 p-4 rounded border border-slate-800 flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-slate-200">Reset Demo State</div>
              <div className="text-xs text-slate-400 mt-1">Restore the prototype data to its original un-investigated state. Useful for restarting a presentation.</div>
            </div>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 rounded transition-colors uppercase tracking-widest shrink-0"
            >
              <RotateCcw size={14} /> Reset Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
