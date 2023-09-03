const express = require("express");
const router = express.Router();

/**
 * @route Get /projects/:userId?page=1&limit=10
 * @description get list of projects
 * @access Manager login required
 */

/**
 * @route POST /projects
 * @description create a project
 * @body {title, description, tasks}
 * @access Manager login required
 */

/**
 * @route PUT /projects/:projectId
 * @description update a project
 * @body {title, description, tasks}
 * @access Manager login required
 */

module.exports = router;
