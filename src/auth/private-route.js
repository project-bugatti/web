import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { REDIRECT_ROUTE} from "./redirect-route";


const PrivateRoute = ({ component: Component, ...rest }) => {

  const isAuthenticated = rest.auth.isAuthenticated();

  // If not authenticated, save the last route the user tried to access
  if (!isAuthenticated) {
    const redirectRoute = rest.location.pathname;
    localStorage.setItem(REDIRECT_ROUTE, redirectRoute);
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/guest",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;