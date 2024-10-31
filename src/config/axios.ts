import axios from "axios";

console.log("whore", import.meta.env.API_URL);

const api = axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:8080",
});

export default api;
