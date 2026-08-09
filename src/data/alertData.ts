import { Alert } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    time: '10:12:43',
    title: 'Potential Data Exfiltration',
    severity: 'High',
    confidence: 'High',
    source: '10.0.2.15',
    status: 'New',
    groupedCount: 5
  },
  {
    id: 'ALT-002',
    time: '09:45:22',
    title: 'Suspicious C2 Communication',
    severity: 'Critical',
    confidence: 'High',
    source: '10.0.2.31',
    status: 'Investigating',
    groupedCount: 12
  },
  {
    id: 'ALT-003',
    time: '09:32:11',
    title: 'Possible DNS Tunneling',
    severity: 'High',
    confidence: 'Medium',
    source: '10.0.2.22',
    status: 'New',
    groupedCount: 2
  },
  {
    id: 'ALT-004',
    time: '08:15:02',
    title: 'Suspicious Network Activity',
    severity: 'Medium',
    confidence: 'Low',
    source: '10.0.2.18',
    status: 'Dismissed',
    groupedCount: 1
  }
];
