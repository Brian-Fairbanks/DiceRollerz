const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imgPath ="https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg?quality=90&auto=webp"

const postSchema = new Schema({
  body: { type: String, required: true },
  sender: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true 
  },
  room: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"Chatroom",
    required: true 
  },
  timestamp: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
  updated: {type: Boolean, default: false},
  
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
