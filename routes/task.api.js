const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");

/**
 * @route POST /tasks
 * @description create a task
 * @body {title, description, project}
 * @access Manager login required
 */
router.post(
  "/",
  validators.validate([
    body("title", "Invalid title").exists().notEmpty(),
    body("description", "Invalid description").exists().notEmpty(),
    body("project", "Invalid project").exists().notEmpty(),
  ]),
  taskController.createTask
);

/**
 * @route GET /tasks?page=1&limit=10
 * @description get list of tasks user can see with pagination
 * @access login required
 */
router.get("/", taskController.getTasks);

/**
 * @route GET /tasks/assignee/:taskId
 * @description get list of tasks of assignee
 * @body {assigneeId}
 * @access login required
 */
router.get(
  "/assignee/:taskId",
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("assigneeId", "Invalid assigneeId").exists().notEmpty(),
  ]),
  taskController.getAssigneeTasks
);

/**
 * @route PUT /tasks/assign/:taskId
 * @description user assign task to themselves ,only manager can assign to team members
 * @body {assigneeId}
 * @access login required
 */
router.put(
  "/assign/:taskId",
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("assigneeId", "Invalid assigneeId").exists().notEmpty(),
  ]),
  taskController.updateAssignee
);

/**
 * @route PUT /tasks/update/:taskId
 * @description add priority, deadline
 * @body {status, priority, deadline}
 * @access Manager login required
 */
router.put(
  "/update/:taskId",
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("priority", "Invalid priority").exists(),
    body("status", "Invalid status").exists(),
    body("deadLine", "Invalid deadline").exists().isDate(),
  ]),
  taskController.updateTaskDeadline
);

/**
 * @route PUT /tasks/comments/:taskId
 * @description add comment to task
 * @body { body}
 * @access login required
 */
router.put(
  "/comments/:taskId",
  validators.validate([
    param("taskId").exists().isString().custom(validators.checkObjectId),
    body("body", "Invalid body").exists().notEmpty(),
  ]),
  taskController.addTaskComment
);

module.exports = router;
