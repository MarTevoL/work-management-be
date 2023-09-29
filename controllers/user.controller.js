const User = require("../models/User");
const Invitation = require("../models/Invitation");
const { sendMail } = require("../services/sgMail");
const { AppError, sendResponse } = require("../helpers/utils");
require("express-async-errors");
const bcrypt = require("bcryptjs");
const Notification = require("../models/Notification");

const userController = {};

userController.getCurrentUser = async (req, res, next) => {
  const currentUserId = req.userId;

  const user = await User.findById(currentUserId);

  if (!user) throw new AppError(400, "User not found", "Get User Error");

  sendResponse(res, 200, true, user, null, "Get current user successful");
};

userController.getAllUser = async (req, res, next) => {
  const users = await User.find();

  if (!users) throw new AppError(400, "Users not found", "Get Users Error");

  sendResponse(res, 200, true, { users }, null, "Get all staff successful");
};

userController.getAllStaff = async (req, res, next) => {
  const users = await User.find({ role: "Staff" }).exec();

  if (!users) throw new AppError(400, "Users not found", "Get Users Error");

  sendResponse(res, 200, true, { users }, null, "Get all users successful");
};

userController.register = async (req, res, next) => {
  // Get data from request
  let { name, email, password } = req.body;

  // Validation
  let user = await User.findOne({ email });
  if (user)
    throw new AppError(400, "Email already exists", "Registration Error");

  let invitation = await Invitation.findOne({ email, activate: false });
  if (!invitation)
    throw new AppError(401, "Invalid email invitation,", "Registration Error");

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
  let { email } = req.body;

  let invitation = await Invitation.findOne({ email });
  if (invitation)
    throw new AppError(400, "Email is already invited", "Registration Error");

  invitation = await Invitation.create({ email });
  // sendMail({
  //   to: "user email",
  //   from: "manager email",
  //   subject: "Invitation to create an account",
  //   text: "Please follow this link to register new account `${link} ",
  // });

  sendResponse(res, 200, true, { invitation }, null, "Invitation sent");
};

userController.updateDarkMode = async (req, res, next) => {
  let { isDarkMode } = req.body;
  const currentUserId = req.userId;

  const user = await User.findByIdAndUpdate(
    currentUserId,
    { isDarkMode: isDarkMode },
    { new: true }
  );

  sendResponse(res, 200, true, { user }, null, "Update dark mode successful");
};

userController.forgotPassword = async (req, res, next) => {
  let { email } = req.body;

  let user = await User.findOne({ email });
  if (!user)
    throw new AppError(400, "User email is not exists", "Registration Error");

  sendResponse(res, 200, true, { user }, null, "Valid email");
};

userController.resetPassword = async (req, res, next) => {
  const { oldPass, passwordConfirm } = req.body;
  const currentUserId = req.userId;

  let user = await User.findOne({ _id: currentUserId }, "+password");
  if (!user) throw new AppError(400, "Invalid user", "Reset password Error");

  const isMath = await bcrypt.compare(oldPass, user.password);
  if (!isMath)
    throw new AppError(400, "Wrong old password", "Reset password Error");

  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(passwordConfirm, salt);
  user = await User.findByIdAndUpdate(currentUserId, {
    password: newPassword,
  });

  await Notification.create({
    userId: currentUserId,
    title: "Password has changed",
    body: `You has update new password`,
  });

  sendResponse(res, 200, true, { user }, null, "Password change successful");
};

module.exports = userController;
