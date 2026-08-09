import { mockEvidenceItems } from '../data/evidenceData';

export const evidenceService = {
  getEvidence: async () => {
    return Promise.resolve([...mockEvidenceItems]);
  },
  
  getEvidenceByCaseId: async (caseId: string) => {
    const evidence = mockEvidenceItems.filter(e => e.relatedCaseId === caseId);
    return Promise.resolve(evidence);
  }
};
