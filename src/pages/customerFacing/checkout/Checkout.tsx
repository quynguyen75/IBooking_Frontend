import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import { Link, useHistory, useLocation } from "react-router-dom";
import { generatePaymnentLink } from "utils/link";
import { ROOM_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import { convertSearchToObject } from "utils/search";
import { formatDataStrapi } from "utils/data";
import { formatMoney } from "utils/money";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import useUser from "hooks/useUser";
import useScrollToTop from "hooks/useScrollToTop";

type Props = {};

function Checkout({}: Props) {
  useUser();

  const userContext = useContext(UserContext);
  const history = useHistory();
  const { search } = useLocation();
  const min768px = useMediaQuery("(min-width:768px)");

  const searchObj = convertSearchToObject(search);

  const [fetchStatus, room] = useFetch(
    ROOM_API + `/${searchObj.room}?populate=*`
  );

  useScrollToTop();

  const formatedRoom = formatDataStrapi(room);

  const roomImages = formatedRoom?.images.data;

  const disabledDate = formatedRoom?.bookings.data.filter(
    (booking: any) =>
      moment(booking.checkOutDate).isSameOrAfter(moment()) &&
      booking.paymentReference
  );

  const goBackHandler = () => {
    history.goBack();
  };

  const isInvalidDate = disabledDate?.some((booking: any) => {
    return (
      moment(searchObj.checkInDate).isBetween(
        booking.checkInDate,
        booking.checkOutDate,
        undefined,
        "[]"
      ) ||
      moment(searchObj.checkOutDate).isBetween(
        booking.checkInDate,
        booking.checkOutDate,
        undefined,
        "[]"
      )
    );
  });

  const nightCount = Math.floor(
    (new Date(searchObj.checkOutDate).valueOf() -
      new Date(searchObj.checkInDate).valueOf()) /
      (1000 * 60 * 60 * 24)
  );

  const totalPrice =
    formatedRoom &&
    formatedRoom.nightPrice * nightCount + +formatedRoom.cleanlinessFee;

  return (
    <>
      {min768px && <Header />}
      {min768px || (
        <div
          style={{
            padding: "12px 0",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <Stack direction="row" alignItems="center">
            <IconButton onClick={goBackHandler}>
              <ChevronLeft />
            </IconButton>
            <Typography
              variant="h1"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                flex: 1,
                textAlign: "center",
              }}
            >
              X??c nh???n v?? thanh to??n
            </Typography>
          </Stack>
        </div>
      )}

      <Container
        sx={{
          paddingTop: min768px ? "100px" : "64px",
          fontSize: min768px ? "16px" : "14px",
        }}
        className="colorBlack"
      >
        <Grid container spacing={min768px ? 6 : 0}>
          <Grid item xs={12} md={6}>
            {min768px && (
              <Typography
                variant="h1"
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                X??c nh???n v?? thanh to??n
              </Typography>
            )}

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "24px",
                    }}
                    component="img"
                    alt="The house from the offer."
                    src={roomImages && roomImages[0].url}
                  />
                </Grid>

                <Grid item xs={8}>
                  <div>{formatedRoom?.roomType.label}</div>
                  <div
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {formatedRoom?.title}
                  </div>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <span className="checkout__title">Chuy???n ??i c???a b???n</span>
              <Stack>
                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div>
                      <div className="colorBlack textBold mb-4">Ng??y</div>
                      <div
                        style={{
                          color: isInvalidDate ? "#ed4337" : "",
                        }}
                      >
                        {isInvalidDate
                          ? `Ng??y b???n ch???n ???? ???????c ch???n. Vui l??ng ch???n ng??y kh??c`
                          : `${searchObj.checkInDate} - ${searchObj.checkOutDate}`}
                      </div>
                    </div>

                    {/* <div>
                      <span className="textBold textUnderline cursorPointer colorBlack">
                        Ch???nh s???a
                      </span>
                    </div> */}
                  </Stack>
                </div>

                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div>
                      <div className="colorBlack textBold mb-4">Kh??ch</div>
                      <div>{searchObj?.guestCount} Kh??ch</div>
                    </div>

                    {/* <div>
                      <span className="textBold textUnderline cursorPointer colorBlack">
                        Ch???nh s???a
                      </span>
                    </div> */}
                  </Stack>
                </div>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Divider />

            {!isInvalidDate && formatedRoom && (
              <>
                <Box
                  sx={{
                    padding: "16px 0",
                  }}
                >
                  <span className="checkout__title">Chi ti???t gi??</span>
                  <Stack>
                    <div>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          padding: "8px 0",
                        }}
                      >
                        <div>
                          {" "}
                          {formatedRoom &&
                            formatMoney(formatedRoom.nightPrice)}{" "}
                          x{nightCount} ????m
                        </div>

                        <div>
                          {formatMoney(formatedRoom.nightPrice * nightCount)}
                        </div>
                      </Stack>
                    </div>

                    <div>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          padding: "8px 0",
                        }}
                      >
                        <div>Ph?? d???n d???p</div>

                        <div>
                          {formatedRoom &&
                            formatMoney(formatedRoom.cleanlinessFee)}
                        </div>
                      </Stack>
                    </div>

                    <div>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          padding: "8px 0",
                        }}
                      >
                        <div className="textBold">T???ng</div>

                        <div className="textBold">
                          {formatMoney(
                            formatedRoom.nightPrice * nightCount +
                              formatedRoom.cleanlinessFee
                          )}
                        </div>
                      </Stack>
                    </div>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    padding: "16px 0",
                  }}
                >
                  <span className="checkout__title">Thanh to??n b???ng</span>
                  <List>
                    <ListItem>
                      <ListItemButton>
                        <ListItemText>Vnpay</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>

                <Box
                  sx={{
                    padding: "16px 0",
                  }}
                >
                  <a
                    href={generatePaymnentLink({
                      amount: totalPrice,
                      room: formatedRoom?.id,
                      user: userContext.user?.id,
                      checkInDate: searchObj.checkInDate,
                      checkOutDate: searchObj.checkOutDate,
                      guestCount: +searchObj.guestCount,
                      booking: +searchObj.booking,
                    })}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        padding: "10px 0",
                      }}
                    >
                      X??c nh???n v?? thanh to??n
                    </Button>
                  </a>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Checkout;
