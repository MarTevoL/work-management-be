const User = require("../models/User");
const Invitation = require("../models/Invitation");
const { sendMail } = require("../services/sgMail");
const { AppError, sendResponse } = require("../helpers/utils");
require("express-async-errors");
const bcrypt = require("bcryptjs");

const userController = {};

userController.register = async (req, res, next) => {
  // Get data from request
  let { name, email, password } = req.body;

  // Validation
  let invitation = await Invitation.findOne({ email, activate: false });
  if (!invitation)
    throw new AppError(400, "Invalid email invitation", "Registration Error");

  let user = await User.findOne({ email });
  if (user)
    throw new AppError(400, "User already exists", "Registration Error");

  // Process
  await Invitation.findOneAndUpdate({ email }, { activate: true });
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({ name, email, password });
  const accessToken = await user.generateToken();

  // Response
  sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create User successful"
  );
};

userController.sendInvitation = async (req, res, next) => {
  // sendMail({
  //   to: "leminhtruong.vt@gmail.com",
  //   from: "i.martevol@gmail.com",
  //   subject: "Invitation to create an account",
  //   text: "test invitation",
  // });

  res.send("Manager send invitation to user email");
};

userController.forgotPassword = async (req, res, next) => {
  let { email } = req.body;

  let user = await User.findOne({ email });
  if (!user)
    throw new AppError(400, "User email is not exists", "Registration Error");

  sendResponse(res, 200, true, { user }, null, "Valid email");
};

userController.resetPassword = async (req, res, next) => {
  let { email, newPassword } = req.body;

  let user = await User.findOne({ email });
  if (!user)
    throw new AppError(400, "User is not exists", "Registration Error");

  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(newPassword, salt);
  user = await User.findOneAndUpdate({ email }, { password: newPassword });

  sendResponse(res, 200, true, { user }, null, "Password change successful");
};

module.exports = userController;
