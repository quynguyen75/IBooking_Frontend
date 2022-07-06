import { UserContext } from "context/UserContext";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

function useUser() {
  const user = useContext(UserContext);
  const history = useHistory();
  const lastLocation = useLocation();
  if (!user.user) {
    history.push(
      `/auth/signin?redirectTo=${lastLocation.pathname + lastLocation.search}`
    );
  }
}

export default useUser;
