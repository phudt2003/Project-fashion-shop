import { cloudinary } from '../../config/cloudinary.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { productService } from './product.service.js';

export const productController = {
  list: asyncHandler(async (req, res) => {
    const products = await productService.list(req.query);
    res.json(new ApiResponse(products));
  }),

  search: asyncHandler(async (req, res) => {
    const products = await productService.search(req.query);
    res.json(new ApiResponse(products));
  }),

  getBySlug: asyncHandler(async (req, res) => {
    const product = await productService.getBySlug(req.params.slug);
    res.json(new ApiResponse(product));
  }),

  create: asyncHandler(async (req, res) => {
    const images =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];
    const product = await productService.create({ ...req.body, images });
    res.status(201).json(new ApiResponse(product, 'Product created'));
  }),

  update: asyncHandler(async (req, res) => {
    const images = req.files?.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
    const payload = images?.length ? { ...req.body, images } : req.body;
    const product = await productService.update(req.params.productId, payload);
    res.json(new ApiResponse(product, 'Product updated'));
  }),

  remove: asyncHandler(async (req, res) => {
    // Xóa ảnh trên Cloudinary trước khi xóa sản phẩm
    const product = await productService.getById(req.params.productId);
    if (product?.images?.length) {
      const deletePromises = product.images.map((img) =>
        cloudinary.uploader.destroy(img.public_id),
      );
      await Promise.allSettled(deletePromises);
    }
    await productService.remove(req.params.productId);
    res.json(new ApiResponse(null, 'Product deleted'));
  }),

  /**
   * Upload ảnh đơn lẻ lên Cloudinary
   * POST /api/v1/products/upload
   * field name: image (multipart/form-data)
   */
  uploadImage: asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new ApiError(400, 'Không có file ảnh nào được gửi lên');
    }

    res.status(200).json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename,
    });
  }),
};
