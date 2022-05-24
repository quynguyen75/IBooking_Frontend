import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import RatingItem from "components/ratingItem/RatingItem";
import { RATING } from "constant/resource";
import React, { useState } from "react";

type Props = {};

function CreateReviewDialog({}: Props) {
  const [rating, setRating] = useState<any>({
    cleanlinessStar: 0,
    accuracyStar: 0,
    communicationStar: 0,
    locationStar: 0,
    checkInStar: 0,
    valueStar: 0,
  });

  return (
    <Dialog fullWidth maxWidth={"md"} open={true}>
      <DialogActions>
        <IconButton>
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
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateReviewDialog;
