const express = require("express");
const router = express.Router();

/**
 * @route GET /notification/:userId?page=1&limit=10
 * @description get list of notification user can see with pagination
 * @access login required
 */

/**
 * @route POST /notification/:taskId
 * @description post a notification
 * @body {taskId , status, contents}
 * @access login required
 */

module.exports = router;
