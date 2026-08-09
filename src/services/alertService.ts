import { mockAlerts } from '../data/alertData';

export const alertService = {
  getAlerts: async () => {
    return Promise.resolve(mockAlerts);
  }
};
