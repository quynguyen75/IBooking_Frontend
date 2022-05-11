import React, { useRef } from "react";
import styles from "./AuthForm.module.css";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { REGISTER_API } from "constant/resource";

type Props = {};

function RegisterForm({}: Props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const userData = {
      username: `${firstNameRef.current?.value} ${lastNameRef.current?.value}`,
      email: emailRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      password: passwordRef.current?.value,
    };

    e.preventDefault();

    const register = async () => {
      try {
        const response = await fetch(REGISTER_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      } catch (error) {
        console.log(error);
      }
    };

    register();
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            inputRef={firstNameRef}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            inputRef={lastNameRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            inputRef={phoneNumberRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            inputRef={emailRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            inputRef={passwordRef}
          />
        </Grid>
      </Grid>
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
      >
        <Facebook />
        <span>Tiếp tục với Facebook</span>
      </Button>

      <Button
        fullWidth
        variant="outlined"
        className={`${styles.button} ${styles["button--social"]}`}
      >
        <Google />
        <span>Tiếp tục với Google</span>
      </Button>
    </Box>
  );
}

export default RegisterForm;
