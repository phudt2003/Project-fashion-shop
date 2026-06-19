import { axiosClient } from '../../../lib/axiosClient';

export const categoryApi = {
  list: () => axiosClient.get('/categories'),
  detail: (slug) => axiosClient.get(`/categories/${slug}`),
};

