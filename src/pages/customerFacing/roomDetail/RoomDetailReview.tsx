import { useContext, useEffect, useState } from "react";
import SwipeableView from "react-swipeable-views";
import { Star } from "@mui/icons-material";
import { Box, Button, Grid, Stack, useMediaQuery } from "@mui/material";
import { yellow } from "@mui/material/colors";
import RatingItem from "components/ratingItem/RatingItem";
import ReviewItem from "components/reviewItem/ReviewItem";
import ReviewDialog from "components/riviewDialog/ReviewDialog";

import { BOOKING_API, RATING, REVIEWS_API } from "constant/resource";
import { formatDataStrapi } from "utils/data";
import CreateReviewDialog from "components/riviewDialog/CreateReviewDialog";
import useDialog from "hooks/useDialog";
import { UserContext } from "context/UserContext";

type Props = {
  roomId: number;
};

const RATING_PRECISION = 0.1;

function RoomDetailReview({ roomId }: Props) {
  const userContext = useContext(UserContext);
  const [reviews, setReviews] = useState<any[]>([]);

  const [reviewFlag, setReviewFlag] = useState(false);

  const [bookedBooking, setBookedBooking] = useState<any>(null);

  const {
    isOpen: isOpenReviewDialog,
    open: openReviewDialog,
    close: closeReviewDialog,
  } = useDialog();

  const {
    isOpen: isOpenCreateReviewDialog,
    open: openCreateReviewDialog,
    close: closeCreateReviewDialog,
  } = useDialog();

  const min768px = useMediaQuery("(min-width: 768px)");

  const isReviewed =
    userContext.user &&
    reviews.some((review) => review.user.id === userContext.user.id);

  const changeReview = () => setReviewFlag((flag) => !flag);

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

  const averageStar = reviews.length
    ? (
        reviews.reduce((acc: number, review: any) => {
          const star =
            (review.cleanlinessStar +
              review.accuracyStar +
              review.communicationStar +
              review.locationStar +
              review.checkInStar +
              review.valueStar) /
            6;

          return acc + star;
        }, 0) / reviews.length
      ).toFixed(1)
    : 0;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          REVIEWS_API +
            `?filters[room][id]=${roomId}&sort=createdAt:DESC&populate=user`
        );
        if (response.ok) {
          const data = await response.json();
          const formatedData = formatDataStrapi(data);
          setReviews(formatedData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [reviewFlag]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          BOOKING_API +
            `?filter[user][id][$eq]=${userContext.user.id}&filters[room][id][$eq]=${roomId}&filters[bookingStatus][id][$eq]=2&sort=createdAt:DESC`
        );

        if (response.ok) {
          const data = await response.json();
          setBookedBooking(data.data[0] ? data.data[0] : null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
        {averageStar} - {reviews?.length} ????nh gi??
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
                  readonly
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
            onClick={openReviewDialog}
          >
            Hi???n th??? t???t c??? {reviews.length} ????nh gi??
          </Button>
        )}
      </Stack>

      {userContext.user && bookedBooking && !isReviewed && (
        <Stack alignItems="center">
          <Button variant="outlined" onClick={openCreateReviewDialog}>
            T???o b??nh lu???n
          </Button>
        </Stack>
      )}

      <ReviewDialog
        open={isOpenReviewDialog}
        onClose={closeReviewDialog}
        stars={stars}
        reviews={reviews}
        averageStar={averageStar}
      />

      {bookedBooking && (
        <CreateReviewDialog
          roomId={roomId}
          open={isOpenCreateReviewDialog}
          onClose={closeCreateReviewDialog}
          bookingId={bookedBooking.id}
          changeReview={changeReview}
        />
      )}
    </Box>
  );
}

export default RoomDetailReview;
