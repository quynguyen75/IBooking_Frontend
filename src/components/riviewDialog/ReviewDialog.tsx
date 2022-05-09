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
  ratingItems: { name: string; value: number }[];
};

function ReviewDialog({ open, onClose, ratingItems }: Props) {
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
            {ratingItems.map((item) => (
              <RatingItem
                key={item.name}
                name={item.name}
                value={item.value}
                precision={0.1}
              />
            ))}
          </Stack>
        )}

        <Stack spacing={2}>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDialog;
