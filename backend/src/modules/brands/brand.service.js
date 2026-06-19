import { ApiError } from '../../utils/ApiError.js';
import { Brand } from './brand.model.js';

export const brandService = {
  list: () => Brand.find({ isActive: true }).sort({ name: 1 }),
  adminList: () => Brand.find().sort({ createdAt: -1 }),
  getBySlug: async (slug) => {
    const brand = await Brand.findOne({ slug });
    if (!brand) throw new ApiError(404, 'Brand not found');
    return brand;
  },
  create: (payload) => Brand.create(payload),
  update: async (id, payload) => {
    const brand = await Brand.findByIdAndUpdate(id, payload, { new: true });
    if (!brand) throw new ApiError(404, 'Brand not found');
    return brand;
  },
  remove: async (id) => {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) throw new ApiError(404, 'Brand not found');
    return brand;
  },
};

