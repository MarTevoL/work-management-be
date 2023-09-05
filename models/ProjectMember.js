const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectMemberSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    projectId: { type: Schema.Types.ObjectId, require: true, ref: "Project" },
  },
  {
    timestamps: true,
  }
);

const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);
module.exports = ProjectMember;
