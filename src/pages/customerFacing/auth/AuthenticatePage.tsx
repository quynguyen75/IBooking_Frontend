import { Container, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

import AuthForm from "components/authForm/AuthForm";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import React from "react";

import styles from "./AuthenticatePage.module.css";

type Props = {};

function AuthenticatePage({}: Props) {
  const params: { type: string } = useParams();

  const isNotMobile = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isNotMobile && <Header />}
      <Container maxWidth="xs" className={styles.container}>
        <AuthForm type={params.type} />
      </Container>
      {isNotMobile && <Footer />}
    </>
  );
}

export default AuthenticatePage;
