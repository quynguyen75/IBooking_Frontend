import { useLocation } from "react-router-dom";

import Header from "components/layout/Header";
import Navigation from "components/layout/Navigation";
import Footer from "components/layout/Footer";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RoomItem from "components/room/RoomItem";
import RoomFilter from "components/roomFilter/RoomFilter";
import { convertSearchToObject, objectToURLParamsStrapi } from "utils/search";
import { useEffect } from "react";
import { ROOM_API } from "constant/resource";
type Props = {};

type searchQuery = {
  city: string;
  district: string;
  county: string;
  street: string;
  label: string;
};

function Search({}: Props) {
  const { search } = useLocation();
  const isTablet = useMediaQuery("(min-width: 768px)");

  const searchObj = convertSearchToObject(search);

  console.log(searchObj);

  useEffect(() => {
    const getCorrespondRooms = async () => {
      try {
        const response = await fetch(ROOM_API);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(objectToURLParamsStrapi(searchObj));
  }, [searchObj]);

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
        <Divider />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <RoomItem />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <RoomItem />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <RoomItem />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <RoomItem />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Navigation />
    </>
  );
}

export default Search;
