import httpStatus from 'http-status';
import CustomError from '../errors/CustomError.js';
import OTP from '../modules/OTP/OTP.js';

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
};

export const checkOTPMiddleware = async (req, res, next) => {
  const { id, email } = req.user;

  const otpDoc = await OTP.findOne({
    userId: id,
    email,
  });

  if (!otpDoc) {
    throw new CustomError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }

  if (!otpDoc.validated) {
    throw new CustomError(httpStatus.BAD_REQUEST, "OTP not validated");
  }

  await OTP.deleteOne({
    userId: id,
    email,
  });

  return next();
}