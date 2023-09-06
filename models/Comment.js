const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  author: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  body: { type: String, require: true },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
