import { Star } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";

type Props = {
  room: any;
  averageStar: string;
};

function RoomDetailTitle({ room, averageStar }: Props) {
  const address = `${room.houseNumber} ${room.street}, ${room.district}, ${room.city}, ${room.county}`;

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
        {room?.title}
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
          <span>{averageStar}</span>
        </div>

        <div>{room && room.reviews.data.length} đánh giá</div>
      </Stack>

      <span
        style={{
          fontSize: "16px",
        }}
      >
        {address}
      </span>
    </Box>
  );
}

export default RoomDetailTitle;
