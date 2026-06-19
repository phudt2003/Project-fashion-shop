import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { reviewService } from './review.service.js';

export const reviewController = {
  listByProduct: asyncHandler(async (req, res) => {
    const reviews = await reviewService.listByProduct(req.params.productId);
    res.json(new ApiResponse(reviews));
  }),

  create: asyncHandler(async (req, res) => {
    const review = await reviewService.create(req.user._id, req.body);
    res.status(201).json(new ApiResponse(review, 'Review created'));
  }),

  remove: asyncHandler(async (req, res) => {
    await reviewService.remove(req.params.reviewId);
    res.json(new ApiResponse(null, 'Review deleted'));
  }),
};

