import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { cartService } from './cart.service.js';

export const cartController = {
  getCart: asyncHandler(async (req, res) => {
    const cart = await cartService.getCart(req.user._id);
    res.json(new ApiResponse(cart));
  }),

  addItem: asyncHandler(async (req, res) => {
    const cart = await cartService.addItem(req.user._id, req.body);
    res.status(201).json(new ApiResponse(cart, 'Cart item added'));
  }),

  updateItem: asyncHandler(async (req, res) => {
    const cart = await cartService.updateItem(req.user._id, req.params.itemId, req.body);
    res.json(new ApiResponse(cart, 'Cart item updated'));
  }),

  removeItem: asyncHandler(async (req, res) => {
    const cart = await cartService.removeItem(req.user._id, req.params.itemId);
    res.json(new ApiResponse(cart, 'Cart item removed'));
  }),
};

