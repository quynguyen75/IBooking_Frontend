import { UserContext } from "context/UserContext";
import React, { Component, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }: any) {
  const user = useContext(UserContext);

  console.log(user);

  return (
    <Route
      {...rest}
      render={() => {
        return user.user ? children : <Redirect to="/auth/signin" />;
      }}
    />
  );
}

export default PrivateRoute;
