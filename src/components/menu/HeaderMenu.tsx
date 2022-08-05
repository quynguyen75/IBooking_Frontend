import {
  Logout,
  PersonAdd,
  Settings,
  AccountCircle,
  Dehaze,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { BOOKING_API } from "constant/resource";
import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store/store";

type Props = {};

function HeaderMenu({}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userContext = useContext(UserContext);
  const flagNotify = useSelector(
    (state: RootState) => state.notifyBooking.flag
  );

  const [pendingBookingCount, setPendingBookingCount] = useState(0);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    userContext.setUser(null);
  };

  useEffect(() => {
    const getPendingBooking = async () => {
      try {
        const response = await fetch(
          BOOKING_API +
            `?filters[user][id][$eq]=${userContext.user.id}&filters[paymentStatus][id][$eq]=1`
        );

        const bookings = await response.json();

        setPendingBookingCount(bookings.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    if (userContext.user) {
      getPendingBooking();
    }
  }, [flagNotify]);

  return (
    <>
      <Tooltip title="Account settings">
        <Badge badgeContent={pendingBookingCount ? 1 : 0} color="primary">
          <IconButton
            onClick={handleClick}
            size="medium"
            style={{
              borderRadius: "21px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Dehaze />
            {userContext.user ? (
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#c9ccd1" }}>
                {userContext.user.username?.slice(0, 1).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircle sx={{ width: 32, height: 32 }} />
            )}
          </IconButton>
        </Badge>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!userContext.user && [
          <Link to="/auth/signin" key="signin">
            <MenuItem
              sx={{
                color: "#000",
              }}
            >
              Đăng nhập
            </MenuItem>
          </Link>,

          <Link to="/auth/register" key="register">
            <MenuItem
              sx={{
                color: "#000",
              }}
            >
              Đăng kí
            </MenuItem>
          </Link>,
        ]}
        {userContext.user && [
          <Badge badgeContent={pendingBookingCount} color="primary">
            <Link
              to={`/pendingBookings?user=${userContext.user.id}`}
              key="create"
            >
              <MenuItem
                sx={{
                  color: "#000",
                }}
              >
                Đang chờ thanh toán
              </MenuItem>
            </Link>
          </Badge>,
          <Link to={`/bookedBookings?user=${userContext.user.id}`} key="create">
            <MenuItem
              sx={{
                color: "#000",
              }}
            >
              Đơn đã đặt
            </MenuItem>
          </Link>,
          <Link to="/host/create" key="create">
            <MenuItem
              sx={{
                color: "#000",
              }}
            >
              Cho thuê nhà
            </MenuItem>
          </Link>,

          <Link to="/host/manage" key="manage">
            <MenuItem
              sx={{
                color: "#000",
              }}
            >
              Quản lí phòng
            </MenuItem>
          </Link>,

          <Divider key="divider" />,
          <MenuItem
            onClick={logoutHandler}
            key="logout"
            sx={{
              color: "#000",
            }}
          >
            Đăng xuất
          </MenuItem>,
        ]}
      </Menu>
    </>
  );
}

export default HeaderMenu;
