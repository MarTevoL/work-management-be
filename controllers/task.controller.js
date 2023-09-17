const { AppError, sendResponse } = require("../helpers/utils");
const Notification = require("../models/Notification");
const Project = require("../models/Project");
const ProjectMember = require("../models/ProjectMember");
const Task = require("../models/Task");
const User = require("../models/User");
require("express-async-errors");

const taskController = {};

taskController.createTask = async (req, res, next) => {
  let { title, description, projectId } = req.body;

  let task = await Task.findOne({ title });
  if (task) throw new AppError(400, "task already exists", "Create Task Error");

  let proj = await Project.findOne({ _id: projectId });
  if (!proj) throw new AppError(400, "Project not exists", "Create Task Error");

  task = await Task.create({ title, description, projectId });

  await Notification.create({ taskId: task._id, title: title });

  sendResponse(res, 200, true, { task }, null, "Create Task successful");
};

taskController.getAllTasks = async (req, res, next) => {
  const role = req.userRole;
  let { page, limit, ...filter } = { ...req.query };

  if (role !== "Manager") {
    throw new AppError(
      400,
      "Invalid role, Only manage are allow",
      "Get Task Error"
    );
  }
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ isDeleted: false }];
  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Task.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let tasks = await Task.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { tasks, totalPages, count },
    null,
    "Get all tasks successful"
  );
};

taskController.getUserTasks = async (req, res, next) => {
  const currentUserId = req.userId;
  const role = req.userRole;
  let userId = req.params.userId;
  let { page, limit, ...filter } = { ...req.query };

  if (currentUserId !== userId && role !== "Manager") {
    throw new AppError(
      400,
      "Invalid role, current user id are not allow",
      "Get Task Error"
    );
  }
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ isDeleted: false }, { assignee: userId }];
  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Task.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let tasks = await Task.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(res, 200, true, { tasks, totalPages, count }, null, "");
};

taskController.getProjectTasks = async (req, res, next) => {
  const role = req.userRole;
  let projectId = req.params.projectId;
  let { page, limit, ...filter } = { ...req.query };

  if (role !== "Manager") {
    throw new AppError(
      400,
      "Invalid role, current user id are not allow",
      "Get Task Error"
    );
  }
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ isDeleted: false }, { projectId: projectId }];
  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Task.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let tasks = await Task.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(res, 200, true, { tasks, totalPages, count }, null, "");
};

taskController.updateTaskStatus = async (req, res, next) => {
  const taskId = req.params.taskId;

  let task = await Task.findById(taskId);
  if (!task) throw new AppError(400, "Task not found", "Update task error");

  const allows = ["priority", "assignee", "dueDate"];

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      task[field] = req.body[field];
    }
  });

  await task.save();

  //if assignee in body, Update projectID and userId to projectMember
  if (req.body["assignee"] !== undefined)
    await ProjectMember.create({
      userId: req.body["assignee"],
      projectId: task.projectId,
    });

  await Notification.create({
    userId: task.assignee,
    taskId: taskId,
    title: task.title,
    body: `Your task has update`,
  });

  sendResponse(res, 200, true, { task }, null, "Update task successful");
};

taskController.addTaskComment = async (req, res, next) => {
  const currentUserId = req.userId;
  const taskId = req.params.taskId;
  let { body } = req.body;

  let task = await Task.findById(taskId);
  if (!task) throw new AppError(400, "Task not found", "Task comment error");

  task = Task.findByIdAndUpdate(
    taskId,
    { $push: { comments: { user: currentUserId, body: body } } },
    { new: true }
  ).then(function (post) {
    console.log(post);
  });

  await Notification.create({
    userId: task.assignee,
    taskId: taskId,
    title: task.title,
    body: `Your task has comment`,
  });

  sendResponse(res, 200, true, { task }, null, "Comment on task successful");
};

taskController.deleteTask = async (req, res, next) => {
  const userRole = req.userRole;
  const taskId = req.params.taskId;

  if (userRole !== "Manager")
    throw new AppError(400, "Invalid user, only Manager are allowed");

  let task = await Task.findById(taskId);
  if (!task) throw new AppError(400, "Task is not exists", "Update Task Error");

  const result = await Task.findByIdAndUpdate(
    taskId,
    { isDeleted: true },
    { new: true }
  );

  await Notification.create({
    userId: task.assignee,
    taskId: taskId,
    title: task.title,
    body: `Your task has been deleted`,
  });

  sendResponse(res, 200, true, { result }, null, "Delete task successful");
};

module.exports = taskController;
