const { sendResponse, AppError } = require("../helpers/utils");
const Project = require("../models/Project");
require("express-async-errors");

const projectController = {};

projectController.getProjects = async (req, res, next) => {
  const userRole = req.userRole;
  let { page, limit, ...filter } = { ...req.query };

  if (userRole !== "Manager")
    throw new AppError(400, "Invalid user, only Manager are allowed");

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

  const count = await Project.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let projects = await Project.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { projects, totalPages, count },
    null,
    ""
  );
};

projectController.createProject = async (req, res, next) => {
  const userRole = req.userRole;
  let { title, description } = req.body;

  if (userRole !== "Manager")
    throw new AppError(400, "Invalid user, only Manager are allowed");

  let project = await Project.findOne({ title });
  if (project)
    throw new AppError(400, "Project already exists", "Create Project Error");

  project = await Project.create({ title, description });

  sendResponse(res, 200, true, { project }, null, "Create Project successful");
};

projectController.updateProject = async (req, res, next) => {
  const userRole = req.userRole;
  let { title, description } = req.body;
  const projectId = req.params.projectId;

  if (userRole !== "Manager")
    throw new AppError(400, "Invalid user, only Manager are allowed");

  let project = await Project.findById({ _id: projectId });
  console.log(projectId);

  if (!project)
    throw new AppError(400, "Project is not exists", "Update Project Error");

  const allows = ["title", "description"];

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      project[field] = req.body[field];
    }
  });

  await project.save();

  sendResponse(res, 200, true, { project }, null, "Update project successful");
};

projectController.addProjectComment = async (req, res, next) => {
  res.send("Add comment in project");
};

module.exports = projectController;
