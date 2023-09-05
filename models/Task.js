const mongoose = require("mongoose");
const commentSchema = require("./Comment");
const Schema = mongoose.Schema;

const taskScheme = Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    priority: {
      type: String,
      enum: ["Urgent", "High", "Normal", "Low"],
      default: "Normal",
      require: true,
    },
    status: {
      type: String,
      enum: ["Open", "Review", "Development", "Closed"],
      default: "Open",
      require: true,
    },
    assignee: { type: Schema.Types.ObjectId, require: false, ref: "User" },
    project: { type: Schema.Types.ObjectId, require: true, ref: "Project" },
    dueDate: { type: Date, require: true },
    comment: [commentSchema],

    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskScheme);
module.exports = Task;
