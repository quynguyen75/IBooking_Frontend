import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NumberFormat from "react-number-format";
import { Box } from "@mui/system";

import { FilterContext } from "context/FilterContext";
import useFetch from "hooks/useFetch";

import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";
import { AMENITIES, ROOM_TYPE_API } from "constant/resource";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterAllDialog({ isOpen, onClose }: Props) {
  const filterContext = useContext(FilterContext);

  const [fetchStatus, roomTypes] = useFetch(ROOM_TYPE_API);

  const [filterOptions, setFilterOptions] = useState(filterContext.filter);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number[];

    setFilterOptions((options) => ({
      ...options,
      price: {
        from: value[0],
        to: value[1],
      },
    }));
  };

  const handleRoomCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterOptions((options) => ({
      ...options,
      roomCount: {
        ...options.roomCount,
        [event.target.name]: +event.target.value,
      },
    }));
  };

  const handleChooseRoomType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((options) => ({
      ...options,
      roomType: {
        ...options.roomType,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleChooseAmenity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((options) => ({
      ...options,
      amenities: {
        ...options.amenities,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const filterHandler = () => {
    onClose();
    filterContext.filterDispatch({
      type: "ALL",
      payload: filterOptions,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setFilterOptions(filterContext.filter);
    }
  }, [isOpen]);

  useEffect(() => {
    setFilterOptions(filterContext.filter);
  }, [filterContext.filter]);

  return (
    <div>
      <RoomFilterDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Bộ lọc"
        buttonAction={
          <Button variant="contained" onClick={filterHandler}>
            Lọc
          </Button>
        }
      >
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
                value={[filterOptions.price.from, filterOptions.price.to]}
                onChange={handlePriceChange}
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
                value={filterOptions.price.from}
                prefix="đ"
                variant="outlined"
              />

              <NumberFormat
                customInput={TextField}
                thousandSeparator
                label="Giá tối đa"
                //   onValueChange={(values) => setNumberFormatState(values.value)}
                value={filterOptions.price.to}
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
              name="livingRoom"
              label="Số lượng"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                  defaultValue: 1,
                },
              }}
              onChange={handleRoomCountChange}
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
              name="bedroom"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                  defaultValue: 1,
                },
              }}
              onChange={handleRoomCountChange}
            />
          </FormControl>
        </div>

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              color: "black",
            }}
          >
            Loại chỗ ở
          </Typography>
          <FormGroup>
            {roomTypes &&
              roomTypes.data.map((type: any) => (
                <FormControlLabel
                  key={type.id}
                  control={
                    <Checkbox
                      name={type.attributes.name}
                      onChange={handleChooseRoomType}
                      checked={filterOptions.roomType[type.attributes.name]}
                    />
                  }
                  label={type.attributes.label}
                />
              ))}
          </FormGroup>
        </div>

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              color: "black",
            }}
          >
            Tiện ích
          </Typography>
          <FormGroup>
            {AMENITIES.map((amenity) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={amenity.name}
                    onChange={handleChooseAmenity}
                    checked={filterOptions.amenities[amenity.name]}
                  />
                }
                label={amenity.label}
                key={amenity.name}
              />
            ))}
          </FormGroup>
        </div>
      </RoomFilterDialog>
    </div>
  );
}

export default FilterAllDialog;
