import {
  CircularProgress,
  Container,
  Dialog,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import { ROOM_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import moment from "moment";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { formatDataStrapi } from "utils/data";
import { RoomDetailCheckStatusMobile } from "./RoomDetailCheckStatus";
import RoomDetailContent from "./RoomDetailContent";
import RoomDetailImages from "./RoomDetailImages";

type Props = {};

function RoomDetail({}: Props) {
  const params: {
    id: string;
  } = useParams();

  const min768px = useMediaQuery("(min-width: 768px)");

  const [roomDate, setRoomDate] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [fetchStatus, room] = useFetch(
    `${ROOM_API}/${params.id}?populate[0]=images&populate[1]=roomType&populate[2]=user&populate[3]=bookings&populate[4]=reviews&populate[5]=reviews.user`
  );

  const changeRoomDates = (range: any) => setRoomDate([range.selection]);

  const formatedRoom = formatDataStrapi(room);

  const bookings = formatedRoom
    ? formatedRoom.bookings.data.filter((booking: any) =>
        moment(booking.checkInDate).isSameOrAfter(moment())
      )
    : [];

  const disableDateHandler = (date: Date): boolean => {
    return bookings.some((booking: any) =>
      moment(date).isBetween(
        booking.checkInDate,
        booking.checkOutDate,
        undefined,
        "[]"
      )
    );
  };

  return (
    <>
      {min768px && <Header />}
      {!room && (
        <Dialog
          open={true}
          fullScreen
          sx={{
            opacity: 0.8,
          }}
        >
          <Stack alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress />
          </Stack>
        </Dialog>
      )}
      {room && (
        <Container
          sx={{
            paddingTop: min768px ? "var(--header-height)" : "12px",
          }}
        >
          <RoomDetailImages images={formatedRoom.images.data} />
          <RoomDetailContent
            room={formatedRoom}
            roomDate={roomDate}
            changeRoomDates={changeRoomDates}
            disableDateHandler={disableDateHandler}
          />
        </Container>
      )}

      {min768px ||
        (room && (
          <RoomDetailCheckStatusMobile
            roomDate={roomDate}
            room={formatedRoom}
            changeRoomDates={changeRoomDates}
            disableDateHandler={disableDateHandler}
          />
        ))}

      <Footer />
    </>
  );
}

export default RoomDetail;
