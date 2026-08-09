import {
  Flow,
  Session,
  DNSQuery,
  HTTPRequest,
  TLSSession,
  ExtractedArtifact
} from '../types';

export const mockFlows: Flow[] = [
  { id: 'FL-001', sourceIpv4: '10.0.2.15', sourcePort: 54321, destIpv4: '203.0.113.25', destPort: 443, protocol: 'TCP', packets: 450, bytes: 1024000, duration: '12.5s' },
  { id: 'FL-002', sourceIpv4: '10.0.2.22', sourcePort: 53, destIpv4: '8.8.8.8', destPort: 53, protocol: 'UDP', packets: 12, bytes: 1450, duration: '0.2s' },
  { id: 'FL-003', sourceIpv4: '10.0.2.31', sourcePort: 49152, destIpv4: '198.51.100.14', destPort: 80, protocol: 'TCP', packets: 1250, bytes: 5432000, duration: '45.1s' },
  { id: 'FL-004', sourceIpv4: '10.0.2.18', sourcePort: 50123, destIpv4: '203.0.113.45', destPort: 21, protocol: 'TCP', packets: 85, bytes: 45000, duration: '5.4s' },
  { id: 'FL-005', sourceIpv4: '10.0.2.15', sourcePort: 54322, destIpv4: '198.51.100.22', destPort: 443, protocol: 'TCP', packets: 320, bytes: 750000, duration: '8.2s' },
];

export const mockSessions: Session[] = [
  { id: 'SES-101', protocol: 'TLSv1.3', client: '10.0.2.15:54321', server: '203.0.113.25:443', state: 'CLOSED', info: 'Application Data' },
  { id: 'SES-102', protocol: 'DNS', client: '10.0.2.22:53', server: '8.8.8.8:53', state: 'COMPLETE', info: 'Standard query A suspicious-domain.example' },
  { id: 'SES-103', protocol: 'HTTP/1.1', client: '10.0.2.31:49152', server: '198.51.100.14:80', state: 'ESTABLISHED', info: 'GET /config.json HTTP/1.1' },
  { id: 'SES-104', protocol: 'FTP', client: '10.0.2.18:50123', server: '203.0.113.45:21', state: 'CLOSED', info: 'USER anonymous' },
];

export const mockDNSQueries: DNSQuery[] = [
  { id: 'DNS-01', time: '10:12:43.001', source: '10.0.2.22', domain: 'suspicious-domain.example', recordType: 'A', resolvedIps: ['198.51.100.14'] },
  { id: 'DNS-02', time: '10:12:44.120', source: '10.0.2.15', domain: 'api.github.com', recordType: 'A', resolvedIps: ['140.82.112.4'] },
  { id: 'DNS-03', time: '10:12:45.333', source: '10.0.2.31', domain: 'c2.evil-corp.net', recordType: 'CNAME', resolvedIps: ['198.51.100.99'] },
  { id: 'DNS-04', time: '10:12:48.012', source: '10.0.2.18', domain: 'update.windows.com', recordType: 'A', resolvedIps: ['204.79.197.200'] },
];

export const mockHTTPRequests: HTTPRequest[] = [
  { id: 'HTTP-01', time: '10:12:43.150', source: '10.0.2.31', host: '198.51.100.14', method: 'GET', uri: '/config.json', statusCode: 200, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  { id: 'HTTP-02', time: '10:12:44.500', source: '10.0.2.31', host: '198.51.100.14', method: 'POST', uri: '/upload', statusCode: 403, userAgent: 'curl/7.68.0' },
  { id: 'HTTP-03', time: '10:12:49.123', source: '10.0.2.15', host: 'never-ssl.com', method: 'GET', uri: '/', statusCode: 200, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
];

export const mockTLSSessions: TLSSession[] = [
  { id: 'TLS-01', time: '10:12:43.100', source: '10.0.2.15', serverName: 'api.github.com', version: 'TLS 1.3', cipherSuite: 'TLS_AES_128_GCM_SHA256', issuer: 'DigiCert Inc' },
  { id: 'TLS-02', time: '10:12:50.050', source: '10.0.2.15', serverName: 'suspicious-domain.example', version: 'TLS 1.2', cipherSuite: 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384', issuer: 'Let\'s Encrypt' },
];

export const mockArtifacts: ExtractedArtifact[] = [
  { id: 'ART-01', time: '10:12:44.600', source: '10.0.2.31', filename: 'config.json', type: 'application/json', size: '2.4 KB', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  { id: 'ART-02', time: '10:12:48.800', source: '10.0.2.18', filename: 'payload.exe', type: 'application/x-dosexec', size: '1.2 MB', hash: '8d14b407421ce31b53e670ee979b990fbbd091e9b2510de9d554a99b4d81fdf7' },
];
