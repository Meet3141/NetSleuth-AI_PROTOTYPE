import { ProcessingStep } from '../types';
import {
  mockFlows,
  mockSessions,
  mockDNSQueries,
  mockHTTPRequests,
  mockTLSSessions,
  mockArtifacts
} from '../data/packetIntelligenceData';

const PIPELINE_STEPS = [
  { id: 'val', label: 'Validation' },
  { id: 'parse', label: 'Parsing' },
  { id: 'proto', label: 'Protocol Identification' },
  { id: 'dpi', label: 'DPI / Protocol Intelligence' },
  { id: 'flow', label: 'Flow Reconstruction' },
  { id: 'session', label: 'Session Reconstruction' },
  { id: 'artifact', label: 'Metadata / Artifact Extraction' },
];

export const pcapService = {
  getInitialSteps: (): ProcessingStep[] => {
    return PIPELINE_STEPS.map(s => ({
      id: s.id,
      label: s.label,
      status: 'pending'
    }));
  },

  getPacketIntelligence: async () => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      flows: mockFlows,
      sessions: mockSessions,
      dns: mockDNSQueries,
      http: mockHTTPRequests,
      tls: mockTLSSessions,
      artifacts: mockArtifacts
    };
  }
};
