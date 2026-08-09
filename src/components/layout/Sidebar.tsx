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
  Terminal,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
        { name: 'Alerts', path: '/alerts', icon: <Activity size={18} /> },
        { name: 'Threat Intelligence', path: '/threat-intelligence', icon: <Network size={18} /> },
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
    <aside
      className={cn(
        "w-64 bg-navy-950 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out",
        // Desktop: always visible
        "md:translate-x-0",
        // Mobile: slide in/out
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Terminal size={24} />
            <span className="text-xl font-bold tracking-wider">NETSLEUTH AI</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Network & Packet Forensics</p>
        </div>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="md:hidden p-1 text-slate-500 hover:text-slate-200 transition-colors -mt-1 -mr-2"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Items */}
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
                      onClick={onClose}
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

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 glass-panel">
          <div className="w-2 h-2 rounded-full bg-severity-low animate-pulse shrink-0"></div>
          <div className="min-w-0">
            <p className="text-xs text-slate-300 font-medium truncate">System Operational</p>
            <p className="text-[10px] text-slate-500 truncate">Investigator • Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
