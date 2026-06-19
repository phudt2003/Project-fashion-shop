import { ApiError } from '../../utils/ApiError.js';
import { Cart } from './cart.model.js';

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

export const cartService = {
  getCart: async (userId) => {
    const cart = await getOrCreateCart(userId);
    return cart.populate('items.product');
  },

  addItem: async (userId, payload) => {
    const cart = await getOrCreateCart(userId);
    const item = cart.items.find(
      (entry) =>
        entry.product.toString() === payload.productId &&
        entry.size === payload.size &&
        entry.color === payload.color,
    );

    if (item) {
      item.quantity += payload.quantity || 1;
    } else {
      cart.items.push({
        product: payload.productId,
        quantity: payload.quantity || 1,
        size: payload.size,
        color: payload.color,
      });
    }

    await cart.save();
    return cart.populate('items.product');
  },

  updateItem: async (userId, itemId, payload) => {
    const cart = await getOrCreateCart(userId);
    const item = cart.items.id(itemId);
    if (!item) throw new ApiError(404, 'Cart item not found');

    item.quantity = payload.quantity;
    await cart.save();
    return cart.populate('items.product');
  },

  removeItem: async (userId, itemId) => {
    const cart = await getOrCreateCart(userId);
    cart.items.pull(itemId);
    await cart.save();
    return cart.populate('items.product');
  },

  clearCart: async (userId) => {
    const cart = await getOrCreateCart(userId);
    cart.items = [];
    await cart.save();
    return cart;
  },
};

