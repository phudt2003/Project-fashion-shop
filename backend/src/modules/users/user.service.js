import { ApiError } from '../../utils/ApiError.js';
import { User } from './user.model.js';

export const userService = {
  getMe: (userId) => User.findById(userId).select('-password'),

  updateMe: (userId, payload) =>
    User.findByIdAndUpdate(userId, payload, { new: true }).select('-password'),

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
};

