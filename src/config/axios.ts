import axios from "axios";

export const API_URL = import.meta.env.API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
