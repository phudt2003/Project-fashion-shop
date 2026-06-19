import axios from 'axios';
import { env } from '../config/env';
import { tokenStorage } from './tokenStorage';

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        const data = await axios.post(`${env.apiBaseUrl}/auth/refresh-token`, { refreshToken });
        tokenStorage.setTokens(data.data);
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return axiosClient(originalRequest);
      }
    }

    return Promise.reject(error.response?.data || error);
  },
);

