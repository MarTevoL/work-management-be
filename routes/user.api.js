const express = require("express");
const router = express.Router();

/**
 * @route POST /users/:email
 * @description Register new user with credentials
 * @body {name, email, password, key}
 * @access Public
 */

/**
 * @route POST /users/invitation
 * @description Send invitation to set up account
 * @body { email}
 * @access Manager login required
 */

module.exports = router;
