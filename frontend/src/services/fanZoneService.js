import api from './api';

export const fanZoneService = {
  getAll: async (params = {}) => {
    const res = await api.get('/fan-zones', { params });
    return res && res.data ? res.data : res;
  },
  getById: (id) => api.get(`/fan-zones/${id}`),
  // Add admin methods if needed
};
