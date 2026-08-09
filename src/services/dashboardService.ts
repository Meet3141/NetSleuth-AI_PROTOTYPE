import {
  mockMetrics,
  mockFindings,
  mockActiveCase,
  mockTrafficData,
  mockDetectionTrends,
  mockProtocols
} from '../data/mockData';

export const dashboardService = {
  getMetrics: async () => {
    // Simulate network delay
    return Promise.resolve(mockMetrics);
  },
  
  getRecentFindings: async () => {
    return Promise.resolve(mockFindings);
  },
  
  getActiveCase: async () => {
    return Promise.resolve(mockActiveCase);
  },
  
  getTrafficData: async () => {
    return Promise.resolve(mockTrafficData);
  },
  
  getDetectionTrends: async () => {
    return Promise.resolve(mockDetectionTrends);
  },
  
  getProtocolDistribution: async () => {
    return Promise.resolve(mockProtocols);
  }
};
