const { AppError, sendResponse } = require("../helpers/utils");
const Notification = require("../models/Notification");
const Project = require("../models/Project");
const Task = require("../models/Task");
require("express-async-errors");

const notificationController = {};

notificationController.getNotification = async (req, res, next) => {
  const currentUserId = req.userId;

  let { page, limit, ...filter } = { ...req.query };

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ read: false }, { userId: currentUserId }];
  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Notification.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let notifs = await Notification.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { notifs, totalPages, count },
    null,
    "Get all notifications successfull"
  );
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

  notif = await Notification.create({
    targetType,
    targetId,
    title,
    body,
  });

  sendResponse(res, 200, true, { notif }, null, "Send notification successful");
};

notificationController.readNotification = async (req, res, next) => {
  const notifId = req.params.notifId;

  let notif = await Notification.findById(notifId);
  if (!notif)
    throw new AppError(400, "Invalid notification", "Read notification error");

  notif = await Notification.findByIdAndUpdate(
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

  await Notification.updateMany({ read: false }, { $set: { read: true } });

  sendResponse(res, 200, true, null, null, "Read all notification successful");
};

module.exports = notificationController;
