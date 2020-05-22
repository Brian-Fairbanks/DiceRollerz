import axios from "axios";

export default {
  getChatrooms: function(query) {
    return axios.get("/api/chat");
  }
};
