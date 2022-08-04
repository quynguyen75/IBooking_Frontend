import React, { useContext, useEffect, useState } from "react";

import { Button, FormControl, FormLabel, TextField } from "@mui/material";

import {
  FilterContext,
  initialState as initialFilter,
} from "context/FilterContext";

import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";
import { AMENITIES, ROOM_TYPE_API } from "constant/resource";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterAllDialog({ isOpen, onClose }: Props) {
  const filterContext = useContext(FilterContext);

  const [roomCountFilter, setRoomCountFilter] = useState(
    filterContext.filter.roomCount
  );

  const isDisplayCancelFilterButton =
    JSON.stringify(initialFilter.roomCount) !==
    JSON.stringify(filterContext.filter.roomCount);

  const handleRoomCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoomCountFilter((options: any) => ({
      ...options,
      [event.target.name]: +event.target.value,
    }));
  };

  const filterHandler = () => {
    onClose();
    filterContext.filterDispatch({
      type: "ROOM_COUNT",
      payload: roomCountFilter,
    });
  };

  const cancelFilterHandler = () => {
    onClose();
    filterContext.filterDispatch({
      type: "ROOM_COUNT",
      payload: initialFilter.roomCount,
    });
  };

  useEffect(() => {
    setRoomCountFilter(filterContext.filter.roomCount);
  }, [filterContext.filter.roomCount]);

  return (
    <div>
      <RoomFilterDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Số lượng phòng"
        buttonAction={
          <Button variant="contained" onClick={filterHandler}>
            Lọc
          </Button>
        }
        isDisplayCancelFilterButton={isDisplayCancelFilterButton}
        cancelFilterHandler={cancelFilterHandler}
      >
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
              Phòng khách
            </FormLabel>

            <TextField
              type="number"
              name="livingRoom"
              label="Số lượng"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
              value={roomCountFilter.livingRoom}
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
                },
              }}
              value={roomCountFilter.bedroom}
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
              Phòng tắm
            </FormLabel>

            <TextField
              type="number"
              label="Số lượng"
              name="bathroom"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
              value={roomCountFilter.bathroom}
              onChange={handleRoomCountChange}
            />
          </FormControl>
        </div>
      </RoomFilterDialog>
    </div>
  );
}

export default FilterAllDialog;
