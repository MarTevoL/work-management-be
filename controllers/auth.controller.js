const { AppError, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("express-async-errors");
const authController = {};

authController.loginWithEmail = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(400, "Invalid email", "Login Error");

  const isMath = await bcrypt.compare(password, user.password);
  if (!isMath) throw new AppError(400, "Wrong password", "Login Error");

  const accessToken = await user.generateToken();

  sendResponse(res, 200, true, { user, accessToken }, null, "Login successful");
};

module.exports = authController;
