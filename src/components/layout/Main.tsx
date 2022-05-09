import { Container } from "@mui/material";
import React from "react";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

function Main({ children }: Props) {
  return (
    <main
      style={{
        paddingTop: "var(--header-height)",
      }}
    >
      <Container>{children}</Container>
    </main>
  );
}

export default Main;
