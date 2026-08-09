import { ThreatIntelRecord } from '../types';

export const mockThreatIntel: ThreatIntelRecord[] = [
  {
    indicator: '198.51.100.14',
    type: 'IP',
    reputation: 'Malicious',
    source: 'Demo Threat Feed (C2 Tracker)',
    firstSeen: '2026-08-01 04:12:00',
    lastSeen: '2026-08-09 10:12:43',
    relatedSessions: 14
  },
  {
    indicator: 'suspicious-demo.example',
    type: 'Domain',
    reputation: 'Suspicious',
    source: 'Demo Intel (DGA Algorithm)',
    firstSeen: '2026-08-08 09:15:22',
    lastSeen: '2026-08-09 10:11:05',
    relatedSessions: 6
  },
  {
    indicator: 'c2.evil-corp.net',
    type: 'Domain',
    reputation: 'Malicious',
    source: 'Demo Feed (Known APT)',
    firstSeen: '2026-07-15 11:00:00',
    lastSeen: '2026-08-09 10:12:45',
    relatedSessions: 2
  },
  {
    indicator: '203.0.113.25',
    type: 'IP',
    reputation: 'Suspicious',
    source: 'Demo Intel (Anonymous Proxy)',
    firstSeen: '2026-08-09 09:01:00',
    lastSeen: '2026-08-09 10:12:43',
    relatedSessions: 12
  },
  {
    indicator: '8d14b407421ce31b53e670ee979b990fbbd091e9b2510de9d554a99b4d81fdf7',
    type: 'Hash (SHA-256)',
    reputation: 'Malicious',
    source: 'Demo Sandbox',
    firstSeen: '2026-08-09 10:12:48',
    lastSeen: '2026-08-09 10:12:48',
    relatedSessions: 1
  }
];
