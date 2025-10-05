import axios from 'axios';
import { Base_url } from "./apiPaths";

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: Base_url,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Set the auth token for any request
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize with token from localStorage if exists
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Don't add auth header for auth routes
    if (config.url.includes('/auth/')) {
      return config;
    }
    
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data || response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject(new Error('Network Error: Please check your internet connection'));
    }

    // Handle 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth data
      setAuthToken(null);
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        // Store the current path for redirect after login
        const redirectPath = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
      }
      
      return Promise.reject(new Error('Your session has expired. Please log in again.'));
    }

    // Handle other errors
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.response.status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
