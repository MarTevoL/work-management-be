const User = require("../models/User");
const Invitation = require("../models/Invitation");
const { sendMail } = require("../services/sgMail");
const { AppError } = require("../helpers/utils");
require("express-async-errors");

const userController = {};

userController.register = async (req, res, next) => {
  // Get data from request
  let { name, email, password } = req.body;

  // Validation
  let invitation = await Invitation.findOne({ email });
  if (!invitation)
    throw new AppError(400, "Invalid email invitation", "Registration Error");

  let user = await User.findOne({ email });
  if (user)
    throw new AppError(400, "User already exists", "Registration Error");

  // Process
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
  res.send("User forgot password");
};

userController.resetPassword = async (req, res, next) => {
  res.send("User reset password");
};

module.exports = userController;
