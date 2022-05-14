import { useLocation } from "react-router-dom";
import moment from "moment";

import Header from "components/layout/Header";
import Navigation from "components/layout/Navigation";
import Footer from "components/layout/Footer";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import RoomItem from "components/room/RoomItem";
import { convertSearchToObject, objectToURLParamsStrapi } from "utils/search";
import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ROOM_API } from "constant/resource";
import { FilterContext, FilterContextProvider } from "context/FilterContext";
type Props = {};

function formatObjectSearch(object: any) {
  const result: any = {};

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const data = object[key];

      switch (key) {
        case "city":
        case "county":
        case "district":
        case "street":
          result[key] = {
            value: data,
            operator: "$contains",
          };
          break;

        case "guestCount":
          result[key] = {
            value: data,
            operator: "$gte",
          };
          break;

        case "petCount":
          result["acceptPet"] = {
            value: true,
            operator: "$eq",
          };
          break;

        default:
          break;
      }
    }
  }

  return result;
}

function checkCorrespondRoom(
  room: any,
  checkInDate: string,
  checkOutDate?: string
): boolean {
  const bookings = room.attributes.bookings.data;
  if (checkOutDate) {
    const existBooking = bookings.find((booking: any) => {
      const bookingCheckIn = moment(
        booking.attributes.checkInDate,
        "DD/MM/YYYY"
      );
      const bookingCheckOut = moment(
        booking.attributes.checkOutDate,
        "DD/MM/YYYY"
      );
      const searchCheckIn = moment(checkInDate, "DD/MM/YYYY");
      const searchCheckOut = moment(checkOutDate, "DD/MM/YYYY");

      return (
        (bookingCheckIn >= searchCheckIn && bookingCheckIn <= searchCheckOut) ||
        (bookingCheckOut >= searchCheckIn && bookingCheckOut <= searchCheckOut)
      );
    });

    return !Boolean(existBooking);
  } else {
    const existBooking = bookings.find((booking: any) => {
      const bookingCheckIn = moment(
        booking.attributes.checkInDate,
        "DD/MM/YYYY"
      );
      const bookingCheckOut = moment(
        booking.attributes.checkOutDate,
        "DD/MM/YYYY"
      );
      const searchCheckIn = moment(checkInDate, "DD/MM/YYYY");

      return (
        bookingCheckIn <= searchCheckIn && bookingCheckOut >= searchCheckIn
      );
    });
    return !Boolean(existBooking);
  }
}

function Search({}: Props) {
  const { search } = useLocation();
  const isTablet = useMediaQuery("(min-width: 768px)");
  const [rooms, setRooms] = useState({
    initial: [],
    display: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const filterContext = useContext(FilterContext);

  const searchObj = useMemo(() => convertSearchToObject(search), []);

  const formatSearch = formatObjectSearch(searchObj);

  useEffect(() => {
    const getCorrespondRooms = async () => {
      try {
        const roomResponse = await fetch(
          ROOM_API +
            `?${objectToURLParamsStrapi(
              formatSearch
            )}&populate=bookings&populate=reviews&populate=roomType`
        );

        const rooms = await roomResponse.json();

        setIsLoading(false);

        if (searchObj.checkInDate && searchObj.checkOutDate) {
          const correspondRooms = rooms.data.filter((room: any) => {
            return checkCorrespondRoom(
              room,
              searchObj.checkInDate,
              searchObj.checkOutDate
            );
          });

          return correspondRooms;
        } else if (searchObj.checkInDate) {
          const correspondRooms = rooms.data.filter((room: any) => {
            return checkCorrespondRoom(room, searchObj.checkInDate);
          });

          return correspondRooms;
        }

        return rooms;
      } catch (error) {
        console.log(error);
      }
    };

    (async () => {
      const correspondRooms = await getCorrespondRooms();
      setRooms({
        display: correspondRooms.data,
        initial: correspondRooms.data,
      });
    })();
  }, [searchObj]);

  useEffect(() => {
    let correspondRooms: any = [];
    switch (filterContext.filter.actionType) {
      case "PRICE":
        correspondRooms = rooms.display.filter(
          (room: any) =>
            room.attributes.nightPrice >= filterContext.filter.price.from &&
            room.attributes.nightPrice <= filterContext.filter.price.to
        );

        break;

      case "ROOM_TYPE": {
        const roomTypeFilters = Object.keys(
          filterContext.filter.roomType
        ).filter((item) => filterContext.filter.roomType[item]);

        correspondRooms = rooms.display.filter((room: any) =>
          roomTypeFilters.includes(
            room.attributes.roomType.data.attributes.name
          )
        );

        break;
      }

      case "AMENITIES": {
        const amenityFilters = Object.keys(
          filterContext.filter.amenities
        ).filter((item) => filterContext.filter.amenities[item]);

        correspondRooms = rooms.display.filter((room: any) =>
          amenityFilters.every((item) => room.attributes[item])
        );

        break;
      }

      case "ALL":
        const roomTypeFilters = Object.keys(
          filterContext.filter.roomType
        ).filter((item) => filterContext.filter.roomType[item]);

        const amenityFilters = Object.keys(
          filterContext.filter.amenities
        ).filter((item) => filterContext.filter.amenities[item]);

        correspondRooms = rooms.initial
          .filter(
            (room: any) =>
              room.attributes.nightPrice >= filterContext.filter.price.from &&
              room.attributes.nightPrice <= filterContext.filter.price.to
          )
          .filter(
            (room: any) =>
              room.attributes.livingRoomCount >=
                filterContext.filter.roomCount.livingRoom &&
              room.attributes.bedRoomCount >=
                filterContext.filter.roomCount.bedroom
          );

        if (roomTypeFilters.length) {
          correspondRooms.filter((room: any) =>
            roomTypeFilters.includes(
              room.attributes.roomType.data.attributes.name
            )
          );
        }

        if (amenityFilters.length) {
          correspondRooms.filter((room: any) =>
            amenityFilters.every((item) => room.attributes[item])
          );
        }

        console.log(correspondRooms);
        break;

      default:
        break;
    }

    setRooms((rooms: any) => ({
      ...rooms,
      display: correspondRooms,
    }));
  }, [filterContext.filter]);

  console.log(filterContext.filter);

  return (
    <>
      <Header />
      <Container
        sx={{
          paddingTop: isTablet ? "100px" : "80px",
          paddingBottom: "40px",
        }}
      >
        <div>
          <Typography variant="h6">Chỗ ở tại {searchObj.label}</Typography>
        </div>

        <Grid
          container
          spacing={3}
          sx={{
            padding: "12px 0",
          }}
        >
          {isLoading && (
            <Grid item xs={12} display="flex" justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
          {rooms.display.map((room: any) => (
            <Grid item xs={12} sm={6} lg={4} key={room.id}>
              <RoomItem
                room={{
                  id: room.id,
                  ...room.attributes,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
      <Navigation />
    </>
  );
}

export default Search;
