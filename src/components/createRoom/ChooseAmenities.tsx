import { Pool } from "@mui/icons-material";
import {
  Box,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Switch,
} from "@mui/material";
import { AMENITIES } from "constant/resource";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmenities } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function ChooseAmenities({}: Props) {
  const amenities: any = useSelector(
    (state: RootState) => state.createRoom.amenities
  );

  const dispatch = useDispatch();

  const amenityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      setAmenities({
        ...amenities,
        [e.target.name]: e.target.checked,
      })
    );

  return (
    <Box
      sx={{
        padding: "8px 0",
      }}
    >
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">
          Bạn có tiện nghi nào nổi bật không?
        </FormLabel>
        <FormGroup>
          {AMENITIES.map((item) => (
            <FormControlLabel
              key={item.label}
              control={
                <Checkbox
                  name={item.name}
                  onChange={amenityChangeHandler}
                  checked={amenities[item.name]}
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default ChooseAmenities;
