import { CorrelationNode, CorrelationEdge, TimelineEvent, AttackChainStep } from '../types';

export const mockCorrelationNodes: CorrelationNode[] = [
  { id: 'host-1', type: 'Host', label: '10.0.2.15', subLabel: 'Internal Asset' },
  { id: 'session-1', type: 'Session', label: 'SESSION-031', subLabel: 'TLSv1.3' },
  { id: 'domain-1', type: 'Domain', label: 'suspicious-demo.example', status: 'suspicious' },
  { id: 'ip-1', type: 'IP', label: '203.0.113.25', status: 'suspicious' },
  { id: 'finding-1', type: 'Finding', label: 'Potential Data Exfiltration', status: 'critical' },
  { id: 'artifact-1', type: 'Artifact', label: 'payload.exe', subLabel: 'File / Hash' },
];

export const mockCorrelationEdges: CorrelationEdge[] = [
  { id: 'e1', source: 'host-1', target: 'session-1', label: 'initiated' },
  { id: 'e2', source: 'session-1', target: 'domain-1', label: 'queried' },
  { id: 'e3', source: 'domain-1', target: 'ip-1', label: 'resolves to' },
  { id: 'e4', source: 'session-1', target: 'ip-1', label: 'connected to' },
  { id: 'e5', source: 'ip-1', target: 'finding-1', label: 'triggered' },
  { id: 'e6', source: 'finding-1', target: 'artifact-1', label: 'extracted' },
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: 't1', time: '09:01:12', description: 'DNS query to suspicious-demo.example', type: 'dns' },
  { id: 't2', time: '09:03:18', description: 'HTTP request to 203.0.113.25', type: 'http' },
  { id: 't3', time: '09:05:41', description: 'Suspicious payload download (payload.exe)', type: 'artifact' },
  { id: 't4', time: '09:08:12', description: 'Periodic external communication started', type: 'behavior' },
  { id: 't5', time: '10:10:34', description: 'Large outbound transfer (1.02 MB)', type: 'flow' },
  { id: 't6', time: '10:12:43', description: 'Potential exfiltration finding generated', type: 'finding' },
];

export const mockAttackChain: AttackChainStep[] = [
  { id: 'ac1', label: 'INITIAL NETWORK ACTIVITY' },
  { id: 'ac2', label: 'SUSPICIOUS COMMUNICATION' },
  { id: 'ac3', label: 'PERSISTENT EXTERNAL CONNECTION' },
  { id: 'ac4', label: 'DATA ACCESS / TRANSFER' },
  { id: 'ac5', label: 'OUTBOUND TRANSFER' },
  { id: 'ac6', label: 'POTENTIAL EXFILTRATION' },
];
