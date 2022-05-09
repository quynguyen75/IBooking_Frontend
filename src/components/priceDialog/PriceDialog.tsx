import { Slider, Box, TextField, Stack } from "@mui/material";

import NumberFormat from "react-number-format";

import { useState } from "react";
import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function PriceDialog({ isOpen, onClose }: Props) {
  const [value, setValue] = useState<number[]>([100000, 10000000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div>
      <RoomFilterDialog isOpen={isOpen} onClose={onClose} title="Giá nơi ở">
        <Box>
          <Slider
            value={value}
            onChange={handleChange}
            min={100000}
            max={10000000}
            step={100000}
          />
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{
            marginTop: 1,
          }}
        >
          <NumberFormat
            customInput={TextField}
            thousandSeparator
            label="Giá tối thiểu"
            //   onValueChange={(values) => setNumberFormatState(values.value)}
            value={value[0]}
            prefix="đ"
            variant="outlined"
          />

          <NumberFormat
            customInput={TextField}
            thousandSeparator
            label="Giá tối đa"
            //   onValueChange={(values) => setNumberFormatState(values.value)}
            value={value[1]}
            prefix="đ"
            variant="outlined"
          />
        </Stack>
      </RoomFilterDialog>
    </div>
  );
}

export default PriceDialog;
