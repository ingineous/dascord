import axios from "axios";

console.log("whore", import.meta.env.API_URL);

export const API_URL = import.meta.env.API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
