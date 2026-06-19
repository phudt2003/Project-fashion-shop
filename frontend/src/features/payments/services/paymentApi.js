import { axiosClient } from '../../../lib/axiosClient';

export const paymentApi = {
  createSePayQr: (orderId) => axiosClient.post('/payments/sepay/qr', { orderId }),
  getPaymentStatus: (paymentId) => axiosClient.get(`/payments/${paymentId}`),
};

