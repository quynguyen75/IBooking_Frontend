import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

function LoginProvider({}: Props) {
  const userContext = useContext(UserContext);
  const param: { type: string } = useParams();
  const { search } = useLocation();

  const [user, setUser] = useState<any>(null);

  // get User
  useEffect(() => {
    const getUser = async function () {
      try {
        const response = await fetch(
          `https://ibooking-backend.herokuapp.com/api/auth/${param.type}/callback${search}`
        );
        const user = await response.json();

        setUser(user);

        if (response.ok) {
          localStorage.setItem("token", user.jwt);
          userContext.setUser(user.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        window.close();
      }
    };

    getUser();
  }, [param, search]);

  // detect window close
  useEffect(() => {
    const pushNotification = () => {
      if (window.closed && user) {
        if (user.message) {
          toast.error("Đăng nhập thất bại");
        } else {
          toast.success("Đăng nhập thành công");
        }
      }
    };
    const intervalId = setInterval(pushNotification, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <></>;
}

export default LoginProvider;
