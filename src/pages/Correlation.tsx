import { useState, useEffect, useMemo } from 'react';
import { ReactFlow, Background, Controls, MarkerType, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PageHeader } from '../components/common/PageHeader';
import { correlationService } from '../services/correlationService';
import { TimelineEvent, AttackChainStep } from '../types';
import { Network, Filter, ArrowRight, ShieldAlert, Cpu, Activity, Database, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function Correlation() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [attackChain, setAttackChain] = useState<AttackChainStep[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const graph = await correlationService.getCorrelationGraph();
      const tl = await correlationService.getTimeline();
      const ac = await correlationService.getAttackChain();
      
      // Transform mock data to ReactFlow format
      const rfNodes: Node[] = graph.nodes.map((n, i) => {
        // Simple manual layout for the demo graph
        const x = 100 + (i % 2) * 200;
        const y = 50 + i * 100;
        
        let bgColor = '#1e293b'; // slate-800
        let borderColor = '#334155'; // slate-700
        let icon = null;
        
        if (n.type === 'Host') { bgColor = '#0f172a'; borderColor = '#3b82f6'; icon = <Cpu size={14} className="text-blue-400" />; }
        if (n.type === 'Session') { bgColor = '#0f172a'; borderColor = '#8b5cf6'; icon = <Activity size={14} className="text-purple-400" />; }
        if (n.type === 'Domain' || n.type === 'IP') { 
          bgColor = '#0f172a'; 
          borderColor = n.status === 'suspicious' ? '#f59e0b' : '#334155';
          icon = <Network size={14} className={n.status === 'suspicious' ? "text-amber-400" : "text-slate-400"} />;
        }
        if (n.type === 'Finding') { bgColor = '#450a0a'; borderColor = '#ef4444'; icon = <ShieldAlert size={14} className="text-red-400" />; }
        if (n.type === 'Artifact') { bgColor = '#0f172a'; borderColor = '#10b981'; icon = <Database size={14} className="text-green-400" />; }

        return {
          id: n.id,
          position: { x, y },
          data: { 
            label: (
              <div className="flex flex-col items-center p-1">
                <div className="flex items-center gap-1 mb-1">
                  {icon}
                  <span className="text-[9px] uppercase text-slate-400 tracking-wider font-semibold">{n.type}</span>
                </div>
                <div className="text-xs font-medium text-slate-200">{n.label}</div>
                {n.subLabel && <div className="text-[10px] text-slate-500 mt-0.5">{n.subLabel}</div>}
              </div>
            )
          },
          style: {
            background: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '6px',
            padding: '4px 8px',
            minWidth: '150px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
            color: '#e2e8f0',
          }
        };
      });

      const rfEdges: Edge[] = graph.edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        labelStyle: { fill: '#94a3b8', fontSize: 10, fontWeight: 500 },
        labelBgStyle: { fill: '#0a0f1c', fillOpacity: 0.8 },
        style: { stroke: '#475569', strokeWidth: 1.5 },
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: '#475569',
        },
      }));

      setNodes(rfNodes);
      setEdges(rfEdges);
      setTimeline(tl);
      setAttackChain(ac);
    };
    
    loadData();
  }, []);

  const correlationTypes = [
    'Finding Correlation', 'Alert Correlation', 'Session Correlation', 
    'Flow Correlation', 'IOC Correlation', 'Artifact Correlation'
  ];

  return (
    <div className="space-y-4 pb-6 flex flex-col max-w-[1600px] mx-auto">
      <PageHeader 
        title="Correlation Engine" 
        subtitle="Connect findings, sessions, hosts, domains and artifacts into an investigation context."
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        
        {/* Left Side Panel — shown above graph on mobile */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          <div className="glass-panel p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter size={16} className="text-cyan-500" /> Correlation Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {correlationTypes.map(t => (
                <span key={t} className="px-2.5 py-1 text-[10px] bg-navy-800 text-slate-400 border border-slate-700 rounded-full hover:bg-cyan-900/30 hover:text-cyan-400 hover:border-cyan-800 transition-colors cursor-pointer">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="glass-panel p-5 flex-1">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" /> Correlation Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Related Findings</span>
                <span className="text-slate-200 font-semibold">6</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Related Sessions</span>
                <span className="text-slate-200 font-semibold">14</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Related Hosts</span>
                <span className="text-slate-200 font-semibold">3</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Related Domains</span>
                <span className="text-slate-200 font-semibold">5</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Related Artifacts</span>
                <span className="text-slate-200 font-semibold">12</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2 mt-4">
                <span className="text-slate-500">Time Span</span>
                <span className="text-cyan-400 font-mono text-xs">09:01 → 10:12</span>
              </div>
              <div className="flex justify-between items-center mt-4 bg-red-950/30 p-3 rounded border border-red-900/50">
                <span className="text-red-400 font-medium">Overall Risk</span>
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">HIGH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Area */}
        <div className="col-span-full lg:col-span-3 flex flex-col gap-4">
          <div className="glass-panel relative overflow-hidden" style={{ height: 'clamp(350px, 50vh, 600px)' }}>
            {nodes.length > 0 && (
              <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                fitView 
                className="bg-navy-950/50"
                minZoom={0.5}
                maxZoom={2}
              >
                <Background color="#1e293b" gap={20} size={1} />
                <Controls className="bg-navy-900 border-slate-700 fill-slate-300" />
              </ReactFlow>
            )}
            <div className="absolute top-4 right-4 bg-navy-900/80 backdrop-blur border border-slate-700 px-3 py-1.5 rounded text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Demo Graph
            </div>
          </div>
          
          {/* Timeline & Attack Chain */}
          <div className="glass-panel p-4 flex flex-col gap-4">
            <div>
              <h4 className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mb-2">Demo Attack Reconstruction</h4>
              <div className="flex flex-wrap items-center gap-2">
                {attackChain.map((step, idx) => (
                  <div key={step.id} className="flex items-center">
                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-navy-800 text-slate-300 border border-slate-700">
                      {step.label}
                    </span>
                    {idx < attackChain.length - 1 && <ArrowRight size={12} className="text-cyan-600 mx-1" />}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-3">
              <h4 className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mb-2">Event Timeline</h4>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {timeline.map(event => (
                  <div key={event.id} className="flex-shrink-0 w-48 bg-navy-900/50 border border-slate-800 p-2 rounded cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <div className="text-xs font-mono text-cyan-400 mb-1">{event.time}</div>
                    <div className="text-xs text-slate-300 line-clamp-2 leading-snug">{event.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
