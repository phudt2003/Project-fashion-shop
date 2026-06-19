import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { wishlistService } from './wishlist.service.js';

export const wishlistController = {
  getWishlist: asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.getWishlist(req.user._id);
    res.json(new ApiResponse(wishlist));
  }),

  addItem: asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.addItem(req.user._id, req.body.productId);
    res.status(201).json(new ApiResponse(wishlist, 'Wishlist item added'));
  }),

  removeItem: asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.removeItem(req.user._id, req.params.productId);
    res.json(new ApiResponse(wishlist, 'Wishlist item removed'));
  }),
};

