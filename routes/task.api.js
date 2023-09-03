const express = require("express");
const router = express.Router();

/**
 * @route POST /tasks
 * @description create a task
 * @body {title, description, project}
 * @access Manager login required
 */

/**
 * @route GET /tasks/:userId?page=1&limit=10
 * @description get list of tasks user can see with pagination
 * @body {project,assignee,status}
 * @access login required
 */

/**
 * @route GET /tasks/assignee/:userId
 * @description get list of tasks of assignee
 * @body {assigneeId}
 * @access login required
 */

/**
 * @route PUT /tasks/assign/:userId
 * @description user assign task to themselves ,only manager can assign to team members
 * @body {assigneeIds}
 * @access login required
 */

/**
 * @route PUT /tasks/update/:userId
 * @description add priority, deadline
 * @body {taskId, priority, deadline}
 * @access Manager login required
 */

/**
 * @route PUT /tasks/status/:userId
 * @description add priority, deadline
 * @body {taskId, status}
 * @access login required
 */

module.exports = router;
