import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CellWifi, Countertops, Pets, Air, Work } from "@mui/icons-material";
import React from "react";

type Props = {};

const amenityIcon = {
  Wifi: <CellWifi />,
  Kitchen: <Countertops />,
  pet: <Pets />,
  airconditioner: <Air />,
  work: <Work />,
};

function RoomDetailAmenities({}: Props) {
  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
        textAlign: "justify",
      }}
    >
      <h2 className="roomDetail__title">Nơi này có những gì cho bạn</h2>
      <List>
        <AmenityItem />
        <AmenityItem />
        <AmenityItem />
      </List>
    </Box>
  );
}

function AmenityItem() {
  return (
    <ListItem
      sx={{
        padding: "8px 0",
      }}
    >
      <ListItemIcon>
        <CellWifi />
      </ListItemIcon>

      <ListItemText>Wifi</ListItemText>
    </ListItem>
  );
}

export default RoomDetailAmenities;
