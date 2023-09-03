const express = require("express");
const router = express.Router();

/**
 * @route POST /auth/login
 * @description Login with username and password
 * @body {email, password}
 * @access Public
 */

/**
 * @route POST /auth/forgotPassword
 * @description create new password with registed email
 * @body {email}
 * @access Public
 */

/**
 * @route POST /auth/resetPassword
 * @description reset password with registed email
 * @body {email, newPassword}
 * @access Public
 */

module.exports = router;
