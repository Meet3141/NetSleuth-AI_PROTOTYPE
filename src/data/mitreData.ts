import type { MitreMapping } from '../types';

export const mockMitreMappings: MitreMapping[] = [
  {
    id: 'm1',
    tactic: 'Command and Control',
    technique: 'Application Layer Protocol: DNS',
    techniqueId: 'T1071.004',
    relatedFindingId: 'DET-002',
    timelineEventTime: '09:32',
    confidence: 'Medium'
  },
  {
    id: 'm2',
    tactic: 'Exfiltration',
    technique: 'Exfiltration Over Alternative Protocol',
    techniqueId: 'T1048',
    relatedFindingId: 'DET-001',
    timelineEventTime: '10:10',
    confidence: 'High'
  },
  {
    id: 'm3',
    tactic: 'Command and Control',
    technique: 'Application Layer Protocol: Web Protocols',
    techniqueId: 'T1071.001',
    relatedFindingId: 'DET-003',
    timelineEventTime: '09:45',
    confidence: 'High'
  }
];
