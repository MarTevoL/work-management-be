const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  body: { type: String, require: true },
});

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
    projectId: { type: Schema.Types.ObjectId, require: true, ref: "Project" },
    dueDate: { type: String, require: true, default: "" },
    comments: [commentSchema],

    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskScheme);
module.exports = Task;
