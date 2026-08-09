import { mockDetailedFindings } from '../data/analysisData';

export const analysisService = {
  getFindings: async () => {
    return Promise.resolve(mockDetailedFindings);
  },
  
  getFindingById: async (id: string) => {
    const finding = mockDetailedFindings.find(f => f.id === id);
    return Promise.resolve(finding || null);
  }
};
