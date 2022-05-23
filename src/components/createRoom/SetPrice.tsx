import { Box, Stack, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { setCleanlinessFee, setNightPrice } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function SetPrice({}: Props) {
  const nightPrice = useSelector(
    (state: RootState) => state.createRoom.nightPrice
  );
  const cleanlinessFee = useSelector(
    (state: RootState) => state.createRoom.cleanlinessFee
  );

  const dispatch = useDispatch();

  const nightPriceChangeHandler = (values: any) => {
    dispatch(setNightPrice(+values.value));
  };

  const cleanlinessFeeChangeHandler = (values: any) =>
    dispatch(setCleanlinessFee(+values.value));

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
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Stack alignItems="center">
        <NumberFormat
          customInput={TextField}
          thousandSeparator
          label="Giá tối thiểu / đêm"
          onValueChange={nightPriceChangeHandler}
          prefix="đ"
          variant="outlined"
          value={nightPrice}
        />
      </Stack>

      <Stack alignItems="center">
        <NumberFormat
          customInput={TextField}
          thousandSeparator
          label="Phí dọn dẹp"
          onValueChange={cleanlinessFeeChangeHandler}
          prefix="đ"
          variant="outlined"
          value={cleanlinessFee}
        />
      </Stack>
    </Box>
  );
}

export default SetPrice;
