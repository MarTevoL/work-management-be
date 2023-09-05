const Task = require("../models/Task");

const taskController = {};

taskController.createTask = async (req, res, next) => {
  res.send("Create task by manager");
};

taskController.getTasks = async (req, res, next) => {
  res.send("Get list of tasks of user");
};

taskController.getAssigneeTasks = async (req, res, next) => {
  res.send("Get list of tasks of assignee");
};

taskController.updateAssignee = async (req, res, next) => {
  res.send("Update task assignee");
};

taskController.updateTaskDeadline = async (req, res, next) => {
  res.send("Update task deadline");
};

taskController.updateTaskStatus = async (req, res, next) => {
  res.send("Update task status");
};

taskController.addTaskComment = async (req, res, next) => {
  res.send("Add comment in task");
};

module.exports = taskController;
