const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /tasks
 * @description create a task
 * @body {title, description, projectId}
 * @access Manager login required
 */
router.post(
  "/",
  authentication.loginRequired,
  authentication.managerRequired,
  validators.validate([
    body("title", "Invalid title").exists().notEmpty(),
    body("description", "Invalid description").exists().notEmpty(),
    body("projectId", "Invalid project")
      .exists()
      .notEmpty()
      .custom(validators.checkObjectId),
  ]),
  taskController.createTask
);

/**
 * @route GET /tasks/userId?page=1&limit=10
 * @description get list of tasks user can see with pagination
 * @access login required
 */
router.get(
  "/userId",
  authentication.loginRequired,
  validators.validate([
    param("userId").exists().isString().custom(validators.checkObjectId),
  ]),
  taskController.getTasks
);

/**
 * @route PUT /tasks/assign/:taskId
 * @description user assign task to themselves ,only manager can assign to team members
 * @body {assigneeId}
 * @access login required
 */
router.put(
  "/assign/:taskId",
  authentication.loginRequired,
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("assigneeId", "Invalid assigneeId").exists().notEmpty(),
  ]),
  taskController.updateAssignee
);

/**
 * @route PUT /tasks/update/:taskId
 * @description add priority, dueDate
 * @body {status, priority, dueDate}
 * @access Manager login required
 */
router.put(
  "/update/:taskId",

  authentication.loginRequired,
  authentication.managerRequired,
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("dueDate", "Invalid dueDate").isString().optional(),
    body("status", "Invalid status").isString().optional(),
    body("priority", "Invalid priority").isString().optional(),
  ]),
  taskController.updateTaskStatus
);

/**
 * @route PUT /tasks/comments/:taskId
 * @description add comment to task
 * @body { body}
 * @access login required
 */
router.put(
  "/comments/:taskId",
  authentication.loginRequired,
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("body", "Invalid body").exists().notEmpty(),
  ]),
  taskController.addTaskComment
);

module.exports = router;
