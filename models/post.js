const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
  updated: {type: Boolean, default: false},
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
