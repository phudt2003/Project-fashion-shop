import { axiosClient } from '../../../lib/axiosClient';

export const wishlistApi = {
  getWishlist: () => axiosClient.get('/wishlists/me'),
  addItem: (productId) => axiosClient.post('/wishlists/items', { productId }),
  removeItem: (productId) => axiosClient.delete(`/wishlists/items/${productId}`),
};

