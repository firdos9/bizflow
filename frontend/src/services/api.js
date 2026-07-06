// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Your Express backend URL
});

export default api;
