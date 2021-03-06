import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

function LoginProvider({}: Props) {
  const userContext = useContext(UserContext);
  const param: { type: string } = useParams();
  const { search } = useLocation();

  // get User
  useEffect(() => {
    const getUser = async function () {
      try {
        const response = await fetch(
          `https://ibooking-backend.herokuapp.com/api/auth/${param.type}/callback${search}`
        );
        const user = await response.json();

        if (response.ok) {
          localStorage.setItem("token", user.jwt);
          console.log(user);

          window.opener.postMessage(
            JSON.stringify({
              type: "success",
              message: "Đăng nhập thành công",
            }),
            "*"
          );
        } else {
          window.opener.postMessage(
            JSON.stringify({
              type: "error",
              message: "Đăng nhập thất bại",
            }),
            "*"
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        window.close();
      }
    };

    getUser();
  }, [param, search]);

  return <></>;
}

export default LoginProvider;
