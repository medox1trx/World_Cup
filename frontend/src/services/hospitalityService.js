import api from './api';

export const hospitalityService = {
  getAll: async (params = {}) => {
    const res = await api.get('/hospitalities', { params });
    return res && res.data ? res.data : res;
  },
  getById: (id) => api.get(`/hospitalities/${id}`),
  book: (data) => api.post('/reservations', data),
};
