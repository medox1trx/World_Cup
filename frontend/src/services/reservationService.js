import api from './api';

const reservationService = {
  /**
   * Submit a new reservation (Public)
   * @param {Object} data { full_name, email, phone, type, fan_zone_id, hospitality_id, quantity, special_request }
   */
  create: async (data) => {
    const response = await api.post('/reservations', data);
    return response.data;
  },

  /**
   * Admin: List all reservations
   */
  getAll: async (params = {}) => {
    const response = await api.get('/admin/reservations', { params });
    return response.data;
  },

  /**
   * Admin: Get reservation details
   */
  getById: async (id) => {
    const response = await api.get(`/admin/reservations/${id}`);
    return response.data;
  },

  /**
   * Admin: Update reservation status
   */
  updateStatus: async (id, status) => {
    const response = await api.patch(`/admin/reservations/${id}/status`, { status });
    return response.data;
  }
};

export default reservationService;
