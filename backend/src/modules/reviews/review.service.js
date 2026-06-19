import { Product } from '../products/product.model.js';
import { Review } from './review.model.js';

async function recalculateProductRating(productId) {
  const result = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: '$product', average: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);

  await Product.findByIdAndUpdate(productId, {
    ratingAverage: result[0]?.average || 0,
    ratingCount: result[0]?.count || 0,
  });
}

export const reviewService = {
  listByProduct: (productId) =>
    Review.find({ product: productId }).populate('user', 'name avatar').sort({ createdAt: -1 }),

  create: async (userId, payload) => {
    const review = await Review.create({ ...payload, user: userId });
    await recalculateProductRating(review.product);
    return review;
  },

  remove: async (reviewId) => {
    const review = await Review.findByIdAndDelete(reviewId);
    if (review) await recalculateProductRating(review.product);
    return review;
  },
};

