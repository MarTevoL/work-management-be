const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitationSchema = Schema(
  {
    email: { type: String, require: true },
    activate: { type: Boolean, require: false, default: false },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;
