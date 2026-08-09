import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  FolderOpen, 
  FileBox, 
  Activity, 
  Database, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';

import { dashboardService } from '../services/dashboardService';
import { 
  DashboardMetric, 
  Finding, 
  Case, 
  TrafficPoint, 
  DetectionTrend, 
  ProtocolStatistic 
} from '../types';

import { PageHeader } from '../components/common/PageHeader';
import { MetricCard } from '../components/common/MetricCard';
import { ChartCard } from '../components/common/ChartCard';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { WorkflowSteps } from '../components/common/WorkflowSteps';
import { cn } from '../lib/utils';

const PIE_COLORS = ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe', '#ecfeff'];

export function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetric | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficPoint[]>([]);
  const [detectionTrends, setDetectionTrends] = useState<DetectionTrend[]>([]);
  const [protocols, setProtocols] = useState<ProtocolStatistic[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const [m, f, c, t, d, p] = await Promise.all([
        dashboardService.getMetrics(),
        dashboardService.getRecentFindings(),
        dashboardService.getActiveCase(),
        dashboardService.getTrafficData(),
        dashboardService.getDetectionTrends(),
        dashboardService.getProtocolDistribution()
      ]);
      setMetrics(m);
      setFindings(f);
      setActiveCase(c);
      setTrafficData(t);
      setDetectionTrends(d);
      setProtocols(p);
    };
    loadData();
  }, []);

  if (!metrics) return null; // Simple loading state

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <PageHeader 
          title="Network Forensics Overview" 
          subtitle="Monitor, investigate and preserve network evidence."
        />
        <button 
          onClick={() => navigate('/input')}
          className="flex items-center justify-center gap-2 text-sm font-bold text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] sm:mt-2 uppercase tracking-wider w-full sm:w-auto"
        >
          Run Demo Investigation <ArrowRight size={16} />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard 
          title="ACTIVE THREATS" 
          value={metrics.activeThreats} 
          icon={<ShieldAlert size={20} />} 
          trend={{ value: 15, isPositive: false }}
        />
        <MetricCard 
          title="OPEN INVESTIGATIONS" 
          value={metrics.openInvestigations} 
          icon={<FolderOpen size={20} />} 
        />
        <MetricCard 
          title="PCAPS PROCESSED" 
          value={metrics.pcapsProcessed} 
          icon={<FileBox size={20} />} 
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard 
          title="SUSPICIOUS SESSIONS" 
          value={metrics.suspiciousSessions} 
          icon={<Activity size={20} />} 
        />
        <MetricCard 
          title="EVIDENCE ITEMS" 
          value={metrics.evidenceItems} 
          icon={<Database size={20} />} 
        />
        <MetricCard 
          title="HIGH SEVERITY" 
          value={metrics.highSeverityFindings} 
          icon={<AlertTriangle size={20} />} 
          trend={{ value: 5, isPositive: false }}
          className="border-severity-high/30"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Network Traffic Volume" className="lg:col-span-2">
          <div className="h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#0f1629', borderColor: '#1e293b', color: '#cbd5e1' }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Area type="monotone" dataKey="volume" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Demo Protocol Distribution">
          <div className="h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={protocols}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="percentage"
                stroke="none"
              >
                {protocols.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#0f1629', borderColor: '#1e293b', color: '#cbd5e1' }}
              />
            </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-slate-200">TCP</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Top Protocol</span>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Detection Activity" className="lg:col-span-2">
          <div className="h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={detectionTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#0f1629', borderColor: '#1e293b', color: '#cbd5e1' }}
                cursor={{ fill: '#1e293b', opacity: 0.4 }}
              />
              <Bar dataKey="normal" stackId="a" fill="#0891b2" />
              <Bar dataKey="suspicious" stackId="a" fill="#f59e0b" />
              <Bar dataKey="highRisk" stackId="a" fill="#ef4444" />
            </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        {/* Active Investigation Panel */}
        {activeCase && (
          <div className="glass-panel p-5 flex flex-col h-full border-cyan-500/30 glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>
            
            <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Active Investigation
            </h3>
            
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-xs text-slate-500 font-mono">{activeCase.id}</span>
                <h4 className="text-lg font-semibold text-slate-200 mt-1">{activeCase.title}</h4>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Status</span>
                  <span className="text-cyan-400 font-medium">{activeCase.status}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Primary Host</span>
                  <span className="text-slate-300 font-mono">{activeCase.primaryHost}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Last Activity</span>
                  <span className="text-slate-300">{activeCase.lastActivity}</span>
                </div>
                <div className="flex justify-between text-xs mt-4 pt-2">
                  <div className="text-center px-3 border-r border-slate-800">
                    <span className="block text-slate-500 mb-1">Findings</span>
                    <span className="text-lg font-semibold text-slate-300">{String(activeCase.relatedFindingsCount).padStart(2, '0')}</span>
                  </div>
                  <div className="text-center px-3">
                    <span className="block text-slate-500 mb-1">Evidence</span>
                    <span className="text-lg font-semibold text-slate-300">{String(activeCase.evidenceItemsCount).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/investigations/${activeCase.id}`)}
              className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm rounded transition-colors flex items-center justify-center gap-2"
            >
              Open Investigation
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Findings Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">Recent Findings</h3>
          <span className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">Demo Data</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-900/50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Finding</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Destination</th>
                <th className="px-5 py-3 font-medium">Severity</th>
                <th className="px-5 py-3 font-medium">Confidence</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {findings.map((finding) => (
                <tr 
                  key={finding.id} 
                  className="hover:bg-slate-800/30 cursor-pointer transition-colors"
                  onClick={() => navigate(`/detections/${finding.id}`)}
                >
                  <td className="px-5 py-4 text-slate-400 font-mono text-xs">{finding.time}</td>
                  <td className="px-5 py-4 font-medium text-slate-200">{finding.finding}</td>
                  <td className="px-5 py-4 text-slate-400 font-mono text-xs">{finding.source}</td>
                  <td className="px-5 py-4 text-slate-400 font-mono text-xs">{finding.destination}</td>
                  <td className="px-5 py-4">
                    <SeverityBadge severity={finding.severity} />
                  </td>
                  <td className="px-5 py-4 text-slate-400">{finding.confidence}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={finding.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Workflow visualization */}
      <div className="mt-8 flex justify-center">
        <WorkflowSteps />
      </div>
    </div>
  );
}
