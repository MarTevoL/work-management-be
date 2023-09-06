const { sendResponse, AppError } = require("../helpers/utils");
const Project = require("../models/Project");
require("express-async-errors");

const projectController = {};

projectController.getProjects = async (req, res, next) => {
  res.send("Get list of projects by manager");
};

projectController.createProject = async (req, res, next) => {
  //TODO: check user.role === manager
  let { title, description } = req.body;

  let project = await Project.findOne({ title });
  if (project)
    throw new AppError(400, "Project already exists", "Create Project Error");

  project = await Project.create({ title, description });

  sendResponse(res, 200, true, { project }, null, "Create Project successful");
};

projectController.updateProject = async (req, res, next) => {
  res.send("Update a project by manager");
};

projectController.addProjectComment = async (req, res, next) => {
  res.send("Add comment in project");
};

module.exports = projectController;
