import { ORDER_STATUS } from '../constants/orderStatus.js';
import { PAYMENT_STATUS } from '../constants/paymentStatus.js';
import { Order } from '../modules/orders/order.model.js';

export async function cancelExpiredOrders() {
  const expiredAt = new Date(Date.now() - 30 * 60 * 1000);

  return Order.updateMany(
    {
      status: ORDER_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.PENDING,
      createdAt: { $lt: expiredAt },
    },
    {
      status: ORDER_STATUS.CANCELLED,
      paymentStatus: PAYMENT_STATUS.CANCELLED,
      cancelledAt: new Date(),
    },
  );
}

