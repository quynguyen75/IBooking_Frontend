import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  AccountCircle,
  Search,
  PendingActions,
  Money,
  House,
} from "@mui/icons-material";

import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "context/UserContext";

type Props = {};

function Navigation({}: Props) {
  const [value, setValue] = useState(0);

  const userContext = useContext(UserContext);

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

        {!userContext.user && (
          <Link to="/auth/signin">
            <BottomNavigationAction
              label="Đăng nhập"
              icon={<AccountCircle />}
            />
          </Link>
        )}

        {userContext.user && (
          <>
            <Link to={`/pendingBookings?user=${userContext.user.id}`}>
              <BottomNavigationAction
                label="Đang chờ thanh toán"
                icon={<PendingActions />}
              />
            </Link>

            <Link to={`/host/create`}>
              <BottomNavigationAction label="Cho thuê nhà" icon={<Money />} />
            </Link>

            <Link to={`/host/manage`}>
              <BottomNavigationAction label="Quản lí phòng" icon={<House />} />
            </Link>
          </>
        )}
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
