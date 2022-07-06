import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  Facebook,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  AUTH_API,
  LOGIN_FACEBOOK_API,
  LOGIN_GOOGLE_API,
} from "constant/resource";

import { IUser } from "interfaces";
import { UserContext } from "../../context/UserContext";

import styles from "./AuthForm.module.css";

type Props = {};

function LoginForm({}: Props) {
  const [error, setError] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isShowPassword: false,
  });
  const history = useHistory();
  const userContext = useContext(UserContext);

  const setEmail = (email: string) =>
    setFormData((data) => ({
      ...data,
      email,
    }));

  const setPassword = (password: string) =>
    setFormData((data) => ({
      ...data,
      password,
    }));

  const handleClickShowPassword = () =>
    setFormData((data) => ({
      ...data,
      isShowPassword: !data.isShowPassword,
    }));

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const loginSuccessfullHandler = (token: string, user: IUser) => {
    toast.success("Đăng nhập thành công");
    localStorage.setItem("token", token);
    userContext.setUser(user);
    history.goBack();
  };

  const fomrSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await fetch(AUTH_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
        } else {
          loginSuccessfullHandler(data.jwt, data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    postData();
  };

  const loginWithFacebookHandler = () => {
    const newTab = window.open(LOGIN_FACEBOOK_API, "", "popup=true");
    const timer = setInterval(function () {
      if (newTab && newTab.closed) {
        clearInterval(timer);
        window.location.href = "/";
      }
    }, 500);
  };

  const loginWithGoogleHandler = () => {
    const win = window.open(LOGIN_GOOGLE_API, "", "popup=true");

    const timer = setInterval(function () {
      if (win && win.closed) {
        clearInterval(timer);
        window.location.href = "/";
      }
    }, 500);
  };

  useEffect(() => {
    const listenMessage = (event: MessageEvent) => {
      console.log(event);
    };

    window.addEventListener("message", listenMessage);

    return () => window.removeEventListener("message", listenMessage);
  }, []);

  return (
    <Box component="form" autoComplete="off" onSubmit={fomrSubmitHandler}>
      <Typography variant="h5">Chào mừng đến với IBooking</Typography>
      <FormControl fullWidth>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          onChange={emailChangeHandler}
          error={Boolean(error)}
          helperText={error?.message}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type={formData.isShowPassword ? "text" : "password"}
          onChange={passwordChangeHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {formData.isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        className={styles.button}
      >
        Tiếp tục
      </Button>

      <div className={styles["divider"]}>
        <Divider />
        hoặc
        <Divider />
      </div>

      <Button
        fullWidth
        variant="outlined"
        className={`${styles.button} ${styles["button--social"]}`}
        onClick={loginWithFacebookHandler}
      >
        <Facebook />
        <span>Tiếp tục với Facebook</span>
      </Button>

      <Button
        fullWidth
        variant="outlined"
        className={`${styles.button} ${styles["button--social"]}`}
        onClick={loginWithGoogleHandler}
      >
        <Google />
        <span>Tiếp tục với Google</span>
      </Button>
    </Box>
  );
}

export default LoginForm;
