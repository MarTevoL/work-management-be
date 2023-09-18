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
    body("projectId", "Invalid projectId")
      .exists()
      .notEmpty()
      .custom(validators.checkObjectId),
  ]),
  taskController.createTask
);

/**
 * @route GET /tasks?page=1&limit=10
 * @description get all tasks
 * @access Manager login required
 */
router.get(
  "/",
  authentication.loginRequired,
  authentication.managerRequired,
  taskController.getAllTasks
);

/**
 * @route GET /tasks/:userId?page=1&limit=10
 * @description get list of tasks user can see with pagination
 * @access login required
 */
router.get(
  "/:userId",
  authentication.loginRequired,
  validators.validate([
    param("userId").exists().isString().custom(validators.checkObjectId),
  ]),
  taskController.getUserTasks
);

/**
 * @route GET /tasks/project/:projectId?page=1&limit=10
 * @description get list of tasks of project
 * @access manager required
 */
router.get(
  "/project/:projectId",
  authentication.loginRequired,
  authentication.managerRequired,
  validators.validate([
    param("projectId").exists().isString().custom(validators.checkObjectId),
  ]),
  taskController.getProjectTasks
);

/**
 * @route PUT /tasks/:taskId
 * @description add priority, dueDate
 * @body {status, priority, dueDate}
 * @access Manager login required
 */
router.put(
  "/:taskId",

  authentication.loginRequired,
  authentication.managerRequired,
  validators.validate([
    body("dueDate", "Invalid dueDate").isString().optional(),
    body("status", "Invalid status").isString().optional(),
    body("priority", "Invalid priority").isString().optional(),
  ]),
  taskController.updateTaskStatus
);

/**
 * @route DELETE /tasks/:taskId
 * @description delete task
 * @access Manager login required
 */

router.delete(
  "/:taskId",
  authentication.loginRequired,
  authentication.managerRequired,
  taskController.deleteTask
);
module.exports = router;
