import { axiosClient } from '../../../lib/axiosClient';

export const profileApi = {
  getProfile: () => axiosClient.get('/users/me'),
  updateProfile: (payload) => axiosClient.patch('/users/me', payload),
};

