import { InvestigationCase } from '../types';

export const mockInvestigations: InvestigationCase[] = [
  {
    id: 'CASE-2026-0017',
    title: 'Potential Data Exfiltration',
    description: 'Investigation into large outbound data transfer from internal host 10.0.2.15 following suspicious external communication.',
    severity: 'High',
    status: 'Under Investigation',
    created: '2026-08-08 10:15:00',
    lastUpdated: '2026-08-09 10:12:00',
    investigator: 'Analyst',
    tags: ['exfiltration', 'network', 'suspicious-host'],
    primaryHost: '10.0.2.15',
    primaryDestination: '203.0.113.25',
    relatedFindingsCount: 6,
    relatedSessionsCount: 14,
    relatedArtifactsCount: 12,
    relatedDomainsCount: 5,
    timeRange: '09:01:12 - 10:12:43',
    risk: 'HIGH',
    notes: [
      { id: 'n1', timestamp: '2026-08-08 10:20:00', author: 'Analyst', content: 'Outbound transfer requires further validation. Initial volume looks highly anomalous.' },
      { id: 'n2', timestamp: '2026-08-08 10:25:00', author: 'Analyst', content: 'Related DNS activity observed before transfer. Investigating possible C2 beaconing.' }
    ],
    assessment: {
      facts: [
        '10.0.2.15 transferred an unusually large amount of outbound data at 10:10:34.',
        'Prior to the transfer, suspicious payload (payload.exe) was downloaded.',
        'Periodic beaconing observed to 198.51.100.14.'
      ],
      inferences: [
        'The transfer may represent data exfiltration based on the observed communication pattern.',
        'The downloaded payload is likely facilitating the unauthorized connection.'
      ],
      hypotheses: [
        'The destination may be associated with unauthorized external data transfer orchestrated by a compromised internal asset.'
      ]
    }
  },
  {
    id: 'CASE-2026-0018',
    title: 'Possible DNS Tunneling',
    description: 'Investigation into unusual volume of DNS TXT records to suspicious-demo.example.',
    severity: 'High',
    status: 'Open',
    created: '2026-08-08 09:45:00',
    lastUpdated: '2026-08-09 09:32:00',
    investigator: 'Analyst',
    tags: ['dns', 'covert-channel'],
    relatedFindingsCount: 3,
    relatedSessionsCount: 5,
    relatedArtifactsCount: 0,
    relatedDomainsCount: 1,
    timeRange: '09:15:00 - 09:32:00',
    risk: 'MEDIUM',
    notes: [],
    assessment: { facts: [], inferences: [], hypotheses: [] }
  },
  {
    id: 'CASE-2026-0019',
    title: 'Suspicious C2 Activity',
    description: 'Host beaconing to known malicious infrastructure.',
    severity: 'Critical',
    status: 'Open',
    created: '2026-08-08 09:50:00',
    lastUpdated: '2026-08-09 09:45:00',
    investigator: 'Analyst',
    tags: ['c2', 'beaconing'],
    relatedFindingsCount: 4,
    relatedSessionsCount: 7,
    relatedArtifactsCount: 2,
    relatedDomainsCount: 2,
    timeRange: '09:30:00 - 09:45:00',
    risk: 'CRITICAL',
    notes: [],
    assessment: { facts: [], inferences: [], hypotheses: [] }
  }
];
