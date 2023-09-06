const express = require("express");
const notificationController = require("../controllers/notification.controller");
const router = express.Router();
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");
const authentication = require("../middlewares/authentication");

/**
 * @route GET /notifications?page=1&limit=10
 * @description get list of notification user can see with pagination
 * @access login required
 */
router.get(
  "/",
  authentication.loginRequired,
  notificationController.getNotification
);

/**
 * @route POST /notifications
 * @description post a notification
 * @body {taskId ,projectId, title, body}
 * @access login required
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("taskId").exists().isString().custom(validators.checkObjectId),
    body("projectId").exists().isString().custom(validators.checkObjectId),
    body("title", "Invalid title").exists().notEmpty(),
    body("body", "Invalid body").exists().notEmpty(),
  ]),
  notificationController.sendNotification
);

/**
 * @route PUT /notifications/:notifId
 * @description read a notification
 * @access login required
 */
router.put(
  "/:notifId",
  authentication.loginRequired,
  validators.validate([
    param("notifId").exists().isString().custom(validators.checkObjectId),
  ]),
  notificationController.readNotification
);

/**
 * @route PUT /notifications/readAll
 * @description read all notifications
 * @access login required
 */
router.put(
  "/readAll/:userId",
  authentication.loginRequired,
  notificationController.readAllNotifications
);

module.exports = router;
