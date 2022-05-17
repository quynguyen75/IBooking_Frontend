import { Box, Card, Grid } from "@mui/material";
import { Bed } from "@mui/icons-material";
import React from "react";

type Props = {
  roomCount: any;
};

const vietnameseLabel: any = {
  livingRoomCount: "Phòng khách",
  bathRoomCount: "Phòng tắm",
  bedRoomCount: "Phòng ngủ",
};

function RoomDetailCount({ roomCount }: Props) {
  const displayRoomCount =
    roomCount && Object.keys(roomCount).filter((key) => roomCount[key]);

  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
        textAlign: "justify",
      }}
    >
      <h2 className="roomDetail__title">Nơi bạn sẽ ngủ nghỉ</h2>

      <Grid container spacing={2}>
        {displayRoomCount &&
          displayRoomCount.map((item: string) => (
            <Grid item xs={4}>
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
                  {`${roomCount[item]} ${vietnameseLabel[item]}`}
                </span>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default RoomDetailCount;
