const express = require("express");
const projectMemberController = require("../controllers/projectMember.controller");
const router = express.Router();
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");
const authentication = require("../middlewares/authentication");

/**
 * @route GET /projectMembers/projects/:userId?page=1&limit=10
 * @description get list of projects that user take part in
 * @access login required
 */
router.get(
  "/projects/:userId",
  authentication.loginRequired,
  validators.validate([
    param("userId").exists().isString().custom(validators.checkObjectId),
  ]),
  projectMemberController.getProjectList
);

/**
 * @route GET /projectMembers/:projectId?page=1&limit=10
 * @description get list of members take part in this project
 * @access manager login required
 */
router.get(
  "/members/:projectId",
  authentication.loginRequired,
  authentication.managerRequired,
  validators.validate([
    param("projectId").exists().isString().custom(validators.checkObjectId),
  ]),
  projectMemberController.getMemberList
);

module.exports = router;
