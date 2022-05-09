import { Box, Card, Grid } from "@mui/material";
import { Bed } from "@mui/icons-material";
import React from "react";

type Props = {};

function RoomDetailCount({}: Props) {
  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
        textAlign: "justify",
      }}
    >
      <h2 className="roomDetail__title">Nơi bạn sẽ ngủ nghỉ</h2>

      <Grid container>
        <Grid item xs={6}>
          <Card
            sx={{
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Bed
              sx={{
                fontSize: "24px",
                mb: 1,
              }}
            />
            <span
              style={{
                fontWeight: "600",
              }}
            >
              Phòng ngủ
            </span>
            <span>1 giường đôi</span>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomDetailCount;
