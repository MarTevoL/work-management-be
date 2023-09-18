const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");
const authentication = require("../middlewares/authentication");

/**
 * @route GET /users/me
 * @description Get current user info
 * @access Public
 */
router.get("/me", authentication.loginRequired, userController.getCurrentUser);

/**
 * @route GET /users
 * @description Get all user
 * @access manager login
 */
router.get(
  "/",
  authentication.loginRequired,

  authentication.managerRequired,
  userController.getAllUser
);

/**
 * @route GET /users/staff
 * @description Get all user which role is staff
 * @access manager login
 */
router.get(
  "/staff",
  authentication.loginRequired,

  authentication.managerRequired,
  userController.getAllStaff
);

/**
 * @route POST /users/invitation
 * @description Send invitation to set up account
 * @body { email}
 * @access Manager login required
 */
router.post(
  "/invitation",
  authentication.loginRequired,
  authentication.managerRequired,
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
  ]),
  userController.sendInvitation
);

/**
 * @route POST /users/register
 * @description register new user
 * @body {name, email, password}
 * @access need email invitation
 */
router.post(
  "/register",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  userController.register
);

/**
 * @route POST /users/forgotPassword
 * @description create new password with register email
 * @body {email}
 * @access Public
 */
router.post(
  "/forgotPassword",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
  ]),
  userController.forgotPassword
);

/**
 * @route PUT /users/resetPassword
 * @description reset password with register email
 * @body { password, oldPass}
 * @access Public
 */
router.put(
  "/resetPassword",
  authentication.loginRequired,
  validators.validate([
    body("oldPass", "Invalid old password").exists().notEmpty(),
    body("password", "Invalid new password").exists().notEmpty(),
    body("passwordConfirm", "Invalid new password confirmation")
      .exists()
      .notEmpty(),
  ]),
  userController.resetPassword
);

module.exports = router;
