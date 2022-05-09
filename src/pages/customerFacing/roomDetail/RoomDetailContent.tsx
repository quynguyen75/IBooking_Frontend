import {
  Divider,
  useMediaQuery,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import RoomDetailAmenities from "./RoomDetailAmenities";
import { RoomDetailCheckStatusTablet } from "./RoomDetailCheckStatus";
import RoomDetailCount from "./RoomDetailCount";
import RoomDetailDates from "./RoomDetailDates";
import RoomDetailDescription from "./RoomDetailDescription";
import RoomDetailHost from "./RoomDetailHost";
import RoomDetailReview from "./RoomDetailReview";
import RoomDetailTitle from "./RoomDetailTitle";

type Props = {};

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

function RoomDetailContent({}: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={8}>
            <RoomDetailTitle />
            <Divider />
            <RoomDetailDescription />
            <Divider />
            <RoomDetailCount />
            <Divider />
            <RoomDetailAmenities />
            <Divider />
            <RoomDetailDates />
          </Grid>

          <Grid item xs={0} sm={4}>
            <RoomDetailCheckStatusTablet />
          </Grid>
        </Grid>
        <Divider />
        <RoomDetailReview />
        <Divider />
        <RoomDetailHost />
      </div>
    </ThemeProvider>
  );
}

export default RoomDetailContent;
