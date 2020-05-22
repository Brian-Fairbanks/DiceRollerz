import axios from "axios";

export default {
  getChatrooms: function(query) {
    return axios.get("/api/chat");
  },

  getChatroom: function(id){
    return axios.get("/api/chat/"+id);
  },

  getUsers: function(){
    return axios.get("/api/user");
  }
};
