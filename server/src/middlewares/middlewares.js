import httpStatus from 'http-status';
import CustomError from '../errors/CustomError.js';

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new CustomError(httpStatus.UNAUTHORIZED, "Unauthorized");
}

const rolesCheck = (roles, user) => {
  for (let role of roles) {
    if (user instanceof role) {
      return true;
    }
  }

  return false;
}

export const checkPermissions = (...roles) => {
  return (req, _, next) => {
    if (rolesCheck(roles, req.user)) {
      return next();
    }

    throw new CustomError(httpStatus.FORBIDDEN, "User does not have the required permissions");
  }
}