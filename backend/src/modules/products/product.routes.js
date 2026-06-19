import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { productCreateSchema } from '../../validations/product.validation.js';
import { productController } from './product.controller.js';

export const productRoutes = Router();

productRoutes.get('/search', productController.search);
productRoutes.get('/', productController.list);
productRoutes.get('/:slug', productController.getBySlug);

productRoutes.use(authMiddleware, adminMiddleware);
productRoutes.post('/', upload.array('images', 8), validate(productCreateSchema), productController.create);
productRoutes.patch('/:productId', upload.array('images', 8), productController.update);
productRoutes.delete('/:productId', productController.remove);

