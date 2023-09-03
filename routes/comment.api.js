const express = require("express");
const router = express.Router();

/**
 * @route POST /comments
 * @description post a comment
 * @body {status}
 * @access login required
 */

/**
 * @route GET /comments/:userId?page=1&limit=10
 * @description get list of comment user can see with pagination
 * @access login required
 */

/**
 * @route PUT /comments/:commentId
 * @description edit a comment of user
 * @body {userId}
 * @access login required
 */

/**
 * @route DELETE /comments/:commentId
 * @description delete a comment of user
 * @body {userId}
 * @access login required
 */

module.exports = router;
