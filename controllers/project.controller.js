const Project = require("../models/Project");
require("express-async-errors");

const projectController = {};

projectController.getProjects = async (req, res, next) => {
  res.send("Get list of projects by manager");
};

projectController.createProject = async (req, res, next) => {
  res.send("create a project by manager");
};

projectController.updateProject = async (req, res, next) => {
  res.send("Update a project by manager");
};

projectController.addProjectComment = async (req, res, next) => {
  res.send("Add comment in project");
};

module.exports = projectController;
