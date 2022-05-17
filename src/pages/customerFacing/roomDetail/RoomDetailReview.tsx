import { useState } from "react";
import SwipeableView from "react-swipeable-views";
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

import { RATING } from "constant/resource";

type Props = {
  reviews: any[];
  averageStar: string;
};

const RATING_PRECISION = 0.1;

function RoomDetailReview({ reviews, averageStar }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => setIsOpenDialog(true);

  const closeDialog = () => setIsOpenDialog(false);

  const min768px = useMediaQuery("(min-width: 768px)");

  const stars =
    reviews &&
    RATING.map((item) => {
      const reviewCount = reviews.length;
      const averageStar = reviews.reduce(
        (acc, review) => acc + +(review[item.name] / reviewCount).toFixed(1),
        0
      );

      return {
        ...item,
        value: averageStar,
      };
    });

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
        {averageStar} - {reviews?.length} đánh giá
      </h2>

      {min768px && (
        <div
          style={{
            padding: "8px",
          }}
        >
          <Grid container spacing={6}>
            {stars?.map((item) => (
              <Grid item sm={6} key={item.label}>
                <RatingItem
                  name={item.label}
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
          {reviews?.map((review) => (
            <div
              style={{
                padding: "8px",
              }}
              key={review.id}
            >
              <ReviewItem review={review} />
            </div>
          ))}
        </SwipeableView>
      </div>

      <Stack
        sx={{
          padding: "8px ",
          alignItems: min768px ? "center" : "stretch",
        }}
      >
        {reviews?.length > 1 && (
          <Button
            sx={{
              p: 1,
            }}
            variant="outlined"
            onClick={openDialog}
          >
            Hiển thị tất cả {reviews.length} đánh giá
          </Button>
        )}
      </Stack>

      <ReviewDialog
        open={isOpenDialog}
        onClose={closeDialog}
        stars={stars}
        reviews={reviews}
      />
    </Box>
  );
}

export default RoomDetailReview;
