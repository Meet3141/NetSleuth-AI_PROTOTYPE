import {
  mockCorrelationNodes,
  mockCorrelationEdges,
  mockTimelineEvents,
  mockAttackChain
} from '../data/correlationData';

export const correlationService = {
  getCorrelationGraph: async () => {
    return Promise.resolve({
      nodes: mockCorrelationNodes,
      edges: mockCorrelationEdges
    });
  },
  
  getTimeline: async () => {
    return Promise.resolve(mockTimelineEvents);
  },
  
  getAttackChain: async () => {
    return Promise.resolve(mockAttackChain);
  }
};
