const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
    role: { type: String, enum: ["Manager", "Staff"], require: true },

    isDeleted: { type: Boolean, default: false, select: false },
    taskCount: { type: Number, default: 0 },
    projectCount: { type: Number, default: 0 },
    notificationCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
