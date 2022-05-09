import {
  Logout,
  PersonAdd,
  Settings,
  AccountCircle,
  Dehaze,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function HeaderMenu({}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
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
          <AccountCircle sx={{ width: 32, height: 32 }} />
        </IconButton>
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
        <Link to="/auth/signin">
          <MenuItem
            sx={{
              color: "#000",
            }}
          >
            Đăng nhập
          </MenuItem>
        </Link>

        <Link to="/auth/register">
          <MenuItem
            sx={{
              color: "#000",
            }}
          >
            Đăng kí
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/host/create">
          <MenuItem
            sx={{
              color: "#000",
            }}
          >
            Cho thuê nhà
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}

export default HeaderMenu;
