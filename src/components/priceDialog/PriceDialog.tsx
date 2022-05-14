import {
  Slider,
  Box,
  TextField,
  Stack,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";

import NumberFormat from "react-number-format";

import { useContext, useState } from "react";
import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";
import { FilterContext } from "context/FilterContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function PriceDialog({ isOpen, onClose }: Props) {
  const [value, setValue] = useState<number[]>([100000, 10000000]);
  const filterContext = useContext(FilterContext);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const filterHandler = () => {
    onClose();

    filterContext.filterDispatch({
      type: "PRICE",
      payload: {
        from: value[0],
        to: value[1],
      },
    });
  };

  return (
    <div>
      <RoomFilterDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Giá nơi ở"
        buttonAction={
          <Button variant="contained" onClick={filterHandler}>
            Lọc
          </Button>
        }
      >
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
