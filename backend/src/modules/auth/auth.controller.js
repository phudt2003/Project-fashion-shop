import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';

export const authController = {
  register: asyncHandler(async (req, res) => {
    const data = await authService.register(req.body);
    res.status(201).json(new ApiResponse(data, 'Registered successfully'));
  }),

  login: asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);
    res.json(new ApiResponse(data, 'Logged in successfully'));
  }),

  refreshToken: asyncHandler(async (req, res) => {
    const data = await authService.refreshToken(req.body.refreshToken);
    res.json(new ApiResponse(data, 'Token refreshed'));
  }),

  logout: asyncHandler(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.json(new ApiResponse(null, 'Logged out successfully'));
  }),

  forgotPassword: asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body.email);
    res.json(new ApiResponse(null, 'Password reset instructions sent'));
  }),

  resetPassword: asyncHandler(async (req, res) => {
    await authService.resetPassword(req.params.token, req.body.password);
    res.json(new ApiResponse(null, 'Password reset successfully'));
  }),
};

