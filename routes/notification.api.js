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
 * @route PUT /notifications/:userId/all
 * @description read all notifications
 * @access login required
 */
router.put(
  "/:userId/all",
  authentication.loginRequired,
  notificationController.readAllNotifications
);

module.exports = router;
