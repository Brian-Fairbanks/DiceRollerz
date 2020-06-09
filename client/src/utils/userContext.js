import React from "react";

const UserContext = React.createContext({
  user:{},
  token:"NotSet"
});

export default UserContext;
