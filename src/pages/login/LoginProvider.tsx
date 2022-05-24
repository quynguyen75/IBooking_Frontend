import { UserContext } from "context/UserContext";
import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

type Props = {};

function LoginProvider({}: Props) {
  const userContext = useContext(UserContext);
  const param: { type: string } = useParams();
  const { search } = useLocation();

  useEffect(() => {
    const getUser = async function () {
      try {
        const response = await fetch(
          `https://ibooking-backend.herokuapp.com/api/auth/${param.type}/callback${search}`
        );
        const user = await response.json();

        console.log(user);

        localStorage.setItem("token", user.jwt);
        userContext.setUser(user.user);
      } catch (error) {
        console.log(error);
      } finally {
        // window.close();
      }
    };

    getUser();
  }, [param, search]);

  return <></>;
}

export default LoginProvider;
