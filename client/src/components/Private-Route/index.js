import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../utils/userContext";

const { user, isAuthenticated } = useContext(UserContext);

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;