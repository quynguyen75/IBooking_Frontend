import { Star } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";

type Props = {};

function RoomDetailTitle({}: Props) {
  return (
    <Box
      sx={{
        padding: "16px 0",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "26px",
          fontWeight: "600",
        }}
      >
        Tinghouse studio 4
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        marginTop={1}
        sx={{
          fontSize: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Star
            style={{
              color: yellow["A700"],
            }}
          />
          <span>5,0</span>
        </div>

        <div>45 đánh giá</div>
        <div>Viet Nam</div>
      </Stack>
    </Box>
  );
}

export default RoomDetailTitle;
