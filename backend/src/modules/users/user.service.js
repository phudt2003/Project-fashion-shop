import { ApiError } from '../../utils/ApiError.js';
import { User } from './user.model.js';

export const userService = {
  getMe: async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },

  updateMe: async (userId, payload) => {
    const user = await User.findByIdAndUpdate(userId, payload, { new: true }).select('-password');
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },

  listUsers: (query = {}) => {
    const filter = query.role ? { role: query.role } : {};
    return User.find(filter).select('-password').sort({ createdAt: -1 });
  },

  getUserById: async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },

  updateUserStatus: async (userId, isActive) => {
    const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true }).select('-password');
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },

  findByClerkId: async (clerkId) => {
    const user = await User.findOne({ clerkId }).select('-password');
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },
};

