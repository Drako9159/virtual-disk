import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_HOST;

const api = axios.create({
  baseURL: URL,
});
export default api;
