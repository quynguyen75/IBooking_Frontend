import { Container, useMediaQuery } from "@mui/material";
import AuthForm from "components/authForm/AuthForm";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import React from "react";

import styles from "./AuthenticatePage.module.css";

type Props = {};

function AuthenticatePage({}: Props) {
  const isNotMobile = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isNotMobile && <Header />}
      <Container maxWidth="xs" className={styles.container}>
        <AuthForm />
      </Container>
      {isNotMobile && <Footer />}
    </>
  );
}

export default AuthenticatePage;
