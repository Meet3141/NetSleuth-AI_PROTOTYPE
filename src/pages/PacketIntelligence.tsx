import { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DataTable, Column } from '../components/common/DataTable';
import { pcapService } from '../services/pcapService';
import { cn } from '../lib/utils';
import { 
  Flow, Session, DNSQuery, HTTPRequest, TLSSession, ExtractedArtifact 
} from '../types';
import { Download, ExternalLink, Network, FileCode, Shield } from 'lucide-react';

type Tab = 'flows' | 'sessions' | 'dns' | 'http' | 'tls' | 'artifacts';

export function PacketIntelligence() {
  const [activeTab, setActiveTab] = useState<Tab>('flows');
  const [data, setData] = useState<{
    flows: Flow[];
    sessions: Session[];
    dns: DNSQuery[];
    http: HTTPRequest[];
    tls: TLSSession[];
    artifacts: ExtractedArtifact[];
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const piData = await pcapService.getPacketIntelligence();
      setData(piData);
    };
    loadData();
  }, []);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'flows', label: 'Flows', count: data?.flows.length || 0 },
    { id: 'sessions', label: 'Sessions', count: data?.sessions.length || 0 },
    { id: 'dns', label: 'DNS', count: data?.dns.length || 0 },
    { id: 'http', label: 'HTTP', count: data?.http.length || 0 },
    { id: 'tls', label: 'TLS', count: data?.tls.length || 0 },
    { id: 'artifacts', label: 'Artifacts', count: data?.artifacts.length || 0 },
  ];

  if (!data) return null; // loading

  return (
    <div className="space-y-6 pb-6 h-[calc(100vh-6rem)] flex flex-col">
      <PageHeader 
        title="Packet Intelligence" 
        subtitle="Deep packet inspection and protocol artifact extraction results."
        action={
          <button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-slate-300 border border-slate-700 px-4 py-2 rounded text-sm transition-colors">
            <Download size={16} />
            Export PCAP
          </button>
        }
      />

      <div className="flex border-b border-slate-800 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === tab.id 
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/5" 
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-navy-900/50"
            )}
          >
            {tab.label}
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              activeTab === tab.id ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800 text-slate-500"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'flows' && (
          <DataTable<Flow>
            data={data.flows}
            keyExtractor={f => f.id}
            className="flex-1"
            columns={[
              { key: 'sourceIpv4', header: 'Source', render: (val, row) => <span className="font-mono text-cyan-400">{val}:{row.sourcePort}</span> },
              { key: 'destIpv4', header: 'Destination', render: (val, row) => <span className="font-mono text-cyan-400">{val}:{row.destPort}</span> },
              { key: 'protocol', header: 'Protocol', className: 'font-medium' },
              { key: 'packets', header: 'Packets' },
              { key: 'bytes', header: 'Bytes', render: (v) => (v / 1024).toFixed(1) + ' KB' },
              { key: 'duration', header: 'Duration' },
            ]}
          />
        )}

        {activeTab === 'sessions' && (
          <DataTable<Session>
            data={data.sessions}
            keyExtractor={s => s.id}
            className="flex-1"
            columns={[
              { key: 'protocol', header: 'Protocol', render: (val) => <span className="text-purple-400 font-medium">{val}</span> },
              { key: 'client', header: 'Client', className: 'font-mono' },
              { key: 'server', header: 'Server', className: 'font-mono' },
              { key: 'state', header: 'State', render: (val) => (
                <span className={cn("text-xs px-2 py-1 rounded", val === 'ESTABLISHED' ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-300")}>
                  {val}
                </span>
              )},
              { key: 'info', header: 'Info', className: 'text-slate-400 truncate max-w-md' },
            ]}
          />
        )}

        {activeTab === 'dns' && (
          <DataTable<DNSQuery>
            data={data.dns}
            keyExtractor={d => d.id}
            className="flex-1"
            columns={[
              { key: 'time', header: 'Time', className: 'font-mono text-slate-500' },
              { key: 'source', header: 'Source', className: 'font-mono text-cyan-400' },
              { key: 'recordType', header: 'Type' },
              { key: 'domain', header: 'Domain', className: 'font-medium text-slate-200' },
              { key: 'resolvedIps', header: 'Resolved IPs', render: (val: string[]) => (
                <div className="flex gap-1 flex-wrap">
                  {val.map(ip => <span key={ip} className="font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">{ip}</span>)}
                </div>
              )},
            ]}
          />
        )}

        {activeTab === 'http' && (
          <DataTable<HTTPRequest>
            data={data.http}
            keyExtractor={h => h.id}
            className="flex-1"
            columns={[
              { key: 'time', header: 'Time', className: 'font-mono text-slate-500' },
              { key: 'method', header: 'Method', render: (val) => (
                <span className={cn("font-bold", val === 'GET' ? 'text-blue-400' : val === 'POST' ? 'text-green-400' : 'text-slate-400')}>{val}</span>
              )},
              { key: 'host', header: 'Host', className: 'font-medium text-slate-200' },
              { key: 'uri', header: 'URI', className: 'font-mono text-slate-400 truncate max-w-[200px]' },
              { key: 'statusCode', header: 'Status', render: (val) => (
                <span className={cn("font-mono", val >= 400 ? 'text-red-400' : 'text-green-400')}>{val}</span>
              )},
              { key: 'userAgent', header: 'User Agent', className: 'text-xs text-slate-500 truncate max-w-[250px]' },
            ]}
          />
        )}

        {activeTab === 'tls' && (
          <DataTable<TLSSession>
            data={data.tls}
            keyExtractor={t => t.id}
            className="flex-1"
            columns={[
              { key: 'time', header: 'Time', className: 'font-mono text-slate-500' },
              { key: 'source', header: 'Source', className: 'font-mono text-cyan-400' },
              { key: 'serverName', header: 'SNI / Server Name', className: 'font-medium' },
              { key: 'version', header: 'Version', className: 'text-purple-400' },
              { key: 'cipherSuite', header: 'Cipher Suite', className: 'font-mono text-xs text-slate-400' },
              { key: 'issuer', header: 'Issuer', className: 'text-slate-300' },
            ]}
          />
        )}

        {activeTab === 'artifacts' && (
          <DataTable<ExtractedArtifact>
            data={data.artifacts}
            keyExtractor={a => a.id}
            className="flex-1"
            columns={[
              { key: 'time', header: 'Time', className: 'font-mono text-slate-500' },
              { key: 'source', header: 'Source IP', className: 'font-mono text-cyan-400' },
              { key: 'filename', header: 'Filename', render: (val) => (
                <span className="flex items-center gap-2 font-medium text-amber-400"><FileCode size={14} />{val}</span>
              )},
              { key: 'type', header: 'MIME Type', className: 'text-slate-400' },
              { key: 'size', header: 'Size' },
              { key: 'hash', header: 'SHA-256', className: 'font-mono text-[10px] text-slate-500 max-w-[150px] truncate' },
              { key: 'actions', header: '', render: () => (
                <button className="text-cyan-500 hover:text-cyan-400"><Download size={16} /></button>
              )},
            ]}
          />
        )}
      </div>
    </div>
  );
}
