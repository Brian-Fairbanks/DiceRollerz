import React from "react";

const UserContext = React.createContext({
  user:{},
  token:"",
  isAuthenticated: () => {return this.user?true:false}
});

export default UserContext;
