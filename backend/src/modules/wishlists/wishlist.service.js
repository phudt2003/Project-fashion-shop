import { Wishlist } from './wishlist.model.js';

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }
  return wishlist;
}

export const wishlistService = {
  getWishlist: async (userId) => {
    const wishlist = await getOrCreateWishlist(userId);
    return wishlist.populate('products');
  },

  addItem: async (userId, productId) => {
    const wishlist = await getOrCreateWishlist(userId);
    if (!wishlist.products.some((id) => id.toString() === productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    return wishlist.populate('products');
  },

  removeItem: async (userId, productId) => {
    const wishlist = await getOrCreateWishlist(userId);
    wishlist.products.pull(productId);
    await wishlist.save();
    return wishlist.populate('products');
  },
};

