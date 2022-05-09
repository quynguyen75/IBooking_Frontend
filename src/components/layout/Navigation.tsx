import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { AccountCircle, Search } from "@mui/icons-material";

import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

type Props = {};

function Navigation({}: Props) {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "8px 0",
        zIndex: 1000,
      }}
      className={styles.navigation}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to="/">
          <BottomNavigationAction label="Khám phá" icon={<Search />} />
        </Link>

        <Link to="/auth">
          <BottomNavigationAction label="Đăng nhập" icon={<AccountCircle />} />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
