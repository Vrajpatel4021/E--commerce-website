const isLocal = window.location.hostname === 'localhost';
import axios from "axios"
const instance = axios.create({
  baseURL: isLocal
    ? 'http://localhost:8000'
    : 'https://e-commerce-website-1-s8uw.onrender.com',
  withCredentials: true,
});

export default instance