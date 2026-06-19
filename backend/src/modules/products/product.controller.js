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
    const images = req.files?.map((file) => file.path) || [];
    const product = await productService.create({ ...req.body, images });
    res.status(201).json(new ApiResponse(product, 'Product created'));
  }),

  update: asyncHandler(async (req, res) => {
    const images = req.files?.map((file) => file.path);
    const payload = images?.length ? { ...req.body, images } : req.body;
    const product = await productService.update(req.params.productId, payload);
    res.json(new ApiResponse(product, 'Product updated'));
  }),

  remove: asyncHandler(async (req, res) => {
    await productService.remove(req.params.productId);
    res.json(new ApiResponse(null, 'Product deleted'));
  }),
};

