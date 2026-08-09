import { mockInvestigations } from '../data/investigationData';
import { InvestigationCase } from '../types';

export const investigationService = {
  getCases: async () => {
    return Promise.resolve([...mockInvestigations]);
  },
  
  getCaseById: async (id: string) => {
    const inv = mockInvestigations.find(c => c.id === id);
    return Promise.resolve(inv || null);
  },

  createCase: async (newCase: InvestigationCase) => {
    // In a real app, this would post to a backend.
    // For prototype, we just return the object representing success.
    return Promise.resolve(newCase);
  }
};
