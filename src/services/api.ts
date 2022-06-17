import axios from "axios";

const api = axios.create({
  baseURL: process.env.baseUrl,
});

export default api;
