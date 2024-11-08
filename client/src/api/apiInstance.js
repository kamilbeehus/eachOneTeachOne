import axios from "axios";

/** Instance to centralize API requests and ensure cookies are always included. */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Ensures cookies (and the token) are sent with every request
});

export default api;
