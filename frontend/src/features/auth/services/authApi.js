import { axiosClient } from '../../../lib/axiosClient';

export const authApi = {
  register: (payload) => axiosClient.post('/auth/register', payload),
  login: (payload) => axiosClient.post('/auth/login', payload),
  refreshToken: (refreshToken) => axiosClient.post('/auth/refresh-token', { refreshToken }),
  forgotPassword: (payload) => axiosClient.post('/auth/forgot-password', payload),
  resetPassword: (token, payload) => axiosClient.post(`/auth/reset-password/${token}`, payload),
  logout: (refreshToken) => axiosClient.post('/auth/logout', { refreshToken }),
};

