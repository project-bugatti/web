import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const {isAuthenticated} = rest.auth;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/paywall",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;