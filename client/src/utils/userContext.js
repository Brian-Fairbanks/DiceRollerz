import React from "react";

const UserContext = React.createContext({
  user:{},
  token:""
});

export default UserContext;
