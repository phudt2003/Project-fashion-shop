import axios from 'axios';
import { env } from '../config/env';

// Get Clerk session token
let getTokenFn = null;

export const setTokenGetter = (fn) => {
  getTokenFn = fn;
};

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  if (getTokenFn) {
    try {
      const token = await getTokenFn();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting Clerk token:', error);
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Clerk handles token refresh automatically
      // Just reject and let the user re-authenticate if needed
      return Promise.reject(error.response?.data || error);
    }

    return Promise.reject(error.response?.data || error);
  },
);

