import {
  Button,
  Card,
  Dialog,
  Divider,
  FormControl,
  Grid,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DateRange } from "react-date-range";
import React, { useContext, useEffect, useState } from "react";
import useDialog from "hooks/useDialog";
import { formatMoney } from "utils/money";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { BOOKING_API } from "constant/resource";
import { UserContext } from "context/UserContext";
import { toast } from "react-toastify";
import Loading from "components/loading/Loading";
import { useDispatch } from "react-redux";
import { changeNotify } from "slice/NotifyBookingSlice";

type Props = {
  roomDate: any;
  room: any;
  disableDateHandler: (date: Date) => boolean;
  changeRoomDates: (range: any) => void;
  guestCount: {
    guest: number;
    pet: number;
  };
};

function RoomDetailCheckStatusMobile({
  roomDate,
  room,
  disableDateHandler,
  changeRoomDates,
  guestCount,
}: Props) {
  const {
    isOpen: isOpenDateDialog,
    open: openDateDialog,
    close: closeDateDialog,
  } = useDialog();

  const isTablet = useMediaQuery("(min-width: 600px)");

  const dispatch = useDispatch();

  const userContext = useContext(UserContext);

  const history = useHistory();

  const checkOutClickHandler = async () => {
    const createBooking = async () => {
      try {
        const nightCount = Math.floor(
          (new Date(roomDate[0].endDate).valueOf() -
            new Date(roomDate[0].startDate).valueOf()) /
            (1000 * 60 * 60 * 24)
        );
        // setIsLoading(true);
        const bookingResponse = await fetch(BOOKING_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              checkInDate: moment(roomDate[0].startDate).format("YYYY-MM-DD"),
              checkOutDate: moment(roomDate[0].endDate).format("YYYY-MM-DD"),
              guestCount: guestCount.guest,
              nightPrice: room.nightPrice,
              cleanlinessFee: room.cleanlinessFee,
              totalPrice: room.nightPrice * nightCount + +room.cleanlinessFee,
              bookingStatus: [1],
              paymentStatus: [1],
              paymentType: [1],
              user: [+userContext.user.id],
              room: [+room.id],
              bookedAt: new Date(),
            },
          }),
        });

        if (bookingResponse.ok) {
          toast.success("???? th??m v??o ??ang ch??? thanh to??n");
          const data = await bookingResponse.json();
          return data.data.id;
        } else {
          toast.error("C?? l???i x???y ra");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    };

    const bookingId = await createBooking();

    dispatch(changeNotify());

    history.push(
      `/checkout?room=${room.id}&checkInDate=${moment(
        roomDate[0].startDate
      ).format("YYYY-MM-DD")}&checkOutDate=${moment(roomDate[0].endDate).format(
        "YYYY-MM-DD"
      )}&guestCount=${guestCount.guest}&booking=${bookingId}`
    );
  };

  useEffect(() => {
    if (roomDate[0].startDate.toString() !== roomDate[0].endDate.toString()) {
      closeDateDialog();
    }
  }, [roomDate]);

  return (
    <Card
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: "16px 24px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{}}>
        <div>
          <div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {formatMoney(room.nightPrice)}
            </span>
            / ????m
          </div>

          <div>
            <span>
              {roomDate[0].startDate.toString() ===
              roomDate[0].endDate.toString()
                ? "Th??m ng??y"
                : moment(roomDate[0].startDate).format("DD/MM/YYYY") +
                  " - " +
                  moment(roomDate[0].endDate).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
        {roomDate[0].startDate.toString() ===
          roomDate[0].endDate.toString() && (
          <Button variant="contained" onClick={openDateDialog}>
            Ki???m tra ph??ng
          </Button>
        )}

        {roomDate[0].startDate.toString() !==
          roomDate[0].endDate.toString() && (
          <Button variant="contained" onClick={checkOutClickHandler}>
            ?????t ph??ng
          </Button>
        )}
      </Stack>

      <Dialog open={isOpenDateDialog} onClose={closeDateDialog}>
        <DateRange
          onChange={changeRoomDates}
          moveRangeOnFirstSelection={false}
          months={isTablet ? 2 : 1}
          ranges={roomDate}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
          showDateDisplay={false}
          className="checkStatus__dialog"
          minDate={new Date()}
          disabledDay={disableDateHandler}
        />
      </Dialog>
    </Card>
  );
}

