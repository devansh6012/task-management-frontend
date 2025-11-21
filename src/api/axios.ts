import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default settings
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// What's axios.create()?

// Creates a customized axios instance
// All requests use these default settings
// DRY principle: Don't Repeat Yourself



// Request interceptor - Runs BEFORE every request - Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Why interceptors?

// Automatically add auth token to every request
// No need to manually add it in every API call



// Response interceptor - Runs AFTER every response - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Error handling in one place:

// If ANY request gets 401 (Unauthorized), auto-logout
// Centralized error handling



export default axiosInstance;