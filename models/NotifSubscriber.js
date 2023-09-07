const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifSubscriberSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: false, ref: "User" },
    notificationId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Notification",
    },
    read: { type: Boolean, require: false, default: false },
  },
  {
    timestamps: true,
  }
);

const NotifSubscriber = mongoose.model(
  "NotifSubscriber",
  notifSubscriberSchema
);
module.exports = NotifSubscriber;
