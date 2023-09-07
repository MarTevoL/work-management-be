const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError } = require("../helpers/utils");
const User = require("../models/User");

const authentication = {};

authentication.loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString)
      throw new AppError(401, "Login required", "Authentication Error");

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token expired", "Authentication Error");
        } else {
          throw new AppError(401, "Token is invalid", "Authentication Error");
        }
      }

      req.userId = payload._id;
      req.userRole = payload.role;
    });
    next();
  } catch (error) {
    next(error);
  }
};

authentication.managerRequired = async (req, res, next) => {
  try {
    if (req.userRole !== "Manager")
      throw new AppError(401, "Manager Login required", "Authentication Error");

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authentication;
