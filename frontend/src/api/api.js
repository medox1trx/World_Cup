import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getMatches = () => axios.get(`${API_URL}/matches`);