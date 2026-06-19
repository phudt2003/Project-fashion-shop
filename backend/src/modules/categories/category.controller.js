import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { categoryService } from './category.service.js';

export const categoryController = {
  list: asyncHandler(async (req, res) => {
    const categories = await categoryService.list();
    res.json(new ApiResponse(categories));
  }),
  adminList: asyncHandler(async (req, res) => {
    const categories = await categoryService.adminList();
    res.json(new ApiResponse(categories));
  }),
  getBySlug: asyncHandler(async (req, res) => {
    const category = await categoryService.getBySlug(req.params.slug);
    res.json(new ApiResponse(category));
  }),
  create: asyncHandler(async (req, res) => {
    const category = await categoryService.create(req.body);
    res.status(201).json(new ApiResponse(category, 'Category created'));
  }),
  update: asyncHandler(async (req, res) => {
    const category = await categoryService.update(req.params.categoryId, req.body);
    res.json(new ApiResponse(category, 'Category updated'));
  }),
  remove: asyncHandler(async (req, res) => {
    await categoryService.remove(req.params.categoryId);
    res.json(new ApiResponse(null, 'Category deleted'));
  }),
};

