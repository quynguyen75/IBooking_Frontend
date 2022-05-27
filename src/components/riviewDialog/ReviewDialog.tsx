import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close, Star } from "@mui/icons-material";
import React from "react";
import { yellow } from "@mui/material/colors";
import ReviewItem from "components/reviewItem/ReviewItem";
import RatingItem from "components/ratingItem/RatingItem";
import useDisableScroll from "hooks/useDisableScroll";

type Props = {
  open: boolean;
  onClose: () => void;
  stars: { name: string; label: string; value: number }[];
  reviews: any[];
};

function ReviewDialog({ open, onClose, stars, reviews }: Props) {
  useDisableScroll(open);
  const min768px = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={onClose}>
      <DialogActions onClick={onClose}>
        <IconButton>
          <Close />
        </IconButton>
      </DialogActions>

      <DialogTitle>
        <Typography
          variant="h3"
          sx={{
            fontSize: "22px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Star
            style={{
              color: yellow["A700"],
            }}
          />
          4,67 - 67 đánh giá
        </Typography>
      </DialogTitle>

      <DialogContent>
        {min768px || (
          <Stack
            spacing={2}
            sx={{
              padding: "4px",
            }}
          >
            {stars?.map((item) => (
              <RatingItem
                key={item.label}
                name={item.label}
                value={item.value}
                precision={0.1}
                readonly
              />
            ))}
          </Stack>
        )}

        <Stack spacing={2}>
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDialog;
