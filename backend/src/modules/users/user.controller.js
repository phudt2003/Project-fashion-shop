import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { userService } from './user.service.js';

export const userController = {
  getMe: asyncHandler(async (req, res) => {
    const user = await userService.getMe(req.user._id);
    res.json(new ApiResponse(user));
  }),

  updateMe: asyncHandler(async (req, res) => {
    const user = await userService.updateMe(req.user._id, req.body);
    res.json(new ApiResponse(user, 'Profile updated'));
  }),

  listUsers: asyncHandler(async (req, res) => {
    const users = await userService.listUsers(req.query);
    res.json(new ApiResponse(users));
  }),

  getUserById: asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    res.json(new ApiResponse(user));
  }),

  updateUserStatus: asyncHandler(async (req, res) => {
    const user = await userService.updateUserStatus(req.params.userId, req.body.isActive);
    res.json(new ApiResponse(user, 'User status updated'));
  }),
};

