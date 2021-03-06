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
import { useContext, useEffect, useMemo, useState } from "react";
import { ROOM_API } from "constant/resource";
import { FilterContext } from "context/FilterContext";
import useScrollToTop from "hooks/useScrollToTop";
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
    const existBooking = bookings.some((booking: any) => {
      if (!booking.attributes.paymentReference) {
        return false;
      }
      const searchCheckInDate = moment(checkInDate, "DD/MM/YYYY");
      const searchCheckOutDate = moment(checkOutDate, "DD/MM/YYYY");
      return (
        searchCheckOutDate.isBetween(
          booking.attributes.checkInDate,
          booking.attributes.checkOutDate,
          undefined,
          "[]"
        ) ||
        searchCheckInDate.isBetween(
          booking.attributes.checkInDate,
          booking.attributes.checkOutDate,
          undefined,
          "[]"
        ) ||
        moment(booking.attributes.checkInDate).isBetween(
          searchCheckInDate,
          searchCheckOutDate,
          undefined,
          "[]"
        ) ||
        moment(booking.attributes.checkOutDate).isBetween(
          searchCheckInDate,
          searchCheckOutDate,
          undefined,
          "[]"
        )
      );
    });

    return !existBooking;
  } else {
    const existBooking = bookings.find((booking: any) => {
      const searchCheckIn = moment(checkInDate, "DD/MM/YYYY");

      return searchCheckIn.isBetween(
        booking.attributes.checkInDate,
        booking.attributes.checkOutDate,
        undefined,
        "[]"
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

  useScrollToTop();

  useEffect(() => {
    const getCorrespondRooms = async () => {
      try {
        const roomResponse = await fetch(
          ROOM_API +
            `?${objectToURLParamsStrapi(
              formatSearch
            )}&populate=bookings&populate=reviews&populate=roomType&populate=images&filters[status][$eq]=Active`
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

        return rooms.data;
      } catch (error) {
        console.log(error);
      }
    };

    (async () => {
      const correspondRooms = await getCorrespondRooms();
      setRooms({
        display: correspondRooms,
        initial: correspondRooms,
      });
    })();
  }, [searchObj]);

  useEffect(() => {
    let correspondRooms: any[] = Object.keys(filterContext.filter).reduce(
      (result, key) => {
        switch (key) {
          case "price":
            return result.filter(
              (room: any) =>
                room.attributes.nightPrice >= filterContext.filter.price.from &&
                room.attributes.nightPrice <= filterContext.filter.price.to
            );

          case "roomCount":
            return result.filter(
              (room: any) =>
                room.attributes.livingRoomCount >=
                  filterContext.filter.roomCount.livingRoom &&
                room.attributes.bedRoomCount >=
                  filterContext.filter.roomCount.bedroom &&
                room.attributes.bathRoomCount >=
                  filterContext.filter.roomCount.bathroom
            );

          default:
            let filteredRoom = result;
            const roomTypeFilters = Object.keys(
              filterContext.filter.roomType
            ).filter((item) => filterContext.filter.roomType[item]);

            const amenityFilters = Object.keys(
              filterContext.filter.amenities
            ).filter((item) => filterContext.filter.amenities[item]);

            if (roomTypeFilters.length) {
              filteredRoom = filteredRoom.filter((room: any) =>
                roomTypeFilters.includes(
                  room.attributes.roomType.data.attributes.name
                )
              );
            }

            if (amenityFilters.length) {
              filteredRoom = filteredRoom.filter((room: any) =>
                amenityFilters.every((item) => room.attributes[item])
              );
            }

            return filteredRoom;
        }
      },
      [...rooms.initial]
    );

    setRooms((rooms: any) => ({
      ...rooms,
      display: correspondRooms,
    }));
  }, [filterContext.filter, rooms.initial]);

  return (
    <>
      <Header />
      <Container
        sx={{
          paddingTop: isTablet ? "100px" : "80px",
          paddingBottom: "40px",
          minHeight: "80vh",
        }}
      >
        <div>
          <Typography variant="h6">Ch??? ??? t???i {searchObj.label}</Typography>
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

          {!isLoading &&
            rooms.display.map((room: any) => (
              <Grid item xs={12} sm={6} lg={4} key={room.id}>
                <RoomItem
                  room={{
                    id: room.id,
                    ...room.attributes,
                  }}
                  search={searchObj}
                />
              </Grid>
            ))}
        </Grid>

        {!isLoading && rooms.display.length === 0 && (
          <Typography
            textAlign="center"
            sx={{
              p: 2,
            }}
          >
            Kh??ng c?? ph??ng n??o ph?? h???p
          </Typography>
        )}
      </Container>
      <Footer />
      <Navigation />
    </>
  );
}

export default Search;
