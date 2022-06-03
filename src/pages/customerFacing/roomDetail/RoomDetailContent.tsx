import {
  Divider,
  useMediaQuery,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import moment from "moment";
import React from "react";
import RoomDetailAmenities from "./RoomDetailAmenities";
import { RoomDetailCheckStatusTablet } from "./RoomDetailCheckStatus";
import RoomDetailCount from "./RoomDetailCount";
import RoomDetailDates from "./RoomDetailDates";
import RoomDetailDescription from "./RoomDetailDescription";
import RoomDetailHost from "./RoomDetailHost";
import RoomDetailReview from "./RoomDetailReview";
import RoomDetailTitle from "./RoomDetailTitle";

type Props = {
  room: any;
  roomDate: any;
  changeRoomDates: (range: any) => void;
  disableDateHandler: (date: Date) => boolean;
  guestCount: {
    guest: number;
    pet: number;
  };
  guestCountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function RoomDetailContent({
  room,
  roomDate,
  changeRoomDates,
  disableDateHandler,
  guestCount,
  guestCountHandler,
}: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");

  const roomCount = room && {
    bathRoomCount: room.bathRoomCount,
    bedRoomCount: room.bedRoomCount,
    livingRoomCount: room.livingRoomCount,
  };

  const averageStar = room.reviews.data.length
    ? (
        room.reviews.data.reduce((acc: number, review: any) => {
          const star =
            (review.cleanlinessStar +
              review.accuracyStar +
              review.communicationStar +
              review.locationStar +
              review.checkInStar +
              review.valueStar) /
            6;

          return acc + star;
        }, 0) / room.reviews.data.length
      ).toFixed(1)
    : "0";

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={8}>
            <RoomDetailTitle room={room} averageStar={averageStar} />
            <Divider />
            <RoomDetailDescription desc={room?.desc} />
            <Divider />
            <RoomDetailCount roomCount={roomCount} />
            <Divider />
            <RoomDetailAmenities room={room} />
            <Divider />
            <RoomDetailDates
              disableDateHandler={disableDateHandler}
              roomDate={roomDate}
              changeRoomDates={changeRoomDates}
            />
          </Grid>

          <Grid item xs={0} sm={4}>
            <RoomDetailCheckStatusTablet
              disableDateHandler={disableDateHandler}
              room={room}
              roomDate={roomDate}
              changeRoomDates={changeRoomDates}
              guestCount={guestCount}
              guestCountHandler={guestCountHandler}
            />
          </Grid>
        </Grid>
        <Divider />
        <RoomDetailReview roomId={room.id} />
        <Divider />
        <RoomDetailHost host={room.user} />
      </div>
    </ThemeProvider>
  );
}

export default RoomDetailContent;
