import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AMENITIES } from "constant/resource";

type Props = {
  room: any;
};

function RoomDetailAmenities({ room }: Props) {
  const displayAmenities = room && AMENITIES.filter((item) => room[item.name]);

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
        {displayAmenities &&
          displayAmenities.map((item: any) => (
            <AmenityItem
              key={item.label}
              Icon={<item.icon />}
              label={item.label}
            />
          ))}
      </List>
    </Box>
  );
}

function AmenityItem({ Icon, label }: { Icon: JSX.Element; label: string }) {
  return (
    <ListItem
      sx={{
        padding: "8px 0",
      }}
    >
      <ListItemIcon>{Icon}</ListItemIcon>

      <ListItemText>{label}</ListItemText>
    </ListItem>
  );
}

export default RoomDetailAmenities;
