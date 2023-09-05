const { AppError } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authController = {};

authController.loginWithEmail = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");

  const isMath = await bcrypt.compare(password, user.password);
  if (!isMath) throw new AppError(400, "Wrong password", "Login Error");
};

module.exports = authController;
