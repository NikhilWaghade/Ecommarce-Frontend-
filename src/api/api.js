// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Optional: log API URL during development
console.log("API Base URL:", API.defaults.baseURL);

export default API;