function RoomDetailCheckStatusTablet({
  room,
  disableDateHandler,
  roomDate,
  changeRoomDates,
  guestCount,
  guestCountHandler,
}: {
  room: any;
  roomDate: any;
  disableDateHandler: (date: Date) => boolean;
  changeRoomDates: (range: any) => void;
  guestCount: {
    guest: number;
    pet: number;
  };
  guestCountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const {
    isOpen: isOpenDateDialog,
    open: openDateDialog,
    close: closeDateDialog,
  } = useDialog();

  const isTablet = useMediaQuery("(min-width: 600px)");

  const dispatch = useDispatch();

  const userContext = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const history = useHistory();

  const checkOutClickHandler = async () => {
    const createBooking = async () => {
      try {
        const nightCount = Math.floor(
          (new Date(roomDate[0].endDate).valueOf() -
            new Date(roomDate[0].startDate).valueOf()) /
            (1000 * 60 * 60 * 24)
        );
        setIsLoading(true);
        const bookingResponse = await fetch(BOOKING_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              checkInDate: moment(roomDate[0].startDate).format("YYYY-MM-DD"),
              checkOutDate: moment(roomDate[0].endDate).format("YYYY-MM-DD"),
              guestCount: guestCount.guest,
              nightPrice: room.nightPrice,
              cleanlinessFee: room.cleanlinessFee,
              totalPrice: room.nightPrice * nightCount + +room.cleanlinessFee,
              bookingStatus: [1],
              paymentStatus: [1],
              paymentType: [1],
              user: [+userContext.user.id],
              room: [+room.id],
              bookedAt: new Date(),
            },
          }),
        });

        if (bookingResponse.ok) {
          toast.success("???? th??m v??o ??ang ch??? thanh to??n");
          const data = await bookingResponse.json();
          return data.data.id;
        } else {
          toast.error("C?? l???i x???y ra");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const bookingId = await createBooking();

    dispatch(changeNotify());

    history.push(
      `/checkout?room=${room.id}&checkInDate=${moment(
        roomDate[0].startDate
      ).format("YYYY-MM-DD")}&checkOutDate=${moment(roomDate[0].endDate).format(
        "YYYY-MM-DD"
      )}&guestCount=${guestCount.guest}&booking=${bookingId}`
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const nightCount = Math.floor(
    (roomDate[0].endDate - roomDate[0].startDate) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    if (roomDate[0].startDate.toString() !== roomDate[0].endDate.toString()) {
      closeDateDialog();
    }
  }, [roomDate]);

  return (
    <Card
      sx={{
        padding: "24px",
      }}
    >
      <Stack
        sx={{
          fontSize: "16px",
          mb: 1,
        }}
        direction="row"
        flexWrap="wrap"
      >
        <div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {room && formatMoney(room.nightPrice)}
          </span>
          / ????m
        </div>
      </Stack>

      <div>
        <div onClick={openDateDialog}>
          <Grid
            container
            style={{
              border: "1px solid rgb(176, 176, 176)",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <Grid
              item
              xs={6}
              sx={{
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                }}
              >
                Nh???n ph??ng
              </div>
              <span>
                {roomDate[0].startDate.toString() ===
                roomDate[0].endDate.toString()
                  ? "Th??m ng??y"
                  : moment(roomDate[0].startDate).format("DD/MM/YYYY")}
              </span>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                padding: "10px",
                borderLeft: "1px solid rgb(176, 176, 176)",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                }}
              >
                Tr??? ph??ng
              </div>
              <span>
                {roomDate[0].startDate.toString() ===
                roomDate[0].endDate.toString()
                  ? "Th??m ng??y"
                  : moment(roomDate[0].endDate).format("DD/MM/YYYY")}
              </span>
            </Grid>
          </Grid>
        </div>

        <Button
          style={{
            border: "1px solid rgb(176, 176, 176)",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            padding: "10px",
            borderTop: "0px",
            textTransform: "unset",
            display: "block",
            color: "#000",
            fontWeight: "unset",
          }}
          fullWidth
          onClick={handleClick}
        >
          <div
            style={{
              fontWeight: 600,
            }}
          >
            Kh??ch
          </div>
          <span>
            {guestCount.guest} Kh??ch{" "}
            {guestCount.pet > 0 && `,${guestCount.pet} th?? c??ng`}
          </span>
        </Button>

        <Stack>
          <Button
            sx={{
              padding: "10px 16px",
              mt: 1,
              textAlign: "center",
            }}
            variant="contained"
            disabled={
              roomDate[0].startDate.toString() ===
              roomDate[0].endDate.toString()
            }
            onClick={checkOutClickHandler}
          >
            ?????t ph??ng
          </Button>
        </Stack>
      </div>

      {Boolean(nightCount) && (
        <div>
          <Stack direction="row" justifyContent="space-between" paddingY={1}>
            <span>
              {formatMoney(room.nightPrice)} X {nightCount} ????m
            </span>
            <span>{formatMoney(room.nightPrice * nightCount)} </span>
          </Stack>

          <Stack direction="row" justifyContent="space-between" paddingY={1}>
            <span>Ph?? d???n d???p</span>
            <span>{formatMoney(room.cleanlinessFee)} </span>
          </Stack>

          <Divider
            sx={{
              margin: "12px 0",
            }}
          />

          <Stack direction="row" justifyContent="space-between" paddingY={1}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
              }}
            >
              T???ng
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
              }}
            >
              {formatMoney(room.nightPrice * nightCount + room.cleanlinessFee)}
            </Typography>
          </Stack>
        </div>
      )}

      <Dialog open={isOpenDateDialog} onClose={closeDateDialog}>
        <DateRange
          onChange={changeRoomDates}
          moveRangeOnFirstSelection={false}
          months={isTablet ? 2 : 1}
          ranges={roomDate}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
          showDateDisplay={false}
          className="checkStatus__dialog"
          minDate={new Date()}
          disabledDay={disableDateHandler}
        />
      </Dialog>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            minWidth: anchorEl?.clientWidth,
            padding: "16px",
          }}
        >
          <div>
            <FormControl
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <label htmlFor="guestCount">S??? l?????ng</label>
              <TextField
                type="number"
                name="guest"
                id="guestCount"
                InputProps={{
                  inputProps: {
                    max: room.guestCount,
                    min: 1,
                  },
                }}
                value={guestCount.guest}
                onChange={guestCountHandler}
              />
            </FormControl>
          </div>

          {room.acceptPet && (
            <div>
              <FormControl
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <label htmlFor="petCount">Th?? c??ng</label>
                <TextField
                  type="number"
                  id="petCount"
                  name="pet"
                  InputProps={{
                    inputProps: {
                      max: 20,
                      min: 0,
                    },
                  }}
                  value={guestCount.pet}
                  onChange={guestCountHandler}
                />
              </FormControl>
            </div>
          )}
        </div>
      </Popover>

      {isLoading && <Loading />}
    </Card>
  );
}

export { RoomDetailCheckStatusMobile, RoomDetailCheckStatusTablet };
