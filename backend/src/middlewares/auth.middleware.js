import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../modules/users/user.model.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) {
    throw new ApiError(401, 'Authentication token is required');
  }

  const payload = jwt.verify(token, env.jwtAccessSecret);
  const user = await User.findById(payload.sub).select('-password');

  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid authentication token');
  }

  req.user = user;
  next();
});

