import { Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function TopHeader() {
  const location = useLocation();
  
  // Convert path to title
  const getPageTitle = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'Dashboard';
    
    const page = segments[0];
    return page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const title = getPageTitle(location.pathname);

  return (
    <header className="h-16 bg-navy-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-semibold text-slate-200 hidden sm:block min-w-[200px]">
          {title}
        </h2>
        
        <div className="max-w-md w-full relative group hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-slate-700 rounded-md leading-5 bg-navy-950/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
            placeholder="Search IPs, domains, sessions, findings, cases..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-severity-high animate-pulse"></div>
          <span className="text-xs font-bold text-severity-high tracking-wider">LIVE / DEMO MODE</span>
        </div>
        
        <button className="relative text-slate-400 hover:text-slate-200 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border border-navy-900"></span>
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-200">Investigator</p>
            <p className="text-[10px] text-cyan-400 font-medium tracking-wider">ANALYST</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-cyan-900/50 border border-cyan-700 flex items-center justify-center text-cyan-400 font-bold">
            IN
          </div>
        </div>
      </div>
    </header>
  );
}
