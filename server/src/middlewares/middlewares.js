import httpStatus from 'http-status';
import CustomError from '../errors/CustomError.js';

export const isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);

  if (req.isAuthenticated()) {
    return next();
  }

  throw new CustomError(httpStatus.UNAUTHORIZED, "Unauthorized");
} 