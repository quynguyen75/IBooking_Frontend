import { Container, useMediaQuery } from "@mui/material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import { RoomDetailCheckStatusMobile } from "./RoomDetailCheckStatus";
import RoomDetailContent from "./RoomDetailContent";
import RoomDetailImages from "./RoomDetailImages";

type Props = {};

function RoomDetail({}: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {min768px && <Header />}
      <Container
        sx={{
          paddingTop: min768px ? "var(--header-height)" : "12px",
        }}
      >
        <RoomDetailImages />
        <RoomDetailContent />
      </Container>

      {min768px || <RoomDetailCheckStatusMobile />}

      <Footer />
    </>
  );
}

export default RoomDetail;
