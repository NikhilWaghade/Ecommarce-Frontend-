// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // ✅ Required for sending cookies or tokens
});

export default API;
