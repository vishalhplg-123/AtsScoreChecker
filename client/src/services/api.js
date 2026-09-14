import axios from 'axios';

// Derive robust base API URL from environment variable or proxy fallback
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return '/api';

  const clean = envUrl.trim().replace(/\/+$/, '');
  // If the env variable points directly to the domain without /api, append /api
  if (!clean.endsWith('/api')) {
    return `${clean}/api`;
  }
  return clean;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('resumeai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on 401 if not already on login page
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register' &&
        window.location.pathname !== '/'
      ) {
        localStorage.removeItem('resumeai_token');
        localStorage.removeItem('resumeai_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
