import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Upload, 
  Cpu, 
  ShieldAlert, 
  Network, 
  Search, 
  FileText, 
  Shield, 
  BarChart, 
  Settings,
  Terminal
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const location = useLocation();

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
      ]
    },
    {
      title: 'TRAFFIC & INTELLIGENCE',
      items: [
        { name: 'Traffic', path: '/traffic', icon: <Activity size={18} /> },
        { name: 'PCAP / Evidence Input', path: '/input', icon: <Upload size={18} /> },
        { name: 'Packet Intelligence', path: '/packet-intelligence', icon: <Cpu size={18} /> },
      ]
    },
    {
      title: 'DETECTION',
      items: [
        { name: 'Detections', path: '/detections', icon: <ShieldAlert size={18} /> },
        { name: 'Correlation', path: '/correlation', icon: <Network size={18} /> },
      ]
    },
    {
      title: 'INVESTIGATION',
      items: [
        { name: 'Investigations', path: '/investigations', icon: <Search size={18} /> },
        { name: 'Evidence', path: '/evidence', icon: <FileText size={18} /> },
        { name: 'MITRE ATT&CK', path: '/mitre', icon: <Shield size={18} /> },
        { name: 'Reports', path: '/reports', icon: <BarChart size={18} /> },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-navy-950 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 mb-1">
          <Terminal size={24} />
          <span className="text-xl font-bold tracking-wider">NETSLEUTH AI</span>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Network & Packet Forensics</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h4 className="px-6 text-xs font-semibold text-slate-500 mb-2 tracking-wider">{group.title}</h4>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-6 py-2.5 text-sm transition-colors",
                        isActive 
                          ? "text-cyan-400 bg-cyan-950/20 border-r-2 border-cyan-500" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 glass-panel">
          <div className="w-2 h-2 rounded-full bg-severity-low animate-pulse"></div>
          <div>
            <p className="text-xs text-slate-300 font-medium">System Operational</p>
            <p className="text-[10px] text-slate-500">Investigator • Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
