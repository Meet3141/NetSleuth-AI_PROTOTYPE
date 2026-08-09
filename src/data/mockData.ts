import {
  Finding,
  Case,
  TrafficPoint,
  ProtocolStatistic,
  DashboardMetric,
  DetectionTrend
} from '../types';

export const mockMetrics: DashboardMetric = {
  activeThreats: 12,
  openInvestigations: 4,
  pcapsProcessed: 128,
  suspiciousSessions: 37,
  evidenceItems: 84,
  highSeverityFindings: 7,
};

export const mockFindings: Finding[] = [
  {
    id: 'FND-001',
    time: '10:12:43',
    finding: 'Potential Data Exfiltration',
    source: '10.0.2.15',
    destination: '203.0.113.25',
    severity: 'High',
    confidence: 'High',
    status: 'Investigating',
  },
  {
    id: 'FND-002',
    time: '10:05:11',
    finding: 'Possible DNS Tunneling',
    source: '10.0.2.22',
    destination: 'suspicious-domain.example',
    severity: 'High',
    confidence: 'Medium',
    status: 'New',
  },
  {
    id: 'FND-003',
    time: '09:44:20',
    finding: 'Suspicious C2 Communication',
    source: '10.0.2.31',
    destination: '198.51.100.14',
    severity: 'Critical',
    confidence: 'High',
    status: 'Investigating',
  },
  {
    id: 'FND-004',
    time: '08:15:02',
    finding: 'Unusual Outbound Transfer',
    source: '10.0.2.18',
    destination: '203.0.113.45',
    severity: 'Medium',
    confidence: 'Medium',
    status: 'Review',
  }
];

export const mockActiveCase: Case = {
  id: 'CASE-2026-0017',
  title: 'Potential Data Exfiltration',
  status: 'Under Investigation',
  primaryHost: '10.0.2.15',
  lastActivity: '10:12:43',
  relatedFindingsCount: 6,
  evidenceItemsCount: 12,
};

export const mockTrafficData: TrafficPoint[] = [
  { time: '00:00', volume: 120 },
  { time: '01:00', volume: 80 },
  { time: '02:00', volume: 60 },
  { time: '03:00', volume: 50 },
  { time: '04:00', volume: 70 },
  { time: '05:00', volume: 110 },
  { time: '06:00', volume: 250 },
  { time: '07:00', volume: 400 },
  { time: '08:00', volume: 800 },
  { time: '09:00', volume: 950 },
  { time: '10:00', volume: 850 },
  { time: '11:00', volume: 900 },
  { time: '12:00', volume: 920 },
];

export const mockDetectionTrends: DetectionTrend[] = [
  { time: '00:00', normal: 110, suspicious: 5, highRisk: 0 },
  { time: '02:00', normal: 55, suspicious: 2, highRisk: 0 },
  { time: '04:00', normal: 60, suspicious: 8, highRisk: 1 },
  { time: '06:00', normal: 200, suspicious: 15, highRisk: 2 },
  { time: '08:00', normal: 700, suspicious: 45, highRisk: 5 },
  { time: '10:00', normal: 750, suspicious: 80, highRisk: 15 },
  { time: '12:00', normal: 800, suspicious: 60, highRisk: 10 },
];

export const mockProtocols: ProtocolStatistic[] = [
  { protocol: 'TCP', percentage: 45 },
  { protocol: 'UDP', percentage: 20 },
  { protocol: 'TLS', percentage: 15 },
  { protocol: 'HTTP', percentage: 10 },
  { protocol: 'DNS', percentage: 5 },
  { protocol: 'FTP', percentage: 3 },
  { protocol: 'ICMP', percentage: 2 },
];
