import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { couponService } from './coupon.service.js';

export const couponController = {
  list: asyncHandler(async (req, res) => {
    const coupons = await couponService.list();
    res.json(new ApiResponse(coupons));
  }),
  create: asyncHandler(async (req, res) => {
    const coupon = await couponService.create(req.body);
    res.status(201).json(new ApiResponse(coupon, 'Coupon created'));
  }),
  update: asyncHandler(async (req, res) => {
    const coupon = await couponService.update(req.params.couponId, req.body);
    res.json(new ApiResponse(coupon, 'Coupon updated'));
  }),
  remove: asyncHandler(async (req, res) => {
    await couponService.remove(req.params.couponId);
    res.json(new ApiResponse(null, 'Coupon deleted'));
  }),
  validateCode: asyncHandler(async (req, res) => {
    const coupon = await couponService.validateCode(req.body.code, req.body.orderTotal);
    res.json(new ApiResponse(coupon, 'Coupon is valid'));
  }),
};

