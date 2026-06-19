import { axiosClient } from '../../../lib/axiosClient';

export const reviewApi = {
  listByProduct: (productId) => axiosClient.get(`/reviews/products/${productId}`),
  create: (payload) => axiosClient.post('/reviews', payload),
  remove: (reviewId) => axiosClient.delete(`/reviews/${reviewId}`),
};

