const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
    role: {
      type: String,
      enum: ["Manager", "Staff"],
      require: true,
      default: "Staff",
    },

    isDeleted: { type: Boolean, default: false, select: false },
    taskCount: { type: Number, default: 0 },
    projectCount: { type: Number, default: 0 },
    notificationCount: { type: Number, default: 0 },
    isDarkMode: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  delete user.isDeleted;
  return user;
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign(
    { _id: this._id, role: this.role },
    JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
