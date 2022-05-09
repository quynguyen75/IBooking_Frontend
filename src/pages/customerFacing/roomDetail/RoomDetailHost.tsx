import React from "react";

import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

type Props = {};

function RoomDetailHost({}: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");

  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <div>
          <Typography
            variant="h2"
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              mb: "4px",
            }}
          >
            Chủ nhà Huỳnh
          </Typography>
          <span
            style={{
              fontSize: "14px",
            }}
          >
            Đã tham gia vào tháng 7 năm 2017
          </span>
        </div>
        <Avatar
          sx={{
            width: "48px",
            height: "48px",
          }}
          alt="Host"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
      </Stack>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <Star
          style={{
            color: yellow["A700"],
          }}
        />
        557 đánh giá
      </div>

      <div>
        <p>Hello, Im Huynh, I love traveling!</p>
      </div>

      <Stack
        sx={{
          padding: "8px ",
          alignItems: min768px ? "center" : "stretch",
        }}
      >
        <Button
          sx={{
            p: 1,
          }}
          variant="outlined"
        >
          Liên hệ với chủ nhà
        </Button>
      </Stack>
    </Box>
  );
}

export default RoomDetailHost;
