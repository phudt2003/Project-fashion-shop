import { axiosClient } from '../../../lib/axiosClient';

export const orderApi = {
  create: (payload) => axiosClient.post('/orders', payload),
  listMine: () => axiosClient.get('/orders/me'),
  detail: (orderId) => axiosClient.get(`/orders/${orderId}`),
  cancel: (orderId) => axiosClient.patch(`/orders/${orderId}/cancel`),
};

