import axios from "axios";
// set up socket info 
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

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

  sendPost: function(post){
    this.socketMsg();
    return axios.post("/api/post", post);
  },



  socketMsg(){
    console.log("Should emit to socket")
    socket.emit('chatMessage', ("Testing"));
  }
};
