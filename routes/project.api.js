const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");

/**
 * @route Get /projects/?page=1&limit=10
 * @description get list of projects
 * @access Manager login required
 */
router.get("/", projectController.getProjects);

/**
 * @route POST /projects
 * @description create a project
 * @body {title, description}
 * @access Manager login required
 */
router.post(
  "/",
  validators.validate([
    body("title", "Invalid title").exists().notEmpty(),
    body("description", "Invalid description").exists().notEmpty(),
  ]),
  projectController.createProject
);

/**
 * @route PUT /projects/:projectId
 * @description update a project
 * @body {title, description}
 * @access Manager login required
 */
router.put(
  "/:projectId",
  validators.validate([
    param("projectId").exists().isString().custom(validators.checkObjectId),
    body("title", "Invalid title").notEmpty(),
    body("description", "Invalid description").notEmpty(),
  ]),
  projectController.updateProject
);

module.exports = router;
