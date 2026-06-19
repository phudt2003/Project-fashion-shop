import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { analyticsService } from './analytics.service.js';

export const analyticsController = {
  dashboard: asyncHandler(async (req, res) => {
    const data = await analyticsService.getDashboard();
    res.json(new ApiResponse(data));
  }),

  revenue: asyncHandler(async (req, res) => {
    const data = await analyticsService.getRevenue();
    res.json(new ApiResponse(data));
  }),
};

