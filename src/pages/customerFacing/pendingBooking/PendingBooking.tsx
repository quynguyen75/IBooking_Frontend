import { ArrowRight, ArrowRightAlt, Delete } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Loading from "components/loading/Loading";
import { BOOKING_API, USER_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { formatDataStrapi } from "utils/data";
import { generatePaymnentLink } from "utils/link";
import { formatMoney } from "utils/money";
import { convertSearchToObject } from "utils/search";

type Props = {};

function PendingBooking({}: Props) {
  const history = useHistory();
  const { search } = useLocation();
  const userID = convertSearchToObject(search).user;

  const [pendingBookings, setPendingBookings] = useState([]);
  const [bookingFetchStatus, bookings] = useFetch(
    BOOKING_API +
      `?filters[user][id][$eq]=${userID}&filters[paymentStatus][id][$eq]=1&populate[0]=*&populate[1]=room.images`
  );

  const deletePendingBooking = (id: number) => {
    fetch(BOOKING_API + `/${id}`, {
      method: "DELETE",
    });

    setPendingBookings(
      pendingBookings.filter((booking: any) => booking.id !== id)
    );
  };

  const checkOutClickHandler = (booking: any) => {
    history.push(
      `/checkout?room=${booking.room.id}&checkInDate=${booking.checkInDate}&checkOutDate=${booking.checkOutDate}&guestCount=${booking.guestCount}&booking=${booking.id}`
    );
  };

  useEffect(() => {
    if (bookings) {
      setPendingBookings(formatDataStrapi(bookings)?.data);
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
        {pendingBookings && (
          <List>
            {pendingBookings.length === 0 && (
              <Typography textAlign="center" sx={{ p: 2 }}>
                Chưa có đơn đặt phòng nào
              </Typography>
            )}
            {pendingBookings.map((booking: any) => (
              <ListItem key={booking.id}>
                <ListItemButton>
                  <Grid container>
                    <Grid item xs={3} md={2.4} alignItems="center">
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

                    <Grid item xs={3} md={2.4}>
                      <Stack
                        justifyContent="center"
                        sx={{ height: "100%", textAlign: "center" }}
                      >
                        <Typography>{booking.room.title}</Typography>
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

                    <Grid item xs={3} md={2.4}>
                      <Stack
                        sx={{ height: "100%", textAlign: "center" }}
                        justifyContent="center"
                      >
                        <Typography>
                          {formatMoney(booking.totalPrice)}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={3} md={2.4}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        sx={{ height: "100%" }}
                        justifyContent="space-between"
                      >
                        <Button
                          variant="contained"
                          onClick={() => checkOutClickHandler(booking)}
                        >
                          Thanh toán
                        </Button>
                        <IconButton
                          onClick={() => deletePendingBooking(booking.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
      <Footer />

      {bookingFetchStatus === "loading" && <Loading />}
    </>
  );
}

export default PendingBooking;
