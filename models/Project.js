const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    isDeleted: { type: Boolean, require: false, default: false },
  },
  {
    timestamps: true,
  }
);

projectSchema.methods.toJSON = function () {
  const project = this._doc;
  delete project.isDeleted;
  return project;
};

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
