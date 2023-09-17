const { sendResponse, AppError } = require("../helpers/utils");
const ProjectMember = require("../models/ProjectMember");
require("express-async-errors");

const projectMemberController = {};

projectMemberController.getProjectList = async (req, res, next) => {
  const currentUserId = req.userId;
  const role = req.userRole;
  let userId = req.params.userId;
  let { page, limit, ...filter } = { ...req.query };

  if (currentUserId !== userId && role !== "Manager") {
    throw new AppError(
      400,
      "Invalid user role, current user id are not allow",
      "Get member's project Error"
    );
  }

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ isDeleted: false }, { userId: userId }];
  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await ProjectMember.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let projects = await ProjectMember.find(filterCriteria)
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

projectMemberController.getMemberList = async (req, res, next) => {
  const currentUserId = req.userId;
  const role = req.userRole;
  let projectId = req.params.projectId;
  let { page, limit, ...filter } = { ...req.query };

  if (role !== "Manager") {
    throw new AppError(
      400,
      "Invalid user role, Only Manager are allowed",
      "Get member Error"
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

  const count = await ProjectMember.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let members = await ProjectMember.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { members, totalPages, count },
    null,
    "Get project members successful"
  );
};

module.exports = projectMemberController;
