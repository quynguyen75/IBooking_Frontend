import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";
import React, { useState } from "react";
import NumberFormat from "react-number-format";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterAllDialog({ isOpen, onClose }: Props) {
  const [value, setValue] = useState<number[]>([100000, 10000000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <div>
      <RoomFilterDialog isOpen={isOpen} onClose={onClose} title="Bộ lọc">
        <div>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "black",
              }}
            >
              Khoảng giá
            </FormLabel>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Slider
                value={value}
                onChange={handleChange}
                min={100000}
                max={10000000}
                step={100000}
                sx={{
                  width: "80%",
                }}
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
          </FormControl>
        </div>

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "black",
                mb: 1,
              }}
            >
              Phòng
            </FormLabel>

            <TextField
              type="number"
              label="Số lượng"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                  defaultValue: 1,
                },
              }}
            />
          </FormControl>
        </div>

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "black",
                mb: 1,
              }}
            >
              Phòng ngủ
            </FormLabel>

            <TextField
              type="number"
              label="Số lượng"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                  defaultValue: 1,
                },
              }}
            />
          </FormControl>
        </div>

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "black",
              }}
            >
              Loại chỗ ở
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="Rental Unit" />}
                label="Căn hộ cho thuê"
              />
              <FormControlLabel
                control={<Checkbox name="Apartment" />}
                label="Căn hộ chung cư cao cấp"
              />
              <FormControlLabel
                control={<Checkbox name="Loft" />}
                label="Tầng lửng"
              />

              <FormControlLabel
                control={<Checkbox name="Serviced Apartment" />}
                label="Căn hộ dịch vụ"
              />

              <FormControlLabel
                control={<Checkbox name="Holiday home" />}
                label="Nhà nghỉ dưỡng"
              />
            </FormGroup>
          </FormControl>
        </div>

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "black",
              }}
            >
              Tiện ích
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="hasPool" />}
                label="Bể bơi"
              />
              <FormControlLabel
                control={<Checkbox name="hasGym" />}
                label="Phòng tập thể hình"
              />
              <FormControlLabel
                control={<Checkbox name="hasWifi" />}
                label="Wifi"
              />

              <FormControlLabel
                control={<Checkbox name="hasConditioning" />}
                label="Điều hoà nhiệt độ"
              />

              <FormControlLabel
                control={<Checkbox name="hasKitchen" />}
                label="Bếp"
              />

              <FormControlLabel
                control={<Checkbox name="hasWashingMachine" />}
                label="Máy giặt"
              />

              <FormControlLabel
                control={<Checkbox name="hasDedicatedWorkspace" />}
                label="Không gian riêng để làm việc"
              />
            </FormGroup>
          </FormControl>
        </div>
      </RoomFilterDialog>
    </div>
  );
}

export default FilterAllDialog;
