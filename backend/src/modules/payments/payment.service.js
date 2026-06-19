import { ORDER_STATUS } from '../../constants/orderStatus.js';
import { PAYMENT_STATUS } from '../../constants/paymentStatus.js';
import { ApiError } from '../../utils/ApiError.js';
import { Order } from '../orders/order.model.js';
import { Payment } from './payment.model.js';
import { sepayService } from './sepay.service.js';

async function syncOrderPaymentStatus(order, status) {
  order.paymentStatus = status;

  if (status === PAYMENT_STATUS.PAID) {
    order.status = ORDER_STATUS.PAID;
    order.paidAt = order.paidAt || new Date();
  }

  if (status === PAYMENT_STATUS.CANCELLED) {
    order.status = ORDER_STATUS.CANCELLED;
    order.cancelledAt = order.cancelledAt || new Date();
  }

  if (status === PAYMENT_STATUS.REFUNDED) {
    order.status = ORDER_STATUS.REFUNDED;
    order.refundedAt = order.refundedAt || new Date();
  }

  await order.save();
}

export const paymentService = {
  createSePayPayment: async (userId, orderId) => {
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.status === ORDER_STATUS.CANCELLED) throw new ApiError(400, 'Order is cancelled');

    const qr = await sepayService.createQrCode({
      orderId: order._id.toString(),
      amount: order.total,
    });

    const payment = await Payment.findOneAndUpdate(
      { order: order._id },
      {
        user: userId,
        provider: 'sepay',
        amount: order.total,
        status: PAYMENT_STATUS.PENDING,
        transferContent: qr.transferContent,
        qrCodeUrl: qr.qrCodeUrl,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    order.payment = payment._id;
    await order.save();

    return {
      payment,
      qrCodeUrl: qr.qrCodeUrl,
      transferContent: qr.transferContent,
      bankAccount: qr.bankAccount,
    };
  },

  getPaymentById: async (paymentId, user) => {
    const filter = user.role === 'admin' ? { _id: paymentId } : { _id: paymentId, user: user._id };
    const payment = await Payment.findOne(filter).populate('order');
    if (!payment) throw new ApiError(404, 'Payment not found');
    return payment;
  },

  adminList: (query = {}) => {
    const filter = {};
    if (query.status) filter.status = query.status;
    return Payment.find(filter).populate('order user').sort({ createdAt: -1 });
  },

  handleSePayWebhook: async (payload, signature) => {
    const isValid = sepayService.verifyWebhookSignature(payload, signature);
    if (!isValid) throw new ApiError(401, 'Invalid SePay webhook signature');

    const normalized = sepayService.normalizeWebhookPayload(payload);
    if (!normalized.orderId) throw new ApiError(400, 'Order reference not found in webhook content');

    const order = await Order.findById(normalized.orderId);
    if (!order) throw new ApiError(404, 'Order not found');

    const payment = await Payment.findOneAndUpdate(
      { order: order._id },
      {
        user: order.user,
        amount: order.total,
        status: normalized.status,
        transactionId: normalized.transactionId,
        transferContent: normalized.content,
        rawWebhook: normalized.raw,
        paidAt: normalized.status === PAYMENT_STATUS.PAID ? new Date() : undefined,
        cancelledAt: normalized.status === PAYMENT_STATUS.CANCELLED ? new Date() : undefined,
        refundedAt: normalized.status === PAYMENT_STATUS.REFUNDED ? new Date() : undefined,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    order.payment = payment._id;
    await syncOrderPaymentStatus(order, normalized.status);

    return { payment, order };
  },
};

