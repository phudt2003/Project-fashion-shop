import { ROLES } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';

export function adminMiddleware(req, res, next) {
  if (req.user?.role !== ROLES.ADMIN) {
    return next(new ApiError(403, 'Admin permission is required'));
  }

  return next();
}

