import { mockMitreMappings } from '../data/mitreData';

export const mitreService = {
  getMappings: async () => {
    return Promise.resolve([...mockMitreMappings]);
  }
};
