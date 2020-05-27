const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email:  { type: String, required: true },
  tagLine: { type: String },
  status: { type: String }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
