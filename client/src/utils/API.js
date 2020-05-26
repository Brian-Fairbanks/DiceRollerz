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

  sendPost: async function(post){
    const data = await axios.post("/api/post", post);
    this.socketMsg(post);
    return data;
  },

  editPost: async function(id){
    console.log( "deleting "+id);
    const data = await axios.put("/api/post/"+id, {deleted:true});
    this.socketMsg(data.data);
    return data;
  },

  deletePost: async function(id){
    const data = await axios.put("/api/post/"+id, {deleted:true});
    this.socketMsg({...data.data});
    return data;
  },


  createNewChatroom: async function(chatOptions){
    const data = await axios.post("/api/chat", chatOptions);
    return data;
  },


  // Socket Send
  socketMsg(msg){
    console.log(msg);
    socket.emit('chatMessage', (msg));
  },
  socketListen(cb){
    socket.on("newMessage", (msg) => {cb(msg)});
  }
};
