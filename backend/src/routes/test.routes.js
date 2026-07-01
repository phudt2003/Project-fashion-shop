import { Router } from 'express';
import { cloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const testRoutes = Router();

/**
 * GET /api/v1/test/cloudinary
 * Kiểm tra kết nối Cloudinary — không cần xác thực
 */
testRoutes.get(
  '/cloudinary',
  asyncHandler(async (_req, res) => {
    try {
      // Gọi API ping để kiểm tra credentials
      const result = await cloudinary.api.ping();

      res.json({
        success: true,
        message: 'Kết nối Cloudinary thành công',
        cloudName: cloudinary.config().cloud_name,
        status: result?.status || 'ok',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Kết nối Cloudinary thất bại',
        error: error.message || 'Unknown error',
        hint: 'Kiểm tra lại CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET trong file .env',
        timestamp: new Date().toISOString(),
      });
    }
  }),
);
