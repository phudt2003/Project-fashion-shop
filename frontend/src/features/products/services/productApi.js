import { axiosClient } from '../../../lib/axiosClient';

export const productApi = {
  list: (params) => axiosClient.get('/products', { params }),
  detail: (slug) => axiosClient.get(`/products/${slug}`),
  search: (params) => axiosClient.get('/products/search', { params }),
};

