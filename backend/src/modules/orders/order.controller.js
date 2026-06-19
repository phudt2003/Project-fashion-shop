import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { orderService } from './order.service.js';

export const orderController = {
  create: asyncHandler(async (req, res) => {
    const order = await orderService.create(req.user._id, req.body);
    res.status(201).json(new ApiResponse(order, 'Order created'));
  }),

  listMine: asyncHandler(async (req, res) => {
    const orders = await orderService.listMine(req.user._id);
    res.json(new ApiResponse(orders));
  }),

  getById: asyncHandler(async (req, res) => {
    const order = await orderService.getById(req.params.orderId, req.user);
    res.json(new ApiResponse(order));
  }),

  adminList: asyncHandler(async (req, res) => {
    const orders = await orderService.adminList(req.query);
    res.json(new ApiResponse(orders));
  }),

  cancel: asyncHandler(async (req, res) => {
    const order = await orderService.cancel(req.params.orderId, req.user);
    res.json(new ApiResponse(order, 'Order cancelled'));
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const order = await orderService.updateStatus(req.params.orderId, req.body.status);
    res.json(new ApiResponse(order, 'Order status updated'));
  }),
};

