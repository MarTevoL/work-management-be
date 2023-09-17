const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: false, ref: "User" },
    taskId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Task",
    },
    title: { type: String, require: true },
    body: { type: String, require: false },
    read: { type: Boolean, require: false, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
