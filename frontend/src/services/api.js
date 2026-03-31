import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

// ── Response interceptor — centralised error handling ────────
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const msg = err.response?.data?.message || "Something went wrong";
    console.error("[API Error]", msg);
    return Promise.reject(err.response?.data || { message: msg });
  }
);

// ── Stats ────────────────────────────────────────────────────
export const getStats = () => api.get("/stats");

// ── News ─────────────────────────────────────────────────────
export const getNews = (params = {}) => api.get("/news", { params });
export const createNews = (data) => api.post("/admin/news", data);
export const updateNews = (id, data) => api.put(`/admin/news/${id}`, data);
export const deleteNews = (id) => api.delete(`/admin/news/${id}`);

// ── Matches ──────────────────────────────────────────────────
export const getMatches = (params = {}) => api.get("/matches", { params });
export const getMatch   = (id)          => api.get(`/matches/${id}`);
export const createMatch = (data)       => api.post("/admin/matches", data);
export const updateMatch = (id, data)   => api.put(`/admin/matches/${id}`, data);
export const deleteMatch = (id)         => api.delete(`/admin/matches/${id}`);

// ── Highlights ──────────────────────────────────────────────
export const getHighlights = () => api.get("/highlights");
export const createHighlight = (data) => api.post("/admin/highlights", data);
export const updateHighlight = (id, data) => api.put(`/admin/highlights/${id}`, data);
export const deleteHighlight = (id) => api.delete(`/admin/highlights/${id}`);

// Interaction
export const viewHighlight = (id) => api.post(`/highlights/${id}/view`);
export const likeHighlight = (id) => api.post(`/highlights/${id}/like`);
export const getComments = (id) => api.get(`/highlights/${id}/comments`);
export const postComment = (id, data) => api.post(`/highlights/${id}/comments`, data);

// ── Tickets ─────────────────────────────────────────────────
export const getTickets = () => api.get("/tickets");
export const adminGetTickets = () => api.get("/admin/tickets");
export const createTicket = (data) => api.post("/admin/tickets", data);
export const updateTicket = (id, data) => api.put(`/admin/tickets/${id}`, data);
export const deleteTicket = (id) => api.delete(`/admin/tickets/${id}`);
export const bookTicket = (data) => api.post("/ticket-bookings", data);
export const getUserTicketBookings = () => api.get("/ticket-bookings");

// ── Referees ─────────────────────────────────────────────────
export const getReferees = () => api.get("/referees");
export const createReferee = (data) => api.post("/admin/referees", data);
export const updateReferee = (id, data) => api.put(`/admin/referees/${id}`, data);
export const deleteReferee = (id) => api.delete(`/admin/referees/${id}`);

// ── Search ───────────────────────────────────────────────────
export const search = (q) => api.get("/search", { params: { q } });

// ── Auth ─────────────────────────────────────────────────────
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser    = (data) => api.post("/auth/login", data);
export const logout       = ()     => api.post("/auth/logout");
export const getAuthUser  = ()     => api.get("/auth/user");
export const updateProfile = (data) => api.put("/auth/profile", data);

// ── Cities & Accommodations ──────────────────────────────────
export const getCities = () => api.get("/cities");
export const getCity = (slug) => api.get(`/cities/${slug}`);
export const getAccommodation = (id) => api.get(`/accommodations/${id}`);
export const getAccommodations = (slug, params = {}) => api.get(`/cities/${slug}/accommodations`, { params });

// ── Fan Zones ───────────────────────────────────────────────
export const getFanZones = () => api.get("/fan-zones");
export const adminGetFanZones = () => api.get("/fan-zones-all");
export const createFanZone = (data) => api.post("/admin/fan-zones", data);
export const updateFanZone = (id, data) => api.put(`/admin/fan-zones/${id}`, data);
export const deleteFanZone = (id) => api.delete(`/admin/fan-zones/${id}`);

// ── Reservations (Protected) ────────────────────────────────────
export const storeReservation = (data) => api.post("/reservations", data);
export const getUserReservations = () => api.get("/reservations/user");
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);

// ── Ticker ───────────────────────────────────────────────────
export const getTicker = () => api.get("/ticker");
export const adminGetTicker = () => api.get("/admin/ticker");
export const createTickerItem = (data) => api.post("/admin/ticker", data);
export const updateTickerItem = (id, data) => api.put(`/admin/ticker/${id}`, data);
export const deleteTickerItem = (id) => api.delete(`/admin/ticker/${id}`);

// ── Hospitalities ───────────────────────────────────────────
export const getHospitalities = () => api.get("/hospitalities");
export const createHospitality = (data) => api.post("/admin/hospitalities", data);
export const updateHospitality = (id, data) => api.put(`/admin/hospitalities/${id}`, data);
export const deleteHospitality = (id) => api.delete(`/admin/hospitalities/${id}`);

// ── Teams ───────────────────────────────────────────────────
export const getTeams = () => api.get("/teams");
export const createTeam = (data) => api.post("/admin/teams", data);
export const updateTeam = (id, data) => api.put(`/admin/teams/${id}`, data);
export const deleteTeam = (id) => api.delete(`/admin/teams/${id}`);

export default api;
