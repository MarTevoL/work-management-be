const ProjectMember = require("../models/ProjectMember");
require("express-async-errors");

const projectMemberController = {};

projectMemberController.getProjectList = async (req, res, next) => {
  res.send("Get user's projects list");
};

projectMemberController.getMemberList = async (req, res, next) => {
  res.send("Get project's members list");
};

module.exports = projectMemberController;
