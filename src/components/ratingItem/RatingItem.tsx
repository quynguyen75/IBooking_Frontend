import { Rating, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  value: number;
  precision: number;
  onChange?: (event: React.SyntheticEvent, value: number | null) => void;
  readonly: boolean;
};

function RatingItem({ name, value, precision, onChange, readonly }: Props) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography>{name}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Rating
          name="read-only"
          value={value}
          precision={precision}
          readOnly={readonly}
          onChange={onChange}
        />
        <span>{value}</span>
      </Stack>
    </Stack>
  );
}

export default RatingItem;
