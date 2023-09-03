const express = require("express");
const router = express.Router();

/**
 * @route GET /projectMember/:userId?page=1&limit=10
 * @description get list of projects that user take part in
 * @access login required
 */

/**
 * @route GET /projectMember/:projectId?page=1&limit=10
 * @description get list of members take part in this project
 * @access manager login required
 */

module.exports = router;
