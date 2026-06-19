import { ApiError } from '../../utils/ApiError.js';
import { Coupon } from './coupon.model.js';

export const couponService = {
  list: () => Coupon.find().sort({ createdAt: -1 }),
  create: (payload) => Coupon.create(payload),
  update: async (id, payload) => {
    const coupon = await Coupon.findByIdAndUpdate(id, payload, { new: true });
    if (!coupon) throw new ApiError(404, 'Coupon not found');
    return coupon;
  },
  remove: async (id) => {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) throw new ApiError(404, 'Coupon not found');
    return coupon;
  },
  validateCode: async (code, orderTotal) => {
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) throw new ApiError(404, 'Coupon not found');
    if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new ApiError(400, 'Coupon expired');
    if (coupon.minOrderValue > orderTotal) throw new ApiError(400, 'Order value is too low');
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) throw new ApiError(400, 'Coupon usage limit reached');
    return coupon;
  },
};

