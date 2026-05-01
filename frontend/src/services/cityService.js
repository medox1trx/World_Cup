import api from './api';

export const cityService = {
  getAll: () => api.get('/cities'),
  getBySlug: (slug) => api.get(`/cities/${slug}`),
  getAccommodations: (slug) => api.get(`/cities/${slug}/accommodations`),
};
