import { PAYMENT_STATUS } from '../../constants/paymentStatus.js';
import { Order } from '../orders/order.model.js';
import { Product } from '../products/product.model.js';
import { User } from '../users/user.model.js';

export const analyticsService = {
  getDashboard: async () => {
    const [users, products, orders, revenue] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: PAYMENT_STATUS.PAID } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
    ]);

    return {
      users,
      products,
      orders,
      revenue: revenue[0]?.total || 0,
    };
  },

  getRevenue: () =>
    Order.aggregate([
      { $match: { paymentStatus: PAYMENT_STATUS.PAID } },
      {
        $group: {
          _id: {
            year: { $year: '$paidAt' },
            month: { $month: '$paidAt' },
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
};

