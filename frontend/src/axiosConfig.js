// src/axiosConfig.js
import axios from 'axios';
const instance = axios.create({
baseURL: 'http://localhost:8000' || 'https://e-commerce-website-1-s8uw.onrender.com',  // your server
withCredentials: true, // crucial for sending cookies
});
export default instance;