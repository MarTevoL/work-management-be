const Notification = require("../models/Notification");
require("express-async-errors");

const notificationController = {};

notificationController.getNotification = async (req, res, next) => {
  res.send("Get Notifications");
};

notificationController.sendNotification = async (req, res, next) => {
  res.send("Send a Notification");
};

notificationController.readNotification = async (req, res, next) => {
  res.send("Read a Notification");
};

notificationController.readAllNotifications = async (req, res, next) => {
  res.send("Read all Notifications");
};

module.exports = notificationController;
