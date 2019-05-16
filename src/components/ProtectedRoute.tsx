import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return <div />;
  }

  if (isAuthenticated) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )}
      />
    );
  }
};

export default ProtectedRoute;
