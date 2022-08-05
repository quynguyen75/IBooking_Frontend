import { ArrowRightAlt } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Navigation from "components/layout/Navigation";
import Loading from "components/loading/Loading";
import { BOOKING_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import useScrollToTop from "hooks/useScrollToTop";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { formatDataStrapi } from "utils/data";
import { formatMoney } from "utils/money";
import { convertSearchToObject } from "utils/search";
import qs from "qs";

type Props = {};

export default function BookedBooking({}: Props) {
  const history = useHistory();
  const { search } = useLocation();
  const userID = convertSearchToObject(search).user;
  useScrollToTop();

  const query = qs.stringify({
    filters: {
      $and: [
        {
          user: {
            id: {
              $eq: userID,
            },
          },
        },
        {
          paymentStatus: {
            id: {
              $eq: 2,
            },
          },
        },
      ],
    },
    populate: ["review", "room.images"],
  });

  const [bookedBookings, setBookedBookings] = useState([]);
  const [bookingFetchStatus, bookings] = useFetch(BOOKING_API + `?${query}`);

  const reviewHandler = (roomId: number) =>
    history.push(`/room/${roomId}?scrollTo=reviews`);

  useEffect(() => {
    if (bookings) {
      setBookedBookings(formatDataStrapi(bookings)?.data);
    }
  }, [bookings]);

  return (
    <>
      <Header />
      <Container
        sx={{
          paddingTop: "100px",
          minHeight: "80vh",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "32px",
            fontWeight: 500,
          }}
        >
          Đang chờ thanh toán
        </Typography>
        {bookedBookings && (
          <List>
            {bookedBookings.length === 0 && (
              <Typography textAlign="center" sx={{ p: 2 }}>
                Chưa có đơn đặt phòng nào
              </Typography>
            )}
            {bookedBookings.map((booking: any) => (
              <ListItem key={booking.id}>
                <ListItemButton
                  style={{
                    padding: "16px 0",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={0}
                      md={2.4}
                      alignItems="center"
                      display={{ xs: "none", md: "block" }}
                    >
                      <ListItemAvatar
                        sx={{
                          height: "100%",
                        }}
                      >
                        <img
                          src={booking.room.images.data[0].url}
                          alt={booking.room.title}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </ListItemAvatar>
                    </Grid>

                    <Grid item xs={4} md={2.4}>
                      <Stack
                        justifyContent="center"
                        sx={{ height: "100%", textAlign: "center" }}
                      >
                        <Typography fontWeight={500}>
                          {booking.room.title}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid
                      item
                      xs={0}
                      md={2.4}
                      display={{ xs: "none", md: "block" }}
                    >
                      <Stack
                        sx={{ height: "100%" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>{booking.checkInDate}</Typography>
                        <ArrowRightAlt />
                        <Typography>{booking.checkOutDate}</Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={4} md={2.4}>
                      <Stack
                        sx={{ height: "100%", textAlign: "center" }}
                        justifyContent="center"
                      >
                        <Typography>
                          {formatMoney(booking.totalPrice)}
                        </Typography>
                      </Stack>
                    </Grid>

                    {!booking.review?.id && (
                      <Grid item xs={4} md={2.4}>
                        <Stack
                          alignItems="center"
                          direction="row"
                          sx={{ height: "100%" }}
                          justifyContent="space-between"
                        >
                          <Button
                            variant="contained"
                            onClick={() => reviewHandler(booking.room.id)}
                          >
                            Đánh giá
                          </Button>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
      <Footer />
      <Navigation />

      {bookingFetchStatus === "loading" && <Loading />}
    </>
  );
}
