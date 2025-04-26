const jwt = require('jsonwebtoken');
const User = require('../model/user');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('./catchAsyncErrors');

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, "randomtoken1234567890");
    req.user = await User.findById(decodedData.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (err) {
    console.error("JWT verification error:", err.name, err.message);
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

module.exports = { isAuthenticatedUser };
