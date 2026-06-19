import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { brandService } from './brand.service.js';

export const brandController = {
  list: asyncHandler(async (req, res) => {
    const brands = await brandService.list();
    res.json(new ApiResponse(brands));
  }),
  adminList: asyncHandler(async (req, res) => {
    const brands = await brandService.adminList();
    res.json(new ApiResponse(brands));
  }),
  getBySlug: asyncHandler(async (req, res) => {
    const brand = await brandService.getBySlug(req.params.slug);
    res.json(new ApiResponse(brand));
  }),
  create: asyncHandler(async (req, res) => {
    const brand = await brandService.create(req.body);
    res.status(201).json(new ApiResponse(brand, 'Brand created'));
  }),
  update: asyncHandler(async (req, res) => {
    const brand = await brandService.update(req.params.brandId, req.body);
    res.json(new ApiResponse(brand, 'Brand updated'));
  }),
  remove: asyncHandler(async (req, res) => {
    await brandService.remove(req.params.brandId);
    res.json(new ApiResponse(null, 'Brand deleted'));
  }),
};

