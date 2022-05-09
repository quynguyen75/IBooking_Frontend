import { Box, Stack, TextField } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";

type Props = {};

function SetPrice({}: Props) {
  return (
    <Box
      sx={{
        padding: "12px 0",
        height: "100%",
        display: {
          sm: "flex",
        },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack alignItems="center">
        <NumberFormat
          customInput={TextField}
          thousandSeparator
          label="Giá tối thiểu / đêm"
          //   onValueChange={(values) => setNumberFormatState(values.value)}
          prefix="đ"
          defaultValue={0}
          variant="outlined"
        />
      </Stack>
    </Box>
  );
}

export default SetPrice;
