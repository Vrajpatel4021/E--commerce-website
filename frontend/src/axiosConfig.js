const isLocal = window.location.hostname === 'localhost';
import axios from "axios"
const instance = axios.create({
  baseURL: isLocal
    ? 'http://localhost:8000'
    : 'https://e-commerce-website-1-s8uw.onrender.com',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default instance