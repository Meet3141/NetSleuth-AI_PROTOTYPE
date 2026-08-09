import { mockReports } from '../data/reportData';

export const reportService = {
  getReports: async () => {
    return Promise.resolve([...mockReports]);
  }
};
