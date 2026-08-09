import { EvidenceItem } from '../types';

export const mockEvidenceItems: EvidenceItem[] = [
  {
    id: 'EVD-001',
    type: 'Original PCAP',
    source: 'incident_capture_01.pcap',
    relatedCaseId: 'CASE-2026-0017',
    timestamp: '2026-08-08 10:15:02',
    description: 'Original packet capture containing the suspicious activity.',
    originalReference: 'file://evidence/incident_capture_01.pcap',
    hash: 'a3f5b721890e...demo...91c2f7b8a',
    verificationStatus: 'Verified',
    chainOfCustody: [
      { id: 'coc-1', timestamp: '10:15:02', action: 'Evidence Selected', evidenceId: 'EVD-001', user: 'Analyst', status: 'Recorded' },
      { id: 'coc-2', timestamp: '10:16:20', action: 'Hash Generated', evidenceId: 'EVD-001', user: 'Analyst', status: 'Recorded' },
      { id: 'coc-3', timestamp: '10:17:04', action: 'Evidence Verified', evidenceId: 'EVD-001', user: 'Analyst', status: 'Recorded' },
      { id: 'coc-4', timestamp: '10:18:31', action: 'Added to Case', evidenceId: 'EVD-001', user: 'Analyst', status: 'Recorded' }
    ]
  },
  {
    id: 'EVD-002',
    type: 'Session Record',
    source: 'SESSION-031',
    relatedCaseId: 'CASE-2026-0017',
    timestamp: '2026-08-08 10:20:15',
    description: 'Extracted TLS session metadata related to the exfiltration.',
    originalReference: 'SESSION-031',
    hash: 'pending...',
    verificationStatus: 'Pending',
    chainOfCustody: [
      { id: 'coc-5', timestamp: '10:20:15', action: 'Evidence Selected', evidenceId: 'EVD-002', user: 'Analyst', status: 'Recorded' }
    ]
  },
  {
    id: 'EVD-003',
    type: 'Artifact',
    source: 'ART-001',
    relatedCaseId: 'CASE-2026-0017',
    timestamp: '2026-08-08 10:22:11',
    description: 'Extracted configuration payload.',
    originalReference: 'ART-001',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verificationStatus: 'Verified',
    chainOfCustody: [
      { id: 'coc-6', timestamp: '10:22:11', action: 'Evidence Selected', evidenceId: 'EVD-003', user: 'Analyst', status: 'Recorded' },
      { id: 'coc-7', timestamp: '10:25:00', action: 'Hash Generated', evidenceId: 'EVD-003', user: 'Analyst', status: 'Recorded' }
    ]
  },
  {
    id: 'EVD-005',
    type: 'Detection Finding',
    source: 'DET-001',
    relatedCaseId: 'CASE-2026-0017',
    relatedFindingId: 'DET-001',
    timestamp: '2026-08-08 10:30:00',
    description: 'Generated detection finding for Potential Data Exfiltration.',
    originalReference: 'DET-001',
    hash: 'f9c2d11...demo...88b3',
    verificationStatus: 'Verified',
    chainOfCustody: [
      { id: 'coc-8', timestamp: '10:30:00', action: 'Added to Case', evidenceId: 'EVD-005', user: 'System', status: 'Recorded' }
    ]
  }
];
