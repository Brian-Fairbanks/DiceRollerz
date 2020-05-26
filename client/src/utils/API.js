import axios from "axios";
// set up socket info 
import openSocket from 'socket.io-client';
const socket = openSocket.connect();//openSocket('http://localhost:3001');

export default {
  getChatrooms: function(query) {
    return axios.get("/api/chat");
  },

  getChatroom: function(id){
    return axios.get("/api/chat/"+id);
  },

  getUser: function(id){
    return axios.get("/api/user/"+id);
  },

  getUsers: function(){
    return axios.get("/api/user");
  },

  updateUser: async function(user){
    const data = await axios.put("/api/user/"+user._id, user);
    this.socketMsg(user);
    return data;
  },
  sendPost: async function(post){
    const data = await axios.post("/api/post", post);
    this.socketMsg(post);
    return data;
  },

  createNewChatroom: async function(chatOptions){
    const data = await axios.post("/api/chat", chatOptions);
    return data;
  },


  // Socket Send
  socketMsg(msg){
    socket.emit('chatMessage', (msg));
  },
  socketListen(cb){
    socket.on("newMessage", (msg) => {cb(msg)});
  }
};
