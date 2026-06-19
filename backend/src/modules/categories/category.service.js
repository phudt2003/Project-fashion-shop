import { ApiError } from '../../utils/ApiError.js';
import { Category } from './category.model.js';

export const categoryService = {
  list: () => Category.find({ isActive: true }).sort({ name: 1 }),
  adminList: () => Category.find().sort({ createdAt: -1 }),
  getBySlug: async (slug) => {
    const category = await Category.findOne({ slug });
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  },
  create: (payload) => Category.create(payload),
  update: async (id, payload) => {
    const category = await Category.findByIdAndUpdate(id, payload, { new: true });
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  },
  remove: async (id) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  },
};

