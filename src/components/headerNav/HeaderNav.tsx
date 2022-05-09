import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./HeaderNav.module.css";
import Menu from "components/menu/HeaderMenu";

type Props = {};

function HeaderNav({}: Props) {
  return (
    <div className={styles.headerNav}>
      <Link to="/host/create">
        <Button className={styles.becomeHostButton} variant="text">
          Trở thành chủ nhà
        </Button>
      </Link>
      <Menu />
    </div>
  );
}

export default HeaderNav;
