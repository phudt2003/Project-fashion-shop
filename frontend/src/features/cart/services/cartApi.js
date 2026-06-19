import { axiosClient } from '../../../lib/axiosClient';

export const cartApi = {
  getCart: () => axiosClient.get('/carts/me'),
  addItem: (payload) => axiosClient.post('/carts/items', payload),
  updateItem: (itemId, payload) => axiosClient.patch(`/carts/items/${itemId}`, payload),
  removeItem: (itemId) => axiosClient.delete(`/carts/items/${itemId}`),
};

