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

  getUsers: function(){
    return axios.get("/api/user");
  },

  sendPost: async function(id, post){
    const data = await axios.post("/api/post"+id, post);
    this.socketMsg(post);
    return data;
  },
  sendPost: async function(post){
    const data = await axios.put("/api/post", post);
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
