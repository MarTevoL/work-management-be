const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = Schema(
  {
    targetType: { type: String, enum: ["Task", "Project"], require: true },
    targetId: {
      type: Schema.Types.ObjectId,
      require: true,
      refPath: "targetType",
    },
    body: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
