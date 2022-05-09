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
import { useState } from "react";

type Props = {};

function ChooseAmenities({}: Props) {
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
              control={<Checkbox name={item.name} />}
              label={item.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default ChooseAmenities;
