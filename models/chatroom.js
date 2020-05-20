const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
  name: { type: String, required: true },
  members:[
    {
      userID:{type:String},
      role: {type:String}
    }
  ],
  posts:[{
    body: { type: String, required: true },
    sender: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false},
    updated: {type: Boolean, default: false}
  }],
  gameMode: {type: Boolean, default: false},
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
