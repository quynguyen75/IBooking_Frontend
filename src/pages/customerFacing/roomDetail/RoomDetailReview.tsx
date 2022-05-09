import { Star } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Grid,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import RatingItem from "components/ratingItem/RatingItem";
import ReviewItem from "components/reviewItem/ReviewItem";
import ReviewDialog from "components/riviewDialog/ReviewDialog";
import { useState } from "react";

import SwipeableView from "react-swipeable-views";

type Props = {};

const RATING_PRECISION = 0.1;

const ratingItems = [
  {
    name: "Mức độ sạch sẽ",
    value: 4.5,
  },
  {
    name: "Độ chính xác",
    value: 4.7,
  },
  {
    name: "Liên lạc",
    value: 4.9,
  },
  {
    name: "Vị trí",
    value: 4.8,
  },
  {
    name: "Nhận phòng",
    value: 4.7,
  },
  {
    name: "Giá trị",
    value: 4.5,
  },
];

function RoomDetailReview({}: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => setIsOpenDialog(true);

  const closeDialog = () => setIsOpenDialog(false);

  const min768px = useMediaQuery("(min-width: 768px)");
  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
      }}
    >
      <h2
        className="roomDetail__title"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Star
          style={{
            color: yellow["A700"],
          }}
        />
        4.65 - 67 đánh giá
      </h2>

      {min768px && (
        <div
          style={{
            padding: "8px",
          }}
        >
          <Grid container spacing={6}>
            {ratingItems.map((item) => (
              <Grid item sm={6}>
                <RatingItem
                  name={item.name}
                  value={item.value}
                  precision={RATING_PRECISION}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      <div>
        <SwipeableView>
          <div
            style={{
              padding: "8px",
            }}
          >
            <ReviewItem />
          </div>
          <div
            style={{
              padding: "8px",
            }}
          >
            <ReviewItem />
          </div>
          <div
            style={{
              padding: "8px",
            }}
          >
            <ReviewItem />
          </div>
        </SwipeableView>
      </div>

      <Stack
        sx={{
          padding: "8px ",
          alignItems: min768px ? "center" : "stretch",
        }}
      >
        <Button
          sx={{
            p: 1,
          }}
          variant="outlined"
          onClick={openDialog}
        >
          Hiển thị tất cả 67 đánh giá
        </Button>
      </Stack>

      <ReviewDialog
        open={isOpenDialog}
        onClose={closeDialog}
        ratingItems={ratingItems}
      />
    </Box>
  );
}

export default RoomDetailReview;
