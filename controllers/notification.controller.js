const { AppError, sendResponse } = require("../helpers/utils");
const NotifSubscriber = require("../models/NotifSubscriber");
const Notification = require("../models/Notification");
const Project = require("../models/Project");
const Task = require("../models/Task");
require("express-async-errors");

const notificationController = {};

notificationController.getNotification = async (req, res, next) => {
  res.send("Get Notifications");
};

notificationController.createNotification = async (req, res, next) => {
  let { targetType, targetId, title, body } = req.body;

  if (targetType === "Task") {
    const task = await Task.findById(targetId);
    if (!task)
      throw new AppError(400, "Invalid task", "Send notification error");
  }

  if (targetType === "Project") {
    const project = await Project.findById(targetId);
    if (!project)
      throw new AppError(400, "Invalid project", "Send notification error");
  }

  const notif = await Notification.create({
    targetType,
    targetId,
    title,
    body,
  });

  await NotifSubscriber.create({ notificationId: notif._id });

  sendResponse(res, 200, true, { notif }, null, "Send notification successful");
};

notificationController.readNotification = async (req, res, next) => {
  const notifId = req.params.notifId;

  let notif = await NotifSubscriber.findById(notifId);
  if (!notif)
    throw new AppError(400, "Invalid notification", "Read notification error");

  notif = await NotifSubscriber.findByIdAndUpdate(
    notifId,
    { $set: { read: true } },
    { new: true }
  );

  sendResponse(res, 200, true, { notif }, null, "Read notification successful");
};

notificationController.readAllNotifications = async (req, res, next) => {
  const currentUserId = req.userId;
  const userId = req.params.userId;

  if (currentUserId !== userId)
    throw new AppError(401, "Invalid user", "Read all notification error");

  await NotifSubscriber.updateMany({ read: false }, { $set: { read: true } });

  sendResponse(res, 200, true, null, null, "Read all notification successful");
};

notificationController.subscribeNotification = async (req, res, next) => {
  const currentUserId = req.userId;
  const targetId = req.params.targetId;

  let notification = await Notification.findOne({ targetId: targetId });
  if (!notification)
    throw new AppError(
      400,
      "Notification not found",
      "Notification subcriber error"
    );

  let notifSubcriber = await NotifSubscriber.findOne({
    notificationId: notification._id,
  });
  console.log(notifSubcriber);
  if (!notifSubcriber)
    throw new AppError(
      400,
      "NotifSubcriber not found",
      "Notification subcriber error"
    );

  notifSubcriber = await NotifSubscriber.findByIdAndUpdate(
    notifSubcriber._id,
    { $set: { userId: currentUserId } },
    { new: true }
  );

  sendResponse(
    res,
    200,
    true,
    { notifSubcriber },
    null,
    "Subcribe notification successful"
  );
};

module.exports = notificationController;
