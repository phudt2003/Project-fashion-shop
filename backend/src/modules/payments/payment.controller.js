import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { paymentService } from './payment.service.js';

export const paymentController = {
  createSePayQr: asyncHandler(async (req, res) => {
    const payment = await paymentService.createSePayPayment(req.user._id, req.body.orderId);
    res.status(201).json(new ApiResponse(payment, 'SePay QR created'));
  }),

  getPaymentById: asyncHandler(async (req, res) => {
    const payment = await paymentService.getPaymentById(req.params.paymentId, req.user);
    res.json(new ApiResponse(payment));
  }),

  adminList: asyncHandler(async (req, res) => {
    const payments = await paymentService.adminList(req.query);
    res.json(new ApiResponse(payments));
  }),
};

