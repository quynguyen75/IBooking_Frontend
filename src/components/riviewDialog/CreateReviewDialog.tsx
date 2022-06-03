import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import Loading from "components/loading/Loading";
import RatingItem from "components/ratingItem/RatingItem";
import { RATING, REVIEWS_API } from "constant/resource";
import { UserContext } from "context/UserContext";
import React, { ChangeEvent, useContext, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  roomId: number;
  bookingId: number;
  changeReview: () => void;
};

function CreateReviewDialog({
  open,
  onClose,
  roomId,
  bookingId,
  changeReview,
}: Props) {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [rating, setRating] = useState<any>({
    cleanlinessStar: 0,
    accuracyStar: 0,
    communicationStar: 0,
    locationStar: 0,
    checkInStar: 0,
    valueStar: 0,
  });

  const [content, setContent] = useState("");

  const contentReviewChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const createClickHandler = () => {
    const createReview = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(REVIEWS_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              content,
              ...rating,
              booking: [bookingId],
              user: [userContext.user.id],
              room: [roomId],
            },
          }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    createReview();
    setTimeout(() => {
      changeReview();
    }, 0);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={onClose}>
      <DialogActions>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogActions>

      <DialogTitle></DialogTitle>

      <DialogContent>
        <div
          style={{
            padding: "8px",
          }}
        >
          <Grid container spacing={6}>
            {RATING.map((item) => (
              <Grid item sm={6} key={item.label}>
                <RatingItem
                  name={item.label}
                  value={rating[item.name]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setRating({
                      ...rating,
                      [item.name]: newValue,
                    });
                  }}
                  readonly={false}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <Box
          sx={{
            p: "8px 0",
          }}
        >
          <TextField
            value={content}
            onChange={contentReviewChangeHandler}
            label="Nội dung"
            fullWidth
            multiline
            rows={6}
          />
        </Box>

        <Stack alignItems="flex-end">
          <Button
            disabled={!content}
            variant="contained"
            onClick={createClickHandler}
          >
            Đánh giá
          </Button>
        </Stack>
      </DialogContent>

      {isLoading && <Loading />}
    </Dialog>
  );
}

export default CreateReviewDialog;
