import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const ROOMTYPE = [
  {
    name: "Căn hộ cho thuê",
    desc: "Một địa điểm cho thuê trong một tòa nhà chung cư hoặc khu phức hợp.",
  },

  {
    name: "Căn hộ chung cư cao cấp",
    desc: "Một chỗ ở trong một tòa chung cư hoặc khu phức hợp thuộc sở hữu của cư dân.",
  },

  {
    name: "Tầng lửng",
    desc: "Một căn hộ thường hoặc căn hộ chung cư cao cấp với thiết kế ưu tiên không gian thoáng, có thể có vách tường thấp bên trong.",
  },
];

function CreateRoomType({}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <List>
      {ROOMTYPE.map((item, index) => (
        <ListItem key={item.name}>
          <ListItemButton
            sx={{
              border: "1px solid rgb(221, 221, 221)",
              borderRadius: "12px",
              "&.Mui-selected": {
                borderColor: "#000",
              },
            }}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            <div>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {item.name}
              </Typography>
              <Typography>{item.desc}</Typography>
            </div>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CreateRoomType;
