import { ApiError } from '../../utils/ApiError.js';
import { Product } from './product.model.js';

function buildProductFilter(query) {
  const filter = { isActive: true };
  if (query.category) filter.category = query.category;
  if (query.brand) filter.brand = query.brand;
  if (query.q) filter.$text = { $search: query.q };
  return filter;
}

export const productService = {
  list: (query = {}) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 12);

    return Product.find(buildProductFilter(query))
      .populate('category brand')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  },

  search: (query = {}) =>
    Product.find(buildProductFilter(query))
      .populate('category brand')
      .sort({ ratingAverage: -1, createdAt: -1 }),

  getBySlug: async (slug) => {
    const product = await Product.findOne({ slug, isActive: true }).populate('category brand');
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  },

  getById: async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  },

  create: (payload) => Product.create(payload),

  update: async (id, payload) => {
    const product = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  },

  remove: async (id) => {
    const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  },
};

