import type { ForensicReport } from '../types';

export const mockReports: ForensicReport[] = [
  {
    id: 'RPT-2026-0017',
    caseId: 'CASE-2026-0017',
    title: 'Potential Data Exfiltration',
    created: '2026-08-08',
    status: 'Ready',
    format: 'PDF / JSON'
  },
  {
    id: 'RPT-2026-0018',
    caseId: 'CASE-2026-0018',
    title: 'Possible DNS Tunneling',
    created: '2026-08-08',
    status: 'Draft',
    format: 'JSON'
  }
];
