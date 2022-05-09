import { Rating, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  value: number;
  precision: number;
};

function RatingItem({ name, value, precision }: Props) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography>{name}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Rating name="read-only" value={value} precision={precision} readOnly />
        <span>{value}</span>
      </Stack>
    </Stack>
  );
}

export default RatingItem;
