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

// ── Matches ──────────────────────────────────────────────────
export const getMatches = (params = {}) => api.get("/matches", { params });
export const getMatch   = (id)          => api.get(`/matches/${id}`);
export const createMatch = (data)       => api.post("/matches", data);
export const updateMatch = (id, data)   => api.put(`/matches/${id}`, data);
export const deleteMatch = (id)         => api.delete(`/matches/${id}`);

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

// ── Search ───────────────────────────────────────────────────
export const search = (q) => api.get("/search", { params: { q } });

// ── Auth ─────────────────────────────────────────────────────
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser    = (data) => api.post("/auth/login", data);
export const logout       = ()     => api.post("/auth/logout");
export const getAuthUser  = ()     => api.get("/auth/user");
export const updateProfile = (data) => api.put("/auth/profile", data);

export default api;
