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
type Props = {};

function Search({}: Props) {
  const isTablet = useMediaQuery("(min-width: 768px)");

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
          <Typography variant="h6">Chỗ ở tại Hồ Chí Minh</Typography>
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
