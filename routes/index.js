var express = require("express");
var router = express.Router();

const authApi = require("./auth.api");
router.use("/auth", authApi);

const userApi = require("./user.api");
router.use("/users", userApi);

const projectApi = require("./project.api");
router.use("/projects", projectApi);

const taskApi = require("./task.api");
router.use("/tasks", taskApi);

const commentApi = require("./comment.api");
router.use("/comments", commentApi);

const notificationApi = require("./notification.api");
router.use("/notifications", notificationApi);

const projectMemberApi = require("./projectMember.api");
router.use("/projectMembers", projectMemberApi);

module.exports = router;
