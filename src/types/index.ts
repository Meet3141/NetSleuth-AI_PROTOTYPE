export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Confidence = 'High' | 'Medium' | 'Low';
export type FindingStatus = 'New' | 'Investigating' | 'Review' | 'Closed';

export interface Finding {
  id: string;
  time: string;
  finding: string;
  source: string;
  destination: string;
  severity: Severity;
  confidence: Confidence;
  status: FindingStatus;
  description?: string;
  category?: string;
  mitreTechnique?: string;
  detectionMethods?: string[];
  relatedFlows?: string[];
  relatedSessions?: string[];
  relatedArtifacts?: string[];
  relatedIOCs?: string[];
  riskScore?: number;
  explanation?: string;
}

export interface Case {
  id: string;
  title: string;
  status: string;
  primaryHost: string;
  lastActivity: string;
  relatedFindingsCount: number;
  evidenceItemsCount: number;
}

export interface TrafficPoint {
  time: string;
  volume: number;
}

export interface ProtocolStatistic {
  protocol: string;
  percentage: number;
}

export interface DashboardMetric {
  activeThreats: number;
  openInvestigations: number;
  pcapsProcessed: number;
  suspiciousSessions: number;
  evidenceItems: number;
  highSeverityFindings: number;
}

export interface DetectionTrend {
  time: string;
  normal: number;
  suspicious: number;
  highRisk: number;
}

// --- Step 2 Types ---

export interface PcapFileInfo {
  name: string;
  size: string;
  type: string;
  packets: number;
  duration: string;
}

export interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  log?: string;
}

export interface Flow {
  id: string;
  sourceIpv4: string;
  sourcePort: number;
  destIpv4: string;
  destPort: number;
  protocol: string;
  packets: number;
  bytes: number;
  duration: string;
}

export interface Session {
  id: string;
  protocol: string;
  client: string;
  server: string;
  state: string;
  info: string;
}

export interface DNSQuery {
  id: string;
  time: string;
  source: string;
  domain: string;
  recordType: string;
  resolvedIps: string[];
}

export interface HTTPRequest {
  id: string;
  time: string;
  source: string;
  host: string;
  method: string;
  uri: string;
  statusCode: number;
  userAgent: string;
}

export interface TLSSession {
  id: string;
  time: string;
  source: string;
  serverName: string;
  version: string;
  cipherSuite: string;
  issuer: string;
}

export interface ExtractedArtifact {
  id: string;
  time: string;
  source: string;
  filename: string;
  type: string;
  size: string;
  hash: string;
}

// --- Step 3 Types ---

export interface Alert {
  id: string;
  time: string;
  title: string;
  severity: Severity;
  confidence: Confidence;
  source: string;
  status: FindingStatus | string;
  groupedCount?: number;
}

export interface ThreatIntelRecord {
  indicator: string;
  type: string;
  reputation: string;
  source: string;
  firstSeen: string;
  lastSeen: string;
  relatedSessions: number;
}

export interface CorrelationNode {
  id: string;
  type: 'Host' | 'Session' | 'Domain' | 'IP' | 'Finding' | 'Artifact';
  label: string;
  subLabel?: string;
  status?: string;
}

export interface CorrelationEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  description: string;
  type: string;
}

export interface AttackChainStep {
  id: string;
  label: string;
}
