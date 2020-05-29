const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
  name: { type: String, required: true },
  members:[
    {
      user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true 
      },
      role: {type:String},
      
      }
      
  ],
  gameMode: {type: Boolean, default: false}
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
