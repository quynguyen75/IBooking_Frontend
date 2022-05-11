import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

type Props = {
  type: string;
};

function AuthForm({ type }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const tabChangeHandler = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  useEffect(() => {
    setTabIndex(type === "signin" ? 0 : 1);
  }, [type]);

  return (
    <Card className={styles.form}>
      <header className={styles["card-header"]}>
        <Tabs
          value={tabIndex}
          aria-label="basic tabs example"
          onChange={tabChangeHandler}
        >
          <Link to="/auth/signin">
            <Tab
              label="Đăng nhập"
              style={{
                color: "#1976d2",
                opacity: 1,
              }}
            />
          </Link>

          <Link to="/auth/register">
            <Tab
              label="Đăng ký"
              style={{
                color: "#1976d2",
                opacity: 1,
              }}
            />
          </Link>
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
