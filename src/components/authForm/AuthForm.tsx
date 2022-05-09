import React, { useState } from "react";
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
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {};

function AuthForm({}: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const tabChangeHandler = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  console.log(tabIndex);
  return (
    <Card className={styles.form}>
      <header className={styles["card-header"]}>
        <Tabs
          value={tabIndex}
          aria-label="basic tabs example"
          onChange={tabChangeHandler}
        >
          <Tab label="Đăng nhập" />
          <Tab label="Đăng ký" />
        </Tabs>
      </header>
      <Divider />

      <CardContent className={styles["card-content"]}>
        {tabIndex === 0 ? <LoginForm /> : <RegisterForm />}
      </CardContent>
    </Card>
  );
}

export default AuthForm;
