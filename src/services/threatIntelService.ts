import { mockThreatIntel } from '../data/threatIntelData';

export const threatIntelService = {
  getThreatIntel: async () => {
    return Promise.resolve(mockThreatIntel);
  }
};
