import { ORDER_STATUS } from '../../constants/orderStatus.js';
import { PAYMENT_STATUS } from '../../constants/paymentStatus.js';
import { ApiError } from '../../utils/ApiError.js';
import { Product } from '../products/product.model.js';
import { Order } from './order.model.js';

async function buildOrderItems(items) {
  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds }, isActive: true });
  const productMap = new Map(products.map((product) => [product._id.toString(), product]));

  return items.map((item) => {
    const product = productMap.get(item.product);
    if (!product) throw new ApiError(400, 'Invalid product in order');

    const price = product.salePrice || product.price;
    return {
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    };
  });
}

export const orderService = {
  create: async (userId, payload) => {
    const items = await buildOrderItems(payload.items);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const total = Math.max(subtotal - discount, 0);

    return Order.create({
      user: userId,
      items,
      shippingAddress: payload.shippingAddress,
      subtotal,
      discount,
      total,
    });
  },

  listMine: (userId) => Order.find({ user: userId }).sort({ createdAt: -1 }),

  getById: async (orderId, user) => {
    const filter = user.role === 'admin' ? { _id: orderId } : { _id: orderId, user: user._id };
    const order = await Order.findOne(filter).populate('items.product payment');
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
  },

  adminList: (query = {}) => {
    const filter = {};
    if (query.status) filter.status = query.status;
    if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;
    return Order.find(filter).populate('user').sort({ createdAt: -1 });
  },

  cancel: async (orderId, user) => {
    const order = await Order.findOne({ _id: orderId, user: user._id });
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.paymentStatus === PAYMENT_STATUS.PAID) {
      throw new ApiError(400, 'Paid order cannot be cancelled manually');
    }

    order.status = ORDER_STATUS.CANCELLED;
    order.paymentStatus = PAYMENT_STATUS.CANCELLED;
    order.cancelledAt = new Date();
    await order.save();
    return order;
  },

  updateStatus: async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, 'Order not found');

    order.status = status;
    if (status === ORDER_STATUS.PAID) {
      order.paymentStatus = PAYMENT_STATUS.PAID;
      order.paidAt = new Date();
    }
    if (status === ORDER_STATUS.CANCELLED) {
      order.paymentStatus = PAYMENT_STATUS.CANCELLED;
      order.cancelledAt = new Date();
    }
    if (status === ORDER_STATUS.REFUNDED) {
      order.paymentStatus = PAYMENT_STATUS.REFUNDED;
      order.refundedAt = new Date();
    }

    await order.save();
    return order;
  },
};

