import React from "react";
import styles from "./AuthForm.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";

type Props = {};

function LoginForm({}: Props) {
  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h5">Chào mừng đến với IBooking</Typography>
      <FormControl fullWidth>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          type="password"
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

export default LoginForm;
